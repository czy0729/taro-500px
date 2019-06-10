/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-10 12:02:00
 */
import { observable, computed } from 'mobx'
import common from '@utils/common'

class User extends common {
  @observable state = {
    userInfo: {
      access_token: '16d9bc759e04e62b99576589cd7bfff02f6327ef',
      expires_in: 604800,
      token_type: 'Bearer',
      scope: null,
      user_id: 456208,
      refresh_token: 'e087f362872ee0a2207ff0e3e6245d685e73faac',
      _loaded: true
    }
  }

  // -------------------- get --------------------
  /**
   * 取自己用户信息
   */
  @computed get userInfo() {
    return this.state.userInfo
  }

  /**
   * 取自己用户Id
   */
  @computed get myUserId() {
    return this.userInfo.user_id
  }

  /**
   * 取是否登录
   */
  @computed get isLogin() {
    return !!this.userInfo.access_token
  }

  // -------------------- fetch --------------------
  /**
   * 获取某人的在看收藏
   * @param {*} userId
   */
  // fetchUserCollection(userId = this.myUserId) {
  //   return this.fetch(
  //     `${API_USER_COLLECTION(userId)}?cat=watching&ids=243916`,
  //     ['userCollection', userId]
  //   )
  // }
}

export default new User()
