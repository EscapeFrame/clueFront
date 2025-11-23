import { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import * as s from "./styles";

type Character =
    | "owl"
    | "haeyul"
    | "panda"
    | "ferret"
    | "I"
    | "koala";

const CHARACTERS: Character[] = [
    "owl",
    "haeyul",
    "panda",
    "ferret",
    "I",
    "koala",
];

const getCharacterImage = (character: Character) =>
    `/Paletto/${character}.png`;

type Props = {
    onSelect: (character: Character) => void;
};

export const CharacterSelector = ({ onSelect }: Props) => {
    const [index, setIndex] = useState(0);

    const current = CHARACTERS[index];

    // index 변경 시마다 부모로 자동 전달
    useEffect(() => {
        onSelect(current);
    }, [index, current, onSelect]);

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? CHARACTERS.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev === CHARACTERS.length - 1 ? 0 : prev + 1));
    };

    return (
        <s.Container>
            <s.Arrow onClick={handlePrev}><IoIosArrowBack /></s.Arrow>

            <s.CharacterBox>
                <img
                    src={getCharacterImage(current)}
                    alt={current}
                    width={200}
                    height={200}
                />
            </s.CharacterBox>

            <s.Arrow onClick={handleNext}><IoIosArrowForward /></s.Arrow>
        </s.Container>
    );
};