import Search from "./Search/Search"
import Result from "./Result/Result"

interface IServie {
  [pageName: string]: any
}

export const PAGE_LOGIC: IServie = {
  SearchPage: Search,
  ResultPage: Result
}
