import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  padding: 2rem 8rem;
  background-color: ${theme.colors.white};

  @media (max-width: 1200px) {
    padding: 2rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 1rem;
  }
`;

export const TitleFont = styled.h1`
  ${fonts.P5}
  font-weight: 600;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    ${fonts.P4}
  }

  @media (max-width: 768px) {
    ${fonts.P3}
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    ${fonts.P2}
    margin-bottom: 12px;
  }
`;

export const AddButton = styled.button`
  background-color: ${theme.colors.blue[500]};
  border-radius: 6px;
  cursor: pointer;
  width: 180px;
  height: 36px;
  border: 0;
  ${fonts.P2};

  @media (max-width: 1200px) {
    width: 160px;
    height: 34px;
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 32px;
    ${fonts.P3};
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 30px;
    ${fonts.P3};
  }
`;

export const Flexible = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`;

export const ModalInput = styled.input`
  width: 100%;
  ${fonts.P2}
  border-radius: 8px;
  padding: 0.6rem 1rem;
  border: 1px solid ${theme.colors.gray[300]};
  outline: none;

  @media (max-width: 768px) {
    padding: 0.5rem 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
  }
`;

export const EmptyMessage = styled.p`
  color: ${theme.colors.gray[600]};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const Card = styled.div`
  background-color: ${theme.colors.white};
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray[400]};
  transition: box-shadow 0.3s;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;  
  height: 10em;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  @media (max-width: 768px) {
    padding: 12px;
    height: auto;
  }
`;

export const CardTitle = styled.h2`
  ${fonts.P4}
  font-weight: 500;
  margin: 0 0 8px 0;

  @media (max-width: 1200px) {
    ${fonts.P3};
  }

  @media (max-width: 768px) {
    ${fonts.P3};
  }

  @media (max-width: 480px) {
    ${fonts.P2};
  }
`;

export const CardDescription = styled.p`
  color: ${theme.colors.gray[600]};
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P3};
  }

  @media (max-width: 480px) {
    ${fonts.P2};
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 0;
`;

export const InfoContent = styled.p`
  color: ${theme.colors.gray[600]};
  ${fonts.P2}
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P3};
  }

  @media (max-width: 480px) {
    ${fonts.P2};
  }
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.red};
  margin-bottom: 16px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

export const AddModalInput = styled.input`
  width: 100%;
  ${fonts.P2}
  border-radius: 8px;
  padding: 0.6rem 1rem;
  border: 1px solid ${theme.colors.gray[300]};
  outline: none;

  @media (max-width: 768px) {
    padding: 0.5rem 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
  }
`;