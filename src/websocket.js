export class WsConn {
  conn
  host = '192.168.5.146'
  handlers = {}
  subscribes = []
  heartState = 'PING'
  constructor() {
    this.connect()
    this.healthCheck()
  }
  connect() {
    if (process.env.NODE_ENV !== 'development') {
      this.host = document.location.host
    }
    this.conn = new WebSocket(`ws://${this.host}/monitor/websocket`)
    this.onMessage()
  }
  reconnect() {
    if (!this.isAlive) {
      console.log('handle reconnect')
      this.connect()
      var reconnectInterval = setInterval(() => {
        if (this.conn.readyState === this.conn.OPEN) {
          this.subscribes.forEach((id) => {
            this.conn.send(`SUBSCRIBE:device_${id}`)
          })
          clearInterval(reconnectInterval)
        }
      }, 1000)
    }
  }
  onMessage() {
    this.conn.onmessage = (val) => {
      if (val.data === 'PONG') {
        this.heartState = 'PONG'
      } else {
        var data = JSON.parse(val.data)
        var func = this.handlers[`device_${data.DeviceID}`]
        if (func && typeof func === 'function') {
          func(data)
        }
      }
    }
  }
  healthCheck() {
    setInterval(() => {
      if (this.conn.readyState === this.conn.OPEN) {
        this.conn.send('PING')
      } else {
        if (this.conn.readyState !== this.conn.CONNECTING) {
          this.reconnect()
        }
      }
    }, 1000)
    setInterval(() => {
      if (
        this.heartState !== 'PONG' &&
        this.conn.readyState !== this.conn.CONNECTING
      ) {
        this.reconnect()
      }
    }, 2000)
  }
  subscribe(id, handler) {
    this.conn.send(`SUBSCRIBE:device_${id}`)
    this.handlers[`device_${id}`] = handler
    this.subscribes.push(id)
  }
  unsubscribe(id) {
    this.conn.send(`UNSUBSCRIBE:device_${id}`)
    var index = this.subscribes.findIndex((i) => i === id)
    this.subscribes.splice(index, 1)
    delete this.handlers[`device_${id}`]
  }
}
