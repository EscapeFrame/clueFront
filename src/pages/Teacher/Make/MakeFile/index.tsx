import React, { useState } from "react";
import Customapi from '@/shared/config/api';
import * as s from './styles';
import Button from "@/entities/UI/Button";

const MakeFile: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [presentationId, setPresentationId] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const f = e.target.files && e.target.files[0];
        if (f) setFile(f);
    };

    const readFileAsBase64 = (f: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = () => reject(new Error('파일 읽기 실패'));
            reader.onload = () => {
                const result = reader.result as string;
                // data:<mime>;base64,<data> 형태면 prefix를 제거
                const parts = result.split(',');
                resolve(parts.length > 1 ? parts[1] : parts[0]);
            };
            reader.readAsDataURL(f);
        });
    };

    const createFile = async () => {
        if (!file) {
            setError('업로드할 파일을 선택하세요.');
            return;
        }

        setLoading(true);
        setError(null);
        setPresentationId(null);

        try {
            const base64 = await readFileAsBase64(file);

            const payload = {
                metadata: [
                    {
                        title: file.name,
                    },
                ],
                files: [base64],
            };

            const res = await Customapi.post('/api/document/file', payload);

            // 가능한 응답 필드들을 순서대로 검사
            const id = res?.data?.presentationId || res?.data?.id || res?.data?.data?.id || null;
            if (id) {
                setPresentationId(String(id));
            } else {
                // 응답에 id가 없더라도 성공으로 판단할 수 있음 — 메시지에 따라 조정
                setPresentationId('uploaded');
            }
        } catch (err) {
            // err may be unknown; coerce safely
            const message = err && typeof err === 'object' && 'message' in err ? (err as { message?: string }).message : String(err);
            setError(message || '업로드 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <s.Container>
            <s.Card>
                <s.FileRow>
                    <s.FileLabel htmlFor="file-input">파일 선택</s.FileLabel>
                    <input id="file-input" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                    {file ? <s.FileName>{file.name}</s.FileName> : <s.FileName>선택된 파일 없음</s.FileName>}
                </s.FileRow>

                <s.Actions>
                    <Button text="파일 등록" onClick={createFile} disabled={loading} />
                </s.Actions>

                {loading && <s.Status variant="info">생성 중...</s.Status>}
                {error && <s.Status variant="error">{error}</s.Status>}
                {presentationId && <s.Status variant="success">파일 생성 완료: {presentationId}</s.Status>}
            </s.Card>
        </s.Container>
    );
};

export default MakeFile;