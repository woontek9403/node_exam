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

//라우터로 login.ejs를 호출한다
router.get('/login',function(req, res, next){
    console.log("login site");
    res.render('login.ejs',{});

});
//사용자에게 전달받은 아이디 비밀번호를 데이터베이스에서 검사후
// 로그인 처리를 해주는 미들웨어
 router.post('/login',function(req ,res, next){

    //사용자에게 전달받은 아이디 /비밀번호를 변수에 저장
     var id = req.body.id;
     var password = req.body.password;

      // 로그인 정보가 서버의 세션에 req.session.user 객체로 저장이 된다.
      // -로그인 정보가 있다면 req.session.user 객체가 존재하고
      //    로그인 처리를 하지 않는다.
      // -로그인 정보가 없다면 req.session.user 객체가 존재하지 
      //    로그인 처리를 한다.
     if(!req.session.user) {
         //데이터 베이스를 서버와 연결한다
         pool.getConnection(function(err, connection) {
            //데이터베이스에게 질문하기 위한 SQL문
         var sql = "SELECT * FROM user_info WHERE id= '"+id+"' AND password= '"+password+"'";
         console.log(sql)

         //데이터베이스에 sql문으로 사용자 정보를 검색한다.
         var query = connection.query(sql, function(err,rows){
             //쿼리문에 오류가 있을경우
             if(err){
                 connection.release();
                 throw err;
             }

            //  로그인 시도
            console.dir(rows);

            //  로그인에 실패함 
            // 입력한 id와 password 데이터가 데이터베이스에 없을경우 
            // 아이디가 맞지 않는 경우 
            // 패스워드가 맞지 않는 경우
            if(rows.length == 0) {
                res.redirect("http://localhost:3000/session/login");
            }

            // 로그인에 성공함
            // 입력한 id와password 데이터가 데이터베이스에 있을경우
            // 아이다랑 비밀번호가 맞는경우
            else if(rows.length == 1){

                //로그인한 정보를 세션 객체 저장
                //로그인 되어 있으면 세션 객체(req.session.user)에 아이디 정보가 있고
                //로그인 되어 있지 않으면 세션 객체에 아이디 정보가 없다
                req.session.user = { user_id : id};
                res.redirect('http://localhost:3000/');
            }
            
            //그 외에 모든 경우 (에러처리를 해야합니다)
            //사용자에게 에러처리를 해야합니다. "잠시후 다시 시도해주세요"
            else{
                
            }

            connection.release();
            }); 
         });
         //이미. 로그인된 경우는 게시판 페이지로 이동
        } else{
            res.redirect('http://localhost:3000/');
        }
        });

        //로그 아웃을 할때 실행되는 미들웨어
        //http://localhost:3000/session/logout
router.get('/logout',function(req, res, next){

    //이미 로그인이 되어 있는지 확인한다.
    //세션에 데이터(req.session.user)가 저장되어 있으면 if문 아랫부분을 실행
    if(req.session.user){
        console.log("로그아웃 한다");

        //세션을 제거(로그인한 사용자 정보를 삭제)하는 함수
        req.session.destroy(function(err){
            if(err) {throw err;}
            console.log('세션을 삭제하고 로그아웃 되었음');
        });
    }
    //로그인이 되어 있지 않을 때
    else {
        console.log("로그인이 되어 있지 않음");
    }
    // 처리 후에는 게시판에 메인 화면으로 이동합니다.
    res.redirect('http://localhost:3000');
});
        module.exports = router;