import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { colors } from '@/shared/theme/theme.styles';

export const Container = styled.div`
  padding: 2rem 8rem;
  background-color: ${colors.white};
  color: ${colors.black};

  @media (max-width: 1200px) {
    padding: 2rem 4rem;
  }
  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

export const DeleteButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  cursor: pointer;
  ${fonts.P2};
  padding: 1rem;
  border-radius: 8px;
`;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  ${fonts.P5};
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;

  &:hover {
    opacity: 0.8;
    color: ${colors.primary};
  }

  @media (max-width: 768px) {
    ${fonts.P4};
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const Title = styled.p`
  ${fonts.P4};
  font-weight: 600;
  text-align: left;
  margin-left: 0.5rem;

  @media (max-width: 1200px) {
    ${fonts.P3};
  }
  @media (max-width: 768px) {
    ${fonts.P2};
  }
`;

export const State = styled.div`
  display: flex;
  gap: 1rem;
  margin: 10px 0;
  flex-wrap: wrap;
`;

export const DetailState = styled.div`
  ${fonts.P3};
  display: flex;
  align-items: center;
  background-color: ${colors.blue.light2};
  border: 1px solid ${colors.primary};
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 0.5rem;

  & > .text-group {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.25rem;
    border-radius: 0.25rem;
    ${fonts.P2};
  }
`;

export const SubTitle = styled.h3`
  ${fonts.P4};
  font-weight: 500;
  margin: 1rem 0;

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;

export const Description = styled.p`
  ${fonts.P4};
  line-height: 1.5;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;

export const File = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid ${colors.gray[4]};
  border-radius: 0.5rem;
  background-color: ${colors.gray[2]};

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1 1 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const EditTitleInput = styled.input`
  ${fonts.P3};
  font-weight: 600;
  padding: 0.5rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 0.25rem;

  &:focus {
    outline: 2px solid ${colors.primary};
    border-color: ${colors.primary};
  }

  @media (max-width: 768px) {
    ${fonts.P4};
  }
`;

export const EditTextarea = styled.textarea`
  ${fonts.P2};
  line-height: 1.5;
  padding: 0.5rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 0.25rem;
  width: 100%;
  resize: vertical;
  margin-bottom: 3rem;

  &:focus {
    outline: 2px solid ${colors.primary};
    border-color: ${colors.primary};
  }

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;

export const EditButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FileSection = styled.div`
  margin-bottom: 2rem;
`;

export const FileSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 0.5rem;
  width: 100%;
  cursor: pointer;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.75rem;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${fonts.P3};
`;

export const FileRemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.red[3]};
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    color: ${colors.red[2]};
  }
`;

export const EmptyFileMessage = styled.p`
  ${fonts.P3};
  color: ${colors.gray[4]};
  text-align: center;
  padding: 2rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 0.5rem;
`;

export const ModalContent = styled.div`
  padding: 1rem 0;
`;

export const FileIcon = styled.div`
  color: ${colors.gray[4]};
`;

export const FileUploadArea = styled.div<{ isDragOver: boolean }>`
  width: 100%;
  height: 150px;
  border: 2px dashed ${props => props.isDragOver ? colors.primary : colors.gray[4]};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;

  &:hover {
    border-color: ${colors.primary};
  }

  p {
    ${fonts.P3};
    color: ${colors.gray[4]};
    margin-top: 0.5rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    height: 120px;
  }
`;

export const TempFileList = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

export const EmptyMessage = styled.p`
  ${fonts.P3};
  color: ${colors.gray[4]};
  text-align: center;
  padding: 1rem;
`;

export const TempFileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 0.25rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TempFileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${fonts.P3};
  flex: 1;
`;

export const FileSize = styled.span`
  color: ${colors.gray[4]};
  ${fonts.P2};
`;

export const TempFileRemove = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.gray[4]};
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    color: ${colors.red[3]};
  }
`;
