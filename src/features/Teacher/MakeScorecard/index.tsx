import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";
import Button from "@/entities/UI/Button";
import { Modal } from "@/entities/UI/Modal/index";
import { ScoreRow, ScoreCriteriaTableProps } from "@/shared/types/makeScorecard";
import { saveScorecard } from "./api";
import { EditableCell } from "./UI/Cell";
import { EditableHeader } from "./UI/Header";

export default function MakeScorecard({
  initialGrades = ["A", "B", "C", "D"],
}: ScoreCriteriaTableProps) {
  const navigate = useNavigate();

  const [grades, setGrades] = useState<string[]>(initialGrades);
  const [criteria, setCriteria] = useState<ScoreRow[]>([
    Object.fromEntries(initialGrades.map((g) => [g, ""])) as ScoreRow,
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error] = useState("");

  const tableRef = useRef<HTMLDivElement>(null);

  // 셀 값 변경
  const handleCellChange = (rowIdx: number, grade: string, value: string) => {
    setCriteria((prev) =>
      prev.map((row, idx) =>
        idx === rowIdx ? { ...row, [grade]: value } : row
      )
    );
  };

  // 등급 이름 변경
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

  // 행 추가
  const addRow = () => {
    const newRow = Object.fromEntries(grades.map((g) => [g, ""])) as ScoreRow;
    setCriteria((prev) => [...prev, newRow]);
  };

  // 열 추가
  const addGrade = () => {
    const newGrade = `G${grades.length + 1}`;
    if (grades.includes(newGrade)) return;
    setGrades([...grades, newGrade]);
    setCriteria((prev) => prev.map((row) => ({ ...row, [newGrade]: "" })));
  };

  // 저장
  const handleComplete = async () => {
    setLoading(true);
    const payload = { grades, criteria };
    try {
      const res = await saveScorecard(payload);
      if (res.status === 200) {
        setIsModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  return (
    <s.Container>
      <s.TopBar>
        <s.Title>채점기준표 제작/수정</s.Title>
        <s.Actions>
          <Button text="닫기" width="100px" type={1} onClick={() => navigate(-1)} />
          <Button
            text={loading ? "저장 중..." : "완료"}
            width="100px"
            type={0}
            onClick={handleComplete}
            disabled={loading}
          />
        </s.Actions>
      </s.TopBar>

      {error && <s.ErrorMessage>{error}</s.ErrorMessage>}

      <s.TableArea ref={tableRef}>
        {/* 헤더 */}
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

        {/* 행 */}
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
          buttons={[{ text: "닫기", type: 0, onClick: handleCloseModal }]}
        />
      )}
    </s.Container>
  );
}