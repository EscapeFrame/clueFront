import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./styles";

import { Modal } from "@/entities/UI/Modal";
import Button from "@/entities/UI/Button";
import DateInput from "@/entities/UI/InputBox/DateInput";
import InputBox from "@/entities/UI/InputBox/Input";
import AttachmentBox from "@/entities/UI/Attachment";
import { SendMakeTask, attachFile } from "./api";

interface Attachment {
  type: "file" | "link";
  name: string;
  url?: string;
  file?: File;
}

interface Task {
  classId: string;
  title: string;
  content: string;
  start_date: string;
  end_date: string;
}

const MakeTask = () => {
  const { classRoomId } = useParams<{ classRoomId?: string }>();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [dueDate, setDueDate] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkPlatform, setLinkPlatform] = useState<"drive" | "youtube" | "notion" | "link" | null>(null);
  const [linkInput, setLinkInput] = useState("");

  const isFormValid = subject && dueDate && classRoomId;

  // 파일 선택
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected) {
      const newAttachments: Attachment[] = Array.from(selected).map(file => ({
        type: "file",
        name: file.name,
        file,
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
      setIsFileModalOpen(false);
    }
  };

  // 링크 등록
  const handleLinkSubmit = () => {
    if (!linkInput) return;
    setAttachments(prev => [
      ...prev,
      { type: "link", name: linkInput, url: linkInput }
    ]);
    setLinkInput("");
    setLinkPlatform(null);
    setIsLinkModalOpen(false);
  };

  // 과제 생성
  const handleMakeTask = async () => {
    if (!classRoomId) {
      alert("classRoomId가 없습니다.");
      return;
    }

    const taskData: Task = {
      classId: classRoomId, // UUID 그대로 전달
      title: subject,
      content: description,
      start_date: startDate,
      end_date: dueDate,
    };

    try {
      console.log("과제 생성 API 호출 중...", taskData);
      const assignmentId = await SendMakeTask(taskData);
      console.log("과제 생성 성공, assignmentId:", assignmentId);

      if (attachments.length > 0) {
        console.log("첨부파일 업로드 중...", attachments);
        await attachFile(assignmentId, attachments);
      }

      alert("과제 생성 완료!");
      navigate(-1);
    } catch (error: unknown) {
      console.error("과제 생성 실패:", error);
      const msg = error instanceof Error ? error.message : "알 수 없는 오류";
      alert("과제 생성에 실패했습니다: " + msg);
    }
  };

  return (
    <S.Container>
      <S.HeaderRow>
        <S.Title>과제 만들기</S.Title>
        <Button text="채점표 생성" width="200px" onClick={() => navigate("/class/make/score")} />
      </S.HeaderRow>

      <InputBox
        label="과제 이름"
        id="subject"
        required
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <InputBox
        label="안내사항"
        id="description"
        required={false}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <AttachmentBox
        attachments={attachments}
        setAttachments={setAttachments}
        openUploadModal={() => setIsFileModalOpen(true)}
        openLinkModal={(platform) => {
          setLinkPlatform(platform);
          setIsLinkModalOpen(true);
        }}
      />

      <DateInput
        label="시작일 입력"
        id="start"
        value={startDate}
        required={false}
        onChange={e => setStartDate(e.target.value)}
      />
      <DateInput
        label="마감일 입력"
        id="end"
        value={dueDate}
        required
        onChange={e => setDueDate(e.target.value)}
      />

      <Button
        text="완료"
        disabled={!isFormValid}
        onClick={handleMakeTask}
      />

      {isFileModalOpen && (
        <Modal
          title="파일 첨부"
          notes="file"
          onClose={() => setIsFileModalOpen(false)}
          buttons={[{ text: "닫기", type: 1, onClick: () => setIsFileModalOpen(false) }]}
        >
          <div>
            <input type="file" multiple onChange={handleFileSelect} style={{ marginBottom: "1rem" }} />
            <p>파일을 선택하면 자동으로 추가됩니다.</p>
          </div>
        </Modal>
      )}

      {isLinkModalOpen && (
        <Modal
          title={`${linkPlatform?.toUpperCase()} 링크 첨부`}
          notes="input"
          onClose={() => {
            setIsLinkModalOpen(false);
            setLinkPlatform(null);
            setLinkInput("");
          }}
          buttons={[
            { text: "등록", type: 0, onClick: handleLinkSubmit },
            { text: "닫기", type: 1, onClick: () => {
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