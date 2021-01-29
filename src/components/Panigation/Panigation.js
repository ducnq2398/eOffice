import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';


function Panigation({currentPage,postsPerPage, totalPosts, paginate}) {
    const pageNumbers = Math.ceil(totalPosts/postsPerPage)
    return (
        <Pagination>
            <PaginationItem disabled={true}>
                <PaginationLink>{currentPage}/{pageNumbers}</PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={currentPage<=1}>
                <PaginationLink onClick={() => paginate(currentPage-1)}>Prev</PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={currentPage>=pageNumbers}>
                <PaginationLink onClick={()=> paginate(currentPage+1)}>Next</PaginationLink>
            </PaginationItem>
        </Pagination>
    );
}

export default Panigation;
