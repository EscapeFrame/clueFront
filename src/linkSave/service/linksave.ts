import Customapi from '@/shared/config/api';
import { LinkCard, LinkFormData } from '../types/card';

// 1. 모든 링크 조회 (카테고리 무관)
export const fetchAllLinks = async (): Promise<LinkCard[]> => {
    const response = await Customapi.get('/linksave');
    return response.data;
};

// 2. 특정 링크 조회
export const fetchLinks = async (link_id: string): Promise<LinkCard[]> => {
    const response = await Customapi.get(`/linksave/${link_id}`);
    return response.data;
};

// 3. 링크 추가
export const addLink = async (linkData: LinkFormData): Promise<LinkCard> => {
    const response = await Customapi.post('/linksave', linkData);
    return response.data;
};

// 4. 링크 수정
export const updateLink = async ({ link_id, linkData }: { link_id: string, linkData: Partial<LinkFormData> }): Promise<LinkCard> => {
    const response = await Customapi.patch(`/linksave/${link_id}`, linkData);
    return response.data;
};

// 5. 링크 삭제
export const deleteLink = async (link_id: string): Promise<void> => {
    await Customapi.delete(`/linksave/${link_id}`);
};
