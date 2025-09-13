import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { theme } from '@/shared/theme/theme.styles';

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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  ${fonts.P3}
  cursor: pointer;
  color: ${theme.colors.gray[500]};
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${theme.colors.black};
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 8px;
  ${fonts.P2};
  margin-bottom: 16px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  &::placeholder {
    color: ${theme.colors.gray[600]};
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const SelectField = styled.div`
  flex: 1;
  position: relative;
`;

export const SelectInput = styled.div`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 8px;
  ${fonts.P2};
  background: ${theme.colors.white};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  
  &:hover {
    border-color: #007bff;
  }
`;

export const SelectPlaceholder = styled.span`
  color: ${theme.colors.gray[600]};
`;

export const ChevronIcon = styled.span`
  color: ${theme.colors.gray[500]};
  ${fonts.P1}
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 6px;
  ${fonts.P2}
  font-weight: 500;
  cursor: pointer;
  border: ${props => props.primary ? 'none' : '1px solid #007bff'};
  background: ${props => props.primary ? '#007bff' : theme.colors.white};
  color: ${props => props.primary ? theme.colors.white : '#007bff'};
  
  &:hover {
    background: ${props => props.primary ? '#0056b3' : theme.colors.gray[200]};
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  ${fonts.P2}
  
  &:hover {
    background: ${theme.colors.gray[200]};
  }
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;