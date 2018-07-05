// 필요한 모듈을 읽어오는 부분
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_info = require('./db_info');

var pool = mysql.createPool({
    host : db_info.getHost(),
    port : db_info.getPort(),
    user : db_info.getUser(),
    password : db_info.getPassword(),
    database : db_info.getDatabase(),
    connectionLimit : 20,
    waitForConnections : false
});
router.get('/:number', function(req, res, next) {
    var idx = req.params.number;
    pool.getConnection(function(err, connection){  

 var sql = "DELETE FROM my_board WHERE _idx = " +idx;
 console.log(sql);

 var query = connection.query(sql, function (err , rows) {
     if(err){
         connection.release();
         throw err;
     }
     res.redirect("http://localhost:3000/");
     connection.release();

        });
    });
});
module.exports = router;
