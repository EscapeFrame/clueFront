import { useParams } from 'react-router-dom';
import MarkDownViewer from '@/features/Common/Class/Lesson/markdown/Markdown';

export default function MarkDown() {
    const param = useParams();
    const { documentId } = param;

    if (!documentId) {
        return false
    }

    console.log(documentId);
    return (
        <MarkDownViewer />
    )
}