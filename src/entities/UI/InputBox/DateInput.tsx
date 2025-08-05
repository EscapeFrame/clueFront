import * as s from './styles';
import { theme } from '@/shared/theme/theme.styles';

export interface DateInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string; 
  required?: boolean; 
}

export default function DateInput({
  label,value,onChange,id,required,
}: DateInputProps) {
  return (
    <s.Wrapper>
      <s.Label htmlFor={id}>
        {label} {required && <span style={{ color: theme.colors.blue[500] }}>*</span>}
      </s.Label>
      <s.InputWrapper>
        <s.Input
          type="date" id={id} value={value} onChange={onChange} required={required}
        />
      </s.InputWrapper>
    </s.Wrapper>
  );
}