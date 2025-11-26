// MarkDownViewerPage.tsx

import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import * as s from './styles';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/entities/Context/LoginContext';
// import { getMarkDown } from '../../api/class/useMarkdown';
// import { getLessonDirectories as qre } from '@/features/Common/Class/api/useLesson';
import { IoListOutline } from 'react-icons/io5';
// import { IoChatbubbleOutline } from 'react-icons/io5';
// import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';

interface Document {
  documentId: number;
  title: string;
}

interface Directory {
  directoryId: number;
  directoryName: string;
  documentList?: Document[];
}

// interface DirectoryResponse {
//   directoryList: Directory[];
// }

// 더미 데이터
const DUMMY_DIRECTORIES: Directory[] = [
  {
    directoryId: 1,
    directoryName: '1주차 - JavaScript 기초',
    documentList: [
      { documentId: 101, title: '변수와 데이터 타입' },
      { documentId: 102, title: '연산자와 조건문' },
      { documentId: 103, title: '반복문과 배열' },
    ],
  },
  {
    directoryId: 2,
    directoryName: '2주차 - 함수와 객체',
    documentList: [
      { documentId: 201, title: '함수 선언과 호출' },
      { documentId: 202, title: '객체 리터럴' },
      { documentId: 203, title: '프로토타입과 상속' },
    ],
  },
  {
    directoryId: 3,
    directoryName: '3주차 - React 입문',
    documentList: [
      { documentId: 301, title: 'React 시작하기' },
      { documentId: 302, title: '컴포넌트와 Props' },
      { documentId: 303, title: 'State와 Lifecycle' },
      { documentId: 304, title: 'Hooks 기초' },
    ],
  },
  {
    directoryId: 4,
    directoryName: '4주차 - 고급 React',
    documentList: [
      { documentId: 401, title: 'Context API' },
      { documentId: 402, title: 'Custom Hooks' },
      { documentId: 403, title: 'Performance 최적화' },
    ],
  },
  {
    directoryId: 5,
    directoryName: '5주차 - 프로젝트',
    documentList: [
      { documentId: 501, title: '프로젝트 기획' },
      { documentId: 502, title: '구현 및 테스트' },
      { documentId: 503, title: '최종 발표' },
    ],
  },
];

// 더미 마크다운 콘텐츠
const DUMMY_MARKDOWN = `# React 컴포넌트와 Props

## 학습 목표
이번 강의에서는 React의 핵심 개념인 **컴포넌트**와 **Props**에 대해 배웁니다.

## 1. 컴포넌트란?

컴포넌트는 React 애플리케이션을 구성하는 **독립적이고 재사용 가능한 코드 조각**입니다.

### 함수 컴포넌트 예시

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

### 클래스 컴포넌트 예시

\`\`\`jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
\`\`\`

## 2. Props (Properties)

Props는 **부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달**하는 방법입니다.

### Props 전달하기

\`\`\`jsx
<Welcome name="공도형" age={25} />
\`\`\`

### Props 받기

\`\`\`jsx
function Welcome({ name, age }) {
  return (
    <div>
      <h1>안녕하세요, {name}님!</h1>
      <p>나이: {age}세</p>
    </div>
  );
}
\`\`\`

## 3. Props의 특징

- **읽기 전용**: Props는 컴포넌트 내에서 수정할 수 없습니다
- **단방향 데이터 흐름**: 부모 → 자식 방향으로만 전달됩니다
- **재사용성**: 같은 컴포넌트를 다른 Props로 여러 번 사용할 수 있습니다

## 4. 실습 과제

다음 요구사항을 만족하는 \`UserCard\` 컴포넌트를 만들어보세요:

1. \`name\`, \`email\`, \`avatar\` props를 받습니다
2. 프로필 이미지와 사용자 정보를 표시합니다
3. 스타일링을 적용합니다

### 예시 코드

\`\`\`jsx
function UserCard({ name, email, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}
\`\`\`

## 5. 참고 자료

- [React 공식 문서 - Components and Props](https://react.dev/learn/passing-props-to-a-component)
- [MDN - JavaScript 구조 분해 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

---

**다음 강의 예고**: State와 이벤트 핸들링에 대해 배웁니다! 🚀
`;

