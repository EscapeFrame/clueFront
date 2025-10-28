import * as s from './styles';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaRegFile, FaXmark } from 'react-icons/fa6';
import { stateData } from './data';
import { useEffect, useState } from 'react';
import { Assignment } from '@/shared/types/Class/Assignment/Attachment';
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
    const [assignment, setAssignment] = useState<(Assignment & { submittedCount: number; totalCount: number }) | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editEndDate, setEditEndDate] = useState('');
    const [showFileModal, setShowFileModal] = useState(false);
    const [tempFiles, setTempFiles] = useState<UploadedFile[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    let fileInputRef = useState<HTMLInputElement | null>(null)[0];

    const today = dayjs().format('YYYY-MM-DD');

    useEffect(() => {
        const fetchAssignment = async () => {
            setLoading(true);
            try {
                const responseData = await AssignmentsApi.getById(assignmentId);
                if (responseData) {
                    // Map the API response to the component's Assignment type
                    const mappedData: Assignment & { submittedCount: number; totalCount: number } = {
                        assignmentId: responseData.assignmentId,
                        title: responseData.title,
                        content: responseData.content,
                        description: responseData.content, // Map content to description
                        deadline: responseData.endDate,     // Map endDate to deadline
                        endDate: responseData.endDate,
                        files: responseData.attachmentDtos.map(att => att.originalFileName || null), // Map attachments to file names
                        isSubmitted: false, 
                        submissionDate: null,
                        submittedCount: (responseData as any).submittedCount || 0, 
                        totalCount: (responseData as any).totalCount || 0,       
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
        };

        fetchAssignment();
    }, [assignmentId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        if (assignment) {
            try {
                const updatedAssignment = await AssignmentsApi.update(assignment.assignmentId, {
                    title: editTitle,
                    content: editDescription,
                    start_date: dayjs(assignment.duringDate).toISOString().slice(0, 16), // Assuming startDate is duringDate
                    end_date: dayjs(editEndDate).toISOString().slice(0, 16),
                });

                if (updatedAssignment) {
                    setAssignment({
                        ...assignment,
                        title: updatedAssignment.title,
                        description: updatedAssignment.content,
                        endDate: dayjs(updatedAssignment.endDate).format('YYYY-MM-DD'),
                    });
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
        if (assignment && tempFiles.length > 0) {
            const currentFiles = assignment.files || [];
            const updatedFiles = [...currentFiles];

            tempFiles.forEach(tempFile => {
                updatedFiles.push(tempFile.name);
            });

            setAssignment({
                ...assignment,
                files: updatedFiles as typeof assignment.files
            });
        }
        setTempFiles([]);
        setShowFileModal(false);
    };

    const removeFile = (fileIndex: number) => {
        if (assignment && assignment.files) {
            const updatedFiles = assignment.files.filter((_, idx) => idx !== fileIndex);
            setAssignment({
                ...assignment,
                files: updatedFiles as typeof assignment.files
            });
        }
    };

    const removeTempFile = (fileId: string) => {
        setTempFiles(prev => prev.filter(f => f.id !== fileId));
    };

    if (loading) return <p>로딩중...</p>;
    if (error) return <p>{error}</p>;
    if (!assignment) return <p>과제 정보를 찾을 수 없습니다.</p>;

    const { title, description, files, endDate, isSubmitted, submissionDate, submittedCount, totalCount } = assignment;

    const Icon0 = stateData[0].icon;
    const Icon1 = stateData[1].icon;
    const Icon2 = stateData[2].icon;
    const Icon3 = stateData[3].icon;

    return (
        <s.Container>
            <s.Button onClick={onBack}><IoReturnUpBackOutline /></s.Button>

            <s.Content>
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
                        const fileName = typeof file === "string" ? file : file?.fileName ?? "unknown";
                        return (
                            <s.FileItem key={idx}>
                                <s.FileInfo>
                                    <FaRegFile />
                                    <span>{fileName}</span>
                                </s.FileInfo>
                                {isEditing && (
                                    <s.FileRemoveButton onClick={() => removeFile(idx)}>
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
                            onClick={() => fileInputRef?.click()}
                        >
                            <s.FileIcon><MdOutlineFileUpload size={60} /></s.FileIcon>
                            <p>{isDragOver ? '여기에 파일을 놓으세요' : '파일을 끌어다 놓거나 클릭하여 업로드하세요.'}</p>
                        </s.FileUploadArea>

                        <input
                            ref={(el) => { if (el) fileInputRef = el; }}
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
            <AssignmentEntry assignmentId={assignmentId} totalCount={totalCount} />
        </s.Container>
    );
};