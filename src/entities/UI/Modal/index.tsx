import { ModalProps, ButtonData } from '@/shared/types/modal';
import Button from '@/entities/UI/Button';
import InputModal from './components/InputModal';
import FileModal from './components/FileModal';
import DefaultModal from './components/DefaultModal';

export const renderButtons = (
  buttons: ButtonData[],
  onClose: () => void
) => buttons.map(({ text, type = 0, width = 'auto', onClick }, idx) => (
  <Button
    key={idx}
    text={text}
    type={type}
    width={width}
    onClick={onClick ? onClick : text === '취소' ? onClose : undefined}
  />
));

export const Modal: React.FC<ModalProps> = (props) => {
  switch (props.notes) {
    case 'input':
      return <InputModal {...props} />;
    case 'file':
      return <FileModal {...props} />;
    case 'default':
    default:
      return <DefaultModal {...props} />;
  }
};