import InputBox from '@/entities/UI/InputBox/Input';
import SelectInputBox from '@/entities/UI/InputBox/SelectInput';
import { subjectCategoryOptions, gradeOptions, classOptions} from './data';
import { BasicInfoProps } from '@/shared/types/Class/classroom';
import * as S from './styles';

export default function BasicInfo({ data, setData }: BasicInfoProps) {

  const validateForm = () => {
    if (!data.subjectCategory) {
      alert('과목분류를 선택해주세요.');
      return false;
    }
    if (!data.grade) {
      alert('학년을 선택해주세요.');
      return false;
    }
    if (!data.classNum) {
      alert('반을 선택해주세요.');
      return false;
    }
    if (!data.roomName || data.roomName.trim() === '') {
      alert('교실 이름을 작성해주세요.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // ✅ 제출 로직 호출 또는 상위 컴포넌트로 알림
      console.log('제출 가능합니다!', data);
      // 예: onSubmit(data);
    }
  };


  return (
    <S.Container>
      <S.Title>기본정보</S.Title>
      <S.SubTitle>학습실의 기본 정보를 설정합니다</S.SubTitle>

      <SelectInputBox
        label="과목분류"
        id="subjectCategorySelect"
        options={subjectCategoryOptions}
        required
        value={data.subjectCategory}
        onChange={e => setData(prev => ({ ...prev, subjectCategory: e.target.value }))}
      />

      <S.GradeClassWrapper>
        <SelectInputBox
          label="학년"
          id="gradeInput"
          options={gradeOptions}
          required
          value={data.grade}
          onChange={e => setData(prev => ({ ...prev, grade: e.target.value }))}
        />
        <SelectInputBox
          label="반"
          id="classInput"
          options={classOptions}
          required
          value={data.classNum}
          onChange={e => setData(prev => ({ ...prev, classNum: e.target.value }))}
        />
      </S.GradeClassWrapper>

      <InputBox
        label="교실 이름"
        id="roomNameInput"
        required
        value={data.roomName}
        onChange={e => setData(prev => ({ ...prev, roomName: e.target.value }))}
      />
      <InputBox
        label="설명"
        id="descriptionInput"
        required={false}
        value={data.description}
        onChange={e => setData(prev => ({ ...prev, description: e.target.value }))}
      />
    </S.Container>
  );
}