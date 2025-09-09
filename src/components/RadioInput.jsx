import { useState } from "react";
import Select from "react-select";

const options = [
    { value: "4", label: "PC" },
    { value: "187", label: "PS5" },
    { value: "18", label: "PS4" },
    { value: "16", label: "PS3" },
    { value: "15", label: "PS2" },
    { value: "27", label: "PlayStation" },
    { value: "1", label: "Xbox One / Series" },
    { value: "14", label: "Xbox 360" },
    { value: "3", label: "Xbox" },
    { value: "5", label: "iOS" },
    { value: "21", label: "Android" },
    { value: "7", label: "Nintendo 3DS" },
    { value: "8", label: "Nintendo DS" },
    { value: "9", label: "Nintendo DSi" },
    { value: "10", label: "macOS" },
];

export function RadioInput({ onSelect, onClear }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (option) => {
        setSelectedOption(option); // ✅ сохраняем объект полностью
        if (onSelect) onSelect(option.value, option.label);
    };

    const handleClear = () => {
        setSelectedOption(null);
        if (onClear) onClear();
    };

    return (
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Select
                options={options}
                value={selectedOption} // объект из options
                onChange={handleChange}
                placeholder="Выберите платформу"
                isSearchable={false}
            />
            {selectedOption && (
                <button onClick={handleClear} style={{ padding: "6px 12px", cursor: "pointer" }}>
                    Очистить
                </button>
            )}
        </div>
    );
}
