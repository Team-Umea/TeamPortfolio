import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function FormInput({
  label,
  type = "text",
  placeholder = "",
  min,
  max,
  minLength,
  maxLength,
  value,
  onChange,
  onBlur,
  errorMessage,
  autoFocus,
  children,
  ...props
}) {
  const [inputType, setInputType] = useState(type);

  const charCount = value ? String(value).length : 0;
  const remainingChars = maxLength !== undefined ? maxLength - charCount : undefined;
  const minCharsMet = minLength !== undefined ? charCount >= minLength : false;

  const controlledValue = value === "undefined" || !value ? "" : value;

  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(type === "number" ? Number(inputValue) : inputValue);
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const clipboardData = e.clipboardData.getData("text");

    const newValue = controlledValue + clipboardData;
    onChange(type === "number" ? Number(newValue) : newValue);
  };

  const togglePasswordVisibilty = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <div
        className={`flex justify-between gap-x-12 mb-4 ${
          errorMessage ? "opacity-100" : "opacity-0"
        }`}>
        <p className="text text-red-500 font-bold">{errorMessage}</p>
        <HiOutlineExclamationCircle size={24} color="red" />
      </div>
      <div
        className={`p-4 border-2 rounded-md ${
          errorMessage ? "border-red-500" : "border-transparent"
        }`}>
        <label className="text-lg text-slate-600 font-medium">{label}</label>
        <div className="flex p-2 border-b-2 border-gray-400">
          <input
            type={inputType}
            value={controlledValue}
            placeholder={placeholder}
            min={min}
            max={max}
            minLength={minLength}
            maxLength={maxLength}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoFocus={autoFocus}
            onChange={handleChange}
            onPaste={handlePaste}
            onBlur={(e) => onBlur && onBlur(e.target.value)}
            {...props}
            className="w-full border-0 outline-none"
          />
          {type === "password" && (
            <button type="button" onClick={togglePasswordVisibilty} className="cursor-pointer">
              {inputType === "password" ? <FiEye size={24} /> : <FiEyeOff size={24} />}
            </button>
          )}
        </div>
        {(minLength !== undefined || maxLength !== undefined) && (
          <div className="text-sm text-gray-600">
            {minCharsMet ? (
              remainingChars !== undefined ? (
                <span>
                  <span className="text-black font-semibold">{remainingChars}</span> char&nbsp;
                  {remainingChars !== 1 ? "s" : ""} remaining
                </span>
              ) : (
                "Minimum characters met"
              )
            ) : (
              <span>
                A minimum of {minLength} characters is required. The current character count is
                <span className="text-black font-semibold">&nbsp;{charCount}.</span>
              </span>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
