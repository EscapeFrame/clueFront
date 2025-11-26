import { useParams } from 'react-router-dom';
import MarkDwonEditior from '@/entities/Make/MarkDown/MarkDownEditor';

type Params = {
    classRoomId?: string;
    directoryId?: string;
};

export default function MarkDown() {
    const param = useParams<Params>();
    const { classRoomId, directoryId } = param;

    if (!classRoomId) return null;
    if (!directoryId) return null;

    console.log(directoryId);
    return (
        <MarkDwonEditior classRoomId={classRoomId} directoryId={directoryId} />
    );
}