import styled from "@emotion/styled";
import { colors } from "@/shared/theme/theme.styles";
import { fonts } from "@/shared/theme/font.styles";

export const TopContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  position: relative;

  @media (max-width: 1200px) {
    max-width: 100%;
    padding: 1.75rem;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 16px;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const Container = styled.div`
  width: 100%;
  background: ${colors.white};
  margin: 0;
  box-sizing: border-box;
`;

export const InventoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const Title = styled.div`
  ${fonts.P5}
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P4}
  }

  @media (max-width: 480px) {
    ${fonts.P3}
  }
`;

export const Explain = styled.p`
  ${fonts.P2}
  color: ${colors.gray[4]};
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P1}
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

export const Row = styled.div`
  gap: 32px;
  width: 100%;
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr;

  @media (max-width: 768px) {
    gap: 24px;
    margin-top: 16px;
  }

  @media (max-width: 480px) {
    gap: 16px;
    margin-top: 12px;
  }
`;

export const AddButton = styled.button`
  ${fonts.P5}
  color: ${colors.primary};
  background-color: ${colors.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.black};
    background-color: ${colors.gray[1]};
  }

  @media (max-width: 768px) {
    ${fonts.P4}
    padding: 0.4rem 0.8rem;
  }

  @media (max-width: 480px) {
    ${fonts.P3}
    padding: 0.3rem 0.6rem;
    align-self: flex-end;
  }
`;

export const ModalDate = styled.div`
  width: 100%;
  text-align: right;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

export const ModalContent = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray[300]};
  white-space: pre-wrap;
  word-break: break-word;
  min-height: 150px;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.5;
    min-height: 120px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.4;
    min-height: 100px;
  }
`;
