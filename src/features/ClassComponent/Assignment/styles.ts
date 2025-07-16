import styled from '@emotion/styled';
import { black, blue, gray, white } from '@/shared/styles/theme.styles';
import { fonts } from '@/shared/styles/font.styles';

export const Container = styled.div`
  padding: 20px 10rem;
`;

export const CardGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
`;

export const GroupSection = styled.section`
  margin-bottom: 2rem;
`;

// Card를 flex column으로 설정, 버튼을 아래 고정
export const Card = styled.div`
  background-color: ${white};
  border-radius: 0.5rem;
  border: 1px solid ${gray[200]};
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease-in-out;
  min-height: 270px;

  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

// 카드 본문 영역 (내용)
export const CardContent = styled.div`
  flex-grow: 1;  // 버튼을 아래로 밀기 위해 공간 차지
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const Title = styled.h3`
  color: ${black};
  ${fonts.P2}
  margin: 0;
  flex-grow: 1;
  white-space: normal;
  overflow-wrap: normal;
  word-break: normal;
`;

export const Status = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  ${fonts.P1}
  color: ${black};
  margin: 0;
  white-space: nowrap;
  display: inline-block;
`;

export const StatusNotSubmitted = styled(Status)`
  background-color: ${blue[500]};
  color: ${white};
  border: none;
`;

export const StatusSubmitted = styled(Status)`
  background-color: ${white};
  color: ${blue[400]};
  border: 2px solid ${blue[400]};
`;

export const InfoSection = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${fonts.P1}
  color: ${gray[300]};
  margin: 0;
  padding: 0;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const Icon = styled.div`
  width: 1rem;
  height: 1rem;
`;

export const FileSection = styled.div`
  margin-bottom: 1rem;
  min-height: 48px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const FileName = styled.div`
  ${fonts.P1}
  color: ${black};
`;

export const FileSize = styled.div`
  ${fonts.P1}
  color: ${gray[400]};
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${gray[400]};
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  margin-left: 0.5rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${black};
  }
`;

export const UploadButton = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid ${gray[200]};
  background-color: ${gray[150]};
  cursor: pointer;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: ${gray[200]};
  }
`;

// 버튼 래퍼, 항상 카드 아래쪽에 위치하도록 마진 탑 auto로 밀기
export const ButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  gap: 0.5rem;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem 0;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
`;

export const SubmitButton = styled(Button)`
  background-color: ${blue[500]};
  color: ${white};

  &:hover {
    background-color: ${blue[600]};
  }
`;

export const ResubmitButton = styled(Button)`
  background-color: ${white};
  color: ${black};
  border: 1px solid ${gray[200]};

  &:hover {
    background-color: ${gray[100]};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: ${white};
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

export const DisplayFlex = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const PreviewCard = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #f0f0f0;
  }
`;

export const PreviewTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const PreviewStatus = styled.span`
  font-size: 0.9rem;
  color: gray;
`;

export const ClickableCard = styled.div`
  cursor: pointer;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`;