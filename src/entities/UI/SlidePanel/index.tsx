/** @jsxImportSource @emotion/react */
import { Component, ReactNode } from 'react';
import * as s from './styles';
import { IoClose } from 'react-icons/io5';

interface SlidePanelProps {
  isOpen: boolean;                  // 패널 열림 여부
  onClose: () => void;              // 닫기 콜백
  children?: ReactNode;             // 패널 내부 내용
  width?: string;                  // 패널 너비
  title?: string;                  // 패널 제목
  userRole?: 'Teacher' | 'Student' | string;  // 권한 구분
  onSave?: (updatedContent: any) => void;     // 저장 콜백 (편집 시)
}

interface SlidePanelState {
  editableContent: string;
}

export class SlidePanel extends Component<SlidePanelProps, SlidePanelState> {
  constructor(props: SlidePanelProps) {
    super(props);
    this.state = {
      // children이 문자열일 경우에만 editableContent에 초기화
      editableContent: typeof props.children === 'string' ? props.children : '',
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ editableContent: e.target.value });
  };

  handleSave = () => {
    if (this.props.onSave) {
      this.props.onSave(this.state.editableContent);
    }
  };

  render() {
    const {
      isOpen,
      onClose,
      width = '400px',
      title = '상세 내용',
      userRole,
      children,
    } = this.props;
    const { editableContent } = this.state;

    const isTeacher = userRole === 'Teacher';

    return (
      <>
        <s.Overlay isOpen={isOpen} onClick={onClose} />
        <s.Panel
          isOpen={isOpen}
          width={width}
          role="dialog"
          aria-modal="true"
          aria-labelledby="slidepanel-title"
        >
          <s.Header>
            <div id="slidepanel-title">{title}</div>
            <s.CloseButton aria-label="닫기" onClick={onClose}>
              <IoClose size={16} />
            </s.CloseButton>
          </s.Header>
          <s.Content>
            {isTeacher ? (
              <>
                <textarea
                  value={editableContent}
                  onChange={this.handleChange}
                  style={{ width: '100%', height: '200px', fontSize: '1rem' }}
                />
                <button onClick={this.handleSave}>저장</button>
              </>
            ) : (
              <>
                {children}
              </>
            )}
          </s.Content>
        </s.Panel>
      </>
    );
  }
}