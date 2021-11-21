// ENV variable first then fallback to options
import fetch, { Headers } from "node-fetch"
/* <---------- OPTIONS ----------> */
const options = {
  user: "fransbell", // username
  repo: "docsbliss", // repository name
  token: "" //github access token < string / null / undefined >
}
/* <---------- END ----------> */

const USER = process.env.user || options.user
const REPO = process.env.repo || options.repo

const ACTOKEN = process.env.actoken || options.token

const FETCH_URL = `https://api.github.com/repos/${USER}/${REPO}/git/trees/main?recursive=1`

// create header if header is ["", null, undefined] return null
const MYHEADER = ACTOKEN
  ? (() => {
      //imidaite invoked return header obj
      const res = new Headers({
        "Content-Type": "application/json",
        Authorization: `token ${ACTOKEN}`
      })
      return res
    })()
  : null

// getData function that return response jsons
const fetchPath = async (token = MYHEADER) => {
  let response
  let data
  if (token) {
    console.log("options actoken found  ....")
    response = await fetch(FETCH_URL, { method: "GET", headers: MYHEADER })
    console.log("making request with header......")
  } else {
    console.log("options actoken not found!!  ....")
    response = await fetch(FETCH_URL, { method: "GET" })
    console.log("making request w/o header......")
  }
  await response.json().then((jdata) => {
    data = jdata
  })
  return data
}

export default fetchPath
