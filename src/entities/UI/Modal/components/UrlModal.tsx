import { ModalProps } from '@/shared/types/modal';
import { IoClose } from 'react-icons/io5';
import { renderButtons } from '../index';
import * as s from '../styles';

const UrlModal: React.FC<ModalProps> = ({
  title, 
  children, 
  onClose, 
  isWarning, 
  buttons, 
  placeholder,
  inputValue,      // 외부에서 전달받은 값 사용
  onInputChange,   // 외부에서 전달받은 핸들러 사용
}) => {

  return (
    <s.Overlay>
      <s.ModalWrapper isWarning={isWarning}>
        <s.Header>
          <s.Title>{title}</s.Title>
          <s.CloseBtn onClick={onClose} aria-label="CloseModal"><IoClose size={16} /></s.CloseBtn>
        </s.Header>

        <s.Content>
          {children}
          <s.StyledInput
            type="url"
            inputMode='url'
            autoFocus
            placeholder={placeholder}
            value={inputValue || ''}  // 외부 상태 사용
            onChange={onInputChange}  // 외부 핸들러 사용
            aria-label="URL 입력"
          />
        </s.Content>

        <s.Footer>
          {renderButtons(buttons, onClose)}
        </s.Footer>
      </s.ModalWrapper>
    </s.Overlay>
  );
};

export default UrlModal;