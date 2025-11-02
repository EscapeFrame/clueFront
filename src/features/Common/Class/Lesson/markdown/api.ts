import CustomApi from "@/shared/config/api";

interface Directory {
    directoryId: number;
    directoryName: string;
    documentList: Document[];
}

interface Document {
    documentId: number;
    title: string;
}

interface ClassAllResponse {
    directoryList: Directory[];
}

export async function qre(classRoomId: string): Promise<ClassAllResponse> {
    try {
        const response = await CustomApi.get<ClassAllResponse>(`/api/class/${classRoomId}/all`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch class directories and documents:", error);
        return { directoryList: [] };
    }
}