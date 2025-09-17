import styled from "@emotion/styled";
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from "@/shared/theme/font.styles";

export const Container = styled.div`
  background-color: ${theme.colors.white};
  padding: 2rem 16rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    padding: 2rem 8rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 2rem;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const FileItem = styled.div`
  background-color: ${theme.colors.gray[100]};
  padding: 0.5rem;
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 0.4rem;
    ${fonts.P2}
  }
`;

export const Title = styled.div`
  ${fonts.P5};
  font-weight:600;

  @media (max-width: 768px) {
    ${fonts.P4};
  }
`;

export const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    margin-bottom: 6px;
    ${fonts.P2};
  }
`;

export const FileUploadArea = styled.div<{ isDragOver?: boolean }>`
  border: 2px dashed ${props => (props.isDragOver ? "#4a90e2" : "#ccc")};
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;