import React from 'react';
import back from '../../images/back.png';
import next from '../../images/next.png';
import {Input, Pagination, PaginationItem, PaginationLink} from 'reactstrap';


function PagDoc({currentPage,postsPerPage, totalPosts, paginate}) {
    const pageNumbers = Math.ceil(totalPosts/postsPerPage)
    return (
        <Pagination>
            <Input style={{width:'60px'}} type="number" value={currentPage} onChange={(e)=>paginate(e.target.value)}/>    
            <PaginationItem disabled>
                <PaginationLink>
                    {currentPage}/{pageNumbers} 
                </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={currentPage<=1}>
                <PaginationLink onClick={() => paginate(currentPage-1)}>
                    <img src={back} alt="" width="15px" height="15px" />
                </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={currentPage>=pageNumbers}>
                <PaginationLink onClick={()=> paginate(currentPage+1)}>
                    <img src={next} alt="" width="15px" height="15px" />
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    );
}
export default PagDoc;