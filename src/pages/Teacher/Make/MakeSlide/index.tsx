import React, { useState } from "react";
import Customapi from '@/shared/config/api';
import * as s from './styles';
import Button from "@/entities/UI/Button";

const MakeSlide: React.FC = () => {
    const [presentationId, setPresentationId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createAndSavePresentation = async () => {

        setLoading(true);
        setError(null);

        try {
            // 새 프레젠테이션 생성
            const slidesResponse = await Customapi.post(
                "https://slides.googleapis.com/v1/presentations",
                {
                    title: "My New Slide via Axios",
                },
            );

            const newPresentationId = slidesResponse.data.presentationId;

            // 생성된 ID를 서버에 저장
            const backendResponse = await Customapi.post(
                "/api/save-presentation", // 예시 백엔드 엔드포인트
                {
                    presentationId: newPresentationId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (backendResponse.status === 200 || backendResponse.status === 201) {
                console.log("프레젠테이션 ID가 백엔드에 성공적으로 저장되었습니다.");
                setPresentationId(newPresentationId);
            } else {
                throw new Error("백엔드 저장에 실패했습니다.");
            }

        } catch (err: any) {
            console.error("오류 발생:", err.response?.data || err.message);
            setError("슬라이드 생성 및 저장 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <s.Container>
            <Button
                text='새 슬라이드 생성 및 저장'
                onClick={createAndSavePresentation}
                disabled={loading}
            />
            {loading && <p>생성 중...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {presentationId && (
                <p>생성된 프레젠테이션 ID: {presentationId}</p> 
            )}
        </s.Container>
    );
};

export default MakeSlide;