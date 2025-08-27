// 학생 권한으로 JWT 발급
export interface STUJwtRequest {
    role: string;
    userId: string;
    username: string;
    [property: string]: any;
}

// 선생 권한으로 JWT 발급
export interface TCHJwtRequest {
    role: string;
    userId: string;
    username: string;
    [property: string]: any;
}

// 테스트
export interface TestRequest {
    role: string;
    userId: number;
    userName: string;
    [property: string]: any;
}