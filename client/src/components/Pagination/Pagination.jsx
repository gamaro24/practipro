import React from "react";
import ReactPaginate from 'react-paginate';

export const PaginationCustom = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      forcePage={currentPage - 1}
      onPageChange={(number) => paginate(number.selected + 1)}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
    /*  <nav className='d-flex justify-content-center'>
            <ul className='pagination d-flex flex-wrap justify-content-center'>
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'} >
                        <button onClick={() => paginate(number)} className='page-link'>{number}</button>
                    </li>
                ))}
            </ul>
        </nav > */
  );
};

