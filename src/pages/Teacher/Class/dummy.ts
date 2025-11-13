import { ExamDetail } from '@/shared/types/Class/Exam';
import { Directory, NewsItem, QuestionItem } from '@/shared/types/Class/Lesson';

export const dummyDirectories: Directory[] = [
    {
        id: 'dir1',
        name: '디렉토리 1',
        isRead: true,
        directoryList: [
            { id: 'doc1', name: '문서 1', isRead: false, type: 'markdown' },
            { id: 'doc2', name: '문서 2', isRead: true, type: 'ppt' },
        ],
        readCount: 1, // 읽은 문서 수
        totalCount: 2,
    },
    {
        id: 'dir2',
        name: '디렉토리 2',
        isRead: true,
        directoryList: [
            { id: 'doc3', name: '문서 3', isRead: true, type: 'code' },
        ],
        readCount: 1,
        totalCount: 1,
    },
];

export const dummyClassCode = "12345";

export const dummyExams: ExamDetail[] = [
    {
        id: 'exam1',
        title: '중간고사',
        date: '2025-11-12',
        status: 0,
        description: '중간고사 범위: 1~5장',
        files: [
            {
                id: 'file1',
                fileName: '문서1.pdf',
                fileSize: undefined,
                name: ''
            },
            {
                id: 'file2',
                fileName: '문서2.pdf',
                fileSize: undefined,
                name: ''
            },
        ],
    },
    {
        id: 'exam2',
        title: '기말고사',
        date: '2025-12-20',
        status: 1,
        description: '기말고사 범위: 전체',
        files: [],
    },
];

import { Assignment, AssignmentFile } from '@/shared/types/Class/Assignment/Attachment';

export const dummyAssignments: Assignment[] = [
    {
        assignmentId: '1',
        title: '1차시 과제: HTML 기본',
        description: 'HTML 기본 태그와 구조를 이해하고 과제를 완성하세요.',
        files: ['/files/html_example1.pdf', '/files/html_example2.pptx'],
        content: '',
        deadline: '2025-11-05'
    },
    {
        assignmentId: '2',
        title: '2차시 과제: CSS 기초',
        description: 'CSS 기본 선택자와 속성을 사용하여 스타일을 적용하세요.',
        files: ['/files/html_example1.pdf', '/files/html_example2.pptx'],
        content: '',
        deadline: '2025-11-05'
    },
    {
        assignmentId: '3',
        title: '3차시 과제: JavaScript 기초',
        description: 'JS 기본 문법과 DOM 조작 연습',
        files: [],
        content: '',
        deadline: '2025-11-05'
    },
];