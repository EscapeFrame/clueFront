import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import * as s from './styles';
import { useNavigate } from 'react-router-dom';

export default function MarkDwonEditor() {
    const [mdContent, setMdContent] = useState('# 마크다운을 작성해보세요\n\n## 제목\n- 목록 1\n- 목록 2\n\n**굵은 글씨**와 *기울임체*도 사용할 수 있습니다.');
    const navigate = useNavigate();

    const previous = () => {
        navigate(-1);
    }

    return (
        <s.Container>
            <s.EditorSection>
                <s.SectionTitle>마크다운 에디터</s.SectionTitle>
                <s.EditorWrapper>
                    <MDEditor 
                        height={800} 
                        value={mdContent} 
                        onChange={(value) => setMdContent(value || '')}
                        preview="edit"
                    />
                </s.EditorWrapper>
                <div onClick={previous}>
                    이전으로
                </div>
            </s.EditorSection>
            
            <s.ViewerSection>
                <s.SectionTitle>실시간 미리보기</s.SectionTitle>
                <s.ViewerWrapper>
                    <MDEditor.Markdown 
                        source={mdContent} 
                        style={{ padding: '20px' }}
                    />
                </s.ViewerWrapper>
            </s.ViewerSection>
        </s.Container>
    );
}

