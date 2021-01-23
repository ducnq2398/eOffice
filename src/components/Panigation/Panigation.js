import React from 'react';
import PropTypes from 'prop-types';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

Panigations.propTypes = {
    panigation: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Panigations.defaultProps = {
    onPageChange: null,
};

function Panigations(props) {
    const {panigation, onPageChange} = props;
    const {page, limit, totalRow} = panigation;
    const totalPages = Math.ceil(totalRow / limit); 

    function handlePageChange(newPage){
        if(onPageChange){
            onPageChange(newPage);
        }
    }
    return (
        <Pagination>
            <PaginationItem disabled={page<=1} >
                <PaginationLink onClick={() => handlePageChange(page-1)}>Prev</PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={page>=totalPages}>
                <PaginationLink onClick={() => handlePageChange(page+1)}>Next</PaginationLink>
            </PaginationItem>
        </Pagination>
    );
}

export default Panigations;