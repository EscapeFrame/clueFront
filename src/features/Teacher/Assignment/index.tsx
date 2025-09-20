import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AssignmentCard } from '@/entities/Class/AssignmentCard/teacher';
import { Assignment } from '@/shared/types/Class/Assignment/Attachment';
import Button from '@/entities/UI/Button';
import * as s from './styles';
import { dummyAssignments } from '@/shared/theme/dummy'; // 더미 데이터 사용
import { DetailAssignment } from '../DetailAssignments';

export const AssignmentComponent: React.FC = () => {
    const { classId, classRoomId } = useParams<{ classId?: string; classRoomId?: string }>();
    const effectiveId = classId ?? classRoomId;
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

    const navigate = useNavigate();

    // API 호출 대신 더미 데이터 사용** (실제 API 호출은 아래 주석 참고)
    useEffect(() => {
        if (!effectiveId) {
            setLoading(false);
            setAssignments([]);
            return;
        }

        setLoading(true);

        // 더미 데이터로 시뮬레이션
        setTimeout(() => {
            setAssignments(dummyAssignments);
            setLoading(false);
            setError(null);
        }, 500);

        /*
        // 실제 API 호출
        AssignmentsApi.getAll(effectiveId)
          .then((data) => {
            setAssignments(data as unknown as Assignment[]);
            setError(null);
          })
          .catch((err) => {
            console.error(err);
            setError("과제를 불러오는 중 오류가 발생했습니다.");
          })
          .finally(() => {
            setLoading(false);
          });
        */
    }, [effectiveId]);

    const MakeTask = () => {
        if (!classRoomId) return;
        navigate(`/class/${classRoomId}/make/task`);
    };

    const handleBackToList = () => setSelectedAssignment(null);

    // 상세 페이지 렌더링 조건
    if (selectedAssignment) {
        return <DetailAssignment assignmentId={selectedAssignment} onBack={handleBackToList} />;
    }

    return (
        <s.Container>
            <s.Header>
                <s.AddButton>
                    <Button text="과제 추가하기" width="10rem" type={0} onClick={MakeTask} />
                </s.AddButton>
            </s.Header>
            {loading && <div>로딩 중...</div>}
            {error && <div style={{ color: 'red', margin: '1rem 0' }}>{error}</div>}
            {!loading && !error && (
                <s.Grid>
                    {assignments.length === 0 ? (
                        <div>등록된 과제가 없습니다.</div>
                    ) : (
                        assignments.map((a) => (
                            <AssignmentCard
                                key={a.id}
                                data={a}
                                classRoomId={String(effectiveId)}
                                onClickDetail={() => setSelectedAssignment(String(a.id))}
                                updateAssignment={(id, changes) => {
                                    setAssignments((prev) => {
                                        const idx = prev.findIndex((x) => x.id === id);
                                        if (idx >= 0) {
                                            const newAssignments = [...prev];
                                            newAssignments[idx] = { ...newAssignments[idx], ...changes };
                                            return newAssignments;
                                        }
                                        return prev;
                                    });
                                }}
                            />
                        ))
                    )}
                </s.Grid>
            )}
        </s.Container>
    );
};