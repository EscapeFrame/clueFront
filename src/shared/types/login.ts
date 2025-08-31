import { atom } from 'recoil';

export interface UserState {
    name: string;
    email: string;
    picture: string;
  }

export const userState = atom({
    key: 'userState',
    default: {
        username: '',
        userId: '',
        role: '',
    },
});