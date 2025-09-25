import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import * as s from './styles'
import { useParams, useLocation } from 'react-router-dom';
import { getMarkDown } from '../../api/class/useMarkdown';

export default function MarkDownViewerPage() {
    const { documentId } = useParams<{ documentId: string }>();
    const location = useLocation();
    const [mdContent, setMdContent] = useState('Loading...');
    const [title] = useState(location.state?.title || '');

    useEffect(() => {
        if (!documentId) return;

        const fetchMdData = async () => {
            try {
                const response = await getMarkDown(documentId);
                setMdContent(response);
                console.log(response);
            } catch (error: unknown) {
                console.error("Failed to fetch markdown:", error);
                setMdContent("# Error\n\nFailed to load document.");
            }
        };

        fetchMdData();
    }, [documentId]);


    return (
        <s.Container>
            <s.ViewerSection>
                <s.SectionTitle value={title}></s.SectionTitle>
                <s.ViewerWrapper data-color-mode="light">
                    <MDEditor.Markdown
                        source={mdContent}
                        style={{ padding: '20px' }}
                    />
                </s.ViewerWrapper>
            </s.ViewerSection>
        </s.Container>
    );
}

