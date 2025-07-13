import styled from '@emotion/styled';
import { white } from '@/shared/styles/theme.styles';

export const StepBox = styled.div`
  margin: 0 1.25em 3.75em 1.25em;
  display: block;
  min-width: 17em;
  max-width: 34em;
  padding: 0.5em 1em;
  border: 0.06em solid #e2e2e2;
  border-radius: 0.5em;
  box-shadow: 0 0.06em 0.19em rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  line-height: 1.5;
  & > p {
    font-size: 0.88em;
    margin: 0;
    padding: 0;
    line-height: 1.2;
  }
`;

export const CustomIcon = styled.div<{ status?: 'done' | 'pending' }>`
  width: 3.13rem;
  height: 3.13rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.88rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ status }) =>
    status === 'done' ? '#1890ff' : status === 'pending' ? white : '#1890ff'};
  color: ${({ status }) => (status === 'pending' ? 'black' : '#fff')};
  border: ${({ status }) => (status === 'pending' ? '0.06em solid #86C1FF' : 'none')};
`;