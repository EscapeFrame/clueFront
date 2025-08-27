import Customapi from "@/shared/config/api";
import { AssignmentCreateRequest, AssignmentAttachment } from "@/shared/types/class/assignment/assignment";

// 과제 생성 API
export async function SendMakeTask(taskData: AssignmentCreateRequest): Promise<number> {
  try {
    const response = await Customapi.post(`/api/assignments`, taskData);

    if (response.status !== 200) {
      throw new Error(`과제 생성 실패: ${response.status}`);
    }

    return response.data.assignment_id;
  } catch (error) {
    console.error("MakeTask 실패:", error);
    throw error;
  }
}

// 첨부파일 업로드 API
export async function attachFile(assignmentId: number, attachments: AssignmentAttachment[]) {
  try {
    const files = attachments.filter(att => att.type === "file");
    const links = attachments.filter(att => att.type === "link");

    // 파일 업로드
    for (const fileAtt of files) {
      const formData = new FormData();
      formData.append("file", fileAtt.value as unknown as Blob);
      formData.append("name", fileAtt.originalFileName ?? "unknown");

      await Customapi.post(`/api/assignments/${assignmentId}/files`, formData);
    }

    // 링크 업로드
    if (links.length > 0) {
      await Customapi.post(`/api/assignments/${assignmentId}/links`, {
        links: links.map(link => ({ name: link.originalFileName, url: link.value })),
      });
    }

    return true;
  } catch (error) {
    console.error("첨부파일 업로드 실패:", error);
    throw error;
  }
}