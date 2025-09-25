import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex;
  padding: 2rem 8rem;
  gap: 2rem;
`;

export const LeftPanel = styled.div`
  width: 70%;
`;

export const RightPanel = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DirectoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div<{ $isRead: boolean }>`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  position: relative;
  padding-right: 3rem;
`;

export const SubItem = styled.div<{ $isRead: boolean }>`
  background-color: ${theme.colors.gray[200]};
  border: 1px solid ${theme.colors.gray[300]};
  padding: 0.6rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const AddSub = styled.div `
  background-color: ${theme.colors.blue[400]};
  border: 1px solid ${theme.colors.gray[300]};
  padding: 0.6rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`

export const Check = styled.span`
  width: 1rem;
  text-align: center;
  color: ${theme.colors.blue[500]};
`;

export const Name = styled.span`
  flex-grow: 1;
`;

export const Icon = styled.span`
  margin-left: auto;
`;

export const DeleteIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(239, 68, 68, 0.1);
  z-index: 1;
  
  &:hover {
    background-color: rgba(239, 68, 68, 0.2);
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ModalTitle = styled.h3`
  ${fonts.P2}
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

export const ModalText = styled.p`
  ${fonts.P2}
  color: ${theme.colors.black};
  margin: 0;
  padding: 0;
`;

export const ModalMeta = styled.p`
  ${fonts.P1}
  color: ${theme.colors.gray[600]};
  margin: 0;
  padding: 0;
`;

export const SubDirectoryList = styled.div<{ $isExpanded: boolean }>`
  overflow: auto;
  max-height: ${({ $isExpanded }) => ($isExpanded ? '2000px' : '0')};
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PlusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[600]};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.blue[600]};
  }
`;