<template>
  <Card class="m-login">
    <h2 class="m-title">登录聊天室</h2>
    <Input class="m-input" v-model="username" style="width: 400px"/>
    <Button class="m-button" @click="handleLogin" type="primary">进入聊天室</Button>
  </Card>
</template>

<script>
export default {
  name:'login',
  data() {
    return {
      username: ''
    }
  },
  methods:{
    handleLogin() {
      const username = this.username.trim()

      if(username.length < 6 ) {
        this.$Message.error('用户名不能小于6位')
        this.username = ''
        return 
      }

      sessionStorage.setItem('username', username)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.m-login {
  width: 500px;
  text-align: center;
  margin: 16px auto;
}
.m-title {
  margin-bottom: 16px;
}
.m-input {
  margin-bottom: 16px;
}
.m-button {
  width: 400px;
}
</style>
