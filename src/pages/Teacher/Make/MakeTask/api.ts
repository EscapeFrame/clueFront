import Customapi from "@/shared/config/api";

// <--MakeTask-->
// MakeTask 만들기 api

interface Attachment {
    type: "file" | "link";
    name: string;
    url?: string;
    file?: File;
}

export const SendMakeTask = async (p: {
    classId: string | number;
    title: string;
    content: string;
    start_date: string; // 'YYYY-MM-DD'
    end_date: string;   // 'YYYY-MM-DD'
}) => {
    const payload = {
        class_id: String(p.classId),
        title: p.title,
        content: p.content,
        start_date: p.start_date,
        end_date: p.end_date,
    };

    const res = await Customapi.post('/api/assignments', payload, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    // 서버 응답 전체 반환 (assignment_id 포함)
    return res.data as {
        assignment_id?: string;
        class_id?: string;
        title?: string;
        content?: string;
        start_date?: string;
        end_date?: string;
    };
};

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

export const attachLink = async (assignmentId: string, link: string) => {

    await Customapi.post(`/api/assignments/${assignmentId}/link`,{
        url: link
    })
};