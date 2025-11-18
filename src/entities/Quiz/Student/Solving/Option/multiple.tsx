import { useState } from "react";
import * as s from "../styles";
import { colors } from "@/shared/theme/theme.styles";

type OptionProps = {
    options: string[];
    optionKeys: Array<"owl" | "haeyul" | "panda" | "ferret" | "I" | "koala">; // npc 키 순서
    onSelect: (index: number) => void;
};

// npc 색상 매핑 객체 (타입 안정성 보장)
const npcColors: Record<NonNullable<OptionProps["optionKeys"][number]>, { bg: string; border: string }> = {
    owl: { bg: colors.npc.owl1, border: colors.npc.owl2 },
    haeyul: { bg: colors.npc.haeyul1, border: colors.npc.haeyul2 },
    panda: { bg: colors.npc.panda1, border: colors.npc.panda2 },
    ferret: { bg: colors.npc.ferret1, border: colors.npc.ferret2 },
    I: { bg: colors.npc.I1, border: colors.npc.I2 },
    koala: { bg: colors.npc.koala1, border: colors.npc.koala2 },
};

export default function MultipleOptions({ options, optionKeys, onSelect }: OptionProps) {
    const [selected, setSelected] = useState<number | null>(null);

    const handleClick = (i: number) => {
        if (selected === null) {
            setSelected(i);
            onSelect(i);
        }
    };

    return (
        <s.Options>
            {options.map((opt, i) => {
                const key = optionKeys[i];
                const numberLabel = i + 1;

                const isSelected = selected === i;
                const hasSelected = selected !== null;

                // 선택 후 나머지는 회색 처리
                const bgColor = hasSelected && !isSelected ? colors.gray[1] : npcColors[key].bg;
                const borderColor = hasSelected && !isSelected ? colors.gray[3] : npcColors[key].border;
                const textColor = hasSelected && !isSelected ? colors.gray[4] : "#000";

                return (
                    <s.Option
                        key={i}
                        selected={isSelected}
                        bgColor={bgColor}
                        borderColor={borderColor}
                        textColor={textColor}
                        onClick={() => handleClick(i)}
                    >
                        <s.OptionNumber>{numberLabel}</s.OptionNumber>
                        {opt}
                    </s.Option>
                );
            })}
        </s.Options>
    );
}