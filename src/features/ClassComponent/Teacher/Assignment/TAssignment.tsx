import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyDataGroups } from '@/shared/theme/AssignmentTheme';
import { TAssignmentCard } from './TAssignmentCard';
import TCheckStudent from './TCheckStudent';
import * as S from '@/features/ClassComponent/Assignment/styles';

export function TAssignment() {
    const { classId } = useParams<{ classId: string }>();
    const [selectedLessonId, setSelectedLessonId] = useState<string | number | null>(null);

    if (selectedLessonId) {
        return (
            <S.Container>
                <S.Button onClick={() => setSelectedLessonId(null)}>← 뒤로가기</S.Button>
                <TCheckStudent classId={classId} lessonId={selectedLessonId} />
            </S.Container>
        );
    }

    return (
        <S.Container>
            {dummyDataGroups.map((group, index) => (
                <S.GroupSection key={index}>
                    <S.CardGrid>
                        {group.cards.map(card => (
                            <TAssignmentCard
                                key={card.id}
                                data={card}
                                onCheck={() => setSelectedLessonId(card.id)}
                            />
                        ))}
                    </S.CardGrid>
                </S.GroupSection>
            ))}
        </S.Container>
    );
}