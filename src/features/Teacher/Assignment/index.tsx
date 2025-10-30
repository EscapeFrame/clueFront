import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AssignmentsApi } from '@/features/Common/Class/api/useAssignment';
import { AssignmentCard } from '@/entities/Class/AssignmentCard/teacher';
import { Assignment } from '@/shared/types/Class/Assignment/Attachment';
import Button from '@/entities/UI/Button';
import * as s from './styles';

interface AssignmentComponentProps {
  onAssignmentSelect: (assignmentId: string) => void;
}

export const AssignmentComponent: React.FC<AssignmentComponentProps> = ({ onAssignmentSelect }) => {
    const { classId, classRoomId } = useParams<{ classId?: string | undefined; classRoomId?: string | undefined }>();
    const effectiveId = classId ?? classRoomId;
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 컴포넌트 마운트 시(또는 effectiveId가 바뀔 때) 과제 목록 API 호출
    useEffect(() => {
        if (!effectiveId) {
            setLoading(false);
            setAssignments([]);
            return;
        }

        setLoading(true);
        AssignmentsApi.getAll(effectiveId)
            .then((data) => {
                // API에서 받은 AssignmentResponse[]를 Assignment[]로 강제 변환
                console.log('API Response:', data); // 실제 데이터 구조 확인
                console.log('Data length:', data?.length); // 데이터 개수 확인
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
    }, [effectiveId]);
    const MakeTask = () => {
        if (!classRoomId) return;
        navigate(`/class/${classRoomId}/make/task`);
    };

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
                        assignments.map((a: Assignment) => (
                            <AssignmentCard
                                key={a.assignmentId}
                                data={a}
                                assignmentId={String(a.assignmentId)}
                                onAssignmentSelect={onAssignmentSelect}
                                updateAssignment={(id, changes) => {
                                    setAssignments(prev => {
                                        const idx = prev.findIndex(x => x.assignmentId === id);
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