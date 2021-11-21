import fs from "node:fs"
import path from "path"
import fetchPath from "./fetchPath.js"

const CACHE_PATH = path.resolve(".pathCache")

const pathCache = async () => {
  let cacheData

  try {
    cacheData = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"))
  } catch (error) {
    console.log(`< -------- cache is not initailized -------- >`)
  }

  if (!cacheData) {
    const data = await fetchPath() // fecth data function here
    try {
      fs.writeFileSync(CACHE_PATH, JSON.stringify(data), "utf8")
      console.log(`< -------- cache is saved -------- >`)
    } catch (err) {
      console.log(
        `<---------- err write cache ---------->\n${err}\n<---------- err write cache ---------->`
      )
    }
    cacheData = data
  }
  return cacheData
}

export default pathCache
