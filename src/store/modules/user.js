import { login, getInfo, refreshToken } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    user: {
      id: 0,
      username: '',
      avatar: ''
    },
    roles: [] // 添加角色变量
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    // Object.assign合并两个对象 浅拷贝 相当于py中的合并两个字典 如果包含同样的key属性 后面的对象属性覆盖前面的对象属性
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login promise 异步模式 推荐
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo: async ({ commit, state })=> {
    try{
      const response = await getInfo(state.token)
      const { data } = response
      if (!data) {
        return reject('Verification failed, please Login again.')
      }
      const { roles, user } = data
      commit('SET_ROLES', roles)
      commit('SET_USER', user)
      return data
    }catch(e){
      console.log(e)
    }
  },

  // user logout
  logout:({ commit, state }) => {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // refresh token
  async refreshToken({commit, state}){
    try{
      const response = await refreshToken({ token : state.token})
      const {data} = response
      commit('SET_TOKEN', data.token)
      setToken(data.token)
    }catch(err){
      console.log(err)
    }
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // dynamically modify permissions async 异步模式 推荐
  async changeRoles({ commit, dispatch }, role) {
    // const token = role + '-token'

    // commit('SET_TOKEN', token)
    // setToken(token)

    // const { roles } = await dispatch('getInfo')
    const roles = [role]
    commit('SET_ROLES', roles)

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    // dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

