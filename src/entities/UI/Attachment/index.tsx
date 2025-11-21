import { ReactNode } from "react";
import * as s from './styles';
import { FaLink } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

interface Attachment {
  id: string;
  type: "file" | "link";
  name: string;
  url?: string;
  file?: File;
  isNew?: boolean;
}

interface Props {
  attachments: Attachment[];
  setAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>;
  openUploadModal: () => void;
  openLinkModal: (platform?: "drive" | "youtube" | "notion" | "link") => void;
  isSubmitted?: boolean;
  onDeleteAttachment: (id: string, isNew: boolean) => void; // Added this line
}

const AttachmentBox: React.FC<Props> = ({
  attachments,
  setAttachments,
  openUploadModal,
  openLinkModal,
  onDeleteAttachment, // Added this line
}) => {
  const handleRemove = (item: Attachment) => { // Modified parameter
    onDeleteAttachment(item.id, item.isNew || false); // Modified call
  };

  const buttons: {
    label: string;
    platform?: "drive" | "youtube" | "notion" | "link";
    onClick: () => void;
    icon: ReactNode;
  }[] = [
  { label: "link", platform: "link", onClick: () => openLinkModal?.("link"), icon: <FaLink /> },
  { label: "Upload", onClick: openUploadModal, icon: <FiUpload /> },
    ];

  return (
    <s.Container>
      <s.Title>첨부</s.Title>
      <s.Buttons>
        {buttons.map(({ label, onClick, icon }, idx) => (
          <s.Button key={idx} onClick={onClick}>
            <s.IconWrapper>{icon}</s.IconWrapper>
            {label}
          </s.Button>
        ))}
      </s.Buttons>

              <s.List>
                {attachments.map((item, index) => (
                  <s.Item key={index}>
                    {item.name}
                    <s.Remove onClick={() => handleRemove(item)}>✕</s.Remove>
                  </s.Item>
                ))}
              </s.List>    </s.Container>
  );
};

export default AttachmentBox;