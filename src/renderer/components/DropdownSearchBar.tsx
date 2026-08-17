import React, { useState, useEffect, useRef } from "react";
import StyledInput from "./StyledInput";

interface Props {
  value: string;
  items: readonly string[];
  onChange: (s: string) => void;
  label?: string;
  error?: string;
  shouldOpenWhenEmpty?: boolean;
}

export default function DropdownSearchBar({
  value = "",
  label = "",
  error = "",
  items,
  onChange,
  shouldOpenWhenEmpty = true,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes((value ?? "").toLowerCase()),
  );

  // Close dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleFocus = () => {
    setIsOpen(value.length > 0 || shouldOpenWhenEmpty);
    setFocusedIndex(value.length > 0 ? 0 : -1);
  };

  // Wrapper to handle item selection (through mouse or keyboard)
  const handleItemSelect = (item: string) => {
    onChange(item);
    setIsOpen(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shouldOpen = e.target.value.length > 0 || shouldOpenWhenEmpty;
    onChange(e.target.value);
    setFocusedIndex(e.target.value.length > 0 ? 0 : -1);
    setIsOpen(shouldOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setFocusedIndex(value.length > 0 ? 0 : -1);
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(); // Prevents cursor from moving in text input
        setFocusedIndex((prev) => (prev + 1) % filteredItems.length);
        break;

      case "ArrowUp":
        e.preventDefault(); // Prevents cursor from jumping to start of input
        setFocusedIndex(
          (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
        );
        break;

      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredItems.length) {
          handleItemSelect(filteredItems[focusedIndex]);
        }
        setIsOpen(false);

        break;

      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        onChange("");
        break;

      case "Tab":
        if (focusedIndex >= 0 && focusedIndex < filteredItems.length) {
          handleItemSelect(filteredItems[focusedIndex]);
        }
        setIsOpen(false);

        break;

      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <StyledInput
        value={value}
        label={label}
        error={error}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
      {isOpen && (
        <ul className="absolute z-10 rounded-md mt-1 top-full w-full bg-background max-h-60 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={item}
                onClick={() => {
                  handleItemSelect(item);
                }}
                onMouseOver={() => {
                  setFocusedIndex(index);
                }}
                className={`p-2 ${index === focusedIndex ? "bg-primary text-background-lowered  " : ""} cursor-pointer`}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="p-2">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}
