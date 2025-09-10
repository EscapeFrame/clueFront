import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Customapi from '@/shared/config/api';
import * as s from './styles';

import { IoArrowBackOutline } from "react-icons/io5";
import BasicInfo from '@/entities/Class/BasicInfo';
import Button from '@/entities/UI/Button';
import ClassroomSetup from '@/entities/Class/ClassroomSetup';
import DangerInfo from '@/entities/Class/DangerInfo';

export default function ClassSetting() {
    const { classRoomId } = useParams<{ classRoomId: string }>();
    const navigate = useNavigate();

    // 기본 정보 상태
    const [basicInfo, setBasicInfo] = useState({
        roomName: '',
        description: '',
        subjectCategory: '',
        grade: '',
        classNum: ''
    });

    // 토글 상태
    const [isActivation, setIsActivation] = useState(true);
    const [isChatEnabled, setIsChatEnabled] = useState(true);

    // 상태 메시지
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    // 컴포넌트 마운트 시 기존 데이터 불러오기
    useEffect(() => {
        const fetchClassData = async () => {
            if (!classRoomId) {
                setError('학습실 ID가 없습니다.');
                setDataLoading(false);
                return;
            }

            try {
                setDataLoading(true);
                const res = await Customapi.get(`/api/class/${classRoomId}`);

                if (res.status < 200 || res.status >= 300) {
                    throw new Error(`서버 에러: 상태 코드 ${res.status}`);
                }

                const classData = res.data;

                // target을 grade와 classNum으로 분리 (예: "3-2" -> grade: "3", classNum: "2")
                const [grade, classNum] = classData.target ? classData.target.split('-') : ['', ''];

                setBasicInfo({
                    roomName: classData.name || '',
                    description: classData.description || '',
                    subjectCategory: classData.sort || '',
                    grade: grade || '',
                    classNum: classNum || ''
                });

                setIsActivation(classData.isActivation ?? true);
                setIsChatEnabled(classData.isChatEnabled ?? true);

            } catch (err) {
                console.error('학습실 데이터 불러오기 실패:', err);
                const message =
                    (err as any)?.response?.data?.message ??
                    (err as any)?.message ??
                    '학습실 정보를 불러오는데 실패했습니다.';
                setError(message);
            } finally {
                setDataLoading(false);
            }
        };

        fetchClassData();
    }, [classRoomId]);

    const handleToggle = (name: string, checked: boolean) => {
        if (name === 'isActivation') setIsActivation(checked);
        if (name === 'isChatEnabled') setIsChatEnabled(checked);
        console.log('토글 변경:', {
            name,
            checked,
            isActivation: name === 'isActivation' ? checked : isActivation,
            isChatEnabled: name === 'isChatEnabled' ? checked : isChatEnabled
        });
    };

    const handleSubmit = async () => {
        if (!classRoomId) {
            setError('학습실 ID가 없습니다.');
            return;
        }

        setLoading(true);
        setError(null);

        const dataToSend = {
            name: basicInfo.roomName,
            description: basicInfo.description,
            sort: basicInfo.subjectCategory,
            target: `${basicInfo.grade}-${basicInfo.classNum}`,
            isActivation: isActivation,
            isChatEnabled: isChatEnabled,
        };

        console.log('제출 값:', { basicInfo, isActivation, isChatEnabled, dataToSend });

        try {
            const res = await Customapi.patch(`/api/class/${classRoomId}`, dataToSend);

            if (res.status < 200 || res.status >= 300) {
                console.error(`서버 에러: 상태 코드 ${res.status}`);
                setError('학습실 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.');
                return;
            }

            // 성공 시 이전 페이지로 이동
            navigate(`/class/${classRoomId}`);

        } catch (err) {
            console.error('학습실 수정 실패:', err);
            const message =
                (err as any)?.response?.data?.message ??
                (err as any)?.message ??
                '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    // 데이터 로딩 중일 때
    if (dataLoading) {
        return (
            <s.Container>
                <div>학습실 정보를 불러오는 중...</div>
            </s.Container>
        );
    }

    // 에러가 있고 데이터가 없을 때
    if (error && !basicInfo.roomName) {
        return (
            <s.Container>
                <div>
                    <IoArrowBackOutline
                        size={24}
                        style={{ cursor: 'pointer', marginBottom: '1rem' }}
                        onClick={handleGoBack}
                    />
                </div>
                <s.ErrorMessage>{error}</s.ErrorMessage>
            </s.Container>
        );
    }

    return (
        <s.Container>
            <s.Icon>
                <IoArrowBackOutline onClick={handleGoBack} />
                <Button
                    text={loading ? '수정 중...' : '변경사항 저장'}
                    width="10rem"
                    type={0}
                    onClick={handleSubmit}
                />
            </s.Icon>

            <BasicInfo
                data={basicInfo}
                setData={setBasicInfo}
            />

            <hr />

            <ClassroomSetup
                isActivation={isActivation}
                isChatEnabled={isChatEnabled}
                handleToggle={handleToggle}
            />

            <hr />
            {error && <s.ErrorMessage>{error}</s.ErrorMessage>}

            {/* 위험구역(학습실 비활성화, 학습실 삭제) */}
            {classRoomId && <DangerInfo classRoomId={classRoomId} />}
        </s.Container>
    );
}