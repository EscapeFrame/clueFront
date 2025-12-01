import { colors } from '@/shared/theme/theme.styles';
import * as S from './styles';

type InputBoxProps = {
  label: string;
  id: string;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  rows?: number;
  height?: string;
};

export default function InputBox({ label, id, value = '', required = true, onChange, multiline = false, rows, height }: InputBoxProps) {
  return (
    <S.Wrapper>
      <S.Label htmlFor={id}>
        {label} {required && <span style={{ color: colors.primary }}>*</span>}
      </S.Label>
      <S.InputWrapper>
        {multiline ? (
          <S.TextArea
            id={id}
            name={id}
            placeholder={`${label}을 입력해주세요`}
            value={value}
            required={required}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange?.(e)}
            rows={rows}
            style={height ? { height } : undefined}
          />
        ) : (
          <S.Input
            id={id}
            name={id}
            type="text"
            placeholder={`${label}을 입력해주세요`}
            value={value}
            required={required}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e)}
          />
        )}
      </S.InputWrapper>
    </S.Wrapper>
  );
}