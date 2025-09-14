import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Demo Website</title>

        <meta name="description" content="The meta description here." />
      </Head>
      <body className="bg-stone-200 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
