import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  min-height: calc(100vh / 0.8);
  background-color: #f7f7f7;
  padding: 1rem 14rem;
  gap: 24px;

  @media (max-width: 1024px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 868px) {
    padding: 1rem 1rem;
    flex-direction: column;
  }
`;

export const Left = styled.div`
  gap: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 868px) {
    width: 100%;
  }
`;

export const Right = styled.div`
  gap: 24px;
  width: 30%;
  min-width: 380px;
  margin-left: auto;
  height: 100vh;
  background-color: #f7f7f7;
  right: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 868px) {
    width: 100%;
    min-width: unset;
    height: auto;
    margin-left: 0;
  }
`;
