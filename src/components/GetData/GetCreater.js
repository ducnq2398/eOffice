import { useEffect, useState } from "react";
import userListAPI from "../../api/userListAPI";

function GetCreater({id}){
    const [creater, setCreater] = useState('');
    useEffect(()=>{
        async function fetchCreater(){
            try {
                const response = await userListAPI.getUserById(id);
                setCreater(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCreater();
    },[])
    return(
        <div>
            {creater.name}
        </div>
    );
}
export default GetCreater;