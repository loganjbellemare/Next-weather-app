import React from "react";

type Props = {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
};

export default function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: Props) {
  return (
    <div className="absolute top-13">
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white border border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
          {(error && suggestions.length < 1) ?? (
            <li className="text-red-500 p-1 ">{error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded   hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
