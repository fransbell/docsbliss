/* 
  boilerplate for caching data utils
*/
import fs from "node:fs"
import path from "path"
import fetch from "node-fetch"

const CACHE_PATH = path.resolve(".cache")

const fetchData = async () => {
  const response = await fetch(
    "https://api.github.com/repos/fransbell/docsbliss/git/trees/main?recursive=1",
    {
      method: "GET"
    }
  )
  const data = await response.json()
  return data
}

const getCache = async () => {
  let cacheData

  try {
    cacheData = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"))
  } catch (error) {
    console.log(`< -------- cache is not initailized -------- >`)
  }

  if (!cacheData) {
    const data = await fetchData() // fecth data function here
    console.log(data)
    try {
      fs.writeFileSync(CACHE_PATH, JSON.stringify(data), "utf8")
    } catch (err) {
      console.log(
        `<---------- err write cache ---------->\n${err}\n<---------- err write cache ---------->`
      )
    }
    cacheData = data
  }
  return cacheData
}

export default getCache
