import { AppShell, Navbar, Header, createStyles, Text } from "@mantine/core"
import React, { useState } from "react"
import RecursiveComponent from "./RecursiveTree"
import { MDXRemote } from "next-mdx-remote"

const pathTo_tree = (patharr) => {
  let result = []
  let level = { result }

  patharr.forEach((patharr) => {
    patharr.split("/").reduce((r, name, i, a) => {
      if (!r[name]) {
        r[name] = { result: [] }
        const fullpath = a.join("/")
        r.result.push({ name, fullpath, children: r[name].result })
      }

      return r[name]
    }, level)
  })

  result[0].name = "Docs"

  return result[0]
}

const useStyles = createStyles((theme) => ({
  header: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    fontSize: "36px ",
    color: "#111",
  },
  scroll: {
    [`&::-webkit-scrollbar`]: {
      width: "6px",
      height: "6px",
    },
    [`&::-webkit-scrollbar-thumb`]: {
      background: "#B3AFB3",
      borderRadius: "30px",
    },
    [`&::-webkit-scrollbar-thumb:hover`]: {
      background: "#B3AFB3",
    },
    [`&::-webkit-scrollbar-track`]: {
      background: "#F0F0F0",
      borderRadius: "0px",
      boxShadow: "inset 0px 0px 0px 0px #F0F0F0",
    },
  },
  mainShell: {
    minHeight: "100vh",
  },
}))

function Layout({ content, docpath, bread }) {
  const { classes } = useStyles()
  const [opened, setOpened] = useState(false)
  const data = pathTo_tree(docpath)
  return (
    <AppShell
      className={classes.mainShell}
      padding="md"
      header={
        <Header padding="md" className={classes.header}>
          Docsbliss
        </Header>
      }
      navbar={
        <Navbar
          className={classes.scroll}
          hiddenBreakpoint="sm"
          hidden={!opened}
          padding="0"
          style={{
            width: "280px",
            overflow: "scroll",
            overflowX: "hidden",
          }}
        >
          <RecursiveComponent {...data} />
        </Navbar>
      }
    >
      {bread ? (
        <Text color="gray" style={{ textTransform: "capitalize" }}>
          {bread.join(" / ")}
        </Text>
      ) : (
        ""
      )}
      <MDXRemote {...content} />
    </AppShell>
  )
}

export default Layout
