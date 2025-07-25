import * as S from './styles';

type ToggleSwitchProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export default function ToggleSwitch({ id, checked, onChange, label }: ToggleSwitchProps) {
  return (
    <S.Wrapper>
      {label && <S.Label htmlFor={id}>{label}</S.Label>}
      <S.Switch>
        <S.Checkbox
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <S.Slider />
      </S.Switch>
    </S.Wrapper>
  );
}