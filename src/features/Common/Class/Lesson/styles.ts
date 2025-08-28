import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';

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
  gap: 2rem;
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

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModalTitle = styled.h3`
  margin: 0;
`;

export const ModalText = styled.p`
  margin: 0;
`;

export const ModalMeta = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.gray[600]};
`;