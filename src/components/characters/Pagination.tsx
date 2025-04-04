import React from "react";

interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({page, totalPages, setPage}) => (
    <nav aria-label="Character navigation" className="mt-5">
        <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 && "disabled"}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                    <i className="bi bi-chevron-left"></i> Previous
                </button>
            </li>

            {page > 3 && (
                <li className="page-item">
                    <button className="page-link" onClick={() => setPage(1)}>1</button>
                </li>
            )}
            {page > 4 && (
                <li className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            )}

            {[...Array(5)].map((_, i) => {
                const pageNum = page - 2 + i;
                if (pageNum > 0 && pageNum <= totalPages) {
                    return (
                        <li key={pageNum} className={`page-item ${page === pageNum && "active"}`}>
                            <button className="page-link" onClick={() => setPage(pageNum)}>{pageNum}</button>
                        </li>
                    );
                }
                return null;
            })}

            {page < totalPages - 3 && (
                <li className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            )}
            {page < totalPages - 2 && (
                <li className="page-item">
                    <button className="page-link" onClick={() => setPage(totalPages)}>{totalPages}</button>
                </li>
            )}
            <li className={`page-item ${page === totalPages && "disabled"}`}>
                <button className="page-link" onClick={() => setPage(page + 1)}>
                    <i className="bi bi-chevron-right"></i> Next
                </button>
            </li>
        </ul>
    </nav>
);

export default Pagination;