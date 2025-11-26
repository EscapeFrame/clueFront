import React, { useState } from "react";
import { IoClose } from 'react-icons/io5';
import Button from '@/entities/UI/Button';
import * as s from "./styles";
import { usePostMaterials } from "../hooks/useMaterials";
import { MdAdd, MdRemove } from "react-icons/md";
import { AgentFlowResponse } from "../api";

interface Step1Props {
    onNext: (response: AgentFlowResponse) => void;
}

export default function Step1({ onNext }: Step1Props) {
    const [title, setTitle] = useState<string>("");
    const [goal, setGoal] = useState<string>("");
    const [keywordInput, setKeywordInput] = useState<string>("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [links, setLinks] = useState<string[]>([""]);

    const { mutate, isPending } = usePostMaterials({
        onSuccess: (response) => {
            onNext(response);
        },
        onError: (error) => {
            alert(`자료 생성에 실패했습니다: ${error.message}`);
        }
    });

    const onKeyDownKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            return;
        }
        if (e.key === "Enter" && keywordInput.trim() !== "") {
            e.preventDefault();
            const v = keywordInput.trim();
            if (v && !keywords.includes(v)) {
                setKeywords((k) => [...k, v]);
            }
            setKeywordInput("");
        }
    };

    const removeKeyword = (k: string) => setKeywords((prev) => prev.filter((p) => p !== k));

    const handleLinkChange = (index: number, value: string) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };

    const addLinkInput = () => {
        setLinks([...links, ""]);
    };

    const removeLinkInput = (index: number) => {
        if (links.length > 1) {
            setLinks(links.filter((_, i) => i !== index));
        } else {
            setLinks([""]);
        }
    };

    const handleCancel = () => {
        setTitle("");
        setGoal("");
        setKeywordInput("");
        setKeywords([]);
        setLinks([""]);
    };

    const isFormValid = title.trim() !== "" && goal.trim() !== "" && keywords.length > 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        mutate({
            studying_name: title,
            learning_purpose: goal,
            main_words: keywords,
            links: links.filter(l => l.trim() !== ""),
        });
    };

    if (isPending) {
        return (
            <s.Card>
                <s.SpinnerOverlay>
                    <s.Spinner />
                    <s.LoadingText>수업 자료를 생성하는 중입니다...</s.LoadingText>
                </s.SpinnerOverlay>
            </s.Card>
        );
    }

    return (
        <s.Card>
            <s.Form onSubmit={handleSubmit}>
                <s.Field>
                    <label>수업자료명 *</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="과목명을 입력해 주세요" required />
                </s.Field>

                <s.Field>
                    <label>학습 목표 *</label>
                    <textarea
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="학습 목표를 입력해 주세요. ex) 여러 개의 상태를 함께 관리하는 방법을 설계할 수 있다."
                        required
                    />
                </s.Field>

                <s.Field>
                    <label>핵심단어 *</label>
                    <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={onKeyDownKeyword}
                        placeholder="내용을 작성하고 enter를 눌러주세요. ex) useState, props"
                    />
                    <s.KeywordList>
                        {keywords.map((k) => (
                            <s.KeywordItem key={k}>
                                <span>{k}</span>
                                <Button type={2} width="32px" onClick={() => removeKeyword(k)}>
                                    <IoClose size={16} />
                                </Button>
                            </s.KeywordItem>
                        ))}
                    </s.KeywordList>
                </s.Field>

                <s.Field>
                    <label>참고 링크</label>
                    {links.map((link, index) => (
                        <s.LinkInputWrapper key={index}>
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => handleLinkChange(index, e.target.value)}
                                placeholder="참고할 링크를 입력해 주세요"
                            />
                            <s.LinkButton type="button" onClick={() => removeLinkInput(index)}>
                                <MdRemove />
                            </s.LinkButton>
                        </s.LinkInputWrapper>
                    ))}
                    <s.AddLinkButton type="button" onClick={addLinkInput}>
                        <MdAdd /> 링크 추가
                    </s.AddLinkButton>
                </s.Field>

                <s.ButtonRow>
                    <s.Button variant="secondary" type="button" onClick={handleCancel}>취소</s.Button>
                    <s.Button variant="primary" type="submit" disabled={!isFormValid || isPending}>
                        {isPending ? '생성 중...' : '다음'}
                    </s.Button>
                </s.ButtonRow>
            </s.Form>
        </s.Card>
    );
}
