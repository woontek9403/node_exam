
var formTag = document.getElementById('formTag')
formTag.onsubmit = function(){
        //ID가 usr인 객체를 가져와서 그 객체의 value를 ID에 저장
        
        
        var id = document.getElementById('usr').value;
        var Pwd = document.getElementById('Pwd').value;
        var PwdConfirm = document.getElementById('PwdConfirm').value;
        var year = document.getElementById('year').value;
        var month = document.getElementById('month').value;
        var day = parseInt(document.getElementById('day').value);
        var max = maxDay(month);
        var Number = document.getElementById('Number').value;
        var NumberRegex = /^010\d{8}$/;

        var inforID = document.getElementById('inforID');
        var inforPwd = document.getElementById('inforPwd');
        var inforPwdConfirm = document.getElementById('inforPwdConfirm');
        var inforBirth = document.getElementById('inforBirth');
        var inforNumber = document.getElementById('inforNumber');
      
        var isOk = true;

        
         //ID의 길이가 0이면
        // id 유효성 검사
        if(!checkValidId(id)){
            isOk = false;
        }

        //pwd 유효성 검사
        if(!checkValidPw(Pwd)){
            isOk = false;
        }

         //비밀번호와 비밀번호 확인 같은지 검사
        if(!checkValidPwdConfirm(PwdConfirm)){
            isOk = false;
        }

        if(!checkValidBirth()){
            isOk = false;
        }
        if(!checkValidNumber(Number)){
            isOk = false;
        }
        if(!isOk)
            return false;}
            
function maxDay(month){
    switch(month){
        case'1': case'3': case'5': case'7': case'8': case'10': case'12':
        return 31;
        case '2':
        return 28;
        default:
        return 30; 
    }
}

// 아이디 
function checkValidId(id){
    var IDRegex = /^[a-zA-Z]\w{4,9}$/;
    var inforID = document.getElementById('inforID');
    inforID.style.display = 'none';
        if(id.length == 0 || !IDRegex.test(id)){
            inforID.style.display = 'block';
            return  false;
        }
            return true;
}


// 비밀번호
function checkValidPw(Pwd){
    var PwdRegex = /^(?=w{8,20}$)\w*(\d[A-z]|[A-z]\d)\w*$/;
    var inforPwd = document.getElementById('inforPwd');
    inforPwd.style.display = 'none';
        if(Pwd.length == 0 || !PwdRegex.test(Pwd)){
            inforPwd.style.display = 'block';
            return false;
        }
        return true;
    }


// 비밀번호 체크 (비밀번호와 비밀번호 확인 같은지 검사 )  
//(pwd 와 비밀번호 일치하지 않을때 보여줄 문구가 필요함)
function checkValidPwdConfirm(PwdConfirm){
    // 비밀번호
    var Pwd = document.getElementById('Pwd').value;
    //비밀번호가 일치하지 않을때 보여줄 문구
    var inforPwdConfirm = document.getElementById('inforPwdConfirm');
    inforPwdConfirm.style.display = 'none';
        if(Pwd != PwdConfirm){
            inforPwdConfirm.style.display = 'block';
            return  false;
        }
            return true;
    }


    // 생년월일 (year , month ,day 3개를 한 함수안에 묶는다)
    function checkValidBirth(){

        // 생년월일 (year , month ,day에 대한 객체의 값)
        var year = document.getElementById('year').value;
        var month = document.getElementById('month').value;
        var day = parseInt(document.getElementById('day').value);

            //예외처리 문구에 대한 객체 정보
            var inforBirth = document.getElementById('inforBirth');
            //예외 처리 문구를 가림
            inforBirth.style.display = 'none';
            //월의 마지막 날짜를 계산
            var max = maxDay(month);
            // 유효성 검사
            if(year.length !=4){
                inforBirth.innerHTML = '태어난 년도 4자리를 정확하게 입력하세요';
                inforBirth.style.display = 'block';
                return false;
            }else if(isNaN(parseInt(month))){
                inforBirth.innerHTML = '태어난 월을 선택하세요';
                inforBirth.style.display = 'block';
                return false;
    
            }else if(isNaN(day) || day <1 ||day>max ){
                inforBirth.innerHTML = '태어난 2자리를 입력하세요';
                inforBirth.style.display = 'block';
                return false;
            }
            return true;
}

        //전화 번호
    function checkValidNumber(Number){

        //유효성 검사 문구에 대한 객체 정보
        var inforNumber = document.getElementById('inforNumber');
        //유효성 검사 문구를 숨김
        inforNumber.style.display = 'none';
        //정규 표현식
        var NumberRegex = /^010\d{8}$/;
        //유효성 검사
        if(!NumberRegex.test(Number)){
            inforNumber.style.display = 'block';
            return false;
        }
        return true;
    }
    
    
