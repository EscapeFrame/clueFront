import styled from '@emotion/styled';
import { spacing, radii, shadows, transitions } from '@/shared/theme/theme.styles';

// Common Components
export const Button = styled.button<{
  primary?: boolean;
  danger?: boolean;
  large?: boolean;
}>`
  padding: ${(props) => (props.large ? `${spacing.md} ${spacing.xl}` : `${spacing.sm} ${spacing.lg}`)};
  font-size: ${(props) => (props.large ? '1.1rem' : '1rem')};
  font-weight: 600;
  border: none;
  border-radius: ${radii.md};
  cursor: pointer;
  transition: all ${transitions.normal};
  background-color: ${(props) =>
    props.primary
      ? props.theme.colors.success
      : props.danger
        ? props.theme.colors.error
        : props.theme.colors.gray[500]};
  color: ${(props) => props.theme.colors.textInverse};

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: ${shadows.md};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const Input = styled.input`
  padding: ${spacing.sm};
  font-size: 1rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${radii.md};
  width: 100%;
  transition: border-color ${transitions.normal};
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.success};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${spacing.sm};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-top: ${spacing.lg};
  flex-wrap: wrap;
`;

// CreateRoom Styles
export const CreateRoomContainer = styled.div`
  max-width: 600px;
  margin: ${spacing.xl} auto;
  padding: ${spacing.xl};
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};

  h2 {
    margin-bottom: ${spacing.lg};
    color: ${(props) => props.theme.colors.text};
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  p {
    text-align: center;
    color: ${(props) => props.theme.colors.textSecondary};
    margin-top: ${spacing.md};
  }
`;

// RoomList Styles
export const RoomListContainer = styled.div`
  max-width: 1200px;
  margin: ${spacing.xl} auto;
  padding: ${spacing.xl};
`;

export const RoomListHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing['3xl']};

  h1 {
    font-size: 2.5rem;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${spacing.sm};
  }

  p {
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

export const JoinRoomSection = styled.div`
  max-width: 500px;
  margin: 0 auto ${spacing.xl};
  padding: ${spacing.xl};
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};

  h2 {
    margin-bottom: ${spacing.lg};
    color: ${(props) => props.theme.colors.text};
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${spacing.lg};
  margin-top: ${spacing.xl};
`;

export const RoomCard = styled.div`
  padding: ${spacing.lg};
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};
  cursor: pointer;
  transition: all ${transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.lg};
  }
`;

export const RoomInfo = styled.div`
  margin-bottom: ${spacing.md};

  h3 {
    margin-bottom: ${spacing.sm};
    color: ${(props) => props.theme.colors.text};
  }

  p {
    color: ${(props) => props.theme.colors.textSecondary};
    margin: ${spacing.xs} 0;
  }
`;

export const RoomStatus = styled.span<{ status: string }>`
  display: inline-block;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${radii.full};
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${(props) =>
    props.status === 'waiting'
      ? props.theme.colors.success
      : props.status === 'playing'
        ? props.theme.colors.warning
        : props.theme.colors.gray[500]};
  color: ${(props) => props.theme.colors.textInverse};
`;

// QuizBattleRoom Styles
export const RoomContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xl};
`;

export const RoomHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xl};
  padding: ${spacing.lg};
  background: linear-gradient(135deg, ${(props) => props.theme.colors.blue[700]} 0%, ${(props) => props.theme.colors.blue[900]} 100%);
  border-radius: ${radii.lg};
  color: ${(props) => props.theme.colors.textInverse};

  h1 {
    margin-bottom: ${spacing.sm};
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

export const ParticipantsSection = styled.div`
  background: ${(props) => props.theme.colors.surface};
  padding: ${spacing.lg};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};
  margin-bottom: ${spacing.xl};

  h2,
  h3 {
    margin-bottom: ${spacing.md};
    color: ${(props) => props.theme.colors.text};
  }
`;

export const ParticipantsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ParticipantItem = styled.li`
  padding: ${spacing.sm} ${spacing.md};
  margin-bottom: ${spacing.sm};
  background: ${(props) => props.theme.colors.backgroundTertiary};
  border-radius: ${radii.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WaitingSection = styled.div`
  text-align: center;
  padding: ${spacing['3xl']};
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};

  h2 {
    margin-bottom: ${spacing.xl};
    color: ${(props) => props.theme.colors.text};
  }

  p {
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.textSecondary};
    margin: ${spacing.md} 0;
  }

  ${ButtonGroup} {
    justify-content: center;
  }
