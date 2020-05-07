import requestProcess from '@/utils/bmob'
import Bmob from 'hydrogen-js-sdk'

const About = {
  getAbout: (params) => {
    const query = Bmob.Query('About')
    return requestProcess(query.get('f2f1181e56'), false, null)
  }
}

export { About }
