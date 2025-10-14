import styled from '@emotion/styled';

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 128px;
  /* 부모 요소의 헤더/네비게이션 높이를 고려하여 조정 필요 */
`;

export const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 16px;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  min-height: 150px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

// === 카드 헤더 (삭제/수정 아이콘) ===
export const CardHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 8px;

  & > button {
    background: none;
    border: none;
    cursor: pointer;
    color: #a0a0a0;
    transition: color 0.15s;
    font-size: 18px; // 아이콘 크기

    &:hover {
      color: #ff4d4f; // 삭제 버튼은 빨간색
    }
    
    // 수정 아이콘 (펜 모양)
    &:first-of-type:hover {
        color: #1890ff; // 수정 버튼은 파란색
    }
  }
`;

// === 카드 내용 ===
export const CardDate = styled.p`
  color: #7f7f7f;
  font-size: 0.85em;
  margin-bottom: 4px;
`;

export const CardTitle = styled.h3`
  font-size: 1.15em;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333333;
`;

export const CardExplanation = styled.p`
  font-size: 0.9em;
  color: #666666;
  margin: 0 0 12px 0;
  flex-grow: 1; /* 내용을 채워서 태그가 아래로 붙도록 */
`;

export const CardTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CardTag = styled.span`
  background-color: #e6f7ff; /* 밝은 파란색 배경 */
  color: #1890ff; /* 파란색 텍스트 */
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 0.75em;
  font-weight: 500;
  margin-right: 6px;
`;

export const AddLinkButton = styled.button`
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background-color: #1890ff; /* 파란색 */
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #40a9ff;
    }

    & > span {
        font-size: 1.2em; /* + 아이콘 */
        margin-right: 4px;
        line-height: 1;
    }
`;