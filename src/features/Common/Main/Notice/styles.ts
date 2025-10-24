import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme.styles";
import { fonts } from "@/shared/theme/font.styles";

export const TopContainer = styled.div`
  width: 400px;
  max-height: 90vh;
  position: fixed;
  top: auto;
  right: auto;
  z-index: 100;
  padding: 3rem 2rem;
  background: white;
  border-radius: 24px;
  overflow-y: auto; // 스크롤 가능
  padding-bottom: 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    padding: 2rem 1.5rem;
    position : static;
    top: auto;
    left: 0;
  }
`;

export const Container = styled.div`
  width: 100%;
  background: ${theme.colors.white};
  margin: 0;
  box-sizing: border-box;
`;

export const InventoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  ${fonts.P5}
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P4};
  }
`;

export const Explain = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

export const Row = styled.div`
  gap: 32px;
  width: 100%;
  margin-top: 12px;
  display: grid;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const AddButton = styled.button`
  ${fonts.P5}
  color: ${theme.colors.blue[500]};
  background-color: ${theme.colors.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.black};
  }
`;
