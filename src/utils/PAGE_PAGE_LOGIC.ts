import Result from '../Components/Result'
import Search from '../Components/Search'

interface IServie {
  [pageName: string]: any
}

export const PAGE_LOGIC: IServie = {
  SearchPage: Search,
  ResultPage: Result
}
