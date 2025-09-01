import { useState } from 'react';
import * as s from '../styles';

interface EditableCellProps {
  value: string;
  onChange: (val: string) => void;
}

export function EditableCell({ value, onChange }: EditableCellProps) {
  const [editing, setEditing] = useState(false);

  return (
    <s.CellBox onClick={() => setEditing(true)}>
      {editing ? (
        <s.TextArea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          autoFocus
        />
      ) : (
        <s.TextBlock>{value || ' '}</s.TextBlock>
      )}
    </s.CellBox>
  );
}