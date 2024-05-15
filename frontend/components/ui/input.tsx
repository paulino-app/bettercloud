import React, { useState } from "react";

interface InputProps {
  label: string;
  name: string;
  change: (name: string, value: string | number) => void;
  type?: "text" | "number";
}

/**
 * Input component for handling text and number inputs.
 * @param {string} label - The label for the input.
 * @param {string} name - The name of the input.
 * @param {(name: string, value: string | number) => void} change - The function to handle input changes.
 * @param {"text" | "number"} [type="text"] - The type of the input.
 * @returns {JSX.Element} The Input component.
 */
const Input: React.FC<InputProps> = ({
  label,
  name,
  change,
  type = "text",
}) => {
  const [text, setText] = useState<string | number>("");
  const [focus, setFocus] = useState<boolean>(false);

  /**
   * Handles the change in input value.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let value: string | number = event.target.value;
    if (type === "number") {
      value = value === "" ? "" : Number(value);
    }
    setText(value);
    change(name, value);
  };

  /**
   * Handles the focus event.
   */
  const handleFocus = (): void => {
    setFocus(true);
  };

  /**
   * Handles the blur event.
   */
  const handleBlur = (): void => {
    setFocus(false);
  };

  /**
   * Validates the input field to determine if it should be focused.
   * @returns {boolean} Whether the input field should be focused.
   */
  const validate = (): boolean => {
    return text !== "" || focus;
  };

  return (
    <div className="relative z-10 bg-white">
      <span
        className="font-manjari absolute left-4 top-4 -z-10 text-main-gray transition-all delay-75"
        style={{
          top: validate() ? "8px" : "16px",
          fontSize: validate() ? "14px" : "18px",
        }}
      >
        {label}
      </span>

      <input
        className="w-full rounded-[14px] border border-solid border-main-gray-light bg-transparent pb-2 pl-[15px] pr-4 pt-[22px] text-sm text-[#02132B] focus:border-main-blue focus:outline-none"
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleText}
        value={text}
      />
    </div>
  );
};

export default Input;
