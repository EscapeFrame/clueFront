import { useEffect, useState, useRef } from "react";
import {
  Directory,
  fetchDirectories,
  createDirectory,
} from "@/entities/Make/api/useLesson";
import { DirectoryCreateRequest } from "@/shared/types/Class/directory";

export const useDirectories = (classRoomId: number) => {
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [selectedDir, setSelectedDir] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadSeq = useRef(0);

  const loadDirectories = async () => {
    const seq = ++loadSeq.current;
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchDirectories(classRoomId);
      if (seq !== loadSeq.current) return;
      const sorted = [...data].sort(
        (a, b) => (a.directoryOrder ?? 0) - (b.directoryOrder ?? 0),
      );
      setDirectories(sorted);
      setSelectedDir((prev) =>
        prev != null && sorted.some((d) => d.id === prev)
          ? prev
          : sorted[0]?.id ?? null,
      );
    } catch {
      if (seq === loadSeq.current) setError("디렉토리 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      if (seq === loadSeq.current) setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDirectories();
  }, [classRoomId]);

  const addDirectory = async (name: string) => {
    try {
      const request: DirectoryCreateRequest = {
        classRoomId,
        directoryOrder: directories.length + 1,
        name,
      };
      const newDir = await createDirectory(request);
      setDirectories((prev) => [...prev, newDir]);
      setSelectedDir(newDir.id);
      setIsAdding(false);
    } catch {
      setError("새 디렉토리를 추가하는 중 오류가 발생했습니다.");
    }
  };

  return {
    directories,
    selectedDir,
    setSelectedDir,
    isAdding,
    setIsAdding,
    addDirectory,
    isLoading,
    error,
    reload: loadDirectories,
  };
};
