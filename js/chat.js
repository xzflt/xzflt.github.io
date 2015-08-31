var appId = 'pimejb32ayn6tbat7aa3w2j01mwmsmdqwwhb5in5hv14jw9x'
var rt;
var clientId;
var room;
var rid = getCookie('rid') || ''
var user = getCookie('u')
var userId;
console.log(user);
rt = AV.realtime({
  appId: appId,
  clientId: user,
  encodeHTML: true
})
console.log(rid);

rt.on('open', function() {
  if (rid) {
    rt.room(rid, function(obj) {
      if (obj) {
        room = obj
        console.log('get room! ' + room.id);
        roomThing(room)
      } else{
        alert('room not exists');
      };
    })
  } else{
    // 服务器不存在这个 conversation，你需要创建一个
    console.log('create room!');
    rt.room({
      members: ['info', user]
    }, function(obj) {
      room = obj
      roomThing(room)
      $.post('/room', {name: user, rid: room.id}, function(data) {
        console.log(data);
      })
    })  
  };
})
$msgs = $('#msgs')

function roomThing (room) {
  room.log(function(rs) {
    $msgs.empty()
    rs.forEach(function(item) {
      if (clientId != item.from) {
        $msgs.append('<li class="from">'+item.data+' :<b>'+item.from+'</b></li>')
      } else {
        $msgs.append('<li><b>'+item.from+'</b>: '+item.data+'</li>')
      }
      // var klass = item.from == 'clientId' ? 'class="to"' : ''
    })
    scroll()
  })
  // room.log(function(rs) {
  //   rs.forEach(function(item) {
  //     $msgs.append(item.data+'<br>')
  //   })
  // })
  room.receive(function(data) {
    // console.log(data);
    $('#msgs').append('<li class="from">'+data.msg+' :<b>'+data.fromPeerId+'</b></li>')
    scroll()
  })
}

$(function() {
  $('#form').on('submit', function() {
    var txt = this.msg.value
    $('#msgs').append('<li><b>'+user+'</b>: '+txt+'</li>')
    room.send(txt)
    this.msg.value=''
    // $input.val('').focus()
    // scroll()
    return false;
  })
  
})



function scroll () {
  $msgs.scrollTop($msgs[0].scrollHeight)
}


// rt.room({
//     // Room 的默认名字
//     name: 'LeanCloud-Room',

//     // 默认成员的 clientId
//     members: [
//         // 当前用户
//         clientId
//     ],
//     // 创建暂态的聊天室（暂态聊天室支持无限人员聊天，但是不支持存储历史）
//     // transient: true,
//     // 默认的数据，可以放 Conversation 名字等
//     attr: {
//         test: 'demo2'
//     }
// }, function(obj) {

//     // 创建成功，后续你可以将 room id 存储起来
//     room = obj;
//     roomId = room.id;
//     showLog('创建一个新 Room 成功，id 是：', roomId);

//     // 关闭原连接，重新开启新连接
//     rt.close();
//     main();
// });
























function getCookie(name) {
  var nameEQ = encodeURIComponent(name) + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}
