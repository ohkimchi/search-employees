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
