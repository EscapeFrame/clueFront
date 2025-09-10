import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/entities/UI/Button';
import * as S from './styles';
import Customapi from '@/shared/config/api';
import { Modal } from '@/entities/UI/Modal';

interface DangerInfoProps {
    classRoomId: string;
}

export default function DangerInfo({ classRoomId }: DangerInfoProps) {
    const navigate = useNavigate();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteClick = () => {
        setError(null);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (!classRoomId) {
            setError('학습실 ID가 없습니다.');
            return;
        }

        try {
            setDeleteLoading(true);
            setError(null);

            const response = await Customapi.delete(`/api/class/${classRoomId}`);

            if (response.status !== 200) {
                throw new Error(`서버 에러: 상태 코드 ${response.status}`);
            }

            // 삭제 성공 시 MyClass로 이동
            navigate('/class', { replace: true });
        } catch (err) {
            console.error('학습실 삭제 실패:', err);
            const message =
                (err as any)?.response?.data?.message ??
                (err as any)?.message ??
                '학습실 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.';
            setError(message);
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
        setError(null);
    };

    return (
        <S.Container>
            <S.Title>위험 구역</S.Title>
            <S.SubTitle>주의가 필요한 작업입니다.</S.SubTitle>

            <S.Section>
                <S.Row>
                    <S.FunctionTitle>학습실 삭제하기</S.FunctionTitle>
                    <Button
                        text="삭제하기"
                        width="8rem"
                        type={0}
                        onClick={handleDeleteClick}
                        disabled={deleteLoading}
                    />
                </S.Row>
                <S.Description>
                    학습실을 삭제하면 모든 데이터(학습 자료, 채팅 기록 등)가 영구적으로 삭제됩니다
                </S.Description>
            </S.Section>

            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

            {/* 삭제 확인 모달 */}
            {showDeleteConfirm && (
                <Modal
                    notes="default"
                    title="학습실 삭제 확인"
                    onClose={handleDeleteCancel}
                    buttons={[
                        {
                            text: '취소',
                            type: 0,
                            onClick: handleDeleteCancel,
                        },
                        {
                            text: deleteLoading ? '삭제 중...' : '삭제',
                            type: 1,
                            onClick: handleDeleteConfirm,
                        },
                    ]}
                >
                    <>
                        정말로 이 학습실을 삭제하시겠습니까?
                        <br />
                        <S.ModalWarning>삭제된 데이터는 복구할 수 없습니다.</S.ModalWarning>
                        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                    </>
                </Modal>
            )}
        </S.Container>
    );
}