import departmentAPI from "../../api/departmentAPI";

export default async function getDataSub(id) {
  const response = await departmentAPI.getSubDepartmentById(id);
  return response.data.name;
}