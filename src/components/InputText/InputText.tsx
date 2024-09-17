//import { ChangeEvent } from "react";
//import "./InputText.css";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  values: InputTextType[];
}

type InputTextType = {
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
};

const InputText = ({ values }: Props) => {
  return (
    <>
      {values.map((item, index) => (
        <input
          {...item.register(item.placeholder.toLowerCase())}
          key={index}
          type={item.type}
          placeholder={item.placeholder}
          autoComplete="on"
        />
      ))}
    </>
  );
};

export default InputText;
