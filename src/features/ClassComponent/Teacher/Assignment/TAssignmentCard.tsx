import React, { useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { FaRegFile, FaXmark } from "react-icons/fa6";
import { MdOutlineFileDownload, MdUpload } from "react-icons/md";
import { useParams } from "react-router-dom";
import { AssignmentData } from "@/shared/theme/AssignmentTheme";

import * as S from "@/features/ClassComponent/Assignment/styles";
import SlidePanel from "@/features/ClassComponent/Assignment/SlidePanel/SlidePanel";

interface AssignmentCardProps {
    data: AssignmentData;
    onCheck?: () => void;
}

interface FileInfo {
    id: string;
    name: string;
    size: string;
}

export function TAssignmentCard({ data, onCheck }: AssignmentCardProps) {
    const { classId } = useParams<{ classId: string }>();
    const initialFiles: FileInfo[] = data.hasFile
        ? [{ id: crypto.randomUUID(), name: data.fileName!, size: data.fileSize! }]
        : [];

    const [submitted, setSubmitted] = useState(data.buttonType === "resubmit");
    const [files, setFiles] = useState<FileInfo[]>(initialFiles);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showSlidePanel, setShowSlidePanel] = useState(false);
    const [description, setDescription] = useState(data.description || "");

    const handleSubmit = async () => {
        if (files.length === 0) {
            alert("파일을 먼저 업로드 해주세요.");
            return;
        }
        const url = `/class/${data.classId}/${data.homeworkId}/upload/`;
        try {
            await fetch(url);
            setSubmitted(true);
            alert("과제가 제출되었습니다.");
            setShowUploadModal(false);
        } catch (error) {
            alert("제출에 실패했습니다.");
            console.error(error);
        }
    };

    const handleFileRemove = (id: string) => {
        setFiles(files.filter((file) => file.id !== id));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles || selectedFiles.length === 0) return;

        const uploadedFiles: FileInfo[] = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const f = selectedFiles[i];
            const formData = new FormData();
            formData.append("file", f);
            try {
                await fetch(`/class/${data.classId}/${data.homeworkId}/upload`, {
                    method: "POST",
                    body: formData,
                });
                uploadedFiles.push({
                    id: crypto.randomUUID(),
                    name: f.name,
                    size: `${(f.size / 1024).toFixed(1)} KB`,
                });
            } catch (error) {
                alert(`${f.name} 파일 업로드 실패`);
                console.error(error);
            }
        }
        if (uploadedFiles.length > 0) {
            setFiles((prev) => [...prev, ...uploadedFiles]);
            alert("파일이 업로드 되었습니다.");
            setShowUploadModal(false);
        }
    };

    const handleResubmitClick = () => {
        setSubmitted(false);
    };

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest("button")) return;
        setShowSlidePanel(true);
    };

    const statusClass =
        data.status === "제출됨" ? (
            <S.StatusSubmitted>{data.status}</S.StatusSubmitted>
        ) : (
            <S.StatusNotSubmitted>{data.status}</S.StatusNotSubmitted>
        );

    const onFileInfoClick = (file: FileInfo) => {
        if (!submitted) {
            alert(`파일명: ${file.name}\n파일 크기: ${file.size}`);
        }
    };

    // description 수정 시 서버에 저장 요청하는 함수 예시
    const updateAssignmentDescription = async (newDesc: string) => {
        try {
            await fetch(`/class/${classId}/${data.homeworkId}/updateDescription`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: newDesc }),
            });
            alert("설명이 업데이트 되었습니다.");
        } catch (error) {
            alert("설명 업데이트 실패");
            console.error(error);
        }
    };

    return (
        <>
            <S.ClickableCard onClick={handleCardClick}>
                <S.Header>
                    <S.Title>{data.title}</S.Title>
                    {statusClass}
                </S.Header>

                <S.InfoSection>
                    <S.InfoItem>
                        <IoCalendarClearOutline /> 마감일: {data.deadline}
                    </S.InfoItem>
                    <S.InfoItem>
                        <LuClock4 />
                        <span className={data.timeLeftColor}>{data.timeLeft}</span>
                    </S.InfoItem>
                </S.InfoSection>

                {files.length > 0 && (
                    <S.FileSection>
                        {files.map((file) => (
                            <S.FileItem
                                key={file.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileInfoClick(file);
                                }}
                            >
                                <S.FileInfo>
                                    <FaRegFile />
                                    <div>
                                        <S.FileName>{file.name}</S.FileName>
                                        <S.FileSize>{file.size}</S.FileSize>
                                    </div>
                                </S.FileInfo>
                                {!submitted && (
                                    <S.RemoveButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFileRemove(file.id);
                                        }}
                                    >
                                        <FaXmark />
                                    </S.RemoveButton>
                                )}
                            </S.FileItem>
                        ))}
                    </S.FileSection>
                )}

                {!submitted && (
                    <S.UploadButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowUploadModal(true);
                        }}
                    >
                        <MdUpload /> 파일 업로드
                    </S.UploadButton>
                )}

                <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                    {submitted ? (
                        <S.ResubmitButton
                            onClick={(e) => {
                                e.stopPropagation();
                                handleResubmitClick();
                            }}
                        >
                            <MdOutlineFileDownload /> 다시 제출
                        </S.ResubmitButton>
                    ) : (
                        <S.SubmitButton
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSubmit();
                            }}
                        >
                            <MdOutlineFileDownload /> 제출
                        </S.SubmitButton>
                    )}
                    <S.SubmitButton
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onCheck) onCheck();
                        }}
                    >
                        채점하기
                    </S.SubmitButton>
                </div>

                {showUploadModal && (
                    <S.ModalOverlay onClick={() => setShowUploadModal(false)}>
                        <S.ModalContent onClick={(e) => e.stopPropagation()}>
                            <S.Title>파일 업로드</S.Title>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                style={{ marginTop: "1rem" }}
                            />
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                                <S.ResubmitButton onClick={() => setShowUploadModal(false)}>취소</S.ResubmitButton>
                            </div>
                        </S.ModalContent>
                    </S.ModalOverlay>
                )}
            </S.ClickableCard>

            <SlidePanel
                isOpen={showSlidePanel}
                onClose={() => setShowSlidePanel(false)}
                title={data.title}
                status={data.status}
                deadline={data.deadline}
                timeLeft={data.timeLeft}
                description={description}
                teacherFiles={
                    data.hasFile
                        ? [{ id: crypto.randomUUID(), name: data.fileName!, size: data.fileSize! }]
                        : []
                }
                isTeacher={true}
                studentFiles={files}
                submitted={submitted}
                onSubmit={handleSubmit}
                onResubmit={handleResubmitClick}
                onFileRemove={handleFileRemove}
                onFileUpload={handleFileUpload}
                onDescriptionUpdate={(newDesc) => {
                    setDescription(newDesc);
                    updateAssignmentDescription(newDesc);
                }}
            />
        </>
    );
}