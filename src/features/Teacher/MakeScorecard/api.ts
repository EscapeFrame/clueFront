import Customapi from "@/shared/config/api";

export async function saveScorecard(payload: any) {
  try {
    const res = await Customapi.post("/api/", payload);
    return res;
  } catch (err) {
    console.error("채점기준표 저장 실패:", err);
    throw err;
  }
}