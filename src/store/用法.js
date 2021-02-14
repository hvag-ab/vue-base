import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from '@/store/modules/permission'
import tagsView from '@/store/modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
    tagsView
  },
  getters
})

export default store

// store.state.app  -> module app的状态  。。

// 存放异步函数方法
// actions: {
//   //async异步 // {commit}解构的是context 相当于去context中的commit key-value 所以必须用{}
//   async getTodos({commit}) {
//     const result = await axios.get('xxx');
//     commit('updateState', result.data);
//   },
//   //Promise异步
//   fetchTodos({commit}, params) {
//     return new Promise((resolve, reject) => {
//       get('xxxxx')
//         .then(res => res.json())
//         .then(data => {
//           commit('setState', data)
//           reject(data)
//         })
//         .catch(err => reject(err));//抛出错误回调
//     });
//   }
// example: async ({ commit, state }, info)=>{
//   const res = await axios.get('xxxx')
//     commit(SET_INFO', '')
// }

// }
// import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

// // 获取计算数据  mapGetters mapState必须在computed里面
// computed: {
//    mapState({
//   // 箭头函数可使代码更简练
//   count: state => state.count,
//   // 传字符串参数 'count' 等同于 `state => state.count`
//   countAlias: 'count',

//   // 为了能够使用 `this` 获取局部状态，必须使用常规函数
//   countPlusLocalState (state) {
//     return state.count + this.localCount
//   }
// })
//   ...mapGetters([
//     'doneTodosCount',
//     'anotherGetter',
//     // ...
//   ]),
//   ...mapGetters({
//     // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
//     doneCount: 'doneTodosCount'
//   }),
// 方式1
    // ...mapState('common', ['token']),//  this.token 映射为 `this.$store.state.common.token`
    // // 方式2
    // token () {
    //     return this.$store.state.common.token
    // }

// }
// // mapMutations 和 mapActions 必须在 methods里面
// Mutation
  // <script>
  // import { mapMutations } from 'vuex'
  // export default {
  // methods:{
  //     // 方式1
  //     ...mapMutations('common',[
  //         'setTokenData'  // 将 `this.setTokenData()` 映射为 `this.$store.commit('common/setTokenData')`
  //     ]),
  //     // 方式2 可以用设置别名的方式 推荐 
  //       ...mapMutations({
  //         setToken: 'common/setTokenData' 
  //         // 将 `this.setToken('123')` 映射为`this.$store.commit('common/setTokenData','123')`
  //     }),
  //     // 方式3 直接调用  this.$store.commit('common/setTokenData','123')
  // }
  // }
  // </script>

// Action
// const Action = {
//   // 参数params：传入的参数（参数名可以根据需求设置）
//   // 方式1
//   getTokenData(context,params){
//       context.commit(SET_TOKEN_DATA, params)
//   },
//   // 方式2  参数解构的方式
//    getTokenData({ commit },params){
//       commit(SET_TOKEN_DATA, params)
//   },
// }

// mapMutation 辅助函数 获取

// // state
// <script>
// import { mapActions } from 'vuex'
// export default {
//  methods:{
//      // 方式1
//      ...mapActions('common',[
//         'getTokenData'  // 将 `this.getTokenData()` 映射为 `this.$store.dispatch('common/getTokenData')`
//      ]),
//      // 方式2 可以用设置别名的方式
//       ...mapActions({
//        getData:'common/getTokenData'
//         // 将 `this.getData('123')` 映射为`this.$store.dispatch('common/getTokenData','123')`
//      }),
//      // 方式3 直接调用 this.$store.dispatch('common/getTokenData','123')
//  }
// }
// </script>
