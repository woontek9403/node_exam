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

// 검색할 조건과 키워드를 받으면 검색하여 표시해주는 미들웨어
router.get('/', function(req, res, next) {
    //클라이언트로 검색할 조건과 키워드를 입력
    var keyword = req.body.keywordInput;
    var searchType = req.body.searchTypeInput;

    //데이터베이스에 검색을 위해 서버에서 데이터베이스와 연결함
    pool.getConnection(function(err, connection) {
        //연결중 에러가 발생한 경우에 실행되는 부분
        if(err) {
            console.log("getConnection Error");
            throw err;
        }
        //데이터베이스에서 검색을 위한  sql문을 작성한다.
        var sql = 'SELECT * FROM my_board WHERE ';

         switch(searchType) { 
             case "title": //제목
             sql += "title like '%" + keyword + "%';"
             //글 제목을 선택 했을때 처리
                 break;


             case "writer": //글쓴이
             sql += "name like '%" + keyword + "%';"
                 //글쓴이를 선택했을때
                 break;


             case "number": //글번호
             sql += "_idx=" + keyword + ";"
                 //글 번호를 선택했을때처리
                 break;   

         }

        //  if(type == "title"){
        //      // 타입이 글 제목일때
        //  }   else if (type == "writer"){
        //      //타입이 글쓴이 일때
        //  }   else if (type == "number"){
        //      // 타입이 글번호 일때
        //  }   else 


        console.log(sql);
         //데이터 베이스에서 검색함 , 에러는 err 객체 , 검색결과는 rows객체에 저장
        var query = connection.query(sql, function(err, rows) {
            //에러가 방식시 작동함.
            if(err) {
                console.log("query Error");
                connection.release();
                throw err;
            }
            console.dir(rows);
            //에러가 발생하지 않을시 데이터베이스에 검색한 결과물(rows객체)를 index.ejs에 전달한다.
            //index.ejs가 클라이언트에 출력됨.
            res.render('index.ejs',  { rows : rows });
            connection.release();
        });

    });
});


module.exports = router;
