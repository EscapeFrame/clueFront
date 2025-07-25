import { atom } from 'recoil';

export const studentNameState = atom<string>({
  key: 'studentNameState',
  default: '',
});