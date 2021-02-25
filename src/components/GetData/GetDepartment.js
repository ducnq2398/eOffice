import { useEffect, useState } from "react";
import departmentAPI from '../../api/departmentAPI';

function GetDepartment({id}){
    const [department, setDepartment] = useState('');
    useEffect(()=>{
        async function fetchDeparment(){
            try {
                const response = await departmentAPI.getDepartmentById(id);
                setDepartment(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDeparment();
    },[])
    return(
        <div>
            {department.name}
        </div>
    );
}
export default GetDepartment;