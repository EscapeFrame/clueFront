import Customapi from "@/shared/config/api";

// 슬라이드 생성
export async function createSlide(accessToken: string) {
  try {
    const response = await Customapi.post(`/api/slides`, { accessToken });

    if (response.status !== 200) {
      return response.status;
    }

    return response.data;
  } catch (error) {
    console.error("슬라이드 생성 실패:", error);
    throw error;
  }
}