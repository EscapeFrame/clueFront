import { IoClose } from 'react-icons/io5';
import { ModalProps } from '@/shared/types/modal';
import { renderButtons } from '../index';
import * as s from '../styles';

const InputModal: React.FC<ModalProps> = ({
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
    <s.Overlay onClick={onClose}>
      <s.ModalWrapper isWarning={isWarning}>
        <s.Header>
          <s.Title>{title}</s.Title>
          <s.CloseBtn 
            onClick={onClose} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClose();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="모달 닫기"
          >
            <IoClose size={16} />
          </s.CloseBtn>
        </s.Header>

        <s.Content>
          {children}
          <s.StyledInput
            type="text"
            placeholder={placeholder}
            value={inputValue || ''}  // 외부 상태 사용
            onChange={onInputChange}  // 외부 핸들러 사용
          />
        </s.Content>

        <s.Footer>
          {renderButtons(buttons, onClose)}
        </s.Footer>
      </s.ModalWrapper>
    </s.Overlay>
  );
};

export default InputModal;