import { ScheduleItem } from '@/shared/types/schedule';
import * as s from './styles';
import React, { useState, useEffect } from 'react';
import { getScheduleTimeTable } from '@/features/Common/api';

interface Props {
  data: (ScheduleItem | null)[];
  maxPeriod?: number;
  editable?: boolean;
  onChangeSchedule?: (updated: ScheduleItem) => void;
  onCellClick?: (day: ScheduleItem['day'], period: number) => void;
}

const DAYS = [
  { key: 'MON' },
  { key: 'TUE' },
  { key: 'WED' },
  { key: 'THU' },
  { key: 'FRI' },
];

const grade = '1';
const classNumber = '1';

export const ScheduleTable: React.FC<Props> = ({ data, maxPeriod = 7, editable = false, onChangeSchedule, onCellClick }) => {
  const [editCell, setEditCell] = useState<{ day: ScheduleItem['day']; period: number } | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    getScheduleTimeTable(grade, classNumber);
  }, []);

  const handleCellClick = (day: ScheduleItem['day'], period: number) => {
    if (onCellClick) {
      onCellClick(day, period);
      return;
    }
    
    if (!editable) return;
    const item = data.find(d => d?.day === day && d?.period === period);
    setEditCell({ day, period });
    setInputValue(item ? item.subject : '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (editCell && onChangeSchedule) {
      onChangeSchedule({ day: editCell.day, period: editCell.period, subject: inputValue });
    }
    setEditCell(null);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const renderCell = (day: ScheduleItem['day'], period: number) => {
    const item = data.find(d => d?.day === day && d?.period === period);
    const subject = item ? item.subject : '-';
    const isEditing = editable && editCell && editCell.day === day && editCell.period === period;
    return (
      <s.Cell key={`${day}-${period}`} onClick={() => handleCellClick(day, period)} style={editable ? { cursor: 'pointer' } : {}}>
        {isEditing ? (
          <input
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            style={{ width: '90%', fontSize: '1rem' }}
          />
        ) : (
          subject
        )}
      </s.Cell>
    );
  };

  return (
    <s.TableWrapper>
      <s.Title>시간표</s.Title>
      <s.Table>
        <thead>
          <tr>
            <s.HeaderCell />
            {DAYS.map(day => (
              <s.HeaderCell key={day.key}>{day.key}</s.HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxPeriod }, (_, i) => {
            const period = i + 1; // 1~7교시
            return (
              <tr key={period}>
                <s.TimeCell>{period}교시</s.TimeCell>
                {DAYS.map(day => renderCell(day.key as ScheduleItem['day'], period))}
              </tr>
            );
          })}
        </tbody>
      </s.Table>
    </s.TableWrapper>
  );
};