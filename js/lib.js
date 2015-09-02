// function cookie(c_name)
// {
// if (document.cookie.length>0)
//   {
//   c_start=document.cookie.indexOf(c_name + "=")
//   if (c_start!=-1)
//     { 
//     c_start=c_start + c_name.length+1 
//     c_end=document.cookie.indexOf(";",c_start)
//     if (c_end==-1) c_end=document.cookie.length
//     return unescape(document.cookie.substring(c_start,c_end))
//     } 
//   }
// return ""
// }

// function cookie(c_name,value,expiredays)
// {
// var exdate=new Date()
// exdate.setDate(exdate.getDate()+expiredays)
// document.cookie=c_name+ "=" +escape(value)+
// ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
// }

// function checkCookie()
// {
// username=cookie('username')
// if (username!=null && username!="")
//   {alert('Welcome again '+username+'!')}
// else 
//   {
//   username=prompt('Please enter your name:',"")
//   if (username!=null && username!="")
//     {
//     cookie('username',username,365)
//     }
//   }
// }

function setCookie(name,value)//两个参数，一个是cookie的名子，一个是值
 
{
 
    var Days = 30; //此 cookie 将被保存 30 天
 
    var exp = new Date();    //new Date("December 31, 9998");
 
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
 
}
 
function getCookie(name)//取cookies函数        
 
{
 
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
 
     if(arr != null) return unescape(arr[2]); return null;
 
  
 
}