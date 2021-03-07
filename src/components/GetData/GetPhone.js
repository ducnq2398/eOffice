import { useEffect, useState } from "react";
import userListAPI from "../../api/userListAPI";
import BeatLoader from "react-spinners/BeatLoader";

function GetPhone({ id }) {
  const [creater, setCreater] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCreater() {
      try {
        const response = await userListAPI.getUserById(id);
        setCreater(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCreater();
  }, []);
  return (
    <div>
      {loading ? (
        <BeatLoader color={"#2512DF"} loading={loading} size={5} />
      ) : (
        <div>{creater.phone}</div>
      )}
    </div>
  );
}
export default GetPhone;
