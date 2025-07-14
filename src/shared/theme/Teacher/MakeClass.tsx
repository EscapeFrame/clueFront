export type Option = {
  value: string;
  label: string;
};

export const subjectCategoryOptions: Option[] = [
  { value: '0', label: '인문교과' },
  { value: '1', label: '전공교과' },
  { value: '2', label: '방과후' },
];

export const periodOptions: Option[] = [
  { value: '1', label: '1교시' },
  { value: '2', label: '2교시' },
  { value: '3', label: '3교시' },
  { value: '4', label: '4교시' },
  { value: '5', label: '5교시' },
  { value: '6', label: '6교시' },
  { value: '7', label: '7교시' },
];

export const gradeOptions: Option[] = [
  { value: '1', label: '1학년' },
  { value: '2', label: '2학년' },
  { value: '3', label: '3학년' },
];

export const classOptions: Option[] = [
  { value: '1', label: '1반' },
  { value: '2', label: '2반' },
  { value: '3', label: '3반' },
  { value: '4', label: '4반' },
];