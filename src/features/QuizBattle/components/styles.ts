import styled from '@emotion/styled';

// Common Components
export const Button = styled.button<{
  primary?: boolean;
  danger?: boolean;
  large?: boolean;
}>`
  padding: ${(props) => (props.large ? '1rem 2rem' : '0.75rem 1.5rem')};
  font-size: ${(props) => (props.large ? '1.1rem' : '1rem')};
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.primary ? '#4CAF50' : props.danger ? '#f44336' : '#757575'};
  color: white;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

// CreateRoom Styles
export const CreateRoomContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  p {
    text-align: center;
    color: #666;
    margin-top: 1rem;
  }
`;

// RoomList Styles
export const RoomListContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
`;

export const RoomListHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

export const JoinRoomSection = styled.div`
  max-width: 500px;
  margin: 0 auto 2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
    color: #333;
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
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const RoomCard = styled.div`
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const RoomInfo = styled.div`
  margin-bottom: 1rem;

  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    color: #666;
    margin: 0.25rem 0;
  }
`;

export const RoomStatus = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${(props) =>
    props.status === 'waiting'
      ? '#4CAF50'
      : props.status === 'playing'
        ? '#FF9800'
        : '#757575'};
  color: white;
`;

// QuizBattleRoom Styles
export const RoomContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const RoomHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;

  h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

export const ParticipantsSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h2,
  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

export const ParticipantsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ParticipantItem = styled.li`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WaitingSection = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 2rem;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    margin: 1rem 0;
  }

  ${ButtonGroup} {
    justify-content: center;
  }
`;

export const QuestionSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: #333;
    margin: 0;
  }
`;

export const Timer = styled.div<{ warning?: boolean }>`
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: ${(props) => (props.warning ? '#f44336' : '#4CAF50')};
  color: white;
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
  color: #333;
  margin-bottom: 2rem;
  line-height: 1.6;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #4CAF50;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const OptionButton = styled.button<{
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
}>`
  padding: 1.5rem;
  font-size: 1rem;
  border: 2px solid
    ${(props) =>
      props.correct ? '#4CAF50' : props.incorrect ? '#f44336' : '#ddd'};
  border-radius: 8px;
  background-color: ${(props) =>
    props.correct
      ? '#e8f5e9'
      : props.incorrect
        ? '#ffebee'
        : props.selected
          ? '#e3f2fd'
          : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.correct
        ? '#e8f5e9'
        : props.incorrect
          ? '#ffebee'
          : '#f5f5f5'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const ResultMessage = styled.div<{ correct: boolean }>`
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  background-color: ${(props) => (props.correct ? '#e8f5e9' : '#ffebee')};
  color: ${(props) => (props.correct ? '#2e7d32' : '#c62828')};
  border: 2px solid ${(props) => (props.correct ? '#4CAF50' : '#f44336')};
`;

export const FinishedSection = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #666;
  }
`;

export const RankingsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const RankingItem = styled.li<{ rank: number }>`
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: ${(props) =>
    props.rank === 1
      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
      : props.rank === 2
        ? 'linear-gradient(135deg, #C0C0C0 0%, #A9A9A9 100%)'
        : props.rank === 3
          ? 'linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)'
          : '#f5f5f5'};
  color: ${(props) => (props.rank <= 3 ? 'white' : '#333')};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .rank {
    font-size: 1.3rem;
    min-width: 60px;
  }

  .username {
    flex: 1;
    text-align: left;
    margin: 0 1rem;
  }

  .score {
    font-weight: 700;
  }
`;
