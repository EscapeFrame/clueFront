import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { markdownSectionsState } from '@/shared/model/markdownState';
import * as s from './styles';
import { IoArrowBack } from 'react-icons/io5';

type Difficulty = 'easy' | 'normal' | 'hard';
type ProblemType = 'single' | 'multiple' | 'short' | 'essay';

interface DifficultyState {
  selected: boolean;
  count: string;
}

export default function GenerateProblem() {
  const navigate = useNavigate();
  const { classRoomId, directoryId } = useParams<{ classRoomId: string; directoryId: string }>();
  const sections = useRecoilValue(markdownSectionsState);
  
  const [selectedSections, setSelectedSections] = useState<Set<number>>(new Set());
  const [difficulties, setDifficulties] = useState<Record<Difficulty, DifficultyState>>({
    easy: { selected: false, count: '' },
    normal: { selected: false, count: '' },
    hard: { selected: false, count: '' },
  });
  const [problemTypes, setProblemTypes] = useState<Set<ProblemType>>(new Set());

  const handleSectionClick = (index: number) => {
    setSelectedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleDifficultyClick = (difficulty: Difficulty) => {
    setDifficulties((prev) => ({
      ...prev,
      [difficulty]: {
        ...prev[difficulty],
        selected: !prev[difficulty].selected,
        count: !prev[difficulty].selected ? prev[difficulty].count : '',
      },
    }));
  };

  const handleDifficultyCountChange = (difficulty: Difficulty, count: string) => {
    setDifficulties((prev) => ({
      ...prev,
      [difficulty]: {
        ...prev[difficulty],
        count,
      },
    }));
  };

  const handleProblemTypeChange = (type: ProblemType) => {
    setProblemTypes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  const handleGenerate = () => {
    if (selectedSections.size === 0) {
      alert('학습 범위를 최소 1개 이상 선택해주세요.');
      return;
    }
    // TODO: 문제 생성 API 호출
    console.log('Selected sections:', Array.from(selectedSections));
    console.log('Difficulties:', difficulties);
    console.log('Problem types:', Array.from(problemTypes));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <s.Container>
      <s.Header>
        <s.BackButton onClick={() => navigate(-1)}>
          <IoArrowBack />
          <span>뒤로가기</span>
        </s.BackButton>
        <s.Title>문제 생성 하기</s.Title>
        <s.Subtitle>학습 범위와 유형등을 선택해 문제를 생성하세요!</s.Subtitle>
      </s.Header>

      <s.Content>
        {/* 학습 범위 */}
        <s.SectionCard>
          <s.SectionTitle>학습 범위</s.SectionTitle>
          <s.SectionDesc>내용을 최소 1개이상 선택해주세요.</s.SectionDesc>
          <s.SectionList>
            {sections.map((section, index) => (
              <s.SectionItem
                key={index}
                selected={selectedSections.has(index)}
                onClick={() => handleSectionClick(index)}
              >
                {index + 1}. {section.title}
              </s.SectionItem>
            ))}
          </s.SectionList>
        </s.SectionCard>

        {/* 난이도 */}
        <s.SectionCard>
          <s.SectionTitle>난이도</s.SectionTitle>
          <s.SectionDesc>
            문제의 난이도를 선택하고 문항수를 입력해주세요. (미입력시 랜덤배차)
          </s.SectionDesc>
          <s.DifficultyList>
            <s.DifficultyItem>
              <s.DifficultyButton
                selected={difficulties.easy.selected}
                onClick={() => handleDifficultyClick('easy')}
              >
                쉬움
              </s.DifficultyButton>
              {difficulties.easy.selected && (
                <s.CountInputWrapper>
                  <s.CountInput
                    type="number"
                    placeholder="문항수를 입력해주세요."
                    value={difficulties.easy.count}
                    onChange={(e) => handleDifficultyCountChange('easy', e.target.value)}
                  />
                  <span>개</span>
                </s.CountInputWrapper>
              )}
            </s.DifficultyItem>
            <s.DifficultyItem>
              <s.DifficultyButton
                selected={difficulties.normal.selected}
                onClick={() => handleDifficultyClick('normal')}
              >
                보통
              </s.DifficultyButton>
              {difficulties.normal.selected && (
                <s.CountInputWrapper>
                  <s.CountInput
                    type="number"
                    placeholder="문항수를 입력해주세요."
                    value={difficulties.normal.count}
                    onChange={(e) => handleDifficultyCountChange('normal', e.target.value)}
                  />
                  <span>개</span>
                </s.CountInputWrapper>
              )}
            </s.DifficultyItem>
            <s.DifficultyItem>
              <s.DifficultyButton
                selected={difficulties.hard.selected}
                onClick={() => handleDifficultyClick('hard')}
              >
                어려움
              </s.DifficultyButton>
              {difficulties.hard.selected && (
                <s.CountInputWrapper>
                  <s.CountInput
                    type="number"
                    placeholder="문항수를 입력해주세요."
                    value={difficulties.hard.count}
                    onChange={(e) => handleDifficultyCountChange('hard', e.target.value)}
                  />
                  <span>개</span>
                </s.CountInputWrapper>
              )}
            </s.DifficultyItem>
          </s.DifficultyList>
        </s.SectionCard>

        {/* 문제 유형 */}
        <s.SectionCard>
          <s.SectionTitle>문제 유형</s.SectionTitle>
          <s.SectionDesc>어떤 형식의 문제를 제작할까요?</s.SectionDesc>
          <s.ProblemTypeList>
            <s.ProblemTypeItem>
              <s.Checkbox
                type="checkbox"
                checked={problemTypes.has('single')}
                onChange={() => handleProblemTypeChange('single')}
              />
              <label>객관식(단일선택)</label>
            </s.ProblemTypeItem>
            <s.ProblemTypeItem>
              <s.Checkbox
                type="checkbox"
                checked={problemTypes.has('multiple')}
                onChange={() => handleProblemTypeChange('multiple')}
              />
              <label>객관식(복수선택)</label>
            </s.ProblemTypeItem>
            <s.ProblemTypeItem>
              <s.Checkbox
                type="checkbox"
                checked={problemTypes.has('short')}
                onChange={() => handleProblemTypeChange('short')}
              />
              <label>단답형</label>
            </s.ProblemTypeItem>
            <s.ProblemTypeItem>
              <s.Checkbox
                type="checkbox"
                checked={problemTypes.has('essay')}
                onChange={() => handleProblemTypeChange('essay')}
              />
              <label>서술형</label>
            </s.ProblemTypeItem>
          </s.ProblemTypeList>
        </s.SectionCard>
      </s.Content>

      <s.ActionButtons>
        <s.CancelButton onClick={handleCancel}>취소</s.CancelButton>
        <s.GenerateButton onClick={handleGenerate}>문제 생성</s.GenerateButton>
      </s.ActionButtons>
    </s.Container>
  );
}

