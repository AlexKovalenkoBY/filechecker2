'use strict'
const express = require('express')
const fs = require('fs')
const path = require('path')
const server = express()
const jsonParser = express.json()
const fullPath = path.join(__dirname, '/public')
const compression = require('compression')
const { report } = require('process')

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));

server.use(express.static(fullPath)) // ))__dirname + '/public'))
server.use(compression())
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
}
server.use(allowCrossDomain)

server.get('/', async function(req, res) {
    res.send("!!OK!!")
})

server.get('/api/uploadfilesfromclient', async function(req, res) {
    res.send("GET WORKS!")
})
server.post('/api/uploadfilesfromclient', async function(req, res) {
    console.time('uploadfilesfromclient')
        //const updateObj = JSON.parse(req.body)

    let filecontent = req.body.content;
    let filename = req.body.name;
    const fileattr = req.body.lastModified;
    const filesize = req.body.size;
    let reportStr = '';
    filename = "c:\\aris\\sharefld\\" + filename;
    filecontent = Buffer.from(filecontent.slice(filecontent.indexOf(';base64,') + ';base64,'.length), 'base64');
    if (filecontent.length == filesize) {
        reportStr += 'Файл принят успешно.\n';
        console.log('Файл принят успешно.');
    }
    fs.writeFile(filename, filecontent, 'utf8', (err) => {
            if (err) {
                reportStr += 'Ошибка сохранения файла!!'
                throw err
            } else {
                reportStr += 'Файл сохранен успешно.'
                console.log('The file has been saved!');
            }
        })
        // console.log(errcode)
    res.send(reportStr)
    console.timeEnd('uploadfilesfromclient') // время выполнения запроса
        //fs.writeFileSync(filename, Buffer.from(filecontent.slice(filecontent.indexOf(';base64,') + ';base64,'.length), 'base64'), 'utf8')
})

// //writeFile(file_path, data, codepage)
// async function writeFile(filename, writedata, codepage) {
//     try {
//         await fs.promises.writeFile(filename, writedata, codepage);
//         console.log('data is written successfully in the file')
//         return 888
//     } catch (err) {
//         console.log('not able to write data in the file ')
//         return err
//     }
// }



server.listen(8888, function() {
    console.log('Сервер ожидает подключения.on port 8888..' + new Date())
})