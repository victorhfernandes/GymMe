//import { ChangeEvent } from "react";
//import "./InputText.css";

import { Dispatch } from "react";

interface Props {
  values: InputTextType[];
}

type InputTextType = {
  type: string;
  placeholder: string;
  value: string;
  setFunc: Dispatch<string>;
};

const InputText = ({ values }: Props) => {
  return (
    <>
      {values.map((item, index) => (
        <input
          key={index}
          type={item.type}
          placeholder={item.placeholder}
          onChange={(event) => item.setFunc(event.target.value)}
          value={item.value}
          autoComplete="on"
          name={item.placeholder.toLowerCase()}
        />
      ))}
    </>
  );
};

export default InputText;
