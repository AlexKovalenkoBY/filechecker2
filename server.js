/* eslint-disable no-unused-vars */
const sqlite3 = require('sqlite3');
var express = require("express")
var app = express()
var md5 = require("md5")
var cors = require("cors");
var bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(cors());

/* app.all('*', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
}); */
var HTTP_PORT = 8081

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
const db = new sqlite3.Database('./bp_pp.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {
        // db.req()
        console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
        console.log("db opened....")
    }
});

app.get("/api/getallpp", (req, res, next) => {
    var sql = "select * from pp"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "запрос обработался успешно! 'select * from pp'",
            "data": rows
        })
    });
});

/*
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});
*/
app.post("/register", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.post("/api/bpload", (req, res, next) => {
    var errors = []
    var data = {


        id: req.body.id,
        num: req.body.num,
        name: req.body.name,
        owner: req.body.owner,
        shortname: req.body.shortname,
        detalisationexist: req.body.detalisationexist,
        parent: req.body.parent,
        datebegin: req.body.datebegin,
        dateend: req.body.dateend,
        dateload: req.body.dateload
    }
    /*var data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    }*/
    //var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var sql = 'INSERT INTO bp1 (id, num, name, owner, shortname, detalisationexist, parent, datebegin, dateend, dateload) VALUES (?,?,?,?,?,?,?,?,?,?)'

    //var params =[data.name, data.email, data.password]
    var params = [
        data.id,
        data.num,
        data.name,
        data.owner,
        data.shortname,
        data.detalisationexist,
        data.parent,
        data.datebegin,
        data.dateend,
        data.dateload
    ]
    db.run(sql, params, function (err, res) {
        if (err) {
            err.json({ "error": err.message })
            return;
        } else {
            res.json({
                "message": "success",
                "data": data,
                "id": this.lastID
            })
        }

    });
})

app.post('/test', function (req, res) {
    res.send('POST request to the homepage');
});
app.get("/api/bpload2", (req, res, next) => {
    var sql = "select * from pp"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "запрос обработался успешно! 'select * from pp'",
            "data": rows
        })
    });
});
app.post("/api/user", (req, res, next) => {
    var errors = []
    if (!req.body.password) {
        errors.push("No password specified");
    }
    if (!req.body.email) {
        errors.push("No email specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    }
    var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params = [data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})

app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});



/*


app.patch("/api/user/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : undefined
    }
    db.run(
        `UPDATE user set 
           name = coalesce(?,name), 
           email = COALESCE(?,email), 
           password = coalesce(?,password) 
           WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})


app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})

*/
// Root path
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok!" })
});

