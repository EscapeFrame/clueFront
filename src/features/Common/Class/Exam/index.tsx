import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { HiMiniXMark } from "react-icons/hi2";
import * as s from './styles';
import Button from '@/entities/UI/Button';
import { ExamApi } from '../useExam';
import { Exam, ExamDetail } from '@/shared/types/Class/Exam';
import { useNavigate } from 'react-router-dom';

interface ExamListProps {
  isTeacher?: boolean;
}

export const ExamComponent: React.FC<ExamListProps> = ({ isTeacher }) => {
  const [selectedExam, setSelectedExam] = useState<ExamDetail | null>(null);
  const { classId } = useParams<{ classId: string }>();
  const [exams, setExams] = useState<Exam[]>([]);
  // loading state removed as unused
  const navigate = useNavigate();

  const openModal = (exam: Exam) => setSelectedExam(exam);
  const closeModal = () => setSelectedExam(null);

  useEffect(() => {
    const loadExams = async () => {
      try {
        if (!classId) throw new Error('classId가 없습니다.');
        const data = await ExamApi(classId);
        setExams(data);
      } catch (err: unknown) {
        console.error('시험 불러오기 실패:', err);
      }
    };

    if (classId) loadExams();
  }, [classId]);

  return (
    <s.Container>
      {isTeacher &&
        <s.SectionHeader>
          <s.LeftGroup>
            <s.Description>※ 디렉토리 제목 클릭 시 수정 가능합니다.</s.Description>
          </s.LeftGroup>

          <s.RightGroup>
            <s.SettingButton onClick={() => navigate("/class/task")}> {/* 내용 변경해야하는 부분 */}
              학습실 관리
            </s.SettingButton>
          </s.RightGroup>
        </s.SectionHeader>
      }

      {exams.length === 0 ? (
        <s.ErrorText>현재 등록된 시험이 없습니다.</s.ErrorText>
      ) : (
        exams.map((exam) => (
          <s.Section key={exam.id} onClick={() => openModal(exam)}>
            <s.LeftGroup>
              <s.State $status={exam.status} >
                <s.StatusText $status={exam.status}>
                  {exam.status === 0 ? '예정' : '진행중'}
                </s.StatusText>
              </s.State>
              <s.Title>{exam.title}</s.Title>
            </s.LeftGroup>
            <s.RightGroup>
              <s.Date>{exam.date}</s.Date>
            </s.RightGroup>
          </s.Section>
        ))
      )}

      {/* 모달 */}
      {selectedExam && (
        <s.ModalOverlay onClick={closeModal}>
          <s.ModalContent onClick={(e) => e.stopPropagation()}>
            <s.ModalHeader>
              <s.State $status={selectedExam.status} >
                <s.StatusText $status={selectedExam.status}>
                  {selectedExam.status === 0 ? '예정' : '진행중'}
                </s.StatusText>
              </s.State>
              <s.Date>{selectedExam.date}</s.Date>
            </s.ModalHeader>

            <s.ModalBody>
              <s.Title>{selectedExam.title}</s.Title>
              <s.Description>
                상세설명<br />
                {selectedExam?.description}
              </s.Description>

              <s.FileList>
                {(selectedExam?.files || []).map((file, idx) => (
                  <s.FileItem key={idx}>
                    <div className="fileInfo">
                      <a href={file.url || '#'} target="_blank" rel="noreferrer">
                        {file.name || file.fileName}
                      </a>
                      <span>
                        {file.fileSize
                          ? (file.fileSize / 1024).toFixed(2) + ' KB'
                          : '0 KB'}
                      </span>
                    </div>
                    <Button type={2} width="90px" onClick={() => window.open(file.url || '#', '_blank')}>
                      다운로드
                    </Button>
                  </s.FileItem>
                ))}
              </s.FileList>
            </s.ModalBody>

            {isTeacher && (
              <s.ModalFooter>
                <s.Button>Edit</s.Button>
                <s.Button>Delete</s.Button>
              </s.ModalFooter>
            )}
          </s.ModalContent>
        </s.ModalOverlay>
      )}
    </s.Container>
  );
};