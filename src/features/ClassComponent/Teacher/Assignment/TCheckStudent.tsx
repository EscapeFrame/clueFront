import {
  Container,
  AssignmentTitleBox,
  AssignmentTitle,
  AssignmentDeadline,
  FilterBar,
  FilterSelect,
  FilterInput,
  StudentRow,
  StudentCell,
  StudentAction,
  Wrap,
  InfoGroup,
  ActionGroup
} from './TCheckStudent.styles';

const mockApiResponse = {
  "1234": {
    "1": {
      assignmentInfo: {
        id: "1",
        title: "자바 기초 문법 학습",
        description: "자바의 기본 문법을 학습하고 실습합니다.",
        deadline: "2025-01-20 23:59:59",
        totalStudents: 4,
        submittedCount: 3,
        submissionRate: 75
      },
      students: [
        { id: 1, name: "김철수", studentId: "2024001", submitted: true, fileName: "자바과제_김철수.pdf", submittedAt: "2025-01-15 14:30", score: 85 },
        { id: 2, name: "이영희", studentId: "2024002", submitted: true, fileName: "자바과제_이영희.pdf", submittedAt: "2025-01-15 15:45", score: 92 },
        { id: 3, name: "박민수", studentId: "2024003", submitted: false, fileName: null, submittedAt: null, score: null },
        { id: 4, name: "정수진", studentId: "2024004", submitted: true, fileName: "자바과제_정수진.pdf", submittedAt: "2025-01-15 16:20", score: 78 },
      ]
    },
    "2": {
      assignmentInfo: {
        id: "2",
        title: "자바 객체지향 프로그래밍",
        description: "객체지향 프로그래밍의 개념을 학습합니다.",
        deadline: "2025-01-25 23:59:59",
        totalStudents: 4,
        submittedCount: 3,
        submissionRate: 75
      },
      students: [
        { id: 1, name: "김철수", studentId: "2024001", submitted: true, fileName: "자바과제2_김철수.pdf", submittedAt: "2025-01-16 10:15", score: 88 },
        { id: 2, name: "이영희", studentId: "2024002", submitted: true, fileName: "자바과제2_이영희.pdf", submittedAt: "2025-01-16 11:30", score: 95 },
        { id: 3, name: "박민수", studentId: "2024003", submitted: true, fileName: "자바과제2_박민수.pdf", submittedAt: "2025-01-16 12:45", score: 82 },
        { id: 4, name: "정수진", studentId: "2024004", submitted: false, fileName: null, submittedAt: null, score: null },
      ]
    }
  },
  "5678": {
    "1": {
      assignmentInfo: {
        id: "1",
        title: "파이썬 기초 문법",
        description: "파이썬의 기본 문법을 학습합니다.",
        deadline: "2025-01-22 23:59:59",
        totalStudents: 3,
        submittedCount: 2,
        submissionRate: 67
      },
      students: [
        { id: 1, name: "홍길동", studentId: "2024005", submitted: true, fileName: "파이썬과제_홍길동.pdf", submittedAt: "2025-01-16 09:30", score: 90 },
        { id: 2, name: "김영희", studentId: "2024006", submitted: false, fileName: null, submittedAt: null, score: null },
        { id: 3, name: "박철수", studentId: "2024007", submitted: true, fileName: "파이썬과제_박철수.pdf", submittedAt: "2025-01-16 11:45", score: 87 },
      ]
    },
    "2": {
      assignmentInfo: {
        id: "2",
        title: "파이썬 데이터 분석",
        description: "pandas와 numpy를 활용한 데이터 분석을 학습합니다.",
        deadline: "2025-01-28 23:59:59",
        totalStudents: 3,
        submittedCount: 1,
        submissionRate: 33
      },
      students: [
        { id: 1, name: "홍길동", studentId: "2024005", submitted: true, fileName: "데이터분석_홍길동.pdf", submittedAt: "2025-01-17 14:20", score: 95 },
        { id: 2, name: "김영희", studentId: "2024006", submitted: false, fileName: null, submittedAt: null, score: null },
        { id: 3, name: "박철수", studentId: "2024007", submitted: false, fileName: null, submittedAt: null, score: null },
      ]
    }
  }
};

interface TCheckStudentProps {
  classId?: string;
  lessonId?: string | number;
}

export default function TCheckStudent(props: TCheckStudentProps) {
  const classId = props.classId;
  const lessonId = props.lessonId?.toString();

  // 백엔드 API 연결
  const classData = classId ? mockApiResponse[classId as keyof typeof mockApiResponse] : undefined;
  const apiData = classData && lessonId ? classData[lessonId as keyof typeof classData] : undefined;

  if (!apiData) {
    return (
      <Container style={{ textAlign: 'center' }}>
        <h2>데이터를 찾을 수 없습니다</h2>
        <p>클래스 ID: {classId} | 과제 ID: {lessonId}</p>
      </Container>
    );
  }

  const { students } = apiData;

  return (
    <Container>
      <AssignmentTitleBox>
        <AssignmentTitle>자바에 대해서 조사하기</AssignmentTitle>
        <AssignmentDeadline>마감일: 2025.04.15 23:59:59</AssignmentDeadline>
      </AssignmentTitleBox>
      <FilterBar>
        <FilterSelect>
          <option>상태</option>
          <option>제출완료</option>
          <option>미제출</option>
          <option>제출취소</option>
        </FilterSelect>
        <FilterSelect>
          <option>반 선택</option>
          <option>반 1</option>
          <option>반 2</option>
          <option>반 3</option>
        </FilterSelect>
        <FilterSelect>
          <option>번호 선택</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </FilterSelect>
        <FilterInput type="text" placeholder="찾으시는 학생을 검색해 주세요." />
      </FilterBar>
      <Wrap>
        {students.map((student) => {
          let statusText = '미제출';
          if (student.score === null && student.submitted === false) statusText = '미제출';
          if (student.submitted === true) statusText = '제출취소';

          return (
            <StudentRow key={student.id}>
              <InfoGroup>
                <StudentCell submitted={statusText === '제출취소'}>{student.studentId.slice(-4)}</StudentCell>
                <StudentCell submitted={statusText === '제출취소'}>{student.name}</StudentCell>
              </InfoGroup>
              <ActionGroup>
                <StudentCell>{statusText}</StudentCell>
                <StudentAction>채점하기</StudentAction>
              </ActionGroup>
            </StudentRow>
          );
        })}
      </Wrap>
    </Container>
  );
}
