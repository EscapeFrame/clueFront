import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 1rem 14rem;
  gap: 24px;
  overflow-y: auto;

  /* 반응형 패딩: 네브바와 동일한 기준 사용 */
  @media (max-width: 868px) {
    padding: 1rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 1rem;
    display: block;
  }
`;

export const Left = styled.div`
  gap: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Right = styled.div`
  gap: 24px;
  width: 30%;
  min-width: 380px;
  margin-left: auto;
  height: 100vh;
  background-color: #f7f7f7;
  right: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    position: none;
    top: auto;
    left: 0;
  }
`;
