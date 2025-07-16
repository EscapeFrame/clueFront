import { Container } from '@/features/ClassComponent/Assignment/styles';
import ExamCard from './ExamCard';

export default function Exam() {
    return (
         <Container>
            <ExamCard examName="기초 테스트" examDate="2025-07-17" linkUrl="/class/test" />
         </Container>
    );
}