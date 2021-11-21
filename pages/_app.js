import { Global, MantineProvider, NormalizeCSS } from "@mantine/styles"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider>
      <Global
        styles={(theme) => ({
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },
          body: { fontFamily: "Poppins , serif-sans", fontWeight: 300 },
        })}
      />
      <NormalizeCSS />
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
