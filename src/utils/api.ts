import { Dispatch } from "react"
import { IAction } from "../App/AppReducer"

type fetchFunction = (
  method: string,
  dispatch: Dispatch<IAction>,
  url: string
) => Promise<void | any>

const http: fetchFunction = async (method, dispatch, url) => {
  let response = await fetch(url, {
    method
  })
  if (response) {
    console.log("before json", response)
    response = await response.json()
  }
  if (response) {
    console.log("after json", response)
    return response
  }
}
type apiFunction = (
  dispatch: Dispatch<IAction>,
  url: string
) => Promise<void | any>

interface IFetchPromise {
  [method: string]: apiFunction
}

export const API: IFetchPromise = {
  get: async (dispatch, url) => http("get", dispatch, url)
}
