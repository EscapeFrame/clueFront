import Customapi from "@/shared/config/api";

// <--MarkDownEditor-->
// MarkDown 제출 api

interface MarkDownSubmission {
  file: File;
  classRoomId: string;
  directoryId: string;
  metadata: string;
}
export async function submitMarkDown(data: MarkDownSubmission) {
  try {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("classRoomId", data.classRoomId);
    formData.append("directoryId", data.directoryId);
    formData.append("metadata", data.metadata);

    const response = await Customapi.post(`/api/document`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("MarkDown 전달 실패:", error);
    throw error;
  }
}
