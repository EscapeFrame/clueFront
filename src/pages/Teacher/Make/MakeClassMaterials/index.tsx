import React, { useState } from "react";
import * as s from "./styles";
import Step1 from "@/features/Teacher/MakeMaterials/Step1/Step1";
import Step2 from "@/features/Teacher/MakeMaterials/Step2/Step2";
import Step3 from "@/features/Teacher/MakeMaterials/Step3/Step3";

export default function MakeClassMaterials() {
    const [currentStep, setCurrentStep] = useState(1);

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

            {currentStep === 1 && <Step1 onNext={handleNext} />}
            {currentStep === 2 && <Step2 onNext={handleNext}/>}
            {currentStep === 3 && <Step3 onNext={handleNext} />}
        </s.Wrapper>
    );
}