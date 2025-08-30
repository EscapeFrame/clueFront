import { atom } from 'recoil';

export interface UserState {
  name: string;
  email: string;
  picture: string;
}

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    name: '',
    email: '',
    picture: '',
  },
});