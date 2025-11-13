import { useParams } from 'react-router-dom';
import MarkDwonEditior from '@/entities/Make/MarkDown/MarkDownEditor';

export default function MarkDown() {
    const param = useParams();
    const { classRoomId } = param;
    const { directoryId } = param;

    // if (!classRoomId) {
    //     return false
    // }

    // if (!directoryId) {
    //     return false
    // }

    console.log(directoryId);
    return (
        <MarkDwonEditior classRoomId={classRoomId} directoryId={directoryId} />
    )
}