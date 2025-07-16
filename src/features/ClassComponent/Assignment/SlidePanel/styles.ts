import styled from "@emotion/styled"
import { black, gray, white, blue } from "@/shared/styles/theme.styles"
import { fonts } from "@/shared/styles/font.styles"

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

export const Panel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: ${white};
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${gray[150]};
`

export const StatusBadge = styled.span<{ submitted: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  ${fonts.P1}
  text-align: center;
  background-color: ${({ submitted }) => (submitted ? white: blue[500])};
  border: 1px solid ${blue[500]};
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  ${fonts.P3}
  cursor: pointer;
  color: ${gray[300]};
  padding: 4px;
  
  &:hover {
    color: ${gray[400]};
  }
`

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`

export const Title = styled.h2`
  ${fonts.P3}
  color: ${black};
  margin: 0 0 16px 0;
`

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${fonts.P1}
  color: ${gray[300]};
  
  svg {
    ${fonts.P2}
  }
`

export const TimeLeft = styled.span`
  color: ${blue[600]};
  font-weight: 500;
`

export const Section = styled.div`
  margin-bottom: 24px;
`

export const SectionTitle = styled.h3`
  ${fonts.P2}
  font-weight: 600;
  color: ${black};
  margin: 0 0 12px 0;
`

export const Description = styled.p`
  ${fonts.P2}
  line-height: 1.6;
  margin: 0;
`

export const RequirementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const RequirementItem = styled.li`
  ${fonts.P1}
  color: ${gray[400]};
  margin-bottom: 8px;
  padding-left: 0;
  
  &:before {
    content: "• ";
    margin-right: 8px;
  }
`

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: ${gray[150]};
  border-radius: 8px;
  border: 1px solid ${gray[200]};
`

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  svg {
    ${fonts.P1}
    color: ${gray[300]};
  }
`

export const FileName = styled.div`
  ${fonts.P2}
  color: ${black};
`

export const FileSize = styled.div`
  ${fonts.P1}
  color: ${gray[300]};
`

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${blue[600]};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    background-color: ${gray[150]};
  }
`

export const EmptyState = styled.div`
  text-align: center;
  color:${gray[300]};
  font-size: 14px;
  padding: 20px;
  background-color: ${gray[150]};
  border-radius: 8px;
  border: 1px dashed ${gray[200]};
`

export const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid ${gray[150]};
  display: flex;
  gap: 12px;
`

export const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: ${gray[150]};
  color: ${black};
  border: 1px solid ${gray[200]};
  border-radius: 6px;
  ${fonts.P2}
  cursor: pointer;
  
  &:hover {
    background-color: ${gray[150]};
  }
`

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  padding: 12px 16px;
  background-color: ${blue[500]};
  border: none;
  border-radius: 6px;
  ${fonts.P1}
  cursor: pointer;
  
  &:hover {
    background-color: ${blue[600]};
    color: ${white}
  }
`

export const ResubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  padding: 12px 16px;
  background-color: ${blue[500]};
  color: ${black};
  border: none;
  border-radius: 6px;
  ${fonts.P1}
  cursor: pointer;
  
  &:hover {
    background-color: ${blue[600]};
    color: ${white};
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`

export const ModalContent = styled.div`
  background-color: ${white};
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 300px;
`

export const ModalTitle = styled.h3`
  ${fonts.P2}
  color:${black};
  margin: 0 0 16px 0;
`

export const FileInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${gray[250]};
  border-radius: 4px;
  margin-bottom: 16px;
`

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`

export const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: ${gray[150]};
  color: ${gray[400]};
  border: 1px solid ${gray[250]};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${gray[250]};
  }
`
export const EditButton = styled.button`
  margin-left: 8px;
  font-size: 0.875rem;
  color: #007bff;
  background: none;
  border: none;
  cursor: pointer;
`

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
`