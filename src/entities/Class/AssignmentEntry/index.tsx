import React, { useState, useEffect } from 'react';
import * as s from './styles';
import { FaSearch } from 'react-icons/fa';
import { DetailAssignmentStudent, DetailAssignmentData } from '@/shared/types/Class/Assignment/Attachment';
import { dummyDetailAssignmentData } from '@/shared/theme/dummy';

interface AssignmentEntryProps {
  assignmentId: string;
  totalCount: number;
}

export const AssignmentEntry: React.FC<AssignmentEntryProps> = ({ assignmentId, totalCount }) => {
  const [students, setStudents] = useState<DetailAssignmentStudent[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<DetailAssignmentStudent[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedNumber, setSelectedNumber] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const assignmentData = dummyDetailAssignmentData[assignmentId];
    setStudents(assignmentData ? assignmentData.student : []);
  }, [assignmentId]);

  const parseStudentNumber = (num: number) => {
    const str = num.toString().padStart(4, '0');
    return {
      grade: Number(str[0]),
      class: Number(str[1]),
      number: Number(str.slice(2)),
    };
  };

  useEffect(() => {
    let filtered = [...students];

    if (selectedStatus === 'submitted') filtered = filtered.filter(s => s.isSubmitted);
    if (selectedStatus === 'pending') filtered = filtered.filter(s => !s.isSubmitted);

    if (selectedClass !== 'all') {
      filtered = filtered.filter(
        s => parseStudentNumber(s.classNumberGrade).class.toString() === selectedClass
      );
    }

    if (selectedNumber !== 'all') {
      filtered = filtered.filter(
        s => parseStudentNumber(s.classNumberGrade).number === Number(selectedNumber)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [students, selectedStatus, selectedClass, selectedNumber, searchTerm]);

  const getClassOptions = () => {
    const classes = Array.from(new Set(students.map(s => parseStudentNumber(s.classNumberGrade).class)));
    return classes.sort((a, b) => a - b);
  };

  const getNumberOptions = () => {
    const numbers = Array.from(new Set(students.map(s => parseStudentNumber(s.classNumberGrade).number)));
    return numbers.sort((a, b) => a - b);
  };

  return (
    <s.Container>
      <s.Title>학생 과제 현황</s.Title>

      <s.FilterContainer>
        <s.FilterGroup>
          <s.FilterLabel>제출 상태</s.FilterLabel>
          <s.Select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
            <option value="all">전체</option>
            <option value="submitted">제출</option>
            <option value="pending">미제출</option>
          </s.Select>
        </s.FilterGroup>

        <s.FilterGroup>
          <s.FilterLabel>학급</s.FilterLabel>
          <s.Select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
            <option value="all">전체</option>
            {getClassOptions().map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </s.Select>
        </s.FilterGroup>

        <s.FilterGroup>
          <s.FilterLabel>번호</s.FilterLabel>
          <s.Select value={selectedNumber} onChange={e => setSelectedNumber(e.target.value)}>
            <option value="all">전체</option>
            {getNumberOptions().map(n => (
              <option key={n} value={n}>{n.toString().padStart(2, '0')}번</option>
            ))}
          </s.Select>
        </s.FilterGroup>

        <s.SearchGroup>
          <s.FilterLabel>학생 검색</s.FilterLabel>
          <s.SearchContainer>
            <s.SearchInput
              type="text"
              placeholder="학생 이름을 입력하세요"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <s.SearchIcon><FaSearch /></s.SearchIcon>
          </s.SearchContainer>
        </s.SearchGroup>
      </s.FilterContainer>

      <s.StudentList>
        {filteredStudents.length === 0 ? (
          <s.EmptyMessage>
            {students.length === 0 ? '해당 과제에 대한 학생 데이터가 없습니다.' : '조건에 맞는 학생이 없습니다.'}
          </s.EmptyMessage>
        ) : (
          filteredStudents.map(student => (
            <s.StudentRow key={`${student.contentId}-${student.classNumberGrade}`}>
              <s.UserAvatar imgUrl={student.userImg} />
              <s.UserSection>
                <s.UserInfo>
                  <s.UserName>{student.userName}</s.UserName>
                  <s.UserNumber>{student.classNumberGrade}</s.UserNumber>
                </s.UserInfo>
                <s.SubmitDate>제출일: {student.userSubmitDate || '-'}</s.SubmitDate>
              </s.UserSection>
              <s.StatusBadge isSubmitted={student.isSubmitted}>
                {student.isSubmitted ? '제출' : '미제출'}
              </s.StatusBadge>
            </s.StudentRow>
          ))
        )}
      </s.StudentList>
    </s.Container>
  );
};
