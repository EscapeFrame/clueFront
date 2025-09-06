import { atom } from 'recoil';

export interface UserState {
    username: string;
    userId: string;
    role: string;
}

export const userState = atom({
    key: 'userState',
    default: {
        username: '',
        userId: '',
        role: '',
    },
});