import { useState } from 'react';
import { ScheduleTable } from '@/features/Common/Main/Schedule/ScheduleTable';
import { ScheduleItem, DayOfWeek } from '@/shared/types/schedule';
import AddModal from '@/entities/UI/AddModal';

const DAYS: DayOfWeek[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const PERIODS = [1, 2, 3, 4, 5, 6, 7];

// ScheduleItem을 확장하여 grade와 class 정보를 포함
interface ExtendedScheduleItem extends ScheduleItem {
  grade?: string;
  class?: string;
}

function getEmptySchedule(): ExtendedScheduleItem[] {
  return DAYS.flatMap(day =>
    PERIODS.map(period => ({ day, period, subject: '', grade: '', class: '' }))
  );
}

export default function TimeLine() {
  const [schedule, setSchedule] = useState<ExtendedScheduleItem[]>(getEmptySchedule());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ day: DayOfWeek; period: number } | null>(null);

  const handleCellClick = (day: DayOfWeek, period: number) => {
    setSelectedCell({ day, period });
    setIsModalOpen(true);
  };

  const handleModalConfirm = (data: { subject: string; grade: string; class: string }) => {
    if (selectedCell && data.subject) {
      setSchedule(prev =>
        prev.map(item =>
          item.day === selectedCell.day && item.period === selectedCell.period
            ? { 
                ...item, 
                subject: data.subject,
                grade: data.grade,
                class: data.class
              }
            : item
        )
      );
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const displaySchedule = schedule.map(item => ({
    ...item,
    subject: item.subject 
      ? `${item.subject}${item.grade && item.class ? `\n(${item.grade}-${item.class})` : ''}`
      : ''
  }));

  return (
    <div>
      <ScheduleTable 
        data={displaySchedule} 
        onCellClick={handleCellClick}
        editable={false}
      />
      
      <AddModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}