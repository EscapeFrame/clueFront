import React, { useState } from "react";
import * as s from "./styles";
import ToggleSwitch from "@/entities/UI/ToggleSwitch";
import Button from "@/entities/UI/Button";
import { titleText, bodyText } from "../data";

export const AlertSection: React.FC = () => {
    const handleSubmit = () => {
        console.log("현재 알림 설정:", toggles);
        alert("알림 설정이 저장되었습니다!");
    };

    // 각 토글 상태관리
    const [toggles, setToggles] = useState<boolean[]>(new Array(titleText.length).fill(true));

    // 토글 변경 가능하게
    const handleToggleChange = (index: number, checked: boolean) => {
        setToggles((prev) => prev.map((state, i) => (i === index ? checked : state)));
    };

    return (
        <s.Section>
            <s.Wrapper>
                <s.SectionTitle>기능별 알림설정</s.SectionTitle>
                <s.SectionExplan>각 제공되는 알림을 설정합니다.</s.SectionExplan>
            </s.Wrapper>

            <s.AlertList>
                {titleText.map((title, index) => (
                    <s.AlertItem key={title}>
                        <s.AlertText>
                            <s.AlertLabel>{title}</s.AlertLabel>
                            <s.AlertDesc>{bodyText[index]}</s.AlertDesc>
                        </s.AlertText>
                        <ToggleSwitch
                            id={`${index}`}
                            checked={toggles[index]}
                            onChange={(checked: boolean) => handleToggleChange(index, checked)}
                        />
                    </s.AlertItem>
                ))}
            </s.AlertList>

            <s.ButtonWrapper>
                <Button text={"저장"} width={'100px'} type={0} onClick={handleSubmit} />
            </s.ButtonWrapper>
        </s.Section>
    );
};