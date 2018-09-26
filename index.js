import puppeteer from 'puppeteer'
import fs from 'fs'
import os from 'os'
import childProcess from 'child_process'
import axios from 'axios'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

// const FONT_FILE_PATH = '/tmp/.fonts/font.woff'
// const FONT_FILE_PATH = './fonts/font.woff'

export async function execPromise(command) {
  return new Promise((resolve, reject)=>{
    childProcess.exec(command, (err, res)=>{
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export async function handle(req, res) {
  await execPromise('cp -r /srv/fonts /tmp/.fonts')
  const fcCache = await execPromise('fc-cache -fv')
  const fcList = await execPromise('fc-list')
  console.log('fcCache=', fcCache)
  console.log('fcList=', fcList)
  const files = fs.readdirSync('./fonts')
  console.log('./fonts=', files)
  const browser = await puppeteer.launch({args: ['--no-sandbox']})
  const page = await browser.newPage()
  const data = {hoge: 'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら'}
  const html = ReactDOMServer.renderToString(
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <style type="text/css">
          {`
            span {
              font-family: 'Noto Sans CJK JP', sans-serif;
              font-style: normal;
              font-weight: 400;
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
        <span>{data.hoge}</span>
        <div>あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら</div>
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
