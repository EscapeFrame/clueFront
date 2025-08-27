import * as s from './styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMyClass } from '@/features/Common/Class/hooks/useMyClass';
import { ClassCard } from '@/entities/Class/ClassCard';
import { Modal } from '@/entities/UI/Modal';

export default function MyClassPage() {
  const { myClasses, loading, error, joinClass } = useMyClass();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classCode, setClassCode] = useState('');

  return (
    <s.Container>
      <s.Flexible>
        <s.TitleFont>나의 학습실</s.TitleFont>
        <s.AddButton onClick={() => setIsModalOpen(true)}>학습실 추가</s.AddButton>
        {error && <s.ErrorMessage>{error}</s.ErrorMessage>}
      </s.Flexible>

      <s.Grid>
        {myClasses.map(cls => (
          <ClassCard
            key={cls.classRoomId}
            classRoomId={cls.classRoomId}
            name={cls.classRoomName}
            sort={cls.sort || '미정'}
            target={cls.teacherNames?.join(', ') || '미정'}
          />
        ))}
        {myClasses.length === 0 && <s.EmptyMessage>생성/참여한 학습실이 없습니다.</s.EmptyMessage>}
      </s.Grid>

      {isModalOpen && (
        <Modal
          title="학습실 추가"
          notes="input"
          placeholder="학습실 코드를 입력해주세요"
          onClose={() => setIsModalOpen(false)}
          inputValue={classCode}
          onInputChange={e => setClassCode(e.target.value)}
          buttons={[
            {
              text: '취소',
              type: 1,
              width: '50%',
              onClick: () => setIsModalOpen(false),
            },
            {
              text: loading ? '조회 중...' : '완료',
              type: 0,
              width: '50%',
              onClick: () => joinClass(classCode),
            },
          ]}
        />
      )}
    </s.Container>
  );
}