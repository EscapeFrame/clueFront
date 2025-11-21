import * as s from './styles';
import { theme } from '@/shared/theme/theme.styles';

export interface DateInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string; 
  required?: boolean; 
  min?: string;
  showTime?: boolean;
}

export default function DateInput({
  label,value,onChange,id,required, min
  , showTime = false
}: DateInputProps) {
  return (
    <s.Wrapper>
      <s.Label htmlFor={id}>
        {label} {required && <span style={{ color: theme.colors.blue[500] }}>*</span>}
      </s.Label>
      <s.InputWrapper>
        <s.Input
          type={showTime ? 'datetime-local' : 'date'}
          id={id} value={value} onChange={onChange} required={required} min={min}
        />
      </s.InputWrapper>
    </s.Wrapper>
  );
}