`;

export const QuestionSection = styled.div`
  background: ${(props) => props.theme.colors.surface};
  padding: ${spacing.xl};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.xl};

  h2 {
    color: ${(props) => props.theme.colors.text};
    margin: 0;
  }
`;

export const Timer = styled.div<{ warning?: boolean }>`
  font-size: 1.5rem;
  font-weight: 700;
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${radii.md};
  background-color: ${(props) => (props.warning ? props.theme.colors.error : props.theme.colors.success)};
  color: ${(props) => props.theme.colors.textInverse};
  animation: ${(props) => (props.warning ? 'pulse 1s infinite' : 'none')};

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

export const QuestionText = styled.p`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${spacing.xl};
  line-height: 1.6;
  padding: ${spacing.lg};
  background: ${(props) => props.theme.colors.backgroundTertiary};
  border-radius: ${radii.md};
  border-left: 4px solid ${(props) => props.theme.colors.success};
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing.md};
  margin-bottom: ${spacing.xl};
`;

export const OptionButton = styled.button<{
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
}>`
  padding: ${spacing.lg};
  font-size: 1rem;
  border: 2px solid
    ${(props) =>
      props.correct
        ? props.theme.colors.success
        : props.incorrect
          ? props.theme.colors.error
          : props.theme.colors.border};
  border-radius: ${radii.md};
  background-color: ${(props) =>
    props.correct
      ? props.theme.colors.green[100]
      : props.incorrect
        ? props.theme.colors.red[100]
        : props.selected
          ? props.theme.colors.blue[100]
          : props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: all ${transitions.normal};
  text-align: left;

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.correct
        ? props.theme.colors.green[100]
        : props.incorrect
          ? props.theme.colors.red[100]
          : props.theme.colors.backgroundTertiary};
    transform: translateY(-2px);
    box-shadow: ${shadows.md};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const ResultMessage = styled.div<{ correct: boolean }>`
  padding: ${spacing.lg};
  margin: ${spacing.lg} 0;
  border-radius: ${radii.md};
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  background-color: ${(props) => (props.correct ? props.theme.colors.green[100] : props.theme.colors.red[100])};
  color: ${(props) => (props.correct ? props.theme.colors.green[700] : props.theme.colors.red[700])};
  border: 2px solid ${(props) => (props.correct ? props.theme.colors.success : props.theme.colors.error)};
`;

export const FinishedSection = styled.div`
  text-align: center;
  padding: ${spacing['3xl']};
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};

  h2 {
    font-size: 2.5rem;
    margin-bottom: ${spacing.md};
    color: ${(props) => props.theme.colors.text};
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: ${spacing.xl};
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

export const RankingsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: ${spacing.xl} 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const RankingItem = styled.li<{ rank: number }>`
  padding: ${spacing.lg};
  margin-bottom: ${spacing.md};
  background: ${(props) =>
    props.rank === 1
      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
      : props.rank === 2
        ? 'linear-gradient(135deg, #C0C0C0 0%, #A9A9A9 100%)'
        : props.rank === 3
          ? 'linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)'
          : props.theme.colors.backgroundTertiary};
  color: ${(props) => (props.rank <= 3 ? props.theme.colors.textInverse : props.theme.colors.text)};
  border-radius: ${radii.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: ${shadows.sm};

  .rank {
    font-size: 1.3rem;
    min-width: 60px;
  }

  .username {
    flex: 1;
    text-align: left;
    margin: 0 ${spacing.md};
  }

  .score {
    font-weight: 700;
  }
`;
