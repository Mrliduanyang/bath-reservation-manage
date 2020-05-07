import { MessageBox } from 'element-ui'

const ERROR_CODE_MESSAGE = {
  101: '用户名或密码错误，请重新输入。',
  210: '旧密码输入错误，请重新输入。'
}

const requestProcess = (requestPromise, showSucMsg, sucMsg) => new Promise((resolve, reject) => {
  requestPromise.then((res) => {
    resolve(res)
    if (showSucMsg) {
      MessageBox.alert(sucMsg, '提示', {
        type: 'success',
        center: true
      })
    }
  })
    .catch((err) => {
      reject(false)
      const { code } = err
      MessageBox.alert(ERROR_CODE_MESSAGE[code] || '网络错误', '提示', {
        type: 'error',
        center: true
      })
    })
})
export default requestProcess
