

const Pagination = ({ currentPage, totalPages, goToNextPage, goToPrevPage, goToFirstPage, goToLastPage }: { currentPage: number, totalPages: number, goToNextPage: () => void, goToPrevPage: () => void, goToFirstPage: () => void, goToLastPage: () => void }) => {
    return (
        <nav>
            <ul className="w-full flex justify-center gap-1 sm:gap-3">
                <li className={` ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="bg-white sm:px-2 px-1 text-sm sm:text-base rounded-md page-link" onClick={goToFirstPage}>
                        <i className="fa-solid fa-angles-left"></i>
                    </button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="bg-white sm:px-2 px-1 text-sm sm:text-base rounded-md page-link" onClick={goToPrevPage}>
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="bg-white sm:px-2 px-1 text-sm sm:text-base rounded-md page-link" onClick={goToNextPage}>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="bg-white sm:px-2 px-1 text-sm sm:text-base rounded-md page-link" onClick={goToLastPage}>
                        <i className="fa-solid fa-angles-right"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;