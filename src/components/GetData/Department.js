import departmentAPI from "../../api/departmentAPI";

export default async function getData(id) {
  const response = await departmentAPI.getDepartmentById(id);
  return response.data.name;
}
