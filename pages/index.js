import Layout from "../components/Layout"
import { serialize } from "next-mdx-remote/serialize"

import getTree from "../components/utils/getTree"

const username = process.env.user || "fransbell"
const reponame = process.env.repo || "docsbliss"

export default function Home({ content, docpath }) {
  return <Layout content={content} docpath={docpath} />
}

export async function getStaticProps() {
  const path = await getTree()

  const source = await fetch(
    `https://raw.githubusercontent.com/${username}/${reponame}/main/README.md`,
    {
      method: "GET"
    }
  )
  const recieve = await source.text()
  const mdxSource = await serialize(recieve)
  return { props: { content: mdxSource, docpath: path } }
}
