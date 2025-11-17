import { atom } from 'recoil';

export interface UserState {
    username: string;
    userId: string;
    email: string;
    role: 'STUDENT' | 'TEACHER' | '';
    classCode: number | string;
    grade: number;
    classNo: number;
    number: number;
    description: string;
    myImage: string | null;
}

export const userState = atom<UserState>({
    key: 'userState',
    default: {
        username: '',
        userId: '',
        email: '',
        role: '',
        classCode: 0,
        grade: 0,
        classNo: 0,
        number: 0,
        description: '',
        myImage: null,
    },
});

// 개발시 활성화
// export const userState = atom({
//    key: 'userState',
//    default: {
//        username: '공덕현',
//        userId: '2201',
//        role: 'TEACHER',
//        classCode: 0,
//    },
// });