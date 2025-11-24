import React, { useState, useEffect } from 'react';
import * as s from './styles';
import { FaSearch } from 'react-icons/fa';
import { DetailAssignmentStudent, AssignmentFile } from '@/shared/types/Class/Assignment/Attachment';
import { getCheckStudent, getStudentSubmissionDetail, downloadSubmissionAttachment } from '@/entities/Class/api';

// Local types for handling submission attachments
type SubmissionAttachment = {
  submissionAttachmentId: string;
  type: 'FILE' | 'LINK';
  value: string;
  originalFileName?: string | null;
  size?: number | null;
};

type FileItem = {
  submissionAttachmentId: string;
  type: 'FILE' | 'LINK';
  fileName?: string;
  url?: string;
  fileSize?: number;
};

type CheckStudentItem = {
  userName: string;
  grade: number;
  classNo: number;
  number: number;
  isSubmitted: boolean;
  submissionId: string;
  submittedAt?: string | null;
};

type StudentWithFiles = {
  userName: string;
  grade: number;
  classNo: number;
  number: number;
  isSubmitted: boolean;
  submissionId: string;
  files?: FileItem[];
  userImg?: string | null;
  submittedAt?: string | null;
};

interface AssignmentEntryProps {
  assignmentId: string;
  totalCount: number;
}

