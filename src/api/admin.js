import requestProcess from '@/utils/bmob'
import Bmob from 'hydrogen-js-sdk'

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
    query.order('-updatedAt')
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
      query.equalTo('name', '==', keyword)
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
    query.order('-updatedAt')
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
    query.order('-updatedAt')
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
      objectId, sex, studentId, dormitory
    } = params
    const query = Bmob.Query('Dormitory')
    const userQuery = Bmob.User
    userQuery.equalTo('studentId', '==', studentId)
    userQuery.find().then((res) => {
      if (res.length === 1) {
        const { objectId: id } = res[0]
        userQuery.set('id', id)
        userQuery.set('sex', sex)
        userQuery.set('dormitory', dormitory)
        userQuery.save()
      }
    })
    query.set('id', objectId)
    query.set('sex', sex)
    query.set('dormitory', dormitory)
    return requestProcess(query.save(), false, null)
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

const Statistic = {
  getStatistic(params) {
    const {
      area, entered, cancelled, dateRange
    } = params
    const query = Bmob.Query('Reservation')
    if (area) {
      query.equalTo('area', '==', area)
    }
    // 实际预约人数
    if (!cancelled) {
      query.equalTo('cancelled', '==', cancelled)
    }
    // 实际进入人数
    if (!cancelled && entered) {
      query.equalTo('cancelled', '==', cancelled)
      query.equalTo('entered', '==', entered)
    }
    if (dateRange && dateRange.length === 2) {
      query.equalTo('date', '>=', dateRange[0])
      query.equalTo('date', '<=', dateRange[1])
    }
    query.statTo('groupcount', 'true')
    query.statTo('groupby', 'date,time,sex')
    query.statTo('order', 'date,time')
    query.limit(1000)
    return requestProcess(query.find())
  }
}
export { User, Reservation, Dormitory, Statistic }
