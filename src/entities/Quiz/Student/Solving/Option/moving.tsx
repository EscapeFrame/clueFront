import { useEffect, useRef, useState } from "react";
import * as s from "../styles";
import { colors } from "@/shared/theme/theme.styles";

type OptionKeys = "haeyul" | "panda" | "I" | "koala";

type Props = {
  options: string[];
  optionKeys: OptionKeys[];
  onSelect: (index: number) => void;
};

type Position = { x: number; y: number; dx: number; dy: number };

export default function MovingOptions({ options, optionKeys, onSelect }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const requestRef = useRef<number | null>(null);

  const reset = () => {
    setSelected(null);
    setSubmitted(false);
    setPositions(
      options.map(() => ({
        x: Math.random() * 600,
        y: Math.random() * 250,
        dx: (Math.random() - 0.5) * 10,
        dy: (Math.random() - 0.5) * 10,
      }))
    );
  };

  useEffect(() => {
    reset();
  }, [options]);

  // 움직임 애니메이션
  useEffect(() => {
    const animate = () => {
      if (selected !== null) return; // 선택되면 움직임 멈춤

      setPositions((prev) =>
        prev.map((pos) => {
          let newX = pos.x + pos.dx;
          let newY = pos.y + pos.dy;

          if (newX < 0 || newX > 600) pos.dx *= -1;
          if (newY < 0 || newY > 250) pos.dy *= -1;

          newX = Math.max(0, Math.min(600, newX));
          newY = Math.max(0, Math.min(250, newY));

          return { ...pos, x: newX, y: newY, dx: pos.dx, dy: pos.dy };
        })
      );

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, [selected]);

  type CharacterKey = "owl" | "haeyul" | "panda" | "ferret" | "I" | "koala";

  const npcColors: Record<CharacterKey, { bg: string; border: string }> = {
    owl: { bg: colors.npc.owl[0], border: colors.npc.owl[1] },
    haeyul: { bg: colors.npc.haeyul[0], border: colors.npc.haeyul[1] },
    panda: { bg: colors.npc.panda[0], border: colors.npc.panda[1] },
    ferret: { bg: colors.npc.ferret[0], border: colors.npc.ferret[1] },
    I: { bg: colors.npc.I[0], border: colors.npc.I[1] },
    koala: { bg: colors.npc.koala[0], border: colors.npc.koala[1] },
  };

  const handleSubmit = () => {
    if (selected === null) return alert("옵션을 선택해주세요.");
    setSubmitted(true);
    onSelect(selected);
  };

  return (
    <>
      <s.MovingBox style={{ width: "650px" }}>
        {options.map((opt, i) => {
          const pos = positions[i];
          if (!pos) return null;

          const key = optionKeys[i];
          const numberLabel = i + 1;

          const isSelected = selected === i;
          const hasSelected = selected !== null;

          const bgColor = hasSelected && !isSelected ? colors.gray[1] : npcColors[key].bg;
          const borderColor = hasSelected && !isSelected ? colors.gray[3] : npcColors[key].border;
          const textColor = hasSelected && !isSelected ? colors.gray[4] : "#000";

          return (
            <s.MovingOption
              key={i}
              style={{ left: pos.x, top: pos.y }}
              bgColor={bgColor}
              borderColor={borderColor}
              textColor={textColor}
              onClick={() => {
                if (!hasSelected) setSelected(i);
              }}
            >
              {numberLabel}
            </s.MovingOption>
          );
        })}
      </s.MovingBox>

      <s.Buttons>
        {!submitted && (
          <s.RetryButton onClick={reset}>다시 선택</s.RetryButton>
        )}
        <s.SubmitButton submitted={submitted} onClick={handleSubmit}>
          정답 제출
        </s.SubmitButton>
      </s.Buttons>
    </>
  );
}