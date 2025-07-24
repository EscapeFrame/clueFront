import { atom } from 'recoil';

export interface Subjects {
  [day: string]: string[];
}

export const scheduleState = atom<Subjects | null>({
  key: 'scheduleState',
  default: null,
});

export const studentNameState = atom<string>({
  key: 'studentNameState',
  default: '',
});