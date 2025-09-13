import { fonts } from '@/shared/theme/font.styles';
import styled from '@emotion/styled';

interface StatusProps {
  $isSubmitted: boolean;
}

export const Container = styled.div`
  padding: 2rem 8rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const Header = styled.div`
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  margin: 0;
    ${fonts.P4};
  font-weight: 600;
  color: #333;
`;

export const Status = styled.span<StatusProps>`
    ${fonts.P2};
  font-weight: 700;
  color: ${({ $isSubmitted }) => ($isSubmitted ? '#2ecc71' : '#e74c3c')};
  border: 1.5px solid ${({ $isSubmitted }) => ($isSubmitted ? '#2ecc71' : '#e74c3c')};
  padding: 2px 8px;
  border-radius: 12px;
  user-select: none;
`;

export const Body = styled.div`
  padding: 0 16px 12px 16px;
  ${fonts.P2};
  color: #555;
`;

export const TimeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;

  .deadline {
    color: #555;
  }

  .remaining {
    color: #999;
  }
`;

export const Footer = styled.div`
  padding: 8px 16px 16px 16px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;

  button {
    flex: 1;
  }
`;

export const DetailHeading = styled.h4`
  ${fonts.P3};
  font-weight: 700;
  margin: 16px 0 8px;
`;

export const DetailText = styled.p`
  margin: 4px 0;
  ${fonts.P3};
  color: #333;

  strong {
    font-weight: 700;
  }
`;

export const DetailSection = styled.div`
  padding: 8px 0;
`;

export const AddButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;