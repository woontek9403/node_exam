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
router.get('/', function(req, res, next) {
   
    var idx = req.params.idx;
    var category = req.params.category;

    console.log("select * from my_board where category= '회원'");

    pool.getConnection(function(err, connection) {
        // 데이터 베이스에서 실행시킬 sql문(query)을 작성
        

            var query = connection.query("select * from my_board where category = '일반'", function(err, rows) {
                if(err) {// sql문 작성시 에러가 발생할 경우
                    connection.release();
                    throw err;
                }
               
                //read.ejs를 클라이언트 화면에 표시할때 데이터베이스 검색 결과인 rows도 같이 전달한다.
                res.render('index.ejs', { rows : rows });
                connection.release();     
            });
        });
    });
    module.exports = router;