import React, { useState, useCallback, useRef } from "react";
import * as s from "./styles";
import { MdOutlineFileUpload } from "react-icons/md";

const useFiles = (initialFiles: File[] = []) => {
    const [files, setFiles] = useState<File[]>(initialFiles);

    const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles || selectedFiles.length === 0) return;

        const newFilesArray = Array.from(selectedFiles);

        setFiles(prevFiles => {
            const newFiles = newFilesArray.filter(
                newFile => !prevFiles.some(prevFile => prevFile.name === newFile.name)
            );
            if (newFiles.length !== newFilesArray.length) {
                alert("이미 추가된 파일은 제외됩니다.");
            }
            if (newFiles.length > 0) {
                alert(`${newFiles.length}개의 파일이 추가되었습니다.`);
            }
            return [...prevFiles, ...newFiles];
        });
    }, []);

    const removeFile = useCallback((idx: number) => {
        setFiles(prev => prev.filter((_, i) => i !== idx));
    }, []);

    return { files, onFileChange, removeFile, setFiles };
};

interface Step1Props {
    onNext: (data: { title: string; goal: string; keywords: string[]; files: File[] }) => void;
}

export default function Step1({ onNext }: Step1Props) {
    const [title, setTitle] = useState<string>("");
    const [goal, setGoal] = useState<string>("");
    const [keywordInput, setKeywordInput] = useState<string>("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { files, onFileChange, removeFile, setFiles } = useFiles();

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

    const handleCancel = () => {
        setTitle("");
        setGoal("");
        setKeywordInput("");
        setKeywords([]);
        setFiles([]);
    };

    const handleUploadClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            onFileChange({ target: { files: droppedFiles } } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const isFormValid = title.trim() !== "" && goal.trim() !== "" && keywords.length > 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext({ title, goal, keywords, files });
    };

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
                                <button type="button" onClick={() => removeKeyword(k)}>×</button>
                            </s.KeywordItem>
                        ))}
                    </s.KeywordList>
                </s.Field>

                <s.Field>
                    <label>참고자료 제시</label>
                    <input
                        id="file-upload-input"
                        ref={fileInputRef}
                        type="file"
                        onChange={onFileChange}
                        multiple
                        accept="image/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                        style={{ display: 'none' }}
                    />
                    <s.UploadBox
                        isDragOver={isDragOver}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleUploadClick}
                    >
                        <MdOutlineFileUpload size={60} /> <br />
                        {isDragOver ? '여기에 파일을 놓으세요!' : '파일을 끌어다 놓거나 클릭하여 업로드하세요.'}
                    </s.UploadBox>
                    <s.FilesList>
                        {files.map((f, i) => (
                            <s.FileItem key={`${f.name}-${i}`}>
                                <div className="left">
                                    <s.FileIcon viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></s.FileIcon>
                                    <div className="meta">
                                        <div className="name">{f.name}</div>
                                        <div className="size">{Math.round(f.size / 1024)} KB</div>
                                    </div>
                                </div>
                                <div>
                                    <button type="button" onClick={() => removeFile(i)}>✕</button>
                                </div>
                            </s.FileItem>
                        ))}
                    </s.FilesList>
                </s.Field>

                <s.ButtonRow>
                    <s.Button variant="secondary" type="button" onClick={handleCancel}>취소</s.Button>
                    <s.Button variant="primary" type="submit" disabled={!isFormValid}>다음</s.Button>
                </s.ButtonRow>
            </s.Form>
        </s.Card>
    );
}
