import { ActionType } from '../App/AppReducer'
import Result from '../Components/Result'
import Search from '../Components/Search'

interface IServie {
  [pageName: string]: any
}

export const PAGE_LOGIC: IServie = {
  ResultPage: Result,
  SearchPage: Search
}

export async function API(url: string) {
  let res = await fetch(url)
  if (res) {
    if (res.status !== 200) {
      throw res
    } else {
      res = await res.json()
      return res
    }
  }
}

const oriUrl = 'https://api.additivasia.io/api/v1/assignment/employees'

export async function getDirectSub(name: string) {
  const url = `${oriUrl}/${name}`
  const dirSubRes = await API(url)
    // tslint:disable-next-line: no-console
    .catch((err) => console.log('no result'))
    .then((res) => res)
  if (dirSubRes) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [role, dirSubObj] = dirSubRes as any
    if (dirSubObj && dirSubObj['direct-subordinates']) {
      return dirSubObj['direct-subordinates']
    }
  }
}

export async function getNonDirectSub(subArr: string[], res: any) {
  await Promise.all(
    subArr.map(async (p) => {
      if (!res.includes(p)) {
        const ds = await getDirectSub(p)
        if (ds) {
          res = [...res, ...ds]
          res = await getNonDirectSub(ds, res)
        }
      }
    })
  )
  return res
}

export async function getDirAndUnDirSub(name: string, dispatch: any) {
  const subArr = await getDirectSub(name)
  if (subArr) {
    const nonDirSubArr = await getNonDirectSub(subArr, [])
    if (nonDirSubArr !== []) {
      dispatch({
        nonDirectSub: nonDirSubArr,
        type: ActionType.SET_NON_DIRECT_SUB
      })
    }
    dispatch({
      directSub: subArr,
      type: ActionType.SET_DIRECT_SUB
    })
    dispatch({
      employeeName: name,
      type: ActionType.SET_EMPLOYEE_NAME
    })
    dispatch({
      currentPage: 'ResultPage',
      type: ActionType.SET_CURRENT_PAGE
    })
  } else {
    dispatch({
      noResult: true,
      type: ActionType.SET_NO_RESULT
    })
  }
}
