import { useEffect } from "react";
import { useGoogleSlides } from "@/entities/Make/hooks/useSlide";

interface GoogleSlideProps {
  user: { role: "teacher" | "student"; email: string };
  accessToken: string; // 백엔드에서 받은 토큰
}

const GoogleSlide: React.FC<GoogleSlideProps> = ({ user, accessToken }) => {
  const { handleLoginSuccess } = useGoogleSlides(user);

  useEffect(() => {
    if (accessToken) {
      handleLoginSuccess(accessToken);
    }
  }, [accessToken, handleLoginSuccess]);

  return <div>구글 슬라이드 연결 완료</div>;
};

export default GoogleSlide;