import { atom } from 'recoil';

export interface UserState {
    username: string;
    userId: string;
    role: 'STUDENT' | 'TEACHER' | '';
    classCode: number | string;
}

export const userState = atom<UserState>({
    key: 'userState',
    default: {
        username: '',
        userId: '',
        role: '',
        classCode: 0,
    },
});

// // 개발시 활성화
// export const userState = atom({
//     key: 'userState',
//     default: {
//         username: '공덕현',
//         userId: '2201',
//         role: 'TEACHER',
//     },
// });