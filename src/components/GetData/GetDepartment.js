import { useEffect, useState } from "react";
import departmentAPI from "../../api/departmentAPI";
import BeatLoader from "react-spinners/BeatLoader";

function GetDepartment({ id }) {
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchDeparment() {
      try {
        const response = await departmentAPI.getDepartmentById(id);
        setDepartment(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDeparment();
  }, []);
  return (
    <div>
      {loading ? (
        <BeatLoader color={"#2512DF"} loading={loading} size={5} />
      ) : (
        <div>{department.name}</div>
      )}
    </div>
  );
}
export default GetDepartment;
