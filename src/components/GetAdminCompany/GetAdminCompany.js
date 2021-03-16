import { useEffect, useState } from "react";
import userListAPI from "../../api/userListAPI";

function GetAdminCompany({id}){
    const [admin, setAdmin] = useState('');
    useEffect(() =>{
        async function getAdmin(){
            try {
                const response = await userListAPI.getUserById(id);
                setAdmin(response.data.name);
            } catch (error) {
                console.log(error);
            }
        }
        getAdmin();
    },[id]);
    return(
        <div>
            <p>{admin}</p>
        </div>
    );
}
export default GetAdminCompany;