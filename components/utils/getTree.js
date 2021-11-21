import pathCache from "./pathCache.js"

const getTree = async () => {
  const data = await pathCache()
  const pathstr = data.tree
    .map((x) => {
      if (x.path.split(".")[1] === "mdx") {
        return `/${x.path.split(".")[0]}`
      }
      return null
    })
    .filter((x) => x != null)
    .map((str) => {
      return str.replace("/docs", "")
    })
    .sort((a, b) => {
      const alen = a.split("/").length
      const blen = b.split("/").length

      if (alen < blen) {
        return -1
      } else if (alen > blen) {
        return 1
      }

      return 0
    })
  return pathstr
}

export default getTree
