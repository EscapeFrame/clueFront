import styled from '@emotion/styled';

export const Container = styled.div`
  min-height: 100vh; /* allow container to grow with content but at least full viewport */
  display: flex;
  flex-direction: column;
  padding: 24px 32px; /* consistent page padding */
  box-sizing: border-box;
`;

export const ContentArea = styled.div`
  margin: 0;
  flex: 1 1 auto; /* take remaining space */
`;