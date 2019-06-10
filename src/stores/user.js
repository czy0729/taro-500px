/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-10 15:53:27
 */
import { observable, computed } from 'mobx'
import { dev } from '@utils'
import store from '@utils/store'

class UserStore extends store {
  @observable state = {
    userInfo: {
      access_token: '16d9bc759e04e62b99576589cd7bfff02f6327ef',
      expires_in: 604800,
      token_type: 'Bearer',
      scope: null,
      user_id: 456208,
      refresh_token: 'e087f362872ee0a2207ff0e3e6245d685e73faac',
      _loaded: true
    },
    news: {}
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
  fetchTest = async () => {
    const res = this.fetch(
      {
        url: 'https://xw.qq.com/service/api/getData?k=index:data:all'
      },
      'news'
    )
    await res
    console.log(this.state)

    return res
  }
}

const Store = new UserStore()
dev(Store)

export default Store
