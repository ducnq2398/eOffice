import { useEffect, useState } from "react";
import { TreeItem } from "@material-ui/lab";
import departmentAPI from "../../api/departmentAPI";

function GetSubDepartment({id}) {
    const [subdepartment, setSubDepartment] = useState([]);
    useEffect(()=>{
        async function fetListSub(){
            try {
                const res = await departmentAPI.getSubDepartment(id);
                setSubDepartment(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetListSub();
    },[id])
    return(
        <div>
            {subdepartment.map(row =>(
                <TreeItem key={row.id} label={row.name}/>
            ))}
        </div>
    )
    
}
export default GetSubDepartment;