import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;

  @media (max-width: 856px) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  width: 50%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Eclpise = styled.div`
  width: 40%;
  height: 50%;
  border-radius: 518px;
  background: rgba(134, 193, 255, 0.6);
  filter: blur(50px);
  position: absolute;
  z-index: -100;
`;

export const Image = styled.img`
  width: 80%;
  height: auto;
  z-index: 1;
`;

export const Right = styled.div`
  width: 50%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Tittle = styled.div`
  ${fonts.P5}
  margin-top: 2rem;
  color: ${colors.black};

  @media (max-width: 856px) {
    ${fonts.P4}
  }
`;

export const Description = styled.p`
  ${fonts.P3}
  margin-bottom: 2rem;
  color: ${colors.gray[4]};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 500px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  label {
    margin-bottom: 0.5rem;
    ${fonts.P3}
    color: ${colors.black};
  }

  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid ${colors.gray[3]};
    border-radius: 12px;
    ${fonts.P3};

    &:focus {
      border-color: ${colors.primary};
      outline: none;
    }
  }
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
  margin-top: 2rem;
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) =>
    props.disabled ? colors.white : colors.blue.light4};
  color: ${(props) => (props.disabled ? colors.gray[3] : colors.black )};
  border: 1px solid
    ${(props) => (props.disabled ? colors.gray[3] : colors.blue.light4 )};
  border-radius: 4px;
  ${fonts.P3};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? colors.white : colors.primary};
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  ${fonts.P3};
  color: ${colors.black};
  cursor: pointer;

  input[type="radio"] {
    margin-right: 0.5rem;
    width: 12px;
    height: 12px;
    appearance: none;
    border: 2px solid ${colors.gray[3]};;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: white;

    &:checked {
      background-color: ${colors.blue.light2};;
      border-color: ${colors.primary};;
    }

    &:hover {
      border-color: ${colors.primary};;
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 12px;
  ${fonts.P3};
  -webkit-appearance: none; /* Remove default browser styling */
  -moz-appearance: none;
  appearance: none;
  background-color: ${colors.white};
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2C197.9L159.3%2C69.2c-3.7-3.7-9.8-3.7-13.5%2C0L5.4%2C197.9c-3.7%2C3.7-3.7%2C9.8%2C0%2C13.5l13.5%2C13.5c3.7%2C3.7%2C9.8%2C3.7%2C13.5%2C0l110.7-110.7l110.7%2C110.7c3.7%2C3.7%2C9.8%2C3.7%2C13.5%2C0l13.5-13.5C290.7%2C207.7%2C290.7%2C201.6%2C287%2C197.9z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 0.8em auto;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;
