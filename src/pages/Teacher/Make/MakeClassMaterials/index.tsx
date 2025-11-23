import React, { useState } from "react";
import * as s from "./styles";
import Step1 from "@/features/Teacher/MakeMaterials/Step1/Step1";
import Step2 from "@/features/Teacher/MakeMaterials/Step2/Step2";
import Step3 from "@/features/Teacher/MakeMaterials/Step3/Step3";
import { Word, AgentFlowResponse, Doc, patchAgentFlow } from "@/features/Teacher/MakeMaterials/api";
import { usePostAgentDoc } from "@/features/Teacher/MakeMaterials/hooks/useAgentDoc";

export default function MakeClassMaterials() {
    const [currentStep, setCurrentStep] = useState(1);
    const [agentId, setAgentId] = useState<string | null>(null);
    const [flowChartWords, setFlowChartWords] = useState<Word[]>([]);
    const [docs, setDocs] = useState<Doc[]>([]);

    const { mutate: postDocMutate, isPending: isDocPosting } = usePostAgentDoc({
        onSuccess: (response) => {
            if (response && response.data && response.data.doc && response.data.doc.docs) {
                setDocs(response.data.doc.docs);
            }
            setCurrentStep(currentStep + 1); // Move to Step3
        },
        onError: (error) => {
            alert(`문서 생성에 실패했습니다: ${error.message}`);
        }
    });

    const handleNext = (payload?: AgentFlowResponse | { words: Word[] }) => {
        if (payload && "data" in payload && payload.data && payload.data.flow && payload.data.flow.words) {
            // From Step1 (AgentFlowResponse)
            setFlowChartWords(payload.data.flow.words);
            setAgentId(payload.data.agentId);
            setCurrentStep(currentStep + 1); // Move to Step2
        } else if (payload && "words" in payload && agentId) {
            // From Step2 (words payload) - update flow on server via PATCH, then request docs
            (async () => {
                try {
                    await patchAgentFlow(agentId, payload.words);
                    postDocMutate({ agentId, words: payload.words });
                } catch (err) {
                    const maybeErr = err as { message?: string } | undefined;
                    const message = maybeErr && maybeErr.message ? maybeErr.message : String(err);
                    alert(`플로우 업데이트에 실패했습니다: ${message}`);
                }
            })();
        } else {
            // General next (e.g., from Step3)
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <s.Wrapper>
            <s.StepBar>
                {[1, 2, 3].map((num) => (
                    <s.Step key={num} active={num === currentStep}>
                        <span>{num}</span>
                        <label>
                            {["수업자료 입력", "Workflow", "문서생성"][num - 1]}
                        </label>
                    </s.Step>
                ))}
            </s.StepBar>


            {currentStep === 1 && <Step1 onNext={handleNext} />}
            {currentStep === 2 && <Step2 onNext={handleNext} words={flowChartWords} />}
            {currentStep === 3 && <Step3 onNext={handleNext} docs={docs} isGenerating={isDocPosting} />}
        </s.Wrapper>
    );
}