import Search from "../Components/Search"
import Result from "../Components/Result"

interface IServie {
  [pageName: string]: any
}

export const PAGE_LOGIC: IServie = {
  SearchPage: Search,
  ResultPage: Result
}
