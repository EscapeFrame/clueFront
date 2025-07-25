import * as S from './styles';
import ToggleSwitch from '@/entities/UI/ToggleSwitch/index';

type ClassroomSetupProps = {
  data: {
    isActivated: boolean;
    isChatEnabled: boolean;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      isActivated: boolean;
      isChatEnabled: boolean;
    }>
  >;
};

export default function ClassroomSetup({ data, setData }: ClassroomSetupProps) {
  return (
    <S.Container>
      <S.Title>학습실 설정</S.Title>
      <S.SubTitle>학습실의 기능과 접근 권한을 설정합니다</S.SubTitle>

      <S.Section>
        <S.Row>
          <S.FunctionTitle>학습실 활성화</S.FunctionTitle>
          <ToggleSwitch
            id="activation"
            checked={data.isActivated}
            onChange={checked => setData(prev => ({ ...prev, isActivated: checked }))}
          />
        </S.Row>
        <S.Description>학습실을 활성화하면 학생들이 접근할 수 있습니다.</S.Description>
      </S.Section>

      <S.Section>
        <S.Row>
          <S.FunctionTitle>채팅 허용</S.FunctionTitle>
          <ToggleSwitch
            id="chat"
            checked={data.isChatEnabled}
            onChange={checked => setData(prev => ({ ...prev, isChatEnabled: checked }))}
          />
        </S.Row>
        <S.Description>학생들이 학습실 내에서 채팅할 수 있도록 허용합니다.</S.Description>
      </S.Section>
    </S.Container>
  );
}