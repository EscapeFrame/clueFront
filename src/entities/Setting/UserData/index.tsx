import * as S from './styles';
import { useState } from 'react';

interface SetDataProps {
  title : string;
  body : string;
  defaultToggle? : boolean;
}

export function SetData({ title, body, defaultToggle = false }: SetDataProps) {
  const [enabled, setEnabled] = useState<boolean>(defaultToggle);

  return (
    <S.ItemWrapper>
      <S.TextGroup>
        <S.Title>{title}</S.Title>
        <S.Body>{body}</S.Body>
      </S.TextGroup>
      <S.ToggleWrapper>
        <S.ToggleInput
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(prev => !prev)}
          id={title}
        />
        <S.ToggleLabel htmlFor={title} />
      </S.ToggleWrapper>
    </S.ItemWrapper>
  );
}
