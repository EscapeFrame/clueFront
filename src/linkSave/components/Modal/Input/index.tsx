import { LinkFormData } from '@/linkSave/types/card';
import * as S from '../styles';

interface FormInputGroupProps {
  label: string;
  type: string;
  name: keyof LinkFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  isRequired?: boolean;
  isTextarea?: boolean;
}

export const FormInputGroup: React.FC<FormInputGroupProps> = ({ label, type, name, value, onChange, placeholder, isRequired = false, isTextarea = false }) => (
  <>
    <S.FormLabel>
      {label} {isRequired && <span>*</span>}
    </S.FormLabel>
    {isTextarea ? (
      <S.FormTextarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={isRequired}
      />
    ) : (
      <S.FormInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={isRequired}
      />
    )}
  </>
);