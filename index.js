import puppeteer from 'puppeteer'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const data = {hoge: 'fuga'}
  const html = ReactDOMServer.renderToString(
    <html lang="ja">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosansjp.css" />
        <style type="text/css">
          {`
            body {
              font-family: 'Noto Sans JP';
            }
          `}
        </style>
      </head>
      <body>
        <strong>{data.hoge}</strong>
      </body>
    </html>
  )
  await page.goto(`data:text/html,${html}`, {waitUntil: 'networkidle0'})
  await page.pdf({path: 'example.pdf'})
  await browser.close()
})()
