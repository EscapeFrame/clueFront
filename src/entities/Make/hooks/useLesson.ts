import { useEffect, useState, useRef, useCallback } from "react";
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

  const loadDirectories = useCallback(async () => {
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
      if (seq === loadSeq.current)
        setError("디렉토리 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      if (seq === loadSeq.current) setIsLoading(false);
    }
  }, [classRoomId]);

  useEffect(() => {
    loadDirectories();
    const currentSeq = loadSeq.current;
    return () => {
      loadSeq.current = currentSeq + 1;
    };
  }, [loadDirectories]);

  const addDirectory = async (name: string) => {
    const trimName = name.trim();
    if (!trimName) {
      setError("디렉토리 이름을 입력해주세요.");
      return;
    }
    setIsAdding(true);
    setError(null);
    try {
      const nextDirectory = directories.length
        ? Math.max(...directories.map((d) => d.directoryOrder)) + 1
        : 1;
      const request: DirectoryCreateRequest = {
        classRoomId,
        directoryOrder: nextDirectory,
        name: trimName,
      };
      const newDir = await createDirectory(request);
      await loadDirectories(); // 서버를 기준으로 동기화
      setSelectedDir(newDir.id);
    } catch {
      setError("새 디렉토리를 추가하는 중 오류가 발생했습니다.");
    } finally {
      setIsAdding(false);
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
