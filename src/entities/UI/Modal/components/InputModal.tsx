import { useState } from 'react';
import { ModalProps } from '@/shared/types/modal';
import { renderButtons } from '../index';
import * as s from '../styles';

const InputModal: React.FC<ModalProps> = ({
  title, children, onClose, isWarning, buttons, placeholder,
}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <s.Overlay>
      <s.ModalWrapper isWarning={isWarning}>
        <s.Header>
          <s.Title>{title}</s.Title>
          <s.CloseBtn onClick={onClose} aria-label="CloseModal">&times;</s.CloseBtn>
        </s.Header>

        <s.Content>
          {children}
          <s.StyledInput
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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