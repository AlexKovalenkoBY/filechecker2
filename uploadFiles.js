'use strict'
const express = require('express')
const fs = require('fs')
const path = require('path')
const server = express()
const jsonParser = express.json()
const fullPath = path.join(__dirname, '/public')
const compression = require('compression')

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



server.get('/api/uploadfilesfromclient', async function(req, res) {

})
server.post('/api/uploadfilesfromclient', async function(req, res) {
    console.time('uploadfilesfromclient')
        //const updateObj = JSON.parse(req.body)
    const codepage = req.body.codepage;
    const filecontent = req.body.content;
    const filename = "c:\\aris\\sharefld\\" + req.body.filename;
    const errcode = fs.writeFileSync(filename, filecontent, codepage)
    console.log(errcode)
    console.timeEnd('uploadfilesfromclient')
    res.send(errcode)
});

//writeFile(file_path, data, codepage)
async function writeFile(filename, writedata, codepage) {
    try {
        await fs.promises.writeFile(filename, writedata, codepage);
        console.log('data is written successfully in the file')
        return 888
    } catch (err) {
        console.log('not able to write data in the file ')
        return err
    }
}



server.listen(8888, function() {
    console.log('Сервер ожидает подключения.on port 8888..' + new Date())
})