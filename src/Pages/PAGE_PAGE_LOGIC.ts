import Result from './Result/Result'
import Search from './Search/Search'

interface IServie {
  [pageName: string]: any
}

export const PAGE_LOGIC: IServie = {
  SearchPage: Search,
  ResultPage: Result
}