const Sidebar = () => {
  const { classRoomId, documentId } = useParams<{ classRoomId: string; documentId: string }>();
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [openDirs, setOpenDirs] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'curriculum' | 'chat' | 'question'>('curriculum');
  const navigate = useNavigate();

  useEffect(() => {
    // 더미 데이터 항상 사용 (개발 중)
    setDirectories(DUMMY_DIRECTORIES);
    // 첫 번째 디렉토리 자동 열기
    if (DUMMY_DIRECTORIES.length > 0) {
      setOpenDirs(new Set([DUMMY_DIRECTORIES[0].directoryId]));
    }
  }, [classRoomId, documentId]);

  const toggleDir = (dirId: number) => {
    setOpenDirs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dirId)) newSet.delete(dirId);
      else newSet.add(dirId);
      return newSet;
    });
  };

  return (
    <s.Sidebar>
      <s.TopTabs>
        <s.TabButton 
          active={activeTab === 'curriculum'} 
          onClick={() => setActiveTab('curriculum')}
        >
          <IoListOutline />
          <s.TopButton>커리큘럼</s.TopButton>
        </s.TabButton>
        {/* <s.TabButton 
          active={activeTab === 'chat'} 
          onClick={() => setActiveTab('chat')}
        >
          <IoChatbubbleOutline />
          <span>채팅</span>
        </s.TabButton>
        <s.TabButton 
          active={activeTab === 'question'} 
          onClick={() => setActiveTab('question')}
        >
          <AiOutlineQuestionCircle />
          <span>질문</span>
        </s.TabButton> */}
      </s.TopTabs>

      {activeTab === 'curriculum' && (
        <s.NavigationSection>
          {directories.map((dir) => (
            <div key={dir.directoryId}>
              <s.DirectoryItem onClick={() => toggleDir(dir.directoryId)}>
                <span>{dir.directoryName}</span>
                <s.ArrowIcon isOpen={openDirs.has(dir.directoryId)}>
                  <IoIosArrowDown />
                </s.ArrowIcon>
              </s.DirectoryItem>
              {openDirs.has(dir.directoryId) && dir.documentList && (
                <s.DocumentList>
                  {dir.documentList.map((doc: Document) => (
                    <s.DocumentItem
                      key={doc.documentId}
                      active={String(doc.documentId) === documentId}
                      onClick={() =>
                        navigate(`/class/${classRoomId}/${doc.documentId}`, {
                          state: { title: doc.title },
                        })
                      }
                    >
                      {doc.title}
                    </s.DocumentItem>
                  ))}
                </s.DocumentList>
              )}
            </div>
          ))}
        </s.NavigationSection>
      )}
    </s.Sidebar>
  );
};

export default function MarkDownViewerPage() {
  const { classRoomId, documentId } = useParams<{ classRoomId: string; documentId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [mdContent, setMdContent] = useState('Loading...');
  const [title, setTitle] = useState(location.state?.title || '문서');

  useEffect(() => {
    // 더미 마크다운 항상 사용 (개발 중)
    setMdContent(DUMMY_MARKDOWN);
    setTitle('React 컴포넌트와 Props');
  }, [documentId, classRoomId]);

  useEffect(() => {
    setTitle(location.state?.title || '문서');
  }, [location.state?.title]);

  const userCtx = useContext(UserContext);
  const isTeacher = !!userCtx?.user && userCtx.user.role === 'TEACHER';

  return (
    <s.PageWrapper>
      <Sidebar />
      <s.Container>
        <s.ViewerContainer>
          <s.ViewerHeader>
            <h1>{title}</h1>
          </s.ViewerHeader>
          <s.ViewerWrapper data-color-mode="light">
            <MDEditor.Markdown source={mdContent} />
          </s.ViewerWrapper>
        </s.ViewerContainer>
      </s.Container>

      {isTeacher && (
        <s.FloatingButton onClick={() => {
          if (!classRoomId || !documentId) {
            return;
          }
          navigate(`/class/${classRoomId}/${documentId}/quiz`);
        }}>
          Quiz 생성
        </s.FloatingButton>
      )}
    </s.PageWrapper>
  );
}