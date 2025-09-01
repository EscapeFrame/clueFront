import * as s from './styles';

interface ButtonProps {
  text: string;
  width?: string | number;
  type?: 0 | 1; // 0: 기본, 1: 취소
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean; // 활성화: false, 비활성화: true
}

export default function Button({
  text,width = '100%', type = 0,disabled = false, onClick,
}: ButtonProps) {
  const resolvedWidth = typeof width === 'number' ? `${width}px` : width;

  return (
    <s.StyledButton
      width={resolvedWidth}
      variant={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </s.StyledButton>
  );
}