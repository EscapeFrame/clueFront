import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 0 8rem;
`;

export const ErrorText = styled.p`
  ${fonts.P3}
  color: ${colors.red[3]};
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

export const Description = styled.p`
  ${fonts.P3};
  color: ${colors.gray[4]};
  margin: 0; 
  padding: 0; 
  
  @media (max-width: 1200px) { 
    ${fonts.P2} 
  } 

  @media (max-width: 768px) { 
    ${fonts.P1};
    text-align: center; 
  } 
`;

export const LeftGroup = styled.div`
 display: flex; 
 align-items: center;
`; 
 
 export const RightGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const SettingButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  cursor: pointer;
  ${fonts.P2};
  padding: 1rem;
  border-radius: 8px;
`;

// 세부 수행평가 내용
export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: ${colors.gray[1]};
`;

export const State = styled.div<{ $status: 0 | 1 }>`
  padding: 10px;
  border-radius: 4rem;
  margin-right: 1rem;
  background-color: ${({ $status }) =>
    $status === 0 ? colors.gray[1] : colors.blue.light2};
  border: 1px solid ${({ $status }) =>
    $status === 0 ? colors.gray[3] : colors.blue.light4};
`;

export const StatusText = styled.span<{ $status: 0 | 1 }>`
  ${fonts.P2};
  color: ${({ $status }) =>
    $status === 0 ? colors.gray[4] : colors.primary};
`;

export const Title = styled.span`
  ${fonts.P3};
  color: ${colors.black};
  font-weight: 600;
`;

export const Date = styled.span`
  ${fonts.P2};
  color: ${colors.gray[4]};
`;

// 모달
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  width: 500px;
  max-width: 90%;
  background: ${colors.white};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ModalTitle = styled.h3`
  ${fonts.P4};
  color: ${colors.black};
  font-weight: 600;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 0.5rem;
  background-color: ${colors.gray[1]};
  margin-bottom: 0.5rem;

  .fileInfo {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  a {
    color: ${colors.black};
    text-decoration: none;
    font-weight: 500;
  }

  span {
    ${fonts.P1}
    color: ${colors.gray[4]};
  }

  button {
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.gray[3]};
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
}
`;


export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const Button = styled.button`
  ${fonts.P2};
  padding: 0.5rem 1rem;
  background: ${colors.primary};
  color: ${colors.white};
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${colors.blue.dep1};
  }
`;

export const ButtonDelete = styled(Button)`
  background: ${colors.red[3]};

  &:hover {
    background: ${colors.red[3]};
  }
`;
