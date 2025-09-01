import Customapi from "@/shared/config/api";

// <--MarkDownEditor-->
// MarkDown 제출 api
export async function submitMarkDown(file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await Customapi.post(`/api/class/make/MarkDown`, formData);
        if (response.status !== 200) {
            return response.status;
        }
        return response.data;
    } catch (error) {
        console.error('MarkDown 전달 실패:', error);
        throw error;
    }
}