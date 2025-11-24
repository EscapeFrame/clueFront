import styled from "styled-components";
import { theme } from "@/shared/theme/theme.styles";

export const Container = styled.div`
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 14px 40px rgba(31, 43, 64, 0.08);
    padding: 32px 36px 40px;
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

export const Header = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
`;

export const StepTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 8px;
`;

export const StepDescription = styled.p`
    font-size: 15px;
    color: #6b7280;
    margin: 0;
`;

export const ControlGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const baseButton = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
`;

export const OutlineButton = styled.button`
    ${baseButton}
    color: #4b5563;
    background: #f3f4f6;

    &:hover {
        background: #e5e7eb;
    }
`;

export const PrimaryButton = styled.button`
    ${baseButton}
    color: #ffffff;
    background: ${theme.colors.blue[600]};
    box-shadow: 0 12px 24px rgba(0, 74, 223, 0.28);

    &:hover {
        background: ${theme.colors.blue[700]};
    }
`;

export const InfoBox = styled.div`
    background: #eff4ff;
    border: 1px solid #dbe7ff;
    border-radius: 12px;
    padding: 16px 20px;
    color: #4c5a73;
    font-size: 14px;
    line-height: 1.5;
`;

export const WorkflowCanvas = styled.div`
    border-radius: 20px;
    padding: 36px 40px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

export const EdgeDropZone = styled.div<{ isActive: boolean }>`
    position: relative;
    width: 64px;
    height: 72px;
    border-radius: 16px;
    flex-shrink: 0;
    cursor: ${(props) => (props.isActive ? "grabbing" : "pointer")};
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:before {
        content: "";
        position: absolute;
        width: 48px;
        height: 4px;
        border-radius: 999px;
        background: ${(props) => (props.isActive ? theme.colors.blue[600] : "#d1d5db")};
        opacity: ${(props) => (props.isActive ? 1 : 0.45)};
        transition: all 0.2s ease;
    }

    &:after {
        content: "";
        position: absolute;
        right: 8px;
        width: 12px;
        height: 12px;
        border-right: 2px solid ${(props) => (props.isActive ? theme.colors.blue[600] : "#cbd5f5")};
        border-bottom: 2px solid ${(props) => (props.isActive ? theme.colors.blue[600] : "#cbd5f5")};
        transform: rotate(-45deg);
        border-radius: 2px;
        opacity: ${(props) => (props.isActive ? 1 : 0.45)};
        transition: all 0.2s ease;
    }
`;

export const NodeCard = styled.div<{ isDragging: boolean; isDropTarget: boolean }>`
    position: relative;
    /* allow nodes to size reasonably but prevent overflowing the canvas */
    width: 180px;
    max-width: 260px;
    padding: 20px 16px 18px;
    border-radius: 18px;
    background: ${(props) => (props.isDropTarget ? "#EEF2FF" : "#ffffff")};
    box-shadow: ${(props) =>
        props.isDragging
            ? "0 18px 34px rgba(35, 66, 177, 0.25)"
            : "0 12px 28px rgba(15, 23, 42, 0.12)"};
    border: 1px solid ${(props) => (props.isDropTarget ? theme.colors.blue[500] : "#e5e7eb")};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    cursor: grab;
    transition: all 0.2s ease;

    &:active {
        cursor: grabbing;
    }
`;

export const NodeIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 18px;
    background: linear-gradient(135deg, #eff3ff 0%, #dce7ff 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.blue[600]};
`;

export const NodeTitle = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    text-align: center;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
`;

export const NodeTitleInput = styled.textarea`
    width: 100%;
    min-height: 48px;
    max-height: 140px;
    border: 1px solid ${theme.colors.blue[300]};
    border-radius: 10px;
    padding: 8px 10px;
    font-size: 15px;
    font-weight: 600;
    color: #1f2937;
    text-align: center;
    outline: none;
    resize: vertical;
    line-height: 1.2;
    background: transparent;

    &:focus {
        border-color: ${theme.colors.blue[500]};
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        background: #fff;
    }
`;

export const RemoveButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    background: rgba(15, 23, 42, 0.04);
    color: #4b5563;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(15, 23, 42, 0.1);
    }
`;

export const AddNodeButton = styled.button`
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: ${theme.colors.blue[500]};
    border: none;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.3);

    &:hover {
        background: ${theme.colors.blue[600]};
        transform: translateY(-1px);
    }
`;

export const ConsoleHint = styled.p`
    margin: 0;
    font-size: 13px; 
    color: #94a3b8;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  flex: 1;
  border-top: 1px solid #e5e7eb;
`;

export const Button = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 0.625rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 6px;
  width: 100%;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  ${({ variant }) =>
    variant === "primary" &&
    `
        background-color: ${theme.colors.blue[800]};
        color: white;
        border-color: ${theme.colors.blue[800]};

        &:hover {
            background-color: #004ADF;
        }
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    `
        background-color: white;
        color: #374151;
        border-color: #d1d5db;

        &:hover {
            background-color: #f9fafb;
        }
    `}

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #d1d5db;
    color: #6b7280;
    border-color: #d1d5db;
    cursor: not-allowed;
  `}
`;
