// 유저 권한으로 확인
export interface USERJwtRequest {
    role: 'STU' | 'TCH';
    userId: string;
    username: string;
    [property: string]: any;
}