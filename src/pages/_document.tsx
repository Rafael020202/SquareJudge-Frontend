import Document, { Html, Main, Head, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return(
      <Html>
        <Head/>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}