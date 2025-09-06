import React, { useState } from "react";
import * as s from "./styles";
import { useDirectories } from "@/entities/Make/hooks/useLesson";

interface Props {
  classRoomId: string;
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
  <div>
    {directories.map((dir) => (
      <div
        key={dir.id}
        onClick={() => setSelectedDir(dir.id)}
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid #ddd",
          marginBottom: "0.25rem",
          cursor: "pointer",
          background: selectedDir === dir.id ? "#eef" : "#fff"
        }}
      >
        {dir.name}
      </div>
    ))}
    <div
      onClick={() => setIsAdding(true)}
      style={{ color: "blue", cursor: "pointer" }}
    >
      + 새 디렉토리 추가
    </div>
  </div>

  {isAdding && (
    <input
      type="text"
      value={newDirName}
      onChange={(e) => setNewDirName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const name = newDirName.trim();
          if (!name) return;
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