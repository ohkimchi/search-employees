import { API } from "./api"

const oriUrl = "http://api.additivasia.io/api/v1/assignment/employees"

export async function getDirectSub(name: string) {
  const url = `${oriUrl}/${name}`
  return await API(url)
    .catch(err => console.log("no result"))
    .then(res => res)
}
