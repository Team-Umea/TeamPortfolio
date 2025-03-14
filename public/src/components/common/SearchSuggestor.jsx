import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function SearchSuggestor({
  data,
  select,
  disabledPlaceholder = "",
  enabledPlaceHolder = "",
}) {
  const [suggestions, setSuggestions] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const suggestionsRef = useRef(null);

  useEffect(() => {
    setSuggestions(data);
  }, [data]);

  const search = (query) => {
    const matchingItems = [...suggestions].sort((a, b) => {
      const tabNameA = a.toLowerCase();
      const tabNameB = b.toLowerCase();

      const aIndex = tabNameA.indexOf(query);
      const bIndex = tabNameB.indexOf(query);

      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }

      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      return 0;
    });

    setSearchQuery(query);
    setSuggestions(matchingItems);
  };

  const hideSuggestions = () => {
    setSearchQuery("");
  };

  const selectSuggestion = (item) => {
    select(item);
    hideSuggestions();
  };

  useOutsideClick(suggestionsRef, hideSuggestions);

  const visibleSuggestions = [...suggestions.slice(0, 10)];
  const showSuggestions = searchQuery && suggestions && suggestions.length > 0;
  const disabled = !suggestions || suggestions.length === 0;

  return (
    <div className="relative flex items-center gap-x-4 pb-[1px] border-b-[1px]">
      <IoIosSearch size={24} />
      <input
        name="admins"
        value={searchQuery}
        placeholder={disabled ? disabledPlaceholder : enabledPlaceHolder}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        disabled={disabled}
        onChange={(e) => search(e.target.value.trim().toLowerCase())}
        className="w-full bg-transparent border-0 outline-none"
      />
      {showSuggestions && (
        <ul
          ref={suggestionsRef}
          className="flex flex-col gap-y-2 absolute top-[30px] left-0 w-full max-h-[140px] p-2 overflow-y-auto bg-gray-200">
          {visibleSuggestions.map((suggestion) => {
            return (
              <li
                key={suggestion}
                onClick={() => selectSuggestion(suggestion)}
                className="transition-all duration-300 hover:text-slate-400 cursor-pointer">
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
