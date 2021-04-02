import { useEffect, useState } from "react";
import userListAPI from "../../api/userListAPI";
import BeatLoader from "react-spinners/BeatLoader";
import { browserName } from "react-device-detect";
import logoutAPI from "../../api/logoutAPI";
import { getUser, removeUserSession } from "../../utils/Common";
import { useHistory } from "react-router";
function GetAdminCompany({ id }) {
  const [admin, setAdmin] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    async function getAdmin() {
      try {
        const response = await userListAPI.getUserById(id);
        setAdmin(response.data.name);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          const params = {
            id: getUser().Id,
            device: browserName,
          };
          logoutAPI
            .logout(params)
            .then(function () {
              removeUserSession();
              history.push("/admin");
            })
            .catch(function (error) {
              console.log(error);
            });
        }
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
