import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Table} from 'reactstrap';


PostList.propTypes = {
    posts: PropTypes.array,
};

PostList.defaultProps = {
    posts: [],
};

function PostList(props) {

    const {posts} = props;
    return (
        <Table className="table_css">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Company Name</th>
                            <th>Aplicant Name</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            <th>Phone Number</th>
                            <th>Email Address</th>
                            <th>Edits/Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(data => (
                            <tr key={data.id}>
                                    <th>{data.id}</th>
                                    <th>{data.email}</th>
                                    <th>{data.first_name}</th>
                                    <th>{data.last_name}</th>
                                    <th>{data.avatar}</th>
                                    {/* <th>{phone}</th>
                                    <th>{email}</th> */}
                                    <th>
                                        <Link to="/edit-company">Edit/Detail</Link>
                                    </th>
                            </tr>))}  
                    </tbody>    
            </Table>
        
             

           
    );
}
export default PostList;