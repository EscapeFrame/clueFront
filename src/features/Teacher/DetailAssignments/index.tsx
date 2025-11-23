import * as s from './styles';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { MdLink, MdOutlineFileUpload } from "react-icons/md";
import { FaRegFile, FaXmark } from 'react-icons/fa6';
import { stateData } from './data';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Assignment, AssignmentAttachment, AssignmentFileType } from '@/shared/types/Class/Assignment/Attachment';
import DateInput from '@/entities/UI/InputBox/DateInput';
import { Modal } from '@/entities/UI/Modal';
import Button from '@/entities/UI/Button';
import { AssignmentEntry } from '@/entities/Class/AssignmentEntry';
import dayjs from 'dayjs';
import { AssignmentsApi } from '@/features/Common/Class/api/useAssignment';

interface UploadedFile {
    id: string;
    name: string;
    size: string;
    file?: File;
}

export const DetailAssignment: React.FC<{ assignmentId: string; onBack: () => void }> = ({ assignmentId, onBack }) => {
    const [assignment, setAssignment] = useState<(Assignment & { submittedCount: number; totalCount: number, files: AssignmentFileType[], links: AssignmentAttachment[] }) | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editEndDate, setEditEndDate] = useState('');
    const [showFileModal, setShowFileModal] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [tempFiles, setTempFiles] = useState<UploadedFile[]>([]);
    const [linkUrl, setLinkUrl] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const today = dayjs().format('YYYY-MM-DD');

    // 공통으로 사용할 과제 조회 함수
    const fetchAndSetAssignment = useCallback(async () => {
        setLoading(true);
        try {
            const responseData = await AssignmentsApi.getById(assignmentId);
            if (responseData) {
                const mappedData: Assignment & { submittedCount: number; totalCount: number, files: AssignmentFileType[], links: AssignmentAttachment[] } = {
                    assignmentId: responseData.assignmentId,
                    title: responseData.title,
                    content: responseData.content,
                    description: responseData.content,
                    deadline: responseData.endDate,
                    endDate: responseData.endDate,
                    files: responseData.attachmentDtos.filter(att => att.type === 'FILE').map(att => ({ fileId: att.assignmentAttachmentId, fileName: att.originalFileName || 'unknown', fileSize: att.size ?? 0 })),
                    links: responseData.attachmentDtos.filter(att => att.type === 'LINK' || att.type === 'URL'),
                    isSubmitted: false,
                    submissionDate: null,
                    submittedCount: (responseData as unknown as { submittedCount?: number }).submittedCount || 0,
                    totalCount: (responseData as unknown as { totalCount?: number }).totalCount || 0,
                };

                setAssignment(mappedData);
                setEditTitle(mappedData.title);
                setEditDescription(mappedData.description);
                setEditEndDate(dayjs(mappedData.endDate).format('YYYY-MM-DD'));
                setError(null);
            } else {
                setError('과제 정보를 불러오지 못했습니다.');
            }
        } catch (err) {
            setError('과제 정보를 불러오는 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [assignmentId]);

    useEffect(() => {
        fetchAndSetAssignment();
    }, [fetchAndSetAssignment]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        if (assignment) {
            try {
                const assignmentRecord = assignment as unknown as Record<string, unknown>;
                const startSource: string | null = (assignmentRecord['startDate'] as string) ?? (assignmentRecord['start_date'] as string) ?? (assignmentRecord['duringDate'] as string) ?? null;
                const startIso = startSource ? dayjs(startSource).toISOString().slice(0, 16) : dayjs().toISOString().slice(0, 16);

                const updatedAssignment = await AssignmentsApi.update(assignment.assignmentId, {
                    title: editTitle,
                    content: editDescription,
                    start_date: startIso,
                    end_date: dayjs(editEndDate).toISOString().slice(0, 16),
                });

                if (updatedAssignment) {
                    // 업데이트에 성공하면 최신 데이터를 다시 불러와 상태를 완전히 동기화
                    await fetchAndSetAssignment();
                    alert('과제가 성공적으로 수정되었습니다.');
                } else {
                    alert('과제 수정에 실패했습니다.');
                }
            } catch (error) {
                console.error('과제 수정 중 오류 발생:', error);
                alert('과제 수정 중 오류가 발생했습니다.');
            }
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        if (assignment) {
            setEditTitle(assignment.title);
            setEditDescription(assignment.description);
            setEditEndDate(dayjs(assignment.endDate).format('YYYY-MM-DD'));
        }
        setIsEditing(false);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;

        const newFiles: UploadedFile[] = [];
        for (const file of Array.from(files)) {
            newFiles.push({
                id: crypto.randomUUID(),
                name: file.name,
                size: `${(file.size / 1024).toFixed(1)} KB`,
                file,
            });
        }

        if (newFiles.length) {
            setTempFiles(prev => [...prev, ...newFiles]);
        }
    };

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
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileUpload({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const handleFileModalClose = () => {
        setTempFiles([]);
        setShowFileModal(false);
    };

    const handleFileModalComplete = () => {
        (async () => {
            if (!assignment || tempFiles.length === 0) {
                setTempFiles([]);
                setShowFileModal(false);
                return;
            }

            // 실제 파일 객체만 추출
            const filesToUpload = tempFiles.map(tf => tf.file).filter((f): f is File => f !== undefined && f !== null);

            if (filesToUpload.length === 0) {
                setTempFiles([]);
                setShowFileModal(false);
                return;
            }

            try {
                const res = await AssignmentsApi.fileUpload(assignment.assignmentId, filesToUpload);
                if (res) {
                    // 업로드가 성공하면 assignment를 다시 불러와 최신 파일 리스트 반영
                    const refreshed = await AssignmentsApi.getById(String(assignment.assignmentId));
                    if (refreshed) {
                        const mappedFiles = refreshed.attachmentDtos.map(att => ({ fileId: att.value ?? String(Math.random()), fileName: att.originalFileName || 'unknown', fileSize: att.size ?? 0 }));
                        setAssignment({ ...assignment, files: mappedFiles });
                    }
                } else {
                    alert('파일 업로드에 실패했습니다.');
                }
            } catch (error) {
                console.error('파일 업로드 중 오류:', error);
                alert('파일 업로드 중 오류가 발생했습니다.');
            } finally {
                setTempFiles([]);
                setShowFileModal(false);
            }
        })();
    };

    // 링크 추가 처리 함수
    const handleAddLink = async () => {
        if (!linkUrl || linkUrl.trim() === '') {
            alert('링크를 입력해주세요.');
            return;
        }

        // 간단한 URL 형식 검사
        try {
            new URL(linkUrl);
        } catch (e) {
            alert('유효한 URL을 입력해주세요. 예: https://example.com');
            return;
        }

        if (!assignment) {
            alert('과제 정보가 없습니다.');
            setShowLinkModal(false);
            return;
        }

        try {
            const res = await AssignmentsApi.linkUpload(assignment.assignmentId, { url: linkUrl });
            if (res) {
                // 성공적으로 추가되었을 가능성이 있으므로 최신 과제 정보를 다시 불러옵니다.
                await fetchAndSetAssignment();
                setLinkUrl('');
                setShowLinkModal(false);
                alert('링크가 추가되었습니다.');
            } else {
                alert('링크 추가에 실패했습니다.');
            }
        } catch (error) {
            console.error('링크 추가 중 오류:', error);
            alert('링크 추가 중 오류가 발생했습니다.');
        }
    };

    const removeFile = async (fileId: string) => {
        if (window.confirm('정말로 이 파일을 삭제하시겠습니까?')) {
            try {
                await AssignmentsApi.fileDelete(fileId);
                if (assignment) {
                    const updatedFiles = (assignment.files || []).filter(file => (file as AssignmentFileType).fileId !== fileId);
                    setAssignment({ ...assignment, files: updatedFiles });
                }
                alert('파일이 성공적으로 삭제되었습니다.');
            } catch (error) {
                console.error('파일 삭제 실패:', error);
                alert('파일 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    const removeTempFile = (fileId: string) => {
        setTempFiles(prev => prev.filter(f => f.id !== fileId));
    };

    if (loading) return <p>로딩중...</p>;
    if (error) return <p>{error}</p>;
    if (!assignment) return <p>과제 정보를 찾을 수 없습니다.</p>;

    const { title, description, files, links, endDate, submittedCount, totalCount } = assignment;

    const Icon0 = stateData[0].icon;
    const Icon1 = stateData[1].icon; // 제출
    const Icon2 = stateData[2].icon;
    const Icon3 = stateData[3].icon;

    // removed unused assignments state and handleDelete

    return (
        <s.Container>
            <s.Content>
                <s.Button onClick={onBack}><IoReturnUpBackOutline /></s.Button>
                <s.TitleContainer>
                    {isEditing ? (
                        <>
                            <s.EditTitleInput
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                            />
                            <s.EditButtonGroup>
                                <Button text='저장' type={0} width={'90px'} onClick={handleSaveEdit} />
                                <Button text='취소' type={1} width={'90px'} onClick={handleCancelEdit} />
                            </s.EditButtonGroup>
                        </>
                    ) : (
                        <s.Title>{title}&nbsp;<s.Button onClick={handleEdit}><GoPencil /></s.Button></s.Title>
                    )}
                </s.TitleContainer>

                <s.RightArea>
                    <s.State>
                    {isEditing ? (
                        <DateInput
                            label="마감일"
                            id="end-date-edit"
                            value={editEndDate}
                            onChange={(e) => setEditEndDate(e.target.value)}
                            min={today}
                        />
                    ) : (
                        <s.DetailState>
                            <Icon0 />
                            <div className="text-group">
                                <span>{stateData[0].name}</span>
                                <span>{dayjs(endDate).format('YYYY-MM-DD')}</span>
                            </div>
                        </s.DetailState>
                    )}

                    <s.DetailState>
                        <Icon1 />
                        <div className="text-group">
                            <span>{stateData[1].name}</span>
                            <span>{submittedCount}명</span>
                        </div>
                    </s.DetailState>

                    <s.DetailState>
                        <Icon2 />
                        <div className="text-group">
                            <span>{stateData[2].name}</span>
                            <span>{totalCount - submittedCount}명</span>
                        </div>
                    </s.DetailState>

                    <s.DetailState>
                        <Icon3 />
                        <div className="text-group">
                            <span>{stateData[3].name}</span>
                            <span>{totalCount > 0 ? Math.round((submittedCount / totalCount) * 100) : 0}%</span>
                        </div>
                    </s.DetailState>
                </s.State>
                </s.RightArea>
                {/* 삭제 버튼은 관리자 기능으로 추후 구현하세요 */}
            </s.Content>

            <s.SubTitle>상세설명</s.SubTitle>
            {isEditing ? (
                <s.EditTextarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="상세설명을 입력하세요"
                    rows={4}
                />
            ) : (
                <s.Description>{description}</s.Description>
            )}

            <s.FileSection>
                <s.FileSectionHeader>
                    <s.SubTitle>할당파일</s.SubTitle>
                    {isEditing && (
                        <Button text='파일추가' type={0} width={'150px'} onClick={() => setShowFileModal(true)} />
                    )}
                </s.FileSectionHeader>

                {files && files.length > 0 ? (
                    files.map((file, idx) => {
                        return (
                            <s.FileItem
                                key={idx}
                                onClick={async () => {
                                    try {
                                        const res = await AssignmentsApi.download((file as AssignmentFileType).fileId);
                                        if (res && res.blob) {
                                            const url = window.URL.createObjectURL(res.blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = res.filename ?? (file as AssignmentFileType).fileName ?? 'download';
                                            document.body.appendChild(a);
                                            a.click();
                                            a.remove();
                                            window.URL.revokeObjectURL(url);
                                        } else {
                                            alert('파일을 다운로드할 수 없습니다.');
                                        }
                                    } catch (err) {
                                        console.error('다운로드 실패:', err);
                                        alert('다운로드 중 오류가 발생했습니다.');
                                    }
                                }}
                            >
                                <s.FileInfo>
                                    <FaRegFile />
                                    <span>{file.fileName}</span>
                                </s.FileInfo>
                                {isEditing && (
                                    <s.FileRemoveButton onClick={(e) => { e.stopPropagation(); removeFile((file as AssignmentFileType).fileId); }}>
                                        <FaXmark />
                                    </s.FileRemoveButton>
                                )}
                            </s.FileItem>
                        );
                    })
                ) : (
                    <s.EmptyFileMessage>파일이 없습니다</s.EmptyFileMessage>
                )}
            </s.FileSection>

            {showFileModal && (
                <Modal
                    title="파일 추가"
                    onClose={handleFileModalClose}
                    buttons={[
                        { text: '취소', type: 1, onClick: handleFileModalClose },
                        { text: '확인', type: 0, onClick: handleFileModalComplete },
                    ]}
                >
                    <s.ModalContent>
                        <s.FileUploadArea
                            isDragOver={isDragOver}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <s.FileIcon><MdOutlineFileUpload size={60} /></s.FileIcon>
                            <p>{isDragOver ? '여기에 파일을 놓으세요' : '파일을 끌어다 놓거나 클릭하여 업로드하세요.'}</p>
                        </s.FileUploadArea>

                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            accept="*"
                            style={{ display: 'none' }}
                        />

                        <s.TempFileList>
                            {tempFiles.length === 0 ? (
                                <s.EmptyMessage>선택된 파일이 없습니다</s.EmptyMessage>
                            ) : (
                                tempFiles.map((file) => (
                                    <s.TempFileItem key={file.id}>
                                        <s.TempFileInfo>
                                            <FaRegFile />
                                            <span>{file.name}</span>
                                            <s.FileSize>{file.size}</s.FileSize>
                                        </s.TempFileInfo>
                                        <s.TempFileRemove onClick={() => removeTempFile(file.id)}>
                                            <FaXmark />
                                        </s.TempFileRemove>
                                    </s.TempFileItem>
                                ))
                            )}
                        </s.TempFileList>
                    </s.ModalContent>
                </Modal>
            )}
            <s.FileSection>
                <s.FileSectionHeader>
                    <s.SubTitle>할당링크</s.SubTitle>
                    {isEditing && <Button text='링크추가' type={0} width={'150px'} onClick={() => setShowLinkModal(true)} />}
                </s.FileSectionHeader>

                {links && links.length > 0 ? (
                    links.map((link) => (
                        <s.FileItem
                            key={link.assignmentAttachmentId}
                            onClick={() => window.open(link.value, '_blank', 'noopener,noreferrer')}
                        >
                            <s.FileInfo>
                                <MdLink />
                                <span>{link.originalFileName || link.value}</span>
                            </s.FileInfo>
                            {isEditing && (
                                <s.FileRemoveButton onClick={(e) => { e.stopPropagation(); removeFile(link.assignmentAttachmentId); }}>
                                    <FaXmark />
                                </s.FileRemoveButton>
                            )}
                        </s.FileItem>
                    ))
                ) : (
                    <s.EmptyFileMessage>링크가 없습니다</s.EmptyFileMessage>
                )}
            </s.FileSection>

            {showLinkModal && (
                <Modal
                    title="링크 추가"
                    onClose={() => setShowLinkModal(false)}
                    buttons={[
                        { text: '취소', type: 1, onClick: () => setShowLinkModal(false) },
                        { text: '확인', type: 0, onClick: handleAddLink },
                    ]}
                >
                    <s.ModalContent>
                        <s.EditTitleInput
                            type="text"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://example.com"
                        />
                    </s.ModalContent>
                </Modal>
            )}

            <AssignmentEntry assignmentId={assignmentId} totalCount={totalCount} />
        </s.Container>
    );
};