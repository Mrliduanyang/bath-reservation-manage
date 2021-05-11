import { Login } from '@/api/login'

const state = {
  token: '',
  username: '',
  role: '',
  person: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_PERSON: (state, person) => {
    state.person = person
  }
}

const actions = {
  /**
   * @function 用户名登录
   * @param commit
   * @param userInfo
   * @return {Promise<any>}
   */
  loginByUsername({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      Login.login(userInfo)
        .then((response) => {
          localStorage.setItem('USERNAME', response[0].username)
          localStorage.setItem('TOKEN', response[0].objectId)
          localStorage.setItem('ROLE', 'admin')
          resolve('admin')
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  /**
   * @function 从缓存中恢复登录用户信息
   * @param commit
   * @return {Promise<any>}
   */
  setUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_USERNAME', localStorage.getItem('USERNAME'))
      commit('SET_ROLE', localStorage.getItem('ROLE'))
      commit('SET_TOKEN', localStorage.getItem('TOKEN'))
      resolve(localStorage.getItem('ROLE'))
    })
  },
  /**
   * 登出
   * @param commit
   * @return {Promise<any>}
   */
  logOut({ commit }) {
    return new Promise((resolve) => {
      commit('SET_USERNAME', '')
      commit('SET_TOKEN', '')
      commit('SET_ROLE', '')
      localStorage.clear()
      resolve()
    })
  },
  setPerson({ commit }, person) {
    commit('SET_PERSON', person)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
