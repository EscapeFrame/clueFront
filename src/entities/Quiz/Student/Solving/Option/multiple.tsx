import { useState } from "react";
import * as s from "../styles";
import { colors } from "@/shared/theme/theme.styles";

type OptionProps = {
    options: string[];
    optionKeys: Array<"owl" | "haeyul" | "panda" | "ferret" | "I" | "koala">; // npc 키 순서
    onSelect: (index: number) => void;
};
type CharacterKey = "owl" | "haeyul" | "panda" | "ferret" | "I" | "koala";

const npcColors: Record<CharacterKey, { bg: string; border: string }> = {
    owl: { bg: colors.npc.owl[0], border: colors.npc.owl[1] },
    haeyul: { bg: colors.npc.haeyul[0], border: colors.npc.haeyul[1] },
    panda: { bg: colors.npc.panda[0], border: colors.npc.panda[1] },
    ferret: { bg: colors.npc.ferret[0], border: colors.npc.ferret[1] },
    I: { bg: colors.npc.I[0], border: colors.npc.I[1] },
    koala: { bg: colors.npc.koala[0], border: colors.npc.koala[1] },
};

const OPTION_KEYS: CharacterKey[] = ["haeyul", "panda", "ferret", "koala"];

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