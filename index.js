import puppeteer from 'puppeteer'
import fs from 'fs'
import os from 'os'
import axios from 'axios'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

const FONT_FILE_PATH = './font.otf'

export async function handle(req, res) {
  const browser = await puppeteer.launch({args: ['--no-sandbox']})
  const page = await browser.newPage()
  const data = {hoge: 'fugaふが'}
  const html = ReactDOMServer.renderToString(
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <style type="text/css">
          {`
            @font-face {
              font-family: 'Noto Sans Japanese';
              src: url('${FONT_FILE_PATH}') format('opentype');
            }
            body {
              font-family: 'Noto Sans Japanese', sans-serif;
            }
            div {
              width: 200px;
              height: 200px;
              margin: 10px;
              background-color: red;
            }
          `}
        </style>
      </head>
      <body>
        <strong>{data.hoge}</strong>
        <div>い</div>
        <div>ろ</div>
        <div>は</div>
        <div>に</div>
        <div>ほ</div>
        <div>へ</div>
        <div>と</div>
        <div>ち</div>
        <div>り</div>
        <div>ぬ</div>
        <div>る</div>
        <div>を</div>
        <div>わ</div>
        <div>か</div>
      </body>
    </html>
  )
  await page.goto(`data:text/html,${html}`, {waitUntil: 'networkidle0'})
  // const buf = await page.pdf({
  //   path: `${os.tmpdir()}/example.pdf`,
  //   printBackground: true,
  //   format: 'A4',
  // })
  const buf = await page.screenshot()
  // await res.writeHead(200, {'Content-Type': 'application/pdf'})
  await res.writeHead(200, {'Content-Type': 'image/png'})
  await res.write(buf.toString('binary'), 'binary')
  await res.end()
  await browser.close()
}