export const AssignmentEntry: React.FC<AssignmentEntryProps> = ({ assignmentId }) => {
  const [students, setStudents] = useState<DetailAssignmentStudent[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<DetailAssignmentStudent[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedNumber, setSelectedNumber] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentWithFiles | null>(null);

  useEffect(() => {
                    const fetchStudents = async () => {
                        try {
              const responseData = await getCheckStudent(assignmentId) as CheckStudentItem[];
              const mappedStudents: DetailAssignmentStudent[] = responseData.map((item: CheckStudentItem) => ({
                userName: item.userName,
                grade: item.grade,
                classNo: item.classNo,
                number: item.number,
                isSubmitted: item.isSubmitted,
                submissionId: item.submissionId,
                files: [], // Initialize as empty array
                userImg: null, // Not provided by API, default to null
                submittedAt: item.submittedAt || null,
              }));
                            setStudents(mappedStudents || []);
                        } catch (error) {
                            console.error('학생 제출 현황 조회 실패:', error);
                            setStudents([]);
                        }
                    };    fetchStudents();

  }, [assignmentId]);

  useEffect(() => {
    let filtered = [...students];

    if (selectedStatus === 'submitted') filtered = filtered.filter(s => s.isSubmitted);
    if (selectedStatus === 'pending') filtered = filtered.filter(s => !s.isSubmitted);

    if (selectedClass !== 'all') {
      filtered = filtered.filter(
        s => s.classNo.toString() === selectedClass
      );
    }

    if (selectedNumber !== 'all') {
      filtered = filtered.filter(
        s => s.number.toString() === selectedNumber
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
    const classes = Array.from(new Set(students.map(s => s.classNo)));
    return classes.sort((a, b) => a - b);
  };

  const getNumberOptions = () => {
    const numbers = Array.from(new Set(students.map(s => s.number)));
    return numbers.sort((a, b) => a - b);
  };

  const openModal = async (student: DetailAssignmentStudent) => {
    if (student.isSubmitted && student.submissionId) {
      try {
        const submissionDetails = await getStudentSubmissionDetail(student.submissionId);
        const mappedFiles: FileItem[] = submissionDetails.submissionAttachmentResponses?.map((att: SubmissionAttachment) => ({
          // Keep both id and type so we can differentiate FILE vs LINK
          submissionAttachmentId: att.submissionAttachmentId,
          type: att.type, // 'FILE' or 'LINK'
          fileName: att.originalFileName || att.value,
          url: att.value,
          fileSize: att.size,
        })) || [];
        const detailedStudentData: StudentWithFiles = {
          userName: student.userName,
          grade: student.grade,
          classNo: student.classNo,
          number: student.number,
          isSubmitted: student.isSubmitted,
          submissionId: student.submissionId,
          files: mappedFiles,
          userImg: student.userImg,
          submittedAt: student.submittedAt,
        };
        setSelectedStudent(detailedStudentData);
      } catch (error) {
        console.error('Failed to fetch submission details', error);
      }
    } else {
      // Convert any existing AssignmentFile[] on student to FileItem[] to satisfy state type
      const mappedFiles: FileItem[] | undefined = student.files?.map((f: AssignmentFile) => ({
        submissionAttachmentId: String(f.fileId ?? ''),
        type: 'FILE',
  fileName: f.fileName || String(f.name) || undefined,
  url: f.url || undefined,
  fileSize: f.fileSize ?? undefined,
      }));
      const studentForState: StudentWithFiles = {
        userName: student.userName,
        grade: student.grade,
        classNo: student.classNo,
        number: student.number,
        isSubmitted: student.isSubmitted,
        submissionId: student.submissionId,
        files: mappedFiles,
        userImg: student.userImg,
        submittedAt: student.submittedAt,
      };
      setSelectedStudent(studentForState);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStudent(null);
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

      {/* 학생 리스트 */}
      <s.StudentList>
        {filteredStudents.length === 0 ? (
          <s.EmptyMessage>
            {students.length === 0 ? '해당 과제에 대한 학생 데이터가 없습니다.' : '조건에 맞는 학생이 없습니다.'}
          </s.EmptyMessage>
        ) : (
          filteredStudents.map(student => (
            <div key={student.submissionId || `${student.grade}-${student.classNo}-${student.number}`} onClick={() => openModal(student)}>
              <s.StudentRow>
                <s.UserAvatar imgUrl={student.userImg} />
                <s.UserSection>
                  <s.UserInfo>
                    <s.UserName>{student.userName}</s.UserName>
                    <s.UserNumber>{student.grade}학년 {student.classNo}반 {student.number}번</s.UserNumber>
                  </s.UserInfo>
                  <s.SubmitDate>제출일: {student.submittedAt || '-'}</s.SubmitDate>
                </s.UserSection>
                <s.StatusBadge isSubmitted={student.isSubmitted}>
                  {student.isSubmitted ? '제출완료' : '미제출'}
                </s.StatusBadge>
              </s.StudentRow>
            </div>
          ))
        )}
      </s.StudentList>

      {/* 학생세부 과제확인 */}
      {modalIsOpen && selectedStudent && (
        <s.ModalOverlay onClick={closeModal}>
          <s.ModalContent onClick={e => e.stopPropagation()}>
            <s.ModalHeader>
              <s.UserAvatar imgUrl={selectedStudent.userImg} />
              <s.UserSection>
                <s.UserInfo>
                  <s.UserName>{selectedStudent.userName}</s.UserName>
                  <s.UserNumber>{selectedStudent.grade}학년 {selectedStudent.classNo}반 {selectedStudent.number}번</s.UserNumber>
                </s.UserInfo>
                <s.SubmitDate>
                  제출일: {selectedStudent.submittedAt || '-'}
                </s.SubmitDate>
              </s.UserSection>
              <s.StatusBadge isSubmitted={selectedStudent.isSubmitted}>
                {selectedStudent.isSubmitted ? '제출완료' : '미제출'}
              </s.StatusBadge>
              <s.CloseButton onClick={closeModal}>×</s.CloseButton>
            </s.ModalHeader>
            <s.ModalBody>
              {selectedStudent.isSubmitted ? (
                selectedStudent.files && selectedStudent.files.length > 0 ? (
                  <>
                    <s.FileHeader>
                      <span>총 {selectedStudent.files?.length || 0}개 파일</span>
                      <button
                        onClick={() => {
                          // 전체 동작: FILE은 개별 다운로드 링크 호출, LINK는 새 탭으로 오픈
                          (selectedStudent.files || []).forEach(async (file: FileItem) => {
                            if (file.type === 'FILE') {
                              try {
                                const res = await downloadSubmissionAttachment(file.submissionAttachmentId);
                                if (res && res.blob) {
                                  const url = window.URL.createObjectURL(res.blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = res.filename || file.fileName || 'download';
                                  document.body.appendChild(a);
                                  a.click();
                                  a.remove();
                                  window.URL.revokeObjectURL(url);
                                }
                              } catch (e) { console.error('전체 다운로드 중 실패', e); }
                            } else {
                              if (file.url) window.open(file.url, '_blank');
                            }
                          });
                        }}
                      >
                        전체 다운로드
                      </button>
                    </s.FileHeader>
                    <ul>
                      {selectedStudent.files.map((file: FileItem, idx: number) => (
                        <s.FileItem key={idx}>
                          <div className="fileInfo">
                            {file.type === 'FILE' ? (
                              <a href={file.url || '#'} target="_blank" rel="noreferrer">
                                {file.fileName || '파일'}
                              </a>
                            ) : (
                              <a href={file.url || '#'} target="_blank" rel="noreferrer">
                                {file.fileName || file.url}
                              </a>
                            )}
                            <span>
                              {file.fileSize
                                ? (file.fileSize / 1024).toFixed(2) + ' KB'
                                : '0 KB'}
                            </span>
                          </div>
                          {file.type === 'FILE' ? (
                            <button
                              onClick={async () => {
                                try {
                                  const res = await downloadSubmissionAttachment(file.submissionAttachmentId);
                                  if (res && res.blob) {
                                    const url = window.URL.createObjectURL(res.blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = res.filename || file.fileName || 'download';
                                    document.body.appendChild(a);
                                    a.click();
                                    a.remove();
                                    window.URL.revokeObjectURL(url);
                                  }
                                } catch (e) { console.error('파일 다운로드 실패', e); }
                              }}
                            >
                              다운로드
                            </button>
                          ) : (
                            <button onClick={() => file.url && window.open(file.url, '_blank')}>열기</button>
                          )}
                        </s.FileItem>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>제출된 파일이 없습니다.</p>
                )
              ) : (
                <p>현재 제출된 내용이 없습니다.</p>
              )}
            </s.ModalBody>
          </s.ModalContent>
        </s.ModalOverlay>
      )}
    </s.Container>
  );
};