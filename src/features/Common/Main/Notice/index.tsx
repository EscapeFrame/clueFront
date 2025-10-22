import { useState } from 'react';
import NoticeCard from '@/entities/Main/NoticeCard';
import { Modal } from '@/entities/UI/Modal';
import * as s from './styles';
import { NoticeItem } from '@/shared/types/notice';

export default function Notice() {
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const serviceNotices: NoticeItem[] = [
    {
      id: '1',
      title: '서비스 점검 안내',
      content: '더 나은 서비스를 위해 시스템 점검이 예정되어 있습니다. 이용에 불편을 드려 죄송합니다.',
      date: '2025-10-26',
    },
    {
      id: '2',
      title: '신규 기능 업데이트',
      content: '새로운 기능이 추가되었습니다. 자세한 내용은 공지사항을 확인해주세요.',
      date: '2025-10-20',
    },
  ];

  const schoolNotices: NoticeItem[] = [
    {
      id: '3',
      title: '중간고사 일정 안내',
      content: '2025학년도 2학기 중간고사 일정을 안내드립니다. 시험 범위 및 시간표를 확인해주세요.',
      date: '2025-10-25',
    },
    {
      id: '4',
      title: '학교 축제 개최',
      content: '제15회 학교 축제가 다음 주에 개최됩니다. 많은 참여 바랍니다.',
      date: '2025-10-18',
    },
  ];

  const scheduleNotices: NoticeItem[] = [
    {
      id: '5',
      title: '체육대회',
      content: '전교생 체육대회가 운동장에서 진행됩니다. 각 반은 9시까지 운동장으로 모여주세요.',
      date: '2025-11-01',
    },
    {
      id: '6',
      title: '현장 체험 학습',
      content: '2학년 현장 체험 학습이 예정되어 있습니다. 준비물을 챙겨주세요.',
      date: '2025-10-28',
    },
  ];

  const loading = {
    service: false,
    school: false,
    schedule: false,
  };

  const error = {
    service: null,
    school: null,
    schedule: null,
  };

  return (
    <s.TopContainer>
      <s.Container>
        <s.Title>공지안내</s.Title>
        <s.Explain>학교의 소식을 빠르게 알아보세요!</s.Explain>
        <s.Row>
          <NoticeCard
            cardTitle="서비스공지"
            notices={serviceNotices}
            loading={loading.service}
            error={error.service}
            onSelect={setSelectedNotice}
          />
          <NoticeCard
            cardTitle="학교공지"
            notices={schoolNotices}
            loading={loading.school}
            error={error.school}
            onSelect={setSelectedNotice}
          />
          <NoticeCard
            cardTitle="일정안내"
            notices={scheduleNotices}
            loading={loading.schedule}
            error={error.schedule}
            onSelect={setSelectedNotice}
          />
        </s.Row>
      </s.Container>

      {selectedNotice && (
        <Modal
          title={selectedNotice.title}
          notes={'default'}
          onClose={() => setSelectedNotice(null)}
          buttons={[
            {
              text: '닫기',
              type: 0,
              width: '100%',
              onClick: () => setSelectedNotice(null),
            },
          ]}
        >
          <p>{selectedNotice.content}</p>
        </Modal>
      )}
    </s.TopContainer>
  );
}