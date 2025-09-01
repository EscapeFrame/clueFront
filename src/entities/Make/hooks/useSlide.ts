import { useCallback } from "react";
import { createSlide } from "@/entities/Make/api/useSlide";

interface User {
  role: "teacher" | "student";
  email: string;
}

export const useGoogleSlides = (user: User) => {
  const handleLoginSuccess = useCallback(
    async (credentialResponse: any) => {
      if (user.role !== "teacher") return;

      const accessToken = credentialResponse.access_token;
      if (!accessToken) {
        console.error("Access Token 없음");
        return;
      }

      try {
        const data = await createSlide(accessToken);
        console.log("슬라이드 생성 완료:", data.presentationUrl);
        return data.presentationUrl;
      } catch (error) {
        console.error("생성 실패:", error);
        throw error;
      }
    },
    [user]
  );

  return { handleLoginSuccess };
};