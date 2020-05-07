import requestProcess from '@/utils/bmob'
import Bmob from 'hydrogen-js-sdk'

// const Activity = {
//   getActivities: (params) => {
//     const {
//       page, limit, keyword, author
//     } = params
//     const query = Bmob.Query('Activity')
//     if (keyword !== '') {
//       query.equalTo('title', '==', keyword)
//     }
//     if (author !== '') {
//       query.equalTo('author', '==', author)
//     }
//     query.skip((page - 1) * limit)
//     query.limit(limit)
//     return requestProcess(query.find(), false, null)
//   },
//   getActivityCount: (params) => {
//     const {
//       keyword, author
//     } = params
//     const query = Bmob.Query('Activity')
//     if (keyword !== '') {
//       query.equalTo('title', '==', keyword)
//     }
//     if (author !== '') {
//       query.equalTo('author', '==', author)
//     }
//     return requestProcess(query.count(), false, null)
//   },
//   submitActivity: (params) => {
//     const query = Bmob.Query('Activity')
//     Object.keys(params)
//       .forEach((item) => {
//         query.set(item, params[item])
//       })
//     return requestProcess(query.save(), true, '活动添加成功')
//   },
//   updateActivity: (params) => {
//     const {
//       objectId, title, startTime, endTime, summary, content, cost, capacity
//     } = params
//     const query = Bmob.Query('Activity')
//     query.set('id', objectId)
//     query.set('title', title)
//     query.set('startTime', startTime)
//     query.set('endTime', endTime)
//     query.set('summary', summary)
//     query.set('content', content)
//     query.set('cost', cost)
//     query.set('capacity', capacity)
//     return requestProcess(query.save(), true, '活动修改成功')
//   },
//   modifyActivityStatus: (params) => {
//     const {
//       objectId, status
//     } = params
//     const query = Bmob.Query('Activity')
//     query.set('id', objectId)
//     query.set('status', status)
//     return requestProcess(query.save(), false, null)
//   },
//   deleteActivity: (params) => {
//     const {
//       objectId
//     } = params
//     const query = Bmob.Query('Activity')
//     query.set('id', objectId)
//     return requestProcess(query.destroy(objectId), false, null)
//   }
// }
//
// const Registration = {
//   getRegistrations: (params) => {
//     const {
//       page, limit, keyword
//     } = params
//     const query = Bmob.Query('Registration')
//     if (keyword !== '') {
//       query.equalTo('title', '==', keyword)
//     }
//     query.skip((page - 1) * limit)
//     query.limit(limit)
//     return requestProcess(query.find(), false, null)
//   },
//   getRegistrationCount: (params) => {
//     const query = Bmob.Query('Registration')
//     return requestProcess(query.count(), false, null)
//   }
// }
//
// const About = {
//   getAbout: (params) => {
//     const query = Bmob.Query('About')
//     return requestProcess(query.get('f2f1181e56'), false, null)
//   },
//   updateAbout: (params) => {
//     const { aboutUs, contact: { address, email, phone }} = params
//     const query = Bmob.Query('About')
//     query.set('id', 'f2f1181e56')
//     query.set('aboutUs', aboutUs)
//     query.set('address', address)
//     query.set('email', email)
//     query.set('phone', phone)
//     return requestProcess(query.save(), false, null)
//   }
// }

const User = {
  getUsers(params) {
    const {
      page, limit, keyword
    } = params
    const query = Bmob.User
    if (keyword) {
      query.equalTo('name', '==', keyword)
    }
    query.equalTo('studentId', '!=', null)
    query.skip((page - 1) * limit)
    query.limit(limit)
    return requestProcess(query.find(), false, null)
  },
  getUserCount(params) {
    const {
      keyword
    } = params
    const query = Bmob.User
    if (keyword !== '') {
      query.equalTo('title', '==', keyword)
    }
    query.equalTo('studentId', '!=', null)
    return requestProcess(query.count(), false, null)
  },
  modifyUserStatus: (params) => {
    const {
      objectId, status
    } = params
    const query = Bmob.User
    query.set('id', objectId)
    query.set('prohibit', status)
    return requestProcess(query.save(), false, null)
  }
}

const Reservation = {
  getReservations(params) {
    const {
      page, limit, keyword, dateRange
    } = params
    const query = Bmob.Query('Reservation')
    if (keyword) {
      query.equalTo('name', '==', keyword)
    }
    if (dateRange && dateRange.length === 2) {
      query.equalTo('date', '>=', dateRange[0])
      query.equalTo('date', '<=', dateRange[1])
    }
    query.equalTo('studentId', '!=', null)
    query.skip((page - 1) * limit)
    query.limit(limit)
    return requestProcess(query.find())
  },
  getReservationCount(params) {
    const {
      keyword, dateRange
    } = params
    const query = Bmob.Query('Reservation')
    if (keyword) {
      query.equalTo('name', '==', keyword)
    }
    if (dateRange && dateRange.length === 2) {
      query.equalTo('date', '>=', dateRange[0])
      query.equalTo('date', '<=', dateRange[1])
    }
    return requestProcess(query.count())
  },
  modifyReservationStatus: (params) => {
    const {
      objectId, status
    } = params
    const query = Bmob.Query('Reservation')
    query.set('id', objectId)
    query.set('prohibit', status)
    return requestProcess(query.save(), false, null)
  },
  getDormitoryById(params) {
    const query = Bmob.Query('Dormitory')
    query.containedIn('studentId', params)
    return requestProcess(query.find(), false, null)
  }
}

const Dormitory = {
  getDormitories(params) {
    const {
      page, limit, keyword
    } = params
    const query = Bmob.Query('Dormitory')
    if (keyword) {
      query.equalTo('name', '==', keyword)
    }
    query.equalTo('studentId', '!=', null)
    query.skip((page - 1) * limit)
    query.limit(limit)
    return requestProcess(query.find())
  },
  getDormitoryCount(params) {
    const {
      keyword
    } = params
    const query = Bmob.Query('Dormitory')
    if (keyword) {
      query.equalTo('name', '==', keyword)
    }
    return requestProcess(query.count())
  },
  submitDormitory: (params) => {
    const query = Bmob.Query('Dormitory')
    Object.keys(params)
      .forEach((item) => {
        query.set(item, params[item])
      })
    return requestProcess(query.save(), true, '学生住宿信息添加成功')
  },
  updateDormitory: (params) => {
    const {
      objectId, name, sex, studentId, dormitory
    } = params
    const query = Bmob.Query('Dormitory')
    query.set('id', objectId)
    query.set('name', name)
    query.set('sex', sex)
    query.set('studentId', studentId)
    query.set('dormitory', dormitory)
    return requestProcess(query.save(), true, '学生住宿信息修改成功')
  },
  deleteDormitory: (params) => {
    const {
      objectId
    } = params
    const query = Bmob.Query('Dormitory')
    query.set('id', objectId)
    return requestProcess(query.destroy(objectId), false, null)
  }
}
export { User, Reservation, Dormitory }
