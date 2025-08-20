import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import * as s from './styles';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/entities/UI/Modal';
// 언젠가는 Modal 컴포넌트 다시 손봐야 할듯

export default function MarkDwonEditor() {
    const defaultTemplate = '# 마크다운을 작성해보세요\n\n## 제목\n- 목록 1\n- 목록 2\n\n**굵은 글씨**와 *기울임체*도 사용할 수 있습니다.';
    const [mdContent, setMdContent] = useState(defaultTemplate);
    const navigate = useNavigate();

    // 모달 상태
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [isPreviousOpen, setIsPreviousOpen] = useState(false);
    const [isEndOpen, setIsEndOpen] = useState(false);

    // 취소
    const cancel = () => {
        setIsCancelOpen(true);
    }

    // 이전
    const previous = () => {
        setIsPreviousOpen(true);
    }

    // 완료
    const end = () => {
        setIsEndOpen(true);
        console.log(mdContent);
    }

    return (
        <s.Container>
            <s.EditorSection>
                <s.SectionTitle>마크다운 에디터</s.SectionTitle>
                <s.EditorWrapper data-color-mode="light">
                    <MDEditor
                        height="99%"
                        value={mdContent}
                        autoFocus={true}
                        style={{ whiteSpace: 'pre-wrap' }}
                        onChange={(value: string | undefined) => setMdContent(value || '')}
                        preview="edit"
                    />
                </s.EditorWrapper>
                <s.ButtonWrapper>
                    <s.previousButton onClick={previous}>
                        이전으로
                    </s.previousButton>
                    <s.saveWrapper>
                        <s.cancelButton onClick={cancel}>
                            취소
                        </s.cancelButton>
                        <s.endButton onClick={end}>
                            완료
                        </s.endButton>
                    </s.saveWrapper>
                </s.ButtonWrapper>
            </s.EditorSection>

            <s.ViewerSection>
                <s.SectionTitle>실시간 미리보기</s.SectionTitle>
                <s.ViewerWrapper data-color-mode="light">
                    <MDEditor.Markdown
                        source={mdContent}
                        style={{ padding: '20px' }}
                    />
                </s.ViewerWrapper>
            </s.ViewerSection>
            {/* 취소 */}
            {isCancelOpen && (
                <Modal
                    title="내용을 취소하시겠습니까?"
                    onClose={() => setIsCancelOpen(false)}
                    buttons={[
                        {
                            text: '확인',
                            type: 0,
                            onClick: () => {
                                setMdContent(defaultTemplate);
                                setIsCancelOpen(false);
                            },
                        },
                        { text: '닫기', type: 1, onClick: () => setIsCancelOpen(false) },
                    ]}
                >
                    현재 작성 중인 내용이 초기화됩니다.
                </Modal>
            )}  
            {/* 이전 */}
            {isPreviousOpen && (
                <Modal
                    title="이전 페이지로 이동하시겠습니까?"
                    onClose={() => setIsPreviousOpen(false)}
                    buttons={[
                        {
                            text: '이동',
                            type: 0,
                            onClick: () => navigate(-1),
                        },
                        { text: '닫기', type: 1, onClick: () => setIsPreviousOpen(false) },
                    ]}
                >
                    작성 중인 내용은 저장되지 않습니다.
                </Modal>
            )}
            {/* 완료 */}    
            {isEndOpen && (
                <Modal
                    title="작성을 완료하시겠습니까?"
                    onClose={() => setIsEndOpen(false)}
                    buttons={[
                        {
                            text: '완료',
                            type: 0,
                            onClick: () => {
                                setIsEndOpen(false);
                            },
                        },
                        { text: '닫기', type: 1, onClick: () => setIsEndOpen(false) },
                    ]}
                >
                    확인을 누르면 작성이 완료됩니다.
                </Modal>
            )}
        </s.Container>
    );
}

