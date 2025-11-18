import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

export const CharacterBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export const Name = styled.div`
    font-size: 18px;
    font-weight: bold;
    text-transform: capitalize;
`;

export const Arrow = styled.button`
    font-size: 28px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;

    &:hover {
        opacity: 0.6;
    }
`;

export const SelectButton = styled.button`
    margin-top: 15px;
    padding: 10px 20px;
    background: #4b6bff;
    color: white;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        opacity: 0.8;
    }
`;
