import React, { useState, useEffect } from 'react';
import * as s from './styles';
import { FaSearch } from 'react-icons/fa';
import { DetailAssignmentStudent, AssignmentFile } from '@/shared/types/Class/Assignment/Attachment';
import { getCheckStudent, getStudentSubmissionDetail, downloadSubmissionAttachment } from '@/entities/Class/api';
import { IoClose } from 'react-icons/io5';
import Button from '@/entities/UI/Button';
// ...existing code...
import { AxiosError } from 'axios';

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
// (duplicate imports/types removed)

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
          files: [],
          userImg: null,
          submittedAt: item.submittedAt || null,
        }));
        setStudents(mappedStudents || []);
      } catch (error) {
        console.error('학생 제출 현황 조회 실패:', error);
        setStudents([]);
      }
    };
    fetchStudents();
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
        const mappedFiles: FileItem[] = (submissionDetails.submissionAttachmentResponses as SubmissionAttachment[] | undefined)?.map((att) => ({
          submissionAttachmentId: att.submissionAttachmentId,
          type: att.type,
          fileName: att.originalFileName || att.value,
          url: att.value,
          fileSize: att.size ?? undefined,
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
      const mappedFiles: FileItem[] | undefined = (student.files as AssignmentFile[] | undefined)?.map((f: AssignmentFile) => ({
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
              <s.CloseButton onClick={closeModal}><IoClose size={16} /></s.CloseButton>
            </s.ModalHeader>
            <s.ModalBody>
              {selectedStudent.isSubmitted ? (
                selectedStudent.files && selectedStudent.files.length > 0 ? (
                  <>
                    <s.FileHeader>
                      <span>총 {selectedStudent.files?.length || 0}개 파일</span>
                      <Button type={2} width="auto" onClick={async () => {
                        for (const file of selectedStudent.files || []) {
                          if (file.type === 'FILE') {
                            try {
                              console.log('전체 다운로드 시작:', file.submissionAttachmentId);
                              const result = await downloadSubmissionAttachment(file.submissionAttachmentId);
                              if (!result) {
                                console.error('전체 다운로드: 파일 응답이 없습니다.', file.submissionAttachmentId);
                                continue;
                              }

                              if ('url' in result && result.url) {
                                // 서버가 직접 링크를 준 경우 새 탭으로 열기
                                window.open(result.url, '_blank');
                                continue;
                              }

                              if ('blob' in result && result.blob) {
                                const filename = result.filename || file.fileName || 'download';
                                const blob = result.blob;
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = filename;
                                document.body.appendChild(a);
                                a.click();
                                a.remove();
                                window.URL.revokeObjectURL(url);
                                console.log('파일 다운로드 완료:', filename);
                                continue;
                              }
                            } catch (error) {
                              const axiosError = error as AxiosError;
                              console.error('전체 다운로드 중 실패:', {
                                message: error instanceof Error ? error.message : '알 수 없는 오류',
                                status: axiosError.response?.status,
                                data: axiosError.response?.data,
                              });
                            }
                          } else {
                            if (file.url) window.open(file.url, '_blank');
                          }
                        }
                      }}>
                        전체 다운로드
                      </Button>
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
                            <Button type={2} width="90px" onClick={async () => {
                              try {
                                console.log('개별 다운로드 시작:', file.submissionAttachmentId);
                                const result = await downloadSubmissionAttachment(file.submissionAttachmentId);
                                if (!result) {
                                  alert('파일을 다운로드할 수 없습니다. (응답 없음)');
                                  return;
                                }

                                if ('url' in result && result.url) {
                                  window.open(result.url, '_blank');
                                  return;
                                }

                                if ('blob' in result && result.blob) {
                                  const filename = result.filename || file.fileName || 'download';
                                  const blob = result.blob;
                                  const url = window.URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = filename;
                                  document.body.appendChild(a);
                                  a.click();
                                  a.remove();
                                  window.URL.revokeObjectURL(url);
                                  console.log('파일 다운로드 완료:', filename);
                                  return;
                                }
                              } catch (error) {
                                const axiosError = error as AxiosError;
                                console.error('파일 다운로드 실패:', {
                                  message: error instanceof Error ? error.message : '알 수 없는 오류',
                                  status: axiosError.response?.status,
                                  statusText: axiosError.response?.statusText,
                                  data: axiosError.response?.data,
                                });
                                const errorMessage = axiosError.response?.status 
                                  ? `${axiosError.response.status}` 
                                  : error instanceof Error ? error.message : '알 수 없는 오류';
                                alert(`파일을 다운로드할 수 없습니다.\n오류: ${errorMessage}`);
                              }
                            }}>
                              다운로드
                            </Button>
                          ) : (
                            <Button type={2} width="90px" onClick={() => file.url && window.open(file.url, '_blank')}>열기</Button>
                          )}
                        </s.FileItem>
                      ))}
                    </ul>
                  </>
                ) : (
                  <s.EmptyStateMessage>제출된 파일이 없습니다.</s.EmptyStateMessage>
                )
              ) : (
                <s.EmptyStateMessage>현재 제출된 내용이 없습니다.</s.EmptyStateMessage>
              )}
            </s.ModalBody>
          </s.ModalContent>
        </s.ModalOverlay>
      )}
    </s.Container>
  );
};