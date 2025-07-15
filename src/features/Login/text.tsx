import  { useEffect, useState } from "react";

function Oauth2Test() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [isRegistrationMode, setIsRegistrationMode] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    studentId: "",
    role: ""
  });
  const [loadingRegisterInfo, setLoadingRegisterInfo] = useState(true);

  // 1️⃣ 자동 토큰 리프레시
  useEffect(() => {
    if (!accessToken) {
      (async () => {
        try {
          const res = await fetch("http://10.129.57.64:8080/refresh-token", {
            method: "POST",
            credentials: "include",
          });
          if (!res.ok) throw new Error(res.statusText);
          const authHeader = res.headers.get("Authorization");
          if (authHeader) {
            const token = authHeader.split(" ")[1];
            localStorage.setItem("accessToken", token);
            setAccessToken(token);
          }
        } catch (err) {
          console.warn("자동 리프레시 실패:", err);
        }
      })();
    }
  }, [accessToken]);

  // 2️⃣ 세션 기반 첫 사용자 정보 요청
  useEffect(() => {
    if (window.location.pathname === "/register") {
      fetch("http://10.129.57.64:8080/first-register", {
        method: "POST",
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Not first login");
          return res.json();
        })
        .then((data) => {
          setRegisterData({
            username: data.username,
            email: data.email,
            studentId: "",
            role: data.role // ✅ role 포함
          });
          setIsRegistrationMode(true);
        })
        .catch(() => {
          setIsRegistrationMode(false);
        })
        .finally(() => setLoadingRegisterInfo(false));
    } else {
      setLoadingRegisterInfo(false);
    }
  }, []);

  // 3️⃣ 신규 사용자 폼 제출
  const handleRegisterSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const payload = {
        ...registerData,
        studentId: Number(registerData.studentId),
      };
      const res = await fetch("http://10.129.57.64:8080/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(res.statusText);
      alert("회원가입 완료! 메인 페이지로 이동합니다.");
      window.location.href = "/";
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  // 4️⃣ 소셜 로그인 핸들러
  const onNaverLogin = () => {
    window.location.href = "http://10.129.57.64:8080/oauth2/authorization/naver";
  };
  const onGoogleLogin = () => {
    window.location.href = "http://10.129.57.64:8080/oauth2/authorization/google?prompt=login";
  };

  // 5️⃣ 보호된 리소스 호출
  const getData = async () => {
    try {
      const res = await fetch("http://10.129.57.64:8080/my", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
        },
      });
      const text = await res.text();
      alert(`Status: ${res.status}\n\n${text}`);
    } catch (err) {
      console.error("데이터 가져오기 실패:", err);
      alert("데이터 가져오기 실패");
    }
  };

  // 6️⃣ 로그아웃
  const onLogout = async () => {
    try {
      const res = await fetch("http://10.129.57.64:8080/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      });
      if (res.ok) {
        localStorage.removeItem("accessToken");
        setAccessToken(null);
        alert("로그아웃 완료");
        window.location.href = "/";
      } else {
        const text = await res.text();
        console.error("로그아웃 실패:", res.status, text);
        alert("로그아웃 실패");
      }
    } catch (err) {
      console.error("로그아웃 중 오류:", err);
      alert("로그아웃 중 에러 발생");
    }
  };

  // 7️⃣ 수동 토큰 리프레시
  const callRefreshToken = async () => {
    try {
      const res = await fetch("http://10.129.57.64:8080/refresh-token", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) return alert("토큰 재발급 실패: " + res.status);
      const authHeader = res.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        localStorage.setItem("accessToken", token);
        setAccessToken(token);
        alert("토큰 재발급 성공!");
      }
    } catch (err) {
      console.error(err);
      alert("토큰 재발급 중 에러");
    }
  };

  // 렌더링
  if (loadingRegisterInfo) {
    return <p>로딩 중…</p>;
  }

  if (isRegistrationMode) {
    return (
      <div style={{ padding: 20 }}>
        <h2>추가 정보 입력</h2>
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label>이름:</label>
            <input type="text" value={registerData.username} disabled />
          </div>
          <div>
            <label>이메일:</label>
            <input type="email" value={registerData.email} disabled />
          </div>
          <div>
            <label>학번:</label>
            <input
              type="number"
              required
              value={registerData.studentId}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  studentId: e.target.value,
                })
              }
            />
          </div>

          {/* ✅ role 포함 */}
          <input type="hidden" value={registerData.role} />

          <button type="submit">가입 완료</button>
        </form>
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={onNaverLogin}>NAVER LOGIN</button>
        <button onClick={onGoogleLogin}>GOOGLE LOGIN</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={getData}>GET DATA</button>
      <button onClick={onLogout}>LOGOUT</button>
      <button onClick={callRefreshToken}>Refresh Token 요청</button>
    </div>
  );
}

export default Oauth2Test;