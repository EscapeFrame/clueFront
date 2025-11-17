import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 2rem 8rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const SettingButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  cursor: pointer;
  ${fonts.P2};
  width: 10rem;
  padding: 1rem;
  border-radius: 8px;
`;

export const AddButton = styled.button`
  background: ${colors.gray[3]};
  color: ${colors.black};
  border: none;
  cursor: pointer;
  ${fonts.P2};
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;

  &:hover {
    background: ${colors.blue.light4};
    color: ${colors.white};
  }
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

export const Description = styled.p`
  ${fonts.P2};
  color: ${colors.gray[4]};
  margin: 0; 
  padding: 0; 
  
  @media (max-width: 1200px) { 
    ${fonts.P1} 
  } 

  @media (max-width: 768px) { 
    ${fonts.P1};
    text-align: center; 
  } 
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 8px;
`;

export const LeftGroup = styled.div`
 display: flex; 
 align-items: center;
`; 
 
 export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; 
`;

// 상위 디렉토리 (1차시, 2차시)
export const DirectoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.gray[3]};
  border-radius: 12px;
  background-color: ${colors.white};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const Item = styled.div<{ $isRead: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  background-color: ${colors.white};
  transition: background-color 0.2s ease;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Name = styled.span`
  ${fonts.P3};
  color: ${colors.black};
  flex-grow: 1;
`;

export const Progress = styled.span`
  ${fonts.P2};
  color: ${colors.gray[4]};
  padding: 0.25rem 0.75rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 999px;
  text-align: center;
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray[4]};
`;

export const AddSub = styled.div`
  background-color: ${colors.primary};
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${colors.blue.dep1};
  }
`;

export const ProgressBarWrapper = styled.div`
  display: flex;           
  align-items: center;     
  gap: 10px;              
  height: 1rem;
  margin: 0 1.5rem 1.5rem 1.5rem;
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  background: ${colors.primary};
  border-radius: 4rem;
  transition: width 0.5s ease;
  width: ${({ $progress }) => $progress}%;
`;

export const ProgressText = styled.span`
  flex-shrink: 0;          /* 텍스트가 줄어들지 않도록 고정 */
  font-size: 0.9rem;
  color: ${colors.primary};
`;

// 서브 디렉토리 영역
export const SubDirectoryList = styled.div<{ $isExpanded: boolean }>`
  max-height: ${({ $isExpanded }) => ($isExpanded ? '1000px' : '0')};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: ${({ $isExpanded }) => ($isExpanded ? '0.8rem 0' : '0')};
  background-color: ${colors.gray[1]};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const SubItem = styled.div<{ $isRead: boolean }>`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[2]};
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  margin: 0 1rem;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: ${colors.gray[2]};
    transform: translateX(4px);
  }
`;

export const Check = styled.span<{ $isRead?: boolean }>`
  ${fonts.P3};
  padding: 0.5rem;
  text-align: center;
  border-radius: 8px;
  background-color: ${({ $isRead }) => ($isRead ? colors.blue.light2 : colors.gray[1])};
  color: ${({ $isRead }) => ($isRead ? colors.primary : colors.gray[4])};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DeleteIcon = styled.span`
  margin-left: auto;
  color: ${colors.red[3]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, transform 0.2s ease;
  border-radius: 50%;
  padding: 2px;

  &:hover {
    background-color: rgba(255, 0, 0, 0.1);
    transform: scale(1.1);
  }
`;

// 수업코드
export const CardContainer = styled.div`
  background: ${colors.white};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
  margin: 10px 0;
  padding: 0.1rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  gap: 15px;
  cursor: pointer;
`;

export const CardTitle = styled.h2`
  ${fonts.P3}
  font-weight: 600;
  color: ${colors.primary};
`;

export const CardText = styled.h2`
  ${fonts.P2}
  color: ${colors.black};
`;