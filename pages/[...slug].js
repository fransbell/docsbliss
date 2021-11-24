import React from "react"

import { serialize } from "next-mdx-remote/serialize"
import Layout from "../components/Layout"
import { useRouter } from "next/router"

import getTree from "../components/utils/getTree"

const username = process.env.user || "fransbell"
const reponame = process.env.repo || "docsbliss"

const REPO_URL = `https://api.github.com/repos/${username}/${reponame}/git/trees/main`

/* ---------------------------- Layout --------------------------------- */
const Post = ({ source, docpath }) => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <>
      <Layout content={source} bread={slug} docpath={docpath} />
    </>
  )
}
export default Post

/* ---------------------------- SSG Generation --------------------------------- */

export async function getStaticPaths() {
  const path = await getTree()
  return {
    paths: path,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const source = await fetch(
    `https://raw.githubusercontent.com/${username}/${reponame}/main/docs/${
      "/" + params.slug.join("/")
    }.mdx`,
    {
      method: "GET",
    }
  )
  const path = await getTree()

  const recieve = await source.text()
  const mdxSource = await serialize(recieve)

  return { props: { source: mdxSource, docpath: path } }
}
