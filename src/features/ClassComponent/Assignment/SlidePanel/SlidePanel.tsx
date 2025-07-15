
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
  teacherFiles: FileInfoType[] // 선생님이 할당한 파일
  studentFiles: FileInfoType[] // 학생이 업로드한 파일
  submitted: boolean
  onSubmit: () => void
  onResubmit: () => void
  onFileRemove: (id: string) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SlidePanel: React.FC<SlidePanelProps> = ({
  isOpen, onClose,title,status, deadline, timeLeft,
  description,teacherFiles,studentFiles,submitted,
  onSubmit, onResubmit, onFileRemove, onFileUpload,
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false)

  const handleFileUploadClick = () => {
    setShowUploadModal(true)
  }

  const closeUploadModal = () => {
    setShowUploadModal(false)
  }

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileUpload(e)
    setShowUploadModal(false)
  }

  if (!isOpen) return null

  return (
    <>
      <S.Overlay onClick={onClose} />
      <S.Panel isOpen={isOpen}>
        <S.Header>
        <S.StatusBadge submitted={submitted}>{submitted ? "제출됨" : "미제출"}</S.StatusBadge>
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

          <S.Section>
            <S.SectionTitle>상세설명</S.SectionTitle>
            <S.Description>
              {description}
            </S.Description>
          </S.Section>
          
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

          {/* 학생이 업로드한 파일 섹션 */}
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
                    {!submitted && (
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
          {!submitted && (
            <S.UploadButton onClick={handleFileUploadClick}>
              <MdUpload />
              파일업로드
            </S.UploadButton>
          )}

          {submitted ? (
            <S.ResubmitButton onClick={onResubmit}>
              <MdOutlineFileDownload />
              다시제출하기
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