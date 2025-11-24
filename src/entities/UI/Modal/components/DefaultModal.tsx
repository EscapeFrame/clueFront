import { ModalProps } from '@/shared/types/modal';
import { IoClose } from 'react-icons/io5';
import { renderButtons } from '../index';
import * as s from '../styles';

const DefaultModal: React.FC<ModalProps> = ({ title, children, onClose, isWarning, buttons }) => {
  return (
    <s.Overlay>
      <s.ModalWrapper isWarning={isWarning}>
        <s.Header>
          <s.Title>{title}</s.Title>
          <s.CloseBtn onClick={onClose} aria-label="CloseModal"><IoClose size={16} /></s.CloseBtn>
        </s.Header>

        <s.Content>{children}</s.Content>

        <s.Footer>
          {renderButtons(buttons, onClose)}
        </s.Footer>
      </s.ModalWrapper>
    </s.Overlay>
  );
};

export default DefaultModal;