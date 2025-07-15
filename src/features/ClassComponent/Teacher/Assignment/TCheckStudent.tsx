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

import simpleStudentData from '@/shared/theme/Teacher/CheckStudent';

interface TCheckStudentProps {
  classId?: string;
  lessonId?: string | number;
}

export default function TCheckStudent(props: TCheckStudentProps) {
  const lessonId = props.lessonId?.toString();

  // 더미 데이터에서 lessonId(assignment_id)로 필터링
  const students = simpleStudentData.filter(
    student => lessonId ? String(student.assignment_id) === lessonId : true
  );

  if (!students.length) {
    return (
      <Container style={{ textAlign: 'center' }}>
        <h2>데이터를 찾을 수 없습니다</h2>
        <p>과제 ID: {lessonId}</p>
      </Container>
    );
  }

  return (
    <Container>
      <AssignmentTitleBox>
        <AssignmentTitle>과제 제출 현황</AssignmentTitle>
        <AssignmentDeadline>마감일: {students[0].submitted_at ?? '-'}</AssignmentDeadline>
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
        {students.map((student, idx) => {
          const statusText = student.is_submitted ? '제출완료' : '미제출';
          return (
            <StudentRow key={student.user_id + '-' + student.assignment_id}>
              <InfoGroup>
                <StudentCell>{String(student.user_id).slice(-4)}</StudentCell>
                <StudentCell>{student.user_name}</StudentCell>
              </InfoGroup>
              <ActionGroup>
                <StudentCell submitted={statusText === '제출완료'}>{statusText}</StudentCell>
                <StudentAction>채점하기</StudentAction>
              </ActionGroup>
            </StudentRow>
          );
        })}
      </Wrap>
    </Container>
  );
}
