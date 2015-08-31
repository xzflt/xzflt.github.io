// $(document).ready(function () {
//   console.log('msg')
// })
$(function () {
  var $slides = $('#slides')
  var i = 0
  $tf = $('#tf')
  $indexs = $('#indexs span')
  $indexs.eq(0).addClass('active')
  var len = $tf.find('li').length-1
  var now = 0;
  function go (index) {
    if (index<0) {now = len}
    else if (index>len) {now=0}
    else {now = index}
    $('#tf').css({'-webkit-transform': 'translate3d(-'+now*700+'px, 0px, 0px)'})
    $indexs.removeClass('active').eq(now).addClass('active')
  }
  $('#prev').on('click', function () {
    go(--now)
  })
  $('#next').on('click', function () {
    go(++now)
  })
  $indexs.on('click', function () {
    go(this.innerHTML)
  })
  var $ls = $('#ls')
  function showls (arr) {
    var html = ''
    for(var i=0,len=arr.length-1;i<len;i++) {
      html += '<div class="pure-u-1-3">'
      html +=   '<a class="thumb" href="/lights/'+arr[i].n+'.html">'
      html +=     '<img class="pure-img" src="http://7xlgbr.com1.z0.glb.clouddn.com/'+arr[i].i+'"/></a>'
      html += '<a class="n" href="/lights/'+arr[i].n+'">'+arr[i].n+'</a></div>'
    }
    $ls.html(html)
  }
  if ($ls.length) {
    showls(lights)
  }

  // $('#types a').on('click', function () {
  //   var type = this.id
  //   var rs = []
  //   for(var i=0,len=lights.length-1;i<len;i++)
  //     if (lights[i].t==type) {rs.push(lights[i])};
  //   showls(rs)
  //   return false;
  // })


})