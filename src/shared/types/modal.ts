export interface ButtonData {
  text: string;
  type?: 0 | 1;
  width?: string;
  onClick?: () => void;
}

export interface ModalProps {
  title: string;
  notes?: 'default' | 'input' | 'file';
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