/** @jsxImportSource @emotion/react */
import { colors } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const SelectBox = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[3]};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const AddButton = styled.div`
  background-color: ${colors.gray[2]};
  text-align: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  width: 100%;
`;

export const DirectoryContainer = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[3]};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const DirectoryInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  width: 100%;
`;

export const ArrowIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;

export const DeleteIcon = styled.span`
  position: absolute;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${colors.red[3]};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(239, 68, 68, 0.1);
  
  &:hover {
    background-color: rgba(239, 68, 68, 0.2);
  }
`;

export const DeleteIcon2 = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${colors.red[3]};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(239, 68, 68, 0.1);
  z-index: 1;
  
  &:hover {
    background-color: rgba(239, 68, 68, 0.2);
  }
`;

export const flexer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;