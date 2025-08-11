import { ReactNode } from "react";
import * as s from './styles';
import { FaGoogleDrive, FaYoutube, FaLink } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { FiUpload } from "react-icons/fi";

interface Attachment {
  type: "file" | "link";
  name: string;
  url?: string;
  file?: File;
}

interface Props {
  attachments: Attachment[];
  setAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>;
  openUploadModal: () => void;
  openLinkModal: (platform: "drive" | "youtube" | "notion" | "link") => void;
}

const AttachmentBox: React.FC<Props> = ({
  attachments,
  setAttachments,
  openUploadModal,
  openLinkModal,
}) => {
  const handleRemove = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const buttons: {
    label: string;
    platform?: "drive" | "youtube" | "notion" | "link";
    onClick: () => void;
    icon: ReactNode;
  }[] = [
      { label: "Drive", platform: "drive", onClick: () => openLinkModal("drive"), icon: <FaGoogleDrive /> },
      { label: "YouTube", platform: "youtube", onClick: () => openLinkModal("youtube"), icon: <FaYoutube /> },
      { label: "Notion", platform: "notion", onClick: () => openLinkModal("notion"), icon: <SiNotion /> },
      { label: "link", platform: "link", onClick: () => openLinkModal("link"), icon: <FaLink /> },
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
            <s.Remove onClick={() => handleRemove(index)}>✕</s.Remove>
          </s.Item>
        ))}
      </s.List>
    </s.Container>
  );
};

export default AttachmentBox;