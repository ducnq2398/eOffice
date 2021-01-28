import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';


function Panigation({postsPerPage, totalPosts, paginate}) {
    const pageNumbers = [];
    for(let i=1; i<= Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);
    }
    return (
        <Pagination>
            {pageNumbers.map(number =>(
                <PaginationItem key={number}>
                    <PaginationLink onClick={() => paginate(number)}>{number}</PaginationLink>
                </PaginationItem>
            ))}
        </Pagination>
    );
}

export default Panigation;
