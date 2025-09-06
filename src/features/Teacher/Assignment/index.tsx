import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AssignmentsApi } from '@/features/Common/Class/api/useAssignment';
import { AssignmentCard } from '@/entities/Class/AssignmentCard/Teacher';
import { Assignment } from '@/shared/types/Class/Assignment/Attachment';
import Button from '@/entities/UI/Button';
import * as s from './styles';

export const AssignmentComponent: React.FC = () => {
    const { classId, classRoomId } = useParams<{ classId?: string | undefined; classRoomId?: string | undefined }>();
    // classId가 없으면 classRoomId를 사용
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
                // 실제로는 매핑 로직을 넣는 게 안전하지만 지금은 타입 단언으로 처리..
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
                    {assignments.map((a: Assignment) => (
                        <AssignmentCard
                            key={a.id}
                            data={a}
                            classRoomId={String(effectiveId)}
                            // 개별 과제 상태를 수정할 때 assignments 배열 갱신
                            updateAssignment={(id: string | number, changes: Partial<Assignment>) => {
                                const idx = assignments.findIndex((x: Assignment) => x.id === id);
                                if (idx >= 0) assignments[idx] = { ...assignments[idx], ...changes };
                            }}
                        />
                    ))}
                </s.Grid>
            )}
        </s.Container>
    );
};