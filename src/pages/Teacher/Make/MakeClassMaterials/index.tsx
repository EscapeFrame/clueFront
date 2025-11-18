import React, { useState } from "react";
import * as s from "./styles";
import Step1 from "@/features/Teacher/MakeMaterials/Step1/Step1";
import Step2 from "@/features/Teacher/MakeMaterials/Step2/Step2";
import Step3 from "@/features/Teacher/MakeMaterials/Step3/Step3";

export default function MakeClassMaterials() {
    const [currentStep, setCurrentStep] = useState(1);
    const [step1Data, setStep1Data] = useState<any>(null);

    const handleNextStep1 = (data: { title: string; goal: string; keywords: string[]; files: File[] }) => {
        console.log("Step 1 Data:", data);
        setStep1Data(data);
        setCurrentStep(2); // 다음 단계로 이동
    };

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
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

            {currentStep === 1 && <Step1 onNext={handleNextStep1} />}
            {currentStep === 2 && <Step2 onNext={handleNext}/>}
            {currentStep === 3 && <Step3 onNext={handleNext} />}

            {/* ... 다른 단계들 */}
        </s.Wrapper>
    );
}