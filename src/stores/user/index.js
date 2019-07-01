/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-25 10:37:24
 */
import { observable, computed } from 'mobx'
import { dev } from '@utils'
import store from '@utils/store'
import { initUserInfo } from './init'

class UserStore extends store {
  @observable state = {
    userInfo: initUserInfo
  }

  // -------------------- get --------------------
  @computed get userInfo() {
    return this.state.userInfo
  }

  @computed get myUserId() {
    return this.userInfo.user_id
  }

  @computed get isLogin() {
    return !!this.userInfo.access_token
  }

  // -------------------- fetch --------------------
}

const Store = new UserStore()
dev(Store)

export default Store
