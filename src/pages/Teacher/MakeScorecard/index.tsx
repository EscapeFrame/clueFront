import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { EditableCell } from './Editable/Cell';
import { EditableHeader } from './Editable/Header';
import { ScoreRow } from '@/shared/types/makeScorecard';
import * as s from './styles';
import Button from '@/entities/UI/Button';
import { Modal } from '@/entities/UI/Modal/index';

interface ScoreCriteriaTableProps {
  initialGrades?: string[]; // 기본값: ['A', 'B', 'C', 'D']
}

export default function MakeScorecard({
  initialGrades = ['A', 'B', 'C', 'D'],
}: ScoreCriteriaTableProps) {
  const navigate = useNavigate();
  const [grades, setGrades] = useState<string[]>(initialGrades);
  const [criteria, setCriteria] = useState<ScoreRow[]>([
    Object.fromEntries(initialGrades.map((g) => [g, ''])) as ScoreRow,
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    if (tableRef.current) {
      setTableHeight(tableRef.current.offsetHeight);
    }
  }, [grades.length, criteria.length]);

  const handleCellChange = (rowIdx: number, grade: string, value: string) => {
    setCriteria((prev) =>
      prev.map((row, idx) =>
        idx === rowIdx ? { ...row, [grade]: value } : row
      )
    );
  };

  const handleGradeChange = (index: number, newGrade: string) => {
    const updatedGrades = [...grades];
    const oldGrade = updatedGrades[index];

    updatedGrades[index] = newGrade;

    const updatedCriteria = criteria.map((row) => {
      const newRow: ScoreRow = { ...row };
      newRow[newGrade] = newRow[oldGrade];
      delete newRow[oldGrade];
      return newRow;
    });

    setGrades(updatedGrades);
    setCriteria(updatedCriteria);
  };

  const addRow = () => {
    const newRow = Object.fromEntries(grades.map((g) => [g, ''])) as ScoreRow;
    setCriteria((prev) => [...prev, newRow]);
  };

  const addGrade = () => {
    const newGrade = `G${grades.length + 1}`;
    if (grades.includes(newGrade)) return;

    const updatedGrades = [...grades, newGrade];
    const updatedCriteria = criteria.map((row) => ({
      ...row,
      [newGrade]: '',
    }));

    setGrades(updatedGrades);
    setCriteria(updatedCriteria);
  };

  const handleComplete = () => {
    console.log('저장된 데이터:', { grades, criteria });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <s.Container>
      <s.TopBar>
        <s.Title>채점기준표 제작/수정</s.Title>
        <s.Actions>
          <Button text="닫기" width="100px" type={1} onClick={() => navigate(-1)} />
          <Button text="완료" width="100px" type={0} onClick={handleComplete} />
        </s.Actions>
      </s.TopBar>

      <s.TableArea ref={tableRef}>
        <s.GridRow columnCount={grades.length}>
          {grades.map((grade, idx) => (
            <EditableHeader
              key={idx}
              value={grade}
              onChange={(val) => handleGradeChange(idx, val)}
            />
          ))}
          <s.AddColumnButton onClick={addGrade}>+</s.AddColumnButton>
        </s.GridRow>

        {criteria.map((row, rowIdx) => (
          <s.GridRow key={rowIdx} columnCount={grades.length}>
            {grades.map((grade) => (
              <EditableCell
                key={grade}
                value={row[grade]}
                onChange={(val) => handleCellChange(rowIdx, grade, val)}
              />
            ))}
            <s.SpacerCell />
          </s.GridRow>
        ))}

        <s.RowAddWrapper>
          <s.AddRowButton onClick={addRow}>+</s.AddRowButton>
        </s.RowAddWrapper>
      </s.TableArea>

      {isModalOpen && (
        <Modal
          title="채점기준표 제작/수정이 완료되었습니다."
          notes="default"
          onClose={handleCloseModal}
          isWarning={false}
          buttons={[
            {
              text: '닫기',
              type: 0,
              onClick: handleCloseModal,
            },
          ]}
        />
      )}
    </s.Container>
  );
}
