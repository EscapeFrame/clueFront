import { useMutation, useQueryClient } from "@tanstack/react-query";
import Customapi from "@/shared/config/api";
import { ClassCreateRequest } from "@/shared/types/Class/classroom";

// 교실 생성 API 함수
const createClass = async (newClass: ClassCreateRequest) => {
  const { data } = await Customapi.post("/api/class", newClass);
  return data;
};

// 교실 참가 API 함수
const joinClass = async (classCode: string) => {
  const { data } = await Customapi.post(`/api/class/join`, { code: classCode });
  return data;
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      // 교실 생성 성공 시 '내 학습실' 목록 캐시를 무효화하여 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
    },
  });
};

export const useJoinClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: joinClass,
    onSuccess: () => {
      // 교실 참가 성공 시 '내 학습실' 목록 캐시를 무효화하여 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
    },
  });
};
