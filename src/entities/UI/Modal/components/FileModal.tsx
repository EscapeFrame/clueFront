import { useRef, useState } from 'react';
import * as s from '../styles';

interface FileModalProps {
  onClose: () => void;
  onFileUpload?: (files: FileList) => void;
}

const FileModal: React.FC<FileModalProps> = ({ onClose, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (files?.length) onFileUpload?.(files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <s.Overlay onClick={onClose}>
      <s.ModalWrapper onClick={(e) => e.stopPropagation()}>
        <s.Header>
          <s.Title>파일 제출하기</s.Title>
          <s.CloseBtn onClick={onClose}>&times;</s.CloseBtn>
        </s.Header>

        <s.Content>
          <s.DropZone
            $isDragOver={isDragOver}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragOver(false);
            }}
            onDrop={handleDrop}
            htmlFor="file-upload"
          >
            <s.UploadIcon />
            <p>파일을 끌어다 놓거나 클릭하여 업로드하세요</p>
          </s.DropZone>

          <s.HiddenFileInput
            ref={fileInputRef}
            id="file-upload"
            type="file"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </s.Content>

        <s.Footer>
          <s.CancelButton onClick={onClose}>제출취소</s.CancelButton>
          <s.ConfirmButton onClick={() => fileInputRef.current?.click()}>
            확인
          </s.ConfirmButton>
        </s.Footer>
      </s.ModalWrapper>
    </s.Overlay>
  );
};

export default FileModal;