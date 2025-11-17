export interface SubmissionAttachmentResponse {
  submissionAttachmentId: string;
  type: 'FILE' | string;
  value: string;
  originalFileName: string;
  contentType: string;
  size: number;
}

export interface StudentSubmission {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  userName: string;
  submissionId: string;
  IsSubmitted: boolean;
  submittedAt: string;
  submissionAttachmentResponses: SubmissionAttachmentResponse[];
}
