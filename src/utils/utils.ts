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
    .catch(err => console.log('no result'))
    .then(res => res)
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
    subArr.map(async p => {
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
