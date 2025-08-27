import { HiOutlineXMark } from "react-icons/hi2";
import * as s from "../styles";

interface EditableHeaderProps {
  value: string;
  onChange: (val: string) => void;
  onDelete?: () => void;
}

export function EditableHeader({ value, onChange, onDelete }: EditableHeaderProps) {
  return (
    <s.HeaderBox>
      <s.HeaderField value={value} onChange={(e) => onChange(e.target.value)} />
      {onDelete && (
        <s.RemoveButton onClick={onDelete}>
          <HiOutlineXMark size={14} />
        </s.RemoveButton>
      )}
    </s.HeaderBox>
  );
}