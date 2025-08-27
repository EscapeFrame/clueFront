// 채점표 한 행 (등급별 기준)
export interface ScoreRow {
  [grade: string]: string;
}

export interface ScoreCriteriaTableProps {
  initialGrades?: string[]; // 기본 등급 (ex. ['A', 'B', 'C'])
}