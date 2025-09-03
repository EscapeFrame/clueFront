import { useState, useEffect } from 'react';
import { AssignmentsApi } from '@/features/Common/Class/api/useAssignment';

interface UseAssignmentSubmissionReturn {
    isSubmitted: boolean | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useAssignmentSubmission = (assignmentId: number): UseAssignmentSubmissionReturn => {
    const [isSubmitted, setIsSubmitted] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubmissionStatus = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await AssignmentsApi.checkSubmission(assignmentId);
            if (res) {
                setIsSubmitted(res.submitted);
            } else {
                setError('제출 상태를 확인할 수 없습니다.');
            }
        } catch (err) {
            setError('제출 상태 확인 중 오류가 발생했습니다.');
            console.error('Error fetching submission status:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (assignmentId) {
            fetchSubmissionStatus();
        }
    }, [assignmentId]);

    return {
        isSubmitted,
        loading,
        error,
        refetch: fetchSubmissionStatus
    };
};