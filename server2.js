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

// Root path
app.get('/', (req, res, next) => {
    res.json({ message: 'Ok!' })
})

app.get('/getallBP', (req, res, next) => {
    const sql = 'SELECT num_bp, naim_bp, owner, cod_bp_txt, vyd, from_id, d_start, d_stop, bp_id_aris, datestamp from BP'

    console.log('started request to all BP....')
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.json({
            message: "запрос обработался успешно! 'select * from BP'",
            data: rows
        })
    })
})
app.get('/getallBPwithMaxDate', (req, res, next) => {
    console.log('started request to all BPwithMaxDate....')
    const sql = 'SELECT num_bp, naim_bp, owner, cod_bp_txt, vyd, from_id, d_start, d_stop, bp_id_aris  from BP WHERE (datestamp = (SELECT MAX(datestamp) as maxdate FROM BP)) AND (d_stop !="2100-01-01")'
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.json({
            message: "запрос обработался успешно! 'select * from BP'",
            data: rows
        })
    })
})
app.get('/getallPPwithMaxDate', (req, res, next) => {
    console.log('started request to all PPwithMaxDate....')
    const sql = 'SELECT * from PP WHERE datestamp = (SELECT MAX(datestamp) as maxdate FROM PP)'
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.json({
            message: "запрос обработался успешно! 'select * from PP'",
            data: rows
        })
    })
})

app.post('/api/bpload', (req, res, next) => {
    const reqBody = req.body
    const data = []
    for (let i = 0; i < reqBody.length; i++) {
        data.push({
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
        })
    }
    /* , reqBody[i][1], reqBody[i][2], reqBody[i][3], reqBody[i][4],
              reqBody[i][5], reqBody[i][6], reqBody[i][7], reqBody[i][8], reqBody[i][9]
          ; */
    // eslint-disable-next-line no-undef
    const insert = 'INSERT INTO bp (id, num, name, owner, shortname,detalisationexist, parent, datebegin, dateend, dateload) VALUES (?,?,?,?,?,?,?,?,?,?)'

    db.run(insert, data,
        function(err) {
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
        data.push({
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
        })
    }

    const insert = 'INSERT INTO PP (idmain, idparent, idpp, numpp, namepp, managerpp, detalistaionexist, datebegin, datechange, dateend, dateload) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    db.run(insert, data,
        function(err) {
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

// Start server
app.listen(HTTP_PORT, () => {
    // console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
})