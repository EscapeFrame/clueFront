import Customapi from "@/shared/config/api";

// <--MakeTask-->
// MakeTask 만들기 api

interface Attachment {
    type: "file" | "link";
    name: string;
    url?: string;
    file?: File;
}

interface Task {
    classId: number;
    title: string;
    content: string;
    start_date: string;
    end_date: string;
  }

export async function SendMakeTask({classId, title, content, start_date, end_date}:Task) {
    try {
        const response = await Customapi.post(`/api/assignments`, {
            class_id: classId,
            title: title,
            content: content,
            start_date: start_date,
            end_date: end_date
        });
        if (response.status !== 200) {
            return response.status;
        }

        const assignmentId = response.data.assignment_id;
        return assignmentId;
    } catch (error) {
        console.error('MakeTask 실패:', error);
        throw error;
    }
}

export async function attachFile(assignmentId: string, attachments: Attachment[]) {
    try {
        // 파일과 링크 분리
        const files = attachments.filter(att => att.type === "file" && att.file);
        const links = attachments.filter(att => att.type === "link" && att.url);
        
        // 파일 업로드
        for (const fileAtt of files) { //여러개가 들어와도 처리
            if (fileAtt.file) {
                const formData = new FormData();
                formData.append('file', fileAtt.file);
                formData.append('name', fileAtt.name);
                
                await Customapi.post(`/api/assignments/${assignmentId}/files`, formData);
            }
        }
        
        if (links.length > 0) {
            await Customapi.post(`/api/assignments/${assignmentId}/links`, {
                links: links.map(link => ({ name: link.name, url: link.url })) // 여러개가 들어와도 처리
            });
        }
        
        return true;
    } catch (error) {
        console.error('첨부파일 업로드 실패:', error);
        throw error;
    }
}