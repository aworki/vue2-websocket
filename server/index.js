const Ws = require('ws')

;((Ws)=>{
  const server = new Ws.Server({ port: 8000 })

  const init = ()=>{
    bindEvent()
  }
  
  function bindEvent() {
    server.on('open', handleOpen)
    server.on('close', handleClose)
    server.on('error', handleError)
    server.on('connection', handleConnection)
  }
  function handleOpen() {
    console.log('server ws open')
  }
  function handleClose() {
    console.log('server ws close')
  }
  function handleError(e) {
    console.log('server ws error',e)
  }
  function handleConnection(ws,e) {
    console.log('server ws connection',e.url)
    ws.on('message', handleMessage)
    server.clients.forEach((c)=>{
      c.send(JSON.stringify({
        id: new Date().getTime(),
        username: '',
        dateTime: new Date().toLocaleString(),
        message: `${e.url.replace('/','')+ ' '}进入了房间`
      }))
    })
  }
  function handleMessage(msg) {
    console.log(msg)

    server.clients.forEach((c)=>{
      c.send(msg)
    })
  }
  init()
})(Ws)