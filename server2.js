/* eslint-disable no-unused-vars */
const sqlite3 = require('sqlite3').verbose()
const express = require('express')
const app = express()
// var md5 = require("md5")
const cors = require('cors')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.use(bodyParser.json())

app.use(cors())
app.use(express.json({ limit: '10mb', extended: true }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
const HTTP_PORT = 8081

// Start server
app.listen(HTTP_PORT, () => {
  // console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
})
const DBSOURCE = './bias2021.db'

const db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Erro opening database ' + err.message)
  } else {
    // db.req()
    console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
    console.log('db opened....')
  }
})
// проверяем наличие таблиц, при необходимости создаем их.
/* const sqlCreateBP = 'CREATE TABLE IF NOT EXISTS BP( id INTEGER NOT NULL UNIQUE,\
            num TEXT,\
            name TEXT,\
            owner INTEGER,\
            shortname TEXT,\
            detalisationexist NUMERIC,\
            parent INTEGER,\
            datebegin TEXT,\
            dateend TEXT,\
            dateload TEXT,\
            PRIMARY KEY(id)\
            )'
db.run(sqlCreateBP, (err) => {
  if (err) {
    console.log('Table BP already exists.')
  }
})
const sqlCreatePP = 'CREATE TABLE IF NOT EXISTS PP(\
            idmain INTEGER NOT NULL UNIQUE,\
            idparent INTEGER NOT NULL UNIQUE,\
            idpp INTEGER,\
            numpp TEXT,\
            namepp TEXT,\
            managerpp INTEGER,\
            detalistaionexist INTEGER,\
            datebegin TEXT,\
            datechange TEXT,\
            dateend TEXT,\
            dateload TEXT,\
            PRIMARY KEY(idmain)\
            )'
db.run(sqlCreatePP, (err) => {
  if (err) {
    console.log('Table PP already exists.')
  }
})
*/

// Root path
app.get('/', (req, res, next) => {
  res.json({ message: 'Ok!' })
})

app.post('/api/bpload', (req, res, next) => {
  const reqBody = req.body
  const data = []
  for (let i = 0; i < reqBody.length; i++) {
    data.push(
      {
        idmain: reqBody[i][0],
        idparent: reqBody[i][1],
        idpp: reqBody[i][2],
        numpp: reqBody[i][3],
        namepp: reqBody[i][4],
        managerpp: reqBody[i][5],
        detalistaionexist: reqBody[i][6],
        datebegin: reqBody[i][7],
        datechange: reqBody[i][8],
        dateend: reqBody[i][9],
        dateload: reqBody[i][0]
      }
    )
  }
  /* , reqBody[i][1], reqBody[i][2], reqBody[i][3], reqBody[i][4],
        reqBody[i][5], reqBody[i][6], reqBody[i][7], reqBody[i][8], reqBody[i][9]
    ; */
  // eslint-disable-next-line no-undef
  const insert = 'INSERT INTO bp (id, num, name, owner, shortname,detalisationexist, parent, datebegin, dateend, dateload) VALUES (?,?,?,?,?,?,?,?,?,?)'

  db.run(insert, data,
    function (err) {
      if (err) {
        console.log(err.message)
      } else {
        console.log(`Rows inserted ${this.changes}`)
      }
    }
  )

  // db.close();
  res.json({ message: 'Ok!' })
})

app.post('/api/ppload', (req, res, next) => {
  const reqBody = req.body
  const data = []
  for (let i = 0; i < reqBody.length; i++) {
    data.push(
      {
        idmain: reqBody[i][0],
        idparent: reqBody[i][1],
        idpp: reqBody[i][2],
        numpp: reqBody[i][3],
        namepp: reqBody[i][4],
        managerpp: reqBody[i][5],
        detalistaionexist: reqBody[i][6],
        datebegin: reqBody[i][7],
        datechange: reqBody[i][8],
        dateend: reqBody[i][9],
        dateload: reqBody[i][0]
      }
    )
  }

  const insert = 'INSERT INTO PP (idmain, idparent, idpp, numpp, namepp, managerpp, detalistaionexist, datebegin, datechange, dateend, dateload) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
  db.run(insert, data,
    function (err) {
      if (err) {
        console.log(err.message)
      } else {
        console.log(`Rows inserted ${this.changes}`)
      }
    }
  )

  // db.close();
  res.json({ message: 'Ok!' })
})
