import { blue } from '@/shared/styles/theme.styles';
import * as S from './styles';

type InputBoxProps = {
  label: string;
  id: string;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputBox({ label, id, value = '', required = true, onChange }: InputBoxProps) {
  return (
    <S.Wrapper>
      <S.Label htmlFor={id}>
        {label} {required && <span style={{ color: blue[500] }}>*</span>}
      </S.Label>
      <S.Input
        id={id}
        name={id}
        type="text"
        placeholder={`${label}을 입력해주세요`}
        value={value}
        required={required}
        onChange={onChange}
      />
    </S.Wrapper>
  );
}