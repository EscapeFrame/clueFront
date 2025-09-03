import { useCallback } from "react";

export const useGoogleSlides = (user: { role: "teacher" | "student"; email: string }) => {
  const handleLoginSuccess = useCallback(
    async (accessToken: string) => {
      try {
        // 바로 구글 Slides API 호출 가능
        const res = await fetch(
          "https://slides.googleapis.com/v1/presentations",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();

        console.log("Google Slides Data:", data);

        // data를 백엔드에 저장하거나 상태에 반영
      } catch (err) {
        console.error("구글 슬라이드 불러오기 실패", err);
      }
    },
    [user]
  );

  return { handleLoginSuccess };
};