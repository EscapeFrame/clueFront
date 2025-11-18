import React, { useState } from "react";
import * as s from "./styles";
import { useDirectories } from "@/entities/Make/hooks/useLesson";
import { Directory } from '@/entities/Make/api/useLesson';
import { IoClose } from "react-icons/io5";

interface Props {
  classRoomId: string;
  // onDirectoryAdded에게 새로 생성된 디렉토리 객체를 전달합니다
  onDirectoryAdded?: (newDirectory?: Directory | null) => void;
}

const DirectorySelect: React.FC<Props> = ({ classRoomId, onDirectoryAdded }) => {
  const {
    addDirectory,
    isLoading = false,
    error = null,
  } = useDirectories(classRoomId);

  const [isAdding, setIsAdding] = useState(false); // 로컬 상태로 관리
  const [newDirName, setNewDirName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>{error}</p>;

  const handleAddDirectory = async () => {
    const name = newDirName.trim();
    if (!name || isSubmitting) return;

    setIsSubmitting(true);
    try {
  const created = await addDirectory(name);
  // createDirectory가 Directory 객체를 반환하면 부모에 전달
  setNewDirName("");
  setIsAdding(false);
  onDirectoryAdded?.(created ?? undefined);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelAdd = () => {
    setNewDirName("");
    setIsAdding(false);
  };

  const handleDeleteDirectory = async (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCancelAdd();
  };

  return (
    <>
      {!isAdding && (
        <s.AddButton onClick={() => setIsAdding(true)}>
          + 새 디렉토리 추가
        </s.AddButton>
      )}
      {isAdding && (
        <s.DirectoryContainer>
          <s.DirectoryInput
            type="text"
            value={newDirName}
            onChange={(e) => setNewDirName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isSubmitting) {
                handleAddDirectory();
              } else if (e.key === "Escape") {
                handleCancelAdd();
              }
            }}
            placeholder="디렉토리명을 입력해주세요"
            autoFocus
            disabled={isSubmitting}
          />
          <s.flexer>
            <s.DeleteIcon2 onClick={handleDeleteDirectory}>
            <IoClose size={16} />
            </s.DeleteIcon2>
          </s.flexer>
        </s.DirectoryContainer>
      )}
    </>
  );
};

export default DirectorySelect;