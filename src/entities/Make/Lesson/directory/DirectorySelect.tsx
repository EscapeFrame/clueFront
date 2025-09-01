import React, { useState } from "react";
import * as s from "./styles";
import { useDirectories } from "@/entities/Make/hooks/useLesson";

interface Props {
  classRoomId: number;
}

const DirectorySelect: React.FC<Props> = ({ classRoomId }) => {
  const {
    directories,
    selectedDir,
    setSelectedDir,
    isAdding,
    setIsAdding,
    addDirectory,
    isLoading,
    error,
  } = useDirectories(classRoomId);

  const [newDirName, setNewDirName] = useState("");

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <s.SelectBox>
      <select
        value={selectedDir ?? ""}
        onChange={(e) => {
          if (e.target.value === "__add__") {
            setIsAdding(true);
          } else {
            setSelectedDir(Number(e.target.value));
          }
        }}
      >
        {directories.map((dir) => (
          <option key={dir.id} value={dir.id}>
            {dir.name}
          </option>
        ))}
        <option value="__add__">+ 새 디렉토리 추가</option>
      </select>

      {isAdding && (
        <input
          type="text"
          value={newDirName}
          onChange={(e) => setNewDirName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const name = newDirName.trim();
              if(!name) return
              addDirectory(name);
              setNewDirName("");
            }
          }}
          placeholder="디렉토리 이름 입력"
          autoFocus
        />
      )}
    </s.SelectBox>
  );
};

export default DirectorySelect;