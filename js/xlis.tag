<todo>
  <div class="head">
    <a class="logo" href="/">
      <img src="/img/logo.png" width="92" class="gray">
    </a>
    <span class="chat icono-comment" onclick={chat}></span>
    <span class="fixed icono-hamburger" hide={active}></span>
    <span class="fixed icono-cross" show={active} onclick={close}></span>
  </div>
  <ul class="ls">
    <li each={items} onclick={show} class={active: done}>
      <img src="http://cweb.qiniudn.com/{i}">
    </li>
  </ul>
  <article id="show" class={active: active}>
    <h2>{light.n}</h2>
    <ul id="ii">
      <li each={img, index in light.ii.split(',')}>
        <img class="pure-img" src="http://cweb.qiniudn.com/{img}">
      </li>
    </ul>

    <div class="clear">
    <p>{light.dz}</p>
    -----------------------------------------
    <p id='bz'></p>
    -----------------------------------------
    <p id='be'></p>
  </article>

  <div id="chat" class={active: sc}>
    <div class="title" onclick={chat}>Chat</div>
    <br>
    <form id="login" onsubmit={login} hide={login}>
      <input type="text" name="name" value='fenq'>
      <input type="text" name="password" value='123654'>
      <input type="submit">
    </form>
    <div id="div">00...</div>
    <ul id="logs">
      <li each={logs}>{from}: {msg}</li>
    </ul>
  </div>

  <script>
    var appId = 'pimejb32ayn6tbat7aa3w2j01mwmsmdqwwhb5in5hv14jw9x'
    var rt;
    var clientId;
    var room;
    var rid = ''


    this.items = lights
    this.logs = []
    add() {
      console.log(this.items)
    }
    show(e) {
      $('#show')[0].scrollTop = 0
      this.light = e.item
      this.active = true
      this.html = this.light.dz
      $('#bz').html(this.light.bz)
      $('#be').html(this.light.be)
    }
    close() {
      this.active = false
    }
    chat() {
      this.sc = !this.sc
    }
    self = this
    login() {

      var data = {name: this.name.value, password: this.password.value}
      rt = AV.realtime({
        appId: appId,
        clientId: data.name,
        encodeHTML: true
      })

      $.post('/api/login', data, function (roomid) {
        room = roomid
        rt.on('open', function () {
          self.login = true
          rt.room(room, function (obj) {
            // console.log(roomid)
            room = obj
            room.log(function (logs) {
              console.log(logs)
              self.update({logs: logs})
            })
          })
        })
      })


      // deal_chat(this.name.value)

      return false;
    }

  </script>

</todo>
