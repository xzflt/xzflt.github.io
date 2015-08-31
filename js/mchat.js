var appId = 'pimejb32ayn6tbat7aa3w2j01mwmsmdqwwhb5in5hv14jw9x'
var rt;
var clientId;
var room;
var rid = ''
var user = 'info'
var userId;
var from;
console.log(user);
rt = AV.realtime({
  appId: appId,
  clientId: 'info',
  encodeHTML: true
})

$msgs = $('#msgs')

function roomThing (room) {
  room.log(function(rs) {
    rs.forEach(function(item) {
      $msgs.append(item.data+'<br>')
    })
  })
  room.receive(function(data) {
    console.log(data);
    // $('#msgs').append('<li class="from">'+data.msg+' :<b>'+data.fromPeerId+'</b></li>')
    // scroll()
  })
}

$(function() {
  var $uli = $('#users li')
  $uli.on('click', function() {
    from = this.innerHTML
    $uli.removeClass('active')
    $(this).addClass('active')
    rt.room(this.id, function(obj) {
      room = obj
      room.log(function(logs) {
        showLogs(logs)
      })
      room.receive(function(data) {
        // console.log(data);
        $('#msgs').append('<li class="from">'+data.msg+' :<b>'+data.fromPeerId+'</b></li>')
        scroll()
      })
    })

  })
  $('#form').on('submit', function() {
    var txt = this.msg.value
    $('#msgs').append('<li><b>'+user+'</b>: '+txt+'</li>')
    room.send(txt)
    this.msg.value=''
    return false;
  })
  
})


  function showLogs (logs) {
    $msgs.empty()
    // logs.forEach(function(log) {
    //   $msgs.append('<li><b>'+log.from+'</b>: '+log.data+'</li>')
    // })
    logs.forEach(function(log) {
      if (clientId != log.from) {
        $msgs.append('<li class="from">'+log.data+' :<b>'+log.from+'</b></li>')
      } else {
        $msgs.append('<li><b>'+log.from+'</b>: '+log.data+'</li>')
      }
      // var klass = log.from == 'clientId' ? 'class="to"' : ''
    })
    $msgs.scrollTop($msgs[0].scrollHeight)
  }


function scroll () {
  $msgs.scrollTop($msgs[0].scrollHeight)
}








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
