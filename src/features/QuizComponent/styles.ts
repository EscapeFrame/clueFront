import styled from "@emotion/styled"
import { gray, white, black, blue } from "@/shared/styles/theme.styles"
import { fonts } from "@/shared/styles/font.styles"

export const StatusCompleted = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: ${gray[150]}
  color: ${blue[500]}
  border-radius: 9999px;
  ${fonts.P1}
  padding: 0.25rem 0.75rem;
`

export const StatusPending = styled(StatusCompleted)`
  background-color: ${gray[100]}
  color:rgb(255, 127, 29);
`

export const Details = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${gray[300]}
  ${fonts.P1}
`

export const DetailText = styled.span``

export const DifficultyBadge = styled.span<{ difficulty: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  ${fonts.P1}
  border-radius: 0.375rem;
  color: ${({ difficulty }) =>
    difficulty === "easy"
      ? "#3b82f6"     // 연한 파랑 (쉬움)
      : difficulty === "medium"
      ? "#2563eb"     // 중간 파랑 (중간)
      : difficulty === "hard"
      ? "#1e40af"     // 진한 파랑 (어려움)
      : "#6B7280"};
  background-color: ${({ difficulty }) =>
    difficulty === "easy"
      ? "rgba(59, 130, 246, 0.2)"   // 연한 파랑 배경
      : difficulty === "medium"
      ? "rgba(37, 99, 235, 0.2)"   // 중간 파랑 배경
      : difficulty === "hard"
      ? "rgba(30, 64, 175, 0.2)"   // 진한 파랑 배경
      : "rgba(107, 114, 128, 0.125)"};
`;

export const ScoreBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: ${gray[100]}
  border-radius: 0.5rem;
  color: ${blue[500]}
`

export const ScoreText = styled.span`
  font-weight: 600;
`

export const StartButton = styled.button<{ completed?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  color: ${white};
  background-color: ${({ completed }) => (completed ? "#2563eb" : "#2563eb")}; 
  transition: background-color 0.2s ease;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: ${({ completed }) => (completed ? blue[600] : blue[600])};
  }
`

/* 모달 스타일 */
export const ModalContainer = styled.div`
  background: ${white};
  border-radius: 1rem;
  max-width: 42rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

export const ModalTitle = styled.h2`
    ${fonts.P2}
  font-weight: 600;
  color: ${black}
`

export const ModalInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const TimeLeft = styled.div<{ timeLeft: number }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  ${fonts.P1}
  color: ${({ timeLeft }) => (timeLeft <= 60 ? "#b91c1c" : "#2563eb")};
  background-color: ${({ timeLeft }) => (timeLeft <= 60 ? "#fee2e2" : "#dbeafe")};
`

export const QuestionCounter = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: ${gray[100]}
  color: ${gray[300]}
  border-radius: 9999px;
  ${fonts.P2}
`

export const ProgressBar = styled.div`
  width: 100%;
  background-color: ${gray[150]}
  height: 0.5rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
  overflow: hidden;
`

export const Progress = styled.div`
  background-color: #2563eb;
  height: 100%;
  border-radius: 9999px;
  transition: width 0.3s ease;
`

export const QuestionSection = styled.div`
  margin-bottom: 2rem;
`

export const QuestionTitle = styled.h3`
    ${fonts.P3}
  color: ${black}
  margin-bottom: 1.5rem;
  line-height: 1.5;
`

export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const OptionButton = styled.button<{ selected?: boolean }>`
  width: 100%;
  padding: 1rem;
  text-align: left;
  border-radius: 0.75rem;
  border: 2px solid ${({ selected }) => (selected ? "#2563eb" : "#e5e7eb")};
  background-color: ${({ selected }) => (selected ? "#bfdbfe" : "white")};
  font-weight: 600;
  color: ${({ selected }) => (selected ? "#1e40af" : "#374151")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #2563eb;
    background-color: #dbeafe;
  }
`

export const OptionNumber = styled.span`
  font-weight: 700;
  margin-right: 0.5rem;
`

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`

export const NavButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background-color: #e5e7eb;
  border-radius: 0.5rem;
  font-weight: 600;
  color: #6b7280;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:not(:disabled):hover {
    background-color: #d1d5db;
  }
`

export const NextButton = styled(NavButton)`
  background-color: #2563eb;
  color: white;

  &:hover {
    background-color: #1e40af;
  }
`

export const ResultSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 1rem;
  color: #2563eb;
`

export const ResultTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
`

export const ResultScore = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
`

export const ResultDetail = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #4b5563;
`

export const CloseButton = styled.button`
  margin-top: 1rem;
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e40af;
  }
`

export const Container = styled.div`
  padding: 20px 10rem;
  background-color: ${gray[100]};
  margin: 0 auto;
  min-height: 100vh;
`

export const CardGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  width: 100%;
`

export const GroupSection = styled.section`
  margin-bottom: 2rem;
`

export const Card = styled.div`
  background-color: ${white};
  border-radius: 0.5rem;
  border: 1px solid ${gray[200]};
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease-in-out;
  min-height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`

export const Title = styled.h3`
  color: ${black};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  flex-grow: 1;
  white-space: normal;
  overflow-wrap: break-word;
`

export const Status = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  display: inline-block;
`

export const StatusNotSubmitted = styled(Status)`
  background-color: ${blue[500]};
  color: ${white};
`

export const StatusSubmitted = styled(Status)`
  background-color: ${white};
  color: ${black};
  border: 2px solid ${blue[500]};
`

export const InfoSection = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${gray[300]};
`

export const FileSection = styled.div`
  margin-bottom: 1rem;
  min-height: 48px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid ${gray[200]};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${gray[100]};
  }
`

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const FileName = styled.div`
  font-size: 0.875rem;
  color: ${black};
  font-weight: 500;
`

export const FileSize = styled.div`
  font-size: 0.75rem;
  color: ${gray[400]};
`

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${gray[400]};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${black};
    background-color: ${gray[100]};
  }
`

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem 0;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const UploadButton = styled(Button)`
  background-color: ${gray[150]};
  color: ${gray[300]};

  &:hover:not(:disabled) {
    background-color: ${gray[300]};
  }
`

export const SubmitButton = styled(Button)`
  background-color: #2563eb;
  color: white;

  &:hover:not(:disabled) {
    background-color: ${blue[600]};
  }
`

export const ModalContent = styled.div`
  padding: 1.5rem 2rem;
  background-color: white;
  border-radius: 1rem;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;