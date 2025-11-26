// dummy.ts
import { StudentAssignmentData } from '@/entities/Class/AssignmentCard/Student';

export const dummyAssignments: StudentAssignmentData[] = [
  {
    assignmentId: "a1",
    title: "수학 과제 1",
    content: "1~10번 문제 풀기",
    startDate: "2025-11-01",
    endDate: "2025-11-10",
    submissionId: "s1",
    IsSubmitted: true,
    submittedAt: "2025-11-05",
    submissionAttachmentResponses: [
      {
        submissionAttachmentId: "f1",
        type: "FILE",
        value: "/dummy/math1.pdf",
        originalFileName: "math1.pdf",
      }
    ],
  },
  {
    assignmentId: "a2",
    title: "영어 과제 1",
    content: "본문 읽고 요약하기",
    startDate: "2025-11-01",
    endDate: "2025-11-12",
    submissionId: "s2",
    IsSubmitted: false,
    submittedAt: null,
    submissionAttachmentResponses: [],
  },
  {
    assignmentId: "a3",
    title: "과학 프로젝트",
    content: "실험 보고서 작성",
    startDate: "2025-11-02",
    endDate: "2025-11-15",
    submissionId: "s3",
    IsSubmitted: true,
    submittedAt: "2025-11-06",
    submissionAttachmentResponses: [
      {
        submissionAttachmentId: "f2",
        type: "LINK",
        value: "https://example.com/science-report",
        originalFileName: "",
      }
    ],
  }
];
