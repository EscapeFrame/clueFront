import { useState } from "react";
import * as s from '../styles';
import { colors } from "@/shared/theme/theme.styles";

type OptionKeys = "haeyul" | "panda" | "I" | "koala";

type RouletteProps = {
  options: [string, string, string, string];
  optionKeys: [OptionKeys, OptionKeys, OptionKeys, OptionKeys];
  onSelect: (index: number) => void;
};

const npcColors: Record<OptionKeys, { bg: string; border: string }> = {
    haeyul: { bg: colors.npc.haeyul[0], border: colors.npc.haeyul[1] },
    panda: { bg: colors.npc.panda[0], border: colors.npc.panda[1] },
    I: { bg: colors.npc.I[0], border: colors.npc.I[1] },
    koala: { bg: colors.npc.koala[0], border: colors.npc.koala[1] },
};

export default function RouletteOptions({
  options = ["해율", "판다", "페럿", "코알라"],
  optionKeys = ["haeyul", "panda", "I", "koala"],
  onSelect = () => { }
}: Partial<RouletteProps>) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedIndex(null);

    const randomSpin = Math.random() * 360;
    const totalRotation = rotation + 5 * 360 + randomSpin;
    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = (360 - (totalRotation % 360)) % 360;
      const index = Math.floor(normalizedRotation / 90) % 4;
      setSelectedIndex(index);
      onSelect(index);
      setIsSpinning(false);
    }, 2000);
  };

  const handleSubmit = () => setSubmitted(true);

  const size = 300;
  const center = size / 2;

  return (
    <s.RouletteContainer>
      <s.RouletteWrapper style={{ width: size, height: size }}>
        <s.RouletteSvg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          rotation={rotation}
          isSpinning={isSpinning}
        >
          {options.map((opt, i) => {
            const key = optionKeys[i];
            const startAngle = (i * 90 - 45) * (Math.PI / 180);
            const endAngle = ((i + 1) * 90 - 45) * (Math.PI / 180);

            const x1 = center + center * Math.cos(startAngle);
            const y1 = center + center * Math.sin(startAngle);
            const x2 = center + center * Math.cos(endAngle);
            const y2 = center + center * Math.sin(endAngle);

            const largeArcFlag = 0;

            const pathData = `
              M ${center} ${center}
              L ${x1} ${y1}
              A ${center} ${center} 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `;

            return (
              <path
                key={i}
                d={pathData}
                fill={npcColors[key].bg}
                stroke="white"
                strokeWidth="3"
              />
            );
          })}
        </s.RouletteSvg>

        <s.Pointer />
      </s.RouletteWrapper>

      {selectedIndex !== null && !isSpinning && (
        <s.Result>
          <p>선택된 답: <strong>{options[selectedIndex]}</strong></p>
        </s.Result>
      )}

      <s.Buttons>
        {!submitted && (
          <s.RetryButton onClick={handleSpin} disabled={isSpinning}>
            {isSpinning ? "돌리는 중..." : "다시 돌리기"}
          </s.RetryButton>
        )}
        <s.SubmitButton submitted={submitted} onClick={handleSubmit}>
          정답 제출
        </s.SubmitButton>
      </s.Buttons>
    </s.RouletteContainer>
  );
}