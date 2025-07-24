import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { theme } from '@/shared/theme/theme.styles';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.blue[300]};
  padding: 0 8rem;
  overflow: hidden;
  width: 100%;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const Title = styled.h2`
  font-weight: 600;
  ${fonts.P5}
  margin: 0;
  color: ${theme.colors.black};
`;

export const Description = styled.p`
  ${fonts.P2}
  color: ${theme.colors.gray[500]};
  margin: 0;
  padding: 0;
`;

export const TeacherRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${theme.colors.gray[500]};
  ${fonts.P2}
`;

export const Img = styled.div<{ imageUrl: string }>`
  width: 15rem;
  height: 15rem;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;