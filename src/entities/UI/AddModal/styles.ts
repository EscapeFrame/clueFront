import { fonts } from '@/shared/theme/font.styles';
import { theme } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const ModalWrapper = styled.div`
  background: ${theme.colors.white};
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    padding: 16px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 8px;
  }
`;

export const Title = styled.h2`
  margin: 0;
  ${fonts.P3}
  font-weight: 600;
  color: ${theme.colors.black};

  @media (max-width: 480px) {
    ${fonts.P2};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  @media (max-width: 480px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;