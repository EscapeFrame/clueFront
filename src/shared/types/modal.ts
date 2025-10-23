export interface ButtonData {
  text: string;
  width?: string | number;
  type?: 0 | 1 | 2 | 3; // 0: primary, 1: light4, 2: line, 3: gray3
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean; // 활성화: false, 비활성화: true
}

export interface ModalProps {
  title: string;
  notes?: 'default' | 'input' | 'file' | 'url';
  children?: React.ReactNode;
  onClose: () => void;
  isWarning?: boolean;
  buttons: ButtonData[];
  onFileUpload?: (files: FileList | null) => void;
  placeholder?: string;
  inputValue?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}