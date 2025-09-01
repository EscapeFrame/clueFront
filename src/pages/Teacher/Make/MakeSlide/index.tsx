import { useAuth } from "@/app/hooks/useAccessToken";
import GoogleSlide from "@/entities/Make/Slides";

export default function MakeSlide() {
  const auth = useAuth(); // 이렇게 하는 거 맞는 지.. 

  // 변환해서 GoogleSlide에 넘김
  const user = {
    role: auth.user.role as "teacher" | "student", // 좁혀주기
    email: auth.user.username,
  };

  return <GoogleSlide user={user} />;
}