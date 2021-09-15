<template>
  <Card class="m-home">
    <List class="m-list">
       <ListItem v-for="item in list" :key="item.id" >
            <ListItemMeta :avatar="item.username?'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar':''" :description="item.message" :class="item.username === username?'message':''">
              <template slot="title">
                <div class="m-message-title">
                  <span>{{ item.username }}</span>
                  <span>{{ item.dateTime }}</span>
                </div>
              </template>
            </ListItemMeta>
        </ListItem>
        <div><a ref="msg_end" name="1" href="#1">&nbsp;</a></div>
    </List>
    <div class="input">
      <Input v-model="msg" class="input-in" @keyup.enter.native="handleSendMessage"/>
      <Button type="primary" @click="handleSendMessage()"  >发送</Button>
    </div>
  </Card>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      msg: "",
      username: "",
      list: [],
      ws: null
    };
  },
  mounted() {
    

    if (!sessionStorage.getItem("username")) {
      this.$router.push("login");
      return;
    }

    this.username = sessionStorage.getItem('username')
    const ws = new WebSocket(`ws://localhost:8000/${this.username}`)
    this.ws = ws
    // 使this指向vue实例
    ws.addEventListener('open',this.websocketOpen.bind(this),false)
    ws.addEventListener('close',this.websocketClose.bind(this),false)
    ws.addEventListener('error',this.websocketError.bind(this),false)
    ws.addEventListener('message',this.websocketMessage.bind(this),false)

  },
  methods: {
    handleSendMessage() {
      const msg = this.msg
      if(!msg.trim().length) {
        return
      }
      this.ws.send(JSON.stringify({
        id: new Date().getTime(),
        username: this.username,
        dateTime: new Date().toLocaleString(),
        message: this.msg
      }))
      this.msg = ''
    },
    websocketOpen() {
      console.log('client ws open')
    },
    websocketClose() {
      console.log('client ws close')
    },
    websocketError() {
      console.log('client ws error')
    },
    websocketMessage(e) {
      console.log('client ws accept message')
      this.list.push(JSON.parse(e.data))
    }
  },
  watch: {
    list(){
      this.$refs.msg_end.click();
    }
  } 
};
</script>

<style scoped>
.m-home {
  width: 500px;
  margin: 16px auto;

}
.input {
  display: flex;
  justify-content: space-between;
}
.input-in {
  width: 350px;
}
.m-message-title {
  display: flex;
  justify-content: space-between;
}

.message {
  background-color: #e3f0fc;
  border-radius: 4px;
}

.m-list {
  max-height: 730px;
  overflow: auto;
}
</style>
