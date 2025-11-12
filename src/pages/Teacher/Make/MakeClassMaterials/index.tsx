import React, { useState } from "react";
import {
    Wrapper,
    Card,
    StepBar,
    Step,
    Form,
    Field,
    UploadBox,
    ButtonRow,
    Button,
} from "./styles";

export default function MakeClassMaterials() {
    const [title, setTitle] = useState<string>("");
    const [goal, setGoal] = useState<string>("");
    const [keywordInput, setKeywordInput] = useState<string>("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    const onKeyDownKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const v = keywordInput.trim();
            if (v && !keywords.includes(v)) {
                setKeywords((k) => [...k, v]);
            }
            setKeywordInput("");
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files || []);
        if (selected.length === 0) return;
        setFiles((prev) => [...prev, ...selected]);
        e.currentTarget.value = "";
    };

    const removeKeyword = (k: string) => setKeywords((prev) => prev.filter((p) => p !== k));
    const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ title, goal, keywords, files });
        alert("제출 완료 (콘솔 확인)");
    };

    return (
        <Wrapper>
            {/* Step Progress Bar */}
            <StepBar>
                {[1, 2, 3, 4, 5].map((num, i) => (
                    <Step key={num} active={num === 1}>
                        <span>{num}</span>
                        <label>
                            {["수업자료 입력", "Workflow", "문서생성", "문서 재요청", "Graph 생성"][i]}
                        </label>
                    </Step>
                ))}
            </StepBar>
            <Card>
                {/* Form */}
                <Form onSubmit={onSubmit}>
                    <Field>
                        <label>수업자료명 *</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="과목명을 입력해 주세요" required />
                    </Field>

                    <Field>
                        <label>학습 목표 *</label>
                        <textarea
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="학습 목표를 입력해 주세요. ex) 여러 개의 상태를 함께 관리하는 방법을 설계할 수 있다."
                            required
                        />
                    </Field>

                    <Field>
                        <label>핵심단어 *</label>
                        <input
                            type="text"
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                            onKeyDown={onKeyDownKeyword}
                            placeholder="내용을 작성하고 enter를 눌러주세요. ex) useState, props"
                            required
                        />

                        {/* keywords list */}
                        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                            {keywords.map((k) => (
                                <div key={k} style={{ background: "#e6f0ff", color: "#0b5fff", padding: "6px 10px", borderRadius: 12, display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 13 }}>{k}</span>
                                    <button type="button" onClick={() => removeKeyword(k)} style={{ all: "unset", cursor: "pointer", color: "#0b5fff", fontWeight: 700 }}>×</button>
                                </div>
                            ))}
                        </div>
                    </Field>

                    <Field>
                        <label>참고자료 제시</label>
                        <UploadBox>
                            <span>{files.length > 0 ? `${files.length}개 파일` : "파일 업로드"}</span>
                            <input type="file" onChange={onFileChange} multiple />
                            <svg
                                width="20"
                                height="20"
                                fill="none"
                                stroke="#6b7280"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4 4v16h16V4H4zM4 12h16M12 4v16" />
                            </svg>
                        </UploadBox>

                        {/* files list */}
                        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                            {files.map((f, i) => (
                                <div key={`${f.name}-${i}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f3f4f6", padding: "8px 12px", borderRadius: 8 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                                        <div>
                                            <div style={{ fontSize: 13 }}>{f.name}</div>
                                            <div style={{ fontSize: 12, color: "#6b7280" }}>{Math.round(f.size / 1024)} KB</div>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="button" onClick={() => removeFile(i)} style={{ all: "unset", cursor: "pointer", color: "#6b7280", padding: "6px" }}>✕</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Field>

                    <ButtonRow>
                        <Button variant="secondary" type="button" onClick={() => {
                            // reset
                            setTitle("");
                            setGoal("");
                            setKeywordInput("");
                            setKeywords([]);
                            setFiles([]);
                        }}>취소</Button>
                        <Button variant="primary" type="submit">확인</Button>
                    </ButtonRow>
                </Form>
            </Card>
        </Wrapper>
    );
}