import requestProcess from '@/utils/bmob'
import Bmob from 'hydrogen-js-sdk'

const Login = {
  login: (params) => {
    const { username, password } = params
    const query = Bmob.Query('Manager')
    query.equalTo('username', '==', username)
    query.equalTo('phone', '==', password)
    return requestProcess(query.find(), false, null)
  }
}

export { Login }
