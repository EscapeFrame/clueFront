import { atom } from 'recoil';
import { Subjects } from '@/features/Main_component/Schedule/TimeTable';

export const scheduleState = atom<Subjects | null>({
  key: 'scheduleState',
  default: null,
});

export const studentNameState = atom<string>({
  key: 'studentNameState',
  default: '',
});