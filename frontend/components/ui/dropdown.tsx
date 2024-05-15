import useOutsideAlerter from "@/app/hooks/useOutsideAlerter";
import React, { useEffect, useRef, useState } from "react";

interface DropdownOption {
  name: string;
  code: string | number;
}

interface DropdownProps {
  name: string;
  label: string;
  change: (name: string, value: string | number) => void;
  options: DropdownOption[];
}

interface DropdownItemProps {
  name: string;
  index: number;
  active: boolean;
  change: (index: number) => void;
}

interface OutsideAlerterProps {
  ref: React.RefObject<HTMLElement>;
  fun: () => void;
}

/**
 * Dropdown component for selecting an option from a list.
 * @param {string} name - The name of the dropdown.
 * @param {string} label - The label of the dropdown.
 * @param {(name: string, value: string | number) => void} change - Function to handle changes.
 * @param {DropdownOption[]} options - List of options.
 * @returns {JSX.Element} The Dropdown component.
 */
export default function Dropdown({
  name,
  label,
  change,
  options,
}: DropdownProps): JSX.Element {
  const [selected, setSelected] = useState<DropdownOption | null>(null);
  const [selectedDisplay, setSelectedDisplay] = useState<DropdownOption | null>(
    null,
  );
  const [prev, setPrev] = useState<number>(0);
  const [option, setOption] = useState<DropdownOption[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [dictionary, setDictionary] = useState<number[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const directoryIndex = useRef<number>(0);

  useEffect(() => {
    setOption(options);
  }, [options]);

  const openHandler = (): void => {
    setShow(true);
  };

  const closeHandler = (): void => {
    setShow(false);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLSelectElement>,
  ): void => {
    const { key } = event;

    if (key === " ") {
      event.preventDefault();
      openHandler();
    }

    if (!show) return;

    switch (key) {
      case "Enter":
        setItem(prev);
        break;

      case "ArrowUp":
        if (prev > 0) {
          setPrev((prev) => prev - 1);
          if (listRef.current) {
            listRef.current.scrollTop = (prev - 1) * 36;
          }
        }
        break;

      case "ArrowDown":
        if (prev < options.length - 1) {
          setPrev((prev) => prev + 1);
          if (listRef.current) {
            listRef.current.scrollTop = (prev - 1) * 36;
          }
        }
        break;

      case "Escape":
        setShow(false);
        break;

      default:
        break;
    }

    const charRegex = /^[a-zA-Z]$/;
    if (charRegex.test(key)) {
      const _dictionary: number[] = [];
      for (let i = 0; i < options.length; ++i) {
        const { name } = options[i];
        const d = name.substring(0, 1).toLowerCase();

        if (d === key.toLowerCase()) {
          _dictionary.push(i);
        }
      }

      const isEqual = dictionary.every(
        (value, index) => value === _dictionary[index],
      );
      setDictionary(_dictionary);

      if (!isEqual) {
        directoryIndex.current = 0;
      }

      const _prev = _dictionary[directoryIndex.current];
      setPrev(_prev);

      if (directoryIndex.current >= _dictionary.length - 1) {
        directoryIndex.current = 0;
      } else {
        directoryIndex.current += 1;
      }

      if (itemRef.current && listRef.current) {
        listRef.current.scrollTop = _prev * 36;
      }
    }
  };

  const blurHandler = (): void => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
    closeHandler();
  };

  useOutsideAlerter(wrapperRef, blurHandler);

  const validate = (): boolean => {
    return selected !== null;
  };

  const handleClick = (): void => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
    if (selectRef.current) {
      selectRef.current.focus();
    }

    if (show) {
      closeHandler();
    } else {
      openHandler();
    }
  };

  const setItem = (index: number): void => {
    const item = options[index];
    const { code } = item;

    setSelected(item);

    if (!selected) {
      setTimeout(() => {
        setSelectedDisplay(item);
      }, 150);
    } else {
      setSelectedDisplay(item);
    }

    change(name, code);
    closeHandler();
  };

  const clickItem = (index: number): void => {
    setItem(index);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative z-10 h-[50px] bg-white" onClick={handleClick}>
        <div className="w-full">
          <span
            className="font-manjari absolute left-4 top-4 -z-10 text-main-gray transition-all delay-75"
            style={{
              top: validate() ? "8px" : "16px",
              fontSize: validate() ? "14px" : "18px",
            }}
          >
            {label}
          </span>
          <div className="h-[50px] w-full cursor-pointer bg-transparent px-4 pt-[24px] text-sm text-[#02132B]">
            <select
              className="absolute left-0 top-0 -z-10 h-full w-full appearance-none rounded-md border border-solid border-main-gray-light bg-transparent focus:border-main-blue focus:outline-none"
              onKeyDown={handleKeyDown}
              ref={selectRef}
            ></select>
            <div className="h-5 w-full overflow-hidden text-left">
              {selectedDisplay?.name}
            </div>
            <div className="absolute right-0 top-0 -z-10 flex h-full w-[50px] items-center justify-center">
              <div className="flex h-[28px] w-full items-center justify-center border-l border-solid border-main-gray-light">
                <svg
                  width="11"
                  height="6"
                  viewBox="0 0 11 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.5 6L0.73686 1.86781e-08L10.2631 8.86545e-07L5.5 6Z"
                    fill="#D4D5D7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* dropbox */}
      <div
        className="absolute z-50 max-h-[126px] w-full overflow-y-scroll rounded-b-md border-x-main-gray-light bg-white shadow-lg"
        style={{
          display: show ? "block" : "none",
        }}
        ref={listRef}
      >
        {option.map((value, index) => {
          const { name } = value;
          return (
            <div key={index} ref={prev === index ? itemRef : null}>
              <DropdownItem
                name={name}
                index={index}
                change={clickItem}
                active={prev === index}
                key={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * DropdownItem component for rendering a single item in the dropdown.
 * @param {string} name - The name of the item.
 * @param {number} index - The index of the item.
 * @param {boolean} active - Whether the item is active.
 * @param {(index: number) => void} change - Function to handle item change.
 * @returns {JSX.Element} The DropdownItem component.
 */
function DropdownItem({
  name,
  index,
  active,
  change,
}: DropdownItemProps): JSX.Element {
  const itemRef = useRef<HTMLDivElement>(null);

  const handleItem = (): void => {
    change(index);
  };

  return (
    <div
      className={`font-manjari cursor-pointer pb-1 pl-4 pt-2 text-left text-main-gray hover:bg-[#e9ecef] ${
        active ? "bg-[#eef2ff]" : ""
      }`}
      ref={itemRef}
      onClick={handleItem}
    >
      {name}
    </div>
  );
}
