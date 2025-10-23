import { atom } from 'recoil';

export interface UserState {
    username: string;
    userId: string;
    role: 'STUDENT' | 'TEACHER' | '';
}

// export const userState = atom({
//     key: 'userState',
//     default: {
//         username: '',
//         userId: '',
//         role: '',
//     },
// });

// // 개발시 활성화
export const userState = atom({
    key: 'userState',
    default: {
        username: '공덕현',
        userId: '2201',
        role: 'TEACHER',
    },
});