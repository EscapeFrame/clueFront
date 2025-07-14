import * as S from './styles';
import { blue } from '@/shared/styles/theme.styles';

type SelectInputBoxProps = {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectInputBox({
  label,
  id,
  options,
  value = '',
  required = true,
  onChange,
}: SelectInputBoxProps) {
  return (
    <S.Wrapper>
      <S.Label htmlFor={id}>
        {label} {required && <span style={{ color: blue[500] }}>*</span>}
      </S.Label>
      <S.Select id={id} name={id} required={required} value={value} onChange={onChange}>
        <option value="" disabled>
          {label} 선택
        </option>
        {options.map(({ value: v, label: l }) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </S.Select>
    </S.Wrapper>
  );
}