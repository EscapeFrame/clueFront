import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useGoogleSlides } from "@/entities/Make/hooks/useSlide";

const GoogleSlide = ({ user }: { user: { role: "teacher" | "student"; email: string } }) => {
  const { handleLoginSuccess } = useGoogleSlides(user);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("로그인 실패")}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSlide;