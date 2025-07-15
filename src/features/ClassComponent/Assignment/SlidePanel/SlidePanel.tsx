import type React from "react"
import { useState } from "react"
import { IoCalendarClearOutline, IoClose } from "react-icons/io5"
import { LuClock4 } from "react-icons/lu"
import { FaRegFile, FaXmark } from "react-icons/fa6"
import { MdOutlineFileDownload, MdUpload } from "react-icons/md"
import * as S from "./styles"

interface FileInfoType {
  id: string
  name: string
  size: string
}

interface SlidePanelProps {
  isOpen: boolean
  onClose: () => void
  title: string
  status: string
  deadline: string
  timeLeft: string
  description?: string
  teacherFiles: FileInfoType[]
  studentFiles: FileInfoType[]
  submitted: boolean
  isTeacher: boolean
  onSubmit: () => void
  onResubmit: () => void
  onFileRemove: (id: string) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDescriptionUpdate?: (newDesc: string) => void
}

const SlidePanel: React.FC<SlidePanelProps> = ({
  isOpen,
  onClose,
  title,
  status,
  deadline,
  timeLeft,
  description,
  teacherFiles,
  studentFiles,
  submitted,
  isTeacher,
  onSubmit,
  onResubmit,
  onFileRemove,
  onFileUpload,
  onDescriptionUpdate,
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description || "")

  const handleFileUploadClick = () => setShowUploadModal(true)
  const closeUploadModal = () => setShowUploadModal(false)

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileUpload(e)
    setShowUploadModal(false)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setEditedDescription(description || "")
    setIsEditing(false)
  }

  const handleSaveEdit = () => {
    onDescriptionUpdate?.(editedDescription)
    setIsEditing(false)
  }

  if (!isOpen) return null

  const canEditFiles = isTeacher || !submitted

  return (
    <>
      <S.Overlay onClick={onClose} />
      <S.Panel isOpen={isOpen}>
        <S.Header>
          <S.StatusBadge submitted={submitted}>
            {submitted ? "제출됨" : "미제출"}
          </S.StatusBadge>
          <S.CloseButton onClick={onClose}>
            <IoClose />
          </S.CloseButton>
        </S.Header>

        <S.Content>
          <S.Title>{title}</S.Title>

          <S.InfoSection>
            <S.InfoItem>
              <IoCalendarClearOutline />
              <span>마감일: {deadline}</span>
            </S.InfoItem>
            <S.InfoItem>
              <LuClock4 />
              <S.TimeLeft>{timeLeft}</S.TimeLeft>
            </S.InfoItem>
          </S.InfoSection>

          {/* 상세설명 */}
          <S.Section>
            <S.SectionTitle>
              상세설명
              {isTeacher && !isEditing && (
                <S.EditButton onClick={handleEditClick}>수정</S.EditButton>
              )}
            </S.SectionTitle>

            {isEditing ? (
              <>
                <S.TextArea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <S.ModalActions>
                  <S.SubmitButton onClick={handleSaveEdit}>저장</S.SubmitButton>
                  <S.CancelButton onClick={handleCancelEdit}>취소</S.CancelButton>
                </S.ModalActions>
              </>
            ) : (
              <S.Description>{description || "설명이 없습니다."}</S.Description>
            )}
          </S.Section>

          {/* 선생님이 할당한 학습파일 */}
          <S.Section>
            <S.SectionTitle>학습파일</S.SectionTitle>
            {teacherFiles.length > 0 ? (
              <S.FileList>
                {teacherFiles.map((file) => (
                  <S.FileItem key={file.id}>
                    <S.FileInfo>
                      <FaRegFile />
                      <div>
                        <S.FileName>{file.name}</S.FileName>
                        <S.FileSize>{file.size}</S.FileSize>
                      </div>
                    </S.FileInfo>
                  </S.FileItem>
                ))}
              </S.FileList>
            ) : (
              <S.EmptyState>할당된 학습파일이 없습니다.</S.EmptyState>
            )}
          </S.Section>

          {/* 학생이 제출한 파일 */}
          <S.Section>
            <S.SectionTitle>제출한 파일</S.SectionTitle>
            {studentFiles.length > 0 ? (
              <S.FileList>
                {studentFiles.map((file) => (
                  <S.FileItem key={file.id}>
                    <S.FileInfo>
                      <FaRegFile />
                      <div>
                        <S.FileName>{file.name}</S.FileName>
                        <S.FileSize>{file.size}</S.FileSize>
                      </div>
                    </S.FileInfo>
                    {(isTeacher || !submitted) && (
                      <S.RemoveButton onClick={() => onFileRemove(file.id)}>
                        <FaXmark />
                      </S.RemoveButton>
                    )}
                  </S.FileItem>
                ))}
              </S.FileList>
            ) : (
              <S.EmptyState>업로드된 파일이 없습니다.</S.EmptyState>
            )}
          </S.Section>
        </S.Content>

        <S.Footer>
          {(isTeacher || !submitted) && (
            <S.UploadButton onClick={handleFileUploadClick}>
              <MdUpload />
              파일 업로드
            </S.UploadButton>
          )}

          {isTeacher ? (
            <S.SubmitButton onClick={onSubmit}>
              <MdOutlineFileDownload />
              파일 등록
            </S.SubmitButton>
          ) : submitted ? (
            <S.ResubmitButton onClick={onResubmit}>
              <MdOutlineFileDownload />
              다시 제출하기
            </S.ResubmitButton>
          ) : (
            <S.SubmitButton onClick={onSubmit}>
              <MdOutlineFileDownload />
              과제 제출하기
            </S.SubmitButton>
          )}
        </S.Footer>

        {showUploadModal && (
          <S.ModalOverlay onClick={closeUploadModal}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
              <S.ModalTitle>파일 업로드</S.ModalTitle>
              <S.FileInput type="file" multiple onChange={handleFileUploadChange} />
              <S.ModalActions>
                <S.CancelButton onClick={closeUploadModal}>취소</S.CancelButton>
              </S.ModalActions>
            </S.ModalContent>
          </S.ModalOverlay>
        )}
      </S.Panel>
    </>
  )
}

export default SlidePanel