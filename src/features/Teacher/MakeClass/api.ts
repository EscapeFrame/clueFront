import Customapi from "@/shared/config/api";
import { ClassCreateRequest } from "@/shared/types/class/class";

export async function createClass(data: ClassCreateRequest) {
  const res = await Customapi.post("/api/class", data);
  return res.data;
}
