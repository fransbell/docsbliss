import { Button, Collapse, createStyles, Text } from "@mantine/core"
import { Component, useState } from "react"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
  folder: {
    width: "100%",
    border: "none",
    background: "rgba(3,3,3,0.1)",
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    [`&:hover`]: {
      background: "rgba(3,3,3,0.15)",
    },
  },
  children: {
    width: "100%",
    border: "none",
    background: "none",
    padding: "0.5rem 1rem",
    borderBottom: "1px solid rgba(3,3,3,0.2)",
    borderLeft: "1px solid rgba(3,3,3,0.2)",
    borderRadius: "4px",
    [`&:hover`]: {
      borderLeft: "3px double blue",
      cursor: "pointer",
    },
  },
  typoFolder: {
    fontFamily: "Poppins",
    fontWeight: "500",
  },
  typoChild: {
    fontFamily: "Poppins",
    fontWeight: "300",
  },
}))

const RecursiveTree = ({ name, children, fullpath }) => {
  const { classes } = useStyles()
  const hasChildren = children && children.length
  const [Opened, setOpened] = useState(true)
  return (
    <>
      <button
        className={hasChildren ? classes.folder : classes.children}
        onClick={() => {
          setOpened(!Opened)
        }}
      >
        {hasChildren ? (
          <Text
            align="left"
            className={hasChildren ? classes.typoFolder : classes.typoChild}
          >
            {name}
          </Text>
        ) : (
          <Link href={fullpath}>
            {
              <Text
                align="left"
                className={hasChildren ? classes.typoFolder : classes.typoChild}
              >
                {name}
              </Text>
            }
          </Link>
        )}
      </button>

      <Collapse
        in={Opened}
        transitionDuration={400}
        style={{ marginLeft: "14px" }}
      >
        {hasChildren
          ? children.map((children) => {
              return <RecursiveTree key={children.name} {...children} />
            })
          : ""}
      </Collapse>
    </>
  )
}

export default RecursiveTree
