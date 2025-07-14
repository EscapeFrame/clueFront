import React from 'react';
import InputBox from '@/features/MakeClassComponent/InputBox/InputBox';
import SelectInputBox from '@/features/MakeClassComponent/InputBox/SelectInputBox';
import * as S from './styles';
import {
  subjectCategoryOptions, periodOptions,
  gradeOptions, classOptions,
} from '@/shared/theme/Teacher/MakeClass';

type BasicInfoData = {
  subjectCategory: string;
  period: string;
  grade: string;
  classNum: string;
  roomName: string;
  description: string;
};

type BasicInfoProps = {
  data: BasicInfoData;
  setData: React.Dispatch<React.SetStateAction<BasicInfoData>>;
};

export default function BasicInfo({ data, setData }: BasicInfoProps) {
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

      <SelectInputBox
        label="교시"
        id="periodSelect"
        options={periodOptions}
        required
        value={data.period}
        onChange={e => setData(prev => ({ ...prev, period: e.target.value }))}
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