import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./styles";

import { Modal } from "@/entities/UI/Modal";
import Button from "@/entities/UI/Button";
import DateInput from "@/entities/UI/InputBox/DateInput";
import InputBox from "@/entities/UI/InputBox/Input";
import AttachmentBox from "@/entities/UI/Attachment";
import { SendMakeTask, attachFile } from "./api";

// API 첨부파일 인터페이스
interface Attachment {
  type: "file" | "link";
  name: string;
  url?: string;
  file?: File;
}

const MakeTask: React.FC = () => {
  const { classRoomId } = useParams<{ classRoomId?: string }>();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [dueDate, setDueDate] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  // 파일 업로드 모달
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [tempFiles, setTempFiles] = useState<Attachment[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 링크 모달
  const [linkInput, setLinkInput] = useState("");
  const [linkPlatform, setLinkPlatform] = useState<"drive" | "youtube" | "notion" | "link" | null>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const isFormValid = !!subject && !!dueDate && !!classRoomId;

  // 파일 선택
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const newFiles: Attachment[] = Array.from(files).map(f => ({
      type: "file" as const,
      name: f.name,
      file: f,
    }));
    setTempFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragOver(false); };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files?.length) handleFileSelect({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleUploadModalComplete = () => {
    if (!tempFiles.length) return;
    setAttachments(prev => [...prev, ...tempFiles]);
    setTempFiles([]);
    setIsFileModalOpen(false);
  };

  const handleUploadModalClose = () => { setTempFiles([]); setIsFileModalOpen(false); };

  // 링크 등록
  const isValidUrl = (url: string, platform: string | null): boolean => {
    if (!platform) return false;
    try {
      new URL(url);
    } catch {
      return false;
    }
    // Platform-specific checks can be added here if needed
    return true;
  };

  const handleLinkSubmit = () => {
    if (!linkInput) return;
    const url = linkInput.trim();
    if (!url) return;

    if (!isValidUrl(url, linkPlatform)) {
      alert('유효하지 않은 URL입니다.');
      return;
    }

    setAttachments(prev => [
      ...prev,
      { type: "link", name: url, url }
    ]);

    setLinkInput("");
    setLinkPlatform(null);
    setIsLinkModalOpen(false);
  };

  // 과제 생성
  const handleMakeTask = async () => {
    if (!isFormValid) return;

    // 날짜 유효성 검사
    if (startDate && dueDate && startDate > dueDate) {
      alert('시작일이 마감일보다 느립니다.');
      return;
    }

    function formatDateTime(dateStr: string): string {
      return `${dateStr} 00:00`;
    }

    try {
      console.log("과제 생성 API 호출 중...");
      const response = await SendMakeTask({
        classId: classRoomId!,
        title: subject,
        content: description,
        start_date: formatDateTime(startDate),
        end_date: formatDateTime(dueDate),
      });
      
      const assignmentId = response;

      console.log("받은 assignmentId:", assignmentId);
      
      if (!assignmentId) {
        throw new Error("과제 생성 후 ID를 받지 못했습니다.");
      }
      
      console.log("과제 생성 성공, assignmentId:", assignmentId);

      if (attachments.length > 0) {
        console.log("첨부파일 업로드 중...", attachments);
        await attachFile(assignmentId, attachments);
      }

      alert("과제 생성 완료!");
      navigate(-1); // 이전 페이지로 이동

    } catch (error: unknown) {
      console.error("과제 생성 또는 첨부파일 업로드 실패:", error);
      const msg = error instanceof Error ? error.message : "알 수 없는 오류";
      alert("과제 생성에 실패했습니다: " + msg);
    }
  };

  return (
    <S.Container>
      <S.HeaderRow>
        <S.Title>과제 만들기</S.Title>
      </S.HeaderRow>

      <InputBox label="과제 이름" id="subject" required value={subject} onChange={e => setSubject(e.target.value)} />
      <InputBox label="안내사항" id="description" value={description} onChange={e => setDescription(e.target.value)} />

      {/* UI 상태 업데이트 시에는 mapToDomainAttachment 사용X */}
      <AttachmentBox
        attachments={attachments}
        setAttachments={setAttachments}
        openUploadModal={() => setIsFileModalOpen(true)}
        openLinkModal={platform => { setLinkPlatform(platform); setIsLinkModalOpen(true); }}
      />

      <DateInput label="시작일 입력" id="start" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <DateInput label="마감일 입력" id="end" value={dueDate} required onChange={e => setDueDate(e.target.value)} min={startDate} />

      <Button text="완료" disabled={!isFormValid} onClick={handleMakeTask} />

      {/* 파일 업로드 모달 */}
      {isFileModalOpen && (
        <Modal
          title="파일 업로드"
          onClose={handleUploadModalClose}
          buttons={[
            { text: "닫기", type: 1, onClick: handleUploadModalClose },
            { text: "완료", type: 0, onClick: handleUploadModalComplete },
          ]}
        >
          <S.FileUploadArea
            isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {isDragOver ? "여기에 파일을 놓으세요!" : "파일을 끌어다 놓거나 클릭하여 업로드하세요."}
          </S.FileUploadArea>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          {tempFiles.length > 0 && <ul>{tempFiles.map(f => <li key={f.name}>{f.name}</li>)}</ul>}
        </Modal>
      )}

      {/* 링크 등록 Modal */}
      {isLinkModalOpen && (
        <Modal
          title={`${linkPlatform?.toUpperCase()} 링크 첨부`}
          notes="url"
          onClose={() => { setIsLinkModalOpen(false); setLinkPlatform(null); setLinkInput(""); }}
          buttons={[
            { text: "등록", type: 0, onClick: handleLinkSubmit },
            {
              text: "닫기", type: 1, onClick: () => {
                setIsLinkModalOpen(false);
                setLinkPlatform(null);
                setLinkInput("");
              }
            },
          ]}
          placeholder="링크를 입력하세요"
          inputValue={linkInput}
          onInputChange={e => setLinkInput(e.target.value)}
        />
      )}
    </S.Container>
  );
};

export default MakeTask;