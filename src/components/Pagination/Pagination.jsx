import { useState } from "react";
import "./style.css";
function Pagination({ page, totalPages, onPageChange }) {
    const [pageTo, setPageTo] = useState("");

    const handleGoToPage = () => {
        const pageNum = parseInt(pageTo, 10);
        if (!isNaN(pageNum) && pageNum > 0 && pageNum <= totalPages) {
            onPageChange(pageNum);
            setPageTo(""); // очищаем поле после перехода
        }
    };

    return (
        <div className="pagination" style={{ marginTop: 20, display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Кнопка назад */}
            <button className="pagination-btn" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
                Назад
            </button>

            <span>
                Страница {page} из {totalPages}
            </span>

            <button className="pagination-btn" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
                Дальше
            </button>

            {/* Переход на страницу */}
            <div className="pageTo" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span>Отобразить</span>
                <input
                    className="pageToInput"
                    type="number"
                    name="pageTo"
                    min="1"
                    max={totalPages}
                    value={pageTo}
                    onChange={(e) => setPageTo(e.target.value)}
                    style={{ width: "60px" }}
                />
                <span>страницу</span>
                <button className="pagination-btn" onClick={handleGoToPage}>Перейти</button>
            </div>
        </div>
    );
}

export { Pagination };
