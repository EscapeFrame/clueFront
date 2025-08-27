import Customapi from "@/shared/config/api";
import { ClassCreateRequest, ClassResponse } from '@/shared/types/class/class';

// <--Class-->
// 과제 제출 API
export async function SubmitAssignment(assignmentId: string, file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await Customapi.post(`/api/assignments/submit/${assignmentId}`, formData);
        if (response.status !== 200) {
            return response.status;
        }
        return response.data;
    } catch (error) {
        console.error('과제 제출 실패:', error);
        throw error;
    }
}

// 과제 제출 취소 API
export async function DeleteAssignment(assignmentId: string) {
    try {
        const response = await Customapi.delete(`/api/assignments/submit/${assignmentId}`);
        if (response.status !== 200) {
            return response.status;
        }
        return response.data;
    } catch(error) {
        console.error('과제 제출 취소 실패:', error);
        throw error
    }
}

//<--ClassInfo-->
// 클래스 정보 조회 API
export async function getClassInfo(classroomId: string) {
    try {
        const response = await Customapi.get(`/api/classroom/${classroomId}/info`);
        if (response.status !== 200) {
            return response.status;
        }
        return response.data;
    } catch (error) {
        console.error('클래스 정보 조회 실패:', error);
        throw error;
    }
}

//<--MyClass-->
// 내 학습실 목록 조회
export const getMyClasses = async (): Promise<ClassResponse[]> => {
  const res = await Customapi.get('/api/class');
  return Array.isArray(res.data) ? res.data : [];
};

// 학습실 상세 조회
export const getClassById = async (classId: number): Promise<ClassResponse> => {
  const res = await Customapi.get(`/api/class/${classId}`);
  return res.data;
};

// 학습실 생성
export const createClass = async (data: ClassCreateRequest): Promise<ClassResponse> => {
  const res = await Customapi.post('/api/class', data);
  return res.data;
};

// 학습실 수정 (일부 필드만 보낼 수 있음)
export const updateClass = async (
  classId: number,
  data: Partial<ClassCreateRequest>
): Promise<ClassResponse> => {
  const res = await Customapi.patch(`/api/class/${classId}`, data);
  return res.data;
};

// 학습실 삭제
export const deleteClass = async (classId: number): Promise<void> => {
  await Customapi.delete(`/api/class/${classId}`);
};