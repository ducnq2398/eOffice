import { useEffect, useState } from "react";
import userListAPI from "../../api/userListAPI";
import BeatLoader from "react-spinners/BeatLoader";

function GetAdminCompany({ id }) {
  const [admin, setAdmin] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAdmin() {
      try {
        const response = await userListAPI.getUserById(id);
        setAdmin(response.data.name);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAdmin();
  }, [id]);
  return (
    <div>
      {loading ? (
        <BeatLoader color={"#2512DF"} loading={loading} size={5} />
      ) : (
        <div> {admin}</div>
      )}
    </div>
  );
}
export default GetAdminCompany;
