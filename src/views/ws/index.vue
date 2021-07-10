<template>
  <div style="width: 70%;margin-left: 30px;margin-top: 30px;">
    <p style="color:red;font-size:18px;">{{accept}}</p>
    <br>
    <input type="text" v-model="content">
    <el-button type="primary" @click="onSubumit">提交</el-button>
    <el-button type="primary" @click="disconnect">断开</el-button>
  </div>
</template>

<script>
  export default {
    name : 'test',
    data() {
      return {
        websock: null,
        content:'',
        accept:''
      }
    },
    created() {
      this.initWebSocket();
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
      initWebSocket(){ //初始化weosocket
        if (typeof (WebSocket) == 'undefined') {
            console.log('当前浏览器无法接收实时报警信息，请使用谷歌浏览器！')
        }
        console.log(window.location.protocol==="http:"?'ws://':'wss://')
        const wsuri = "ws://127.0.0.1:8000/wx/";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        let actions = {"test":"12345"};
        this.websocketsend(JSON.stringify(actions));
      },
    //   websocketonerror(){//连接建立失败重连
    //     this.initWebSocket();
    //   },
      websocketonmessage(e){ //数据接收
        console.log(e.data)
        this.accept = e.data
        // const redata = JSON.parse(e.data);
        // console.log(redata)
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
      onSubumit(){
        this.websocketsend(this.content)
      },
      disconnect(){
        this.websock.close()
      }
    },
  }
</script>
<style>
</style>
