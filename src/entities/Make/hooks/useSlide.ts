import { useCallback } from "react";

export const useGoogleSlides = (user: { role: "TEACHER" | "STUDENT"; email: string }) => {
  const handleLoginSuccess = useCallback(
    async (accessToken: string) => {
      try {
        // Drive API로 구글 슬라이드 프레젠테이션 목록 가져오기
        const res = await fetch(
          "https://www.googleapis.com/drive/v3/files?q=mimeType%3D'application%2Fvnd.google-apps.presentation'&fields=files(id,name,modifiedTime,webViewLink)",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Google OAuth 2.0 액세스 토큰 필요(Drive 메타데이터 읽기 스코프)
              Accept: "application/json",
            },
          }
        );
        if (!res.ok) {
          const body = await res.text();
          throw new Error(`Drive API ${res.status}: ${body}`);
        }
        const data = await res.json();
        console.log("Google Slides Data:", data);
        
        // TODO: 백엔드에 데이터 저장 또는 상태에 반영
      } catch (error) {
        console.error("구글 슬라이드 불러오기 실패: ", error);
        throw error;
      }
    },
    [user]
  );

  return { handleLoginSuccess };
};