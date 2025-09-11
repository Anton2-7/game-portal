import { useState } from "react";
import Select from "react-select";

const options = [
    { value: "4", label: "PC" },
    { value: "187", label: "PS5" },
    { value: "18", label: "PS4" },
    { value: "16", label: "PS3" },
    { value: "15", label: "PS2" },
    { value: "19", label: "PS Vita" },
    { value: "17", label: "PSP" },
    { value: "27", label: "PlayStation" },
    { value: "186", label: "Xbox One / Series" },
    { value: "14", label: "Xbox 360" },
    { value: "80", label: "Xbox" },
    { value: "3", label: "iOS" },
    { value: "21", label: "Android" },
    { value: "7", label: "Nintendo 3DS" },
    { value: "8", label: "Nintendo DS" },
    { value: "7", label: "Nintendo Switch" },
    { value: "13", label: "Nintendo DSi" },
    { value: "5", label: "macOS" },
    { value: "6", label: "Linux" },
    { value: "10", label: "Wii U" },
    { value: "11", label: "Wii" },
    { value: "105", label: "Gamecube" },
    { value: "83", label: "Nintendo 64" },
    { value: "24", label: "GameBoy Advance" },
    { value: "43", label: "GameBoy Color" },
    { value: "26", label: "Game Boy" },
    { value: "79", label: "SNES" },
    { value: "49", label: "NES" },
    { value: "55", label: "Classic Macintosh" },
    { value: "41", label: "Apple II" },
    { value: "166", label: "Commodore / Amiga" },
    { value: "28", label: "Atari 7800" },
    { value: "31", label: "Atari 5200" },
    { value: "23", label: "Atari 2600" },
    { value: "22", label: "Atari Flashback" },
    { value: "25", label: "Atari 8-bit" },
    { value: "34", label: "Atari ST" },
    { value: "46", label: "Atari Lynx" },
    { value: "50", label: "Atari XEGS" },
    { value: "167", label: "Genesis" },
    { value: "107", label: "Sega Saturn" },
    { value: "119", label: "Sega CD" },
    { value: "117", label: "Sega 32X" },
    { value: "74", label: "SEGA Master System" },
    { value: "106", label: "Dreamcast" },
    { value: "111", label: "3DO" },
    { value: "112", label: "Jaguar" },
    { value: "77", label: "Game Gear" },
    { value: "12", label: "Neo Geo" },















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
