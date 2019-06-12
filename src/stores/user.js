/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-12 11:04:03
 */
import { observable, computed } from 'mobx'
import { dev, getTimestamp } from '@utils'
import store from '@utils/store'
import fetch from '@utils/fetch'
import { LIST_EMPTY } from '@constants'

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
    photo: LIST_EMPTY
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

  @computed get photo() {
    return this.state.photo || LIST_EMPTY
  }

  // -------------------- fetch --------------------
  fetchTest = async refresh => {
    const res = fetch({
      url: 'https://500px.me/community/discover/created_date',
      data: {
        resourceType: 3,
        page: refresh ? 1 : this.photo.pagination.page + 1,
        size: 20,
        type: 'json'
      }
    })
    const data = await res

    let DS = LIST_EMPTY
    if (data) {
      const nextDS = data.map(item => ({
        id: item.id,
        width: item.width,
        height: item.height,
        url: item.url.baseUrl,
        user: item.uploaderInfo.nickName,
        avatar: item.uploaderInfo.avatar.baseUrl,
        title: item.title,
        count: item.picturePvCount
      }))
      if (refresh) {
        DS = {
          list: nextDS,
          pagination: {
            page: 1,
            pageTotal: 10
          },
          _loaded: getTimestamp()
        }
      } else {
        DS = {
          ...this.photo,
          list: [...this.photo.list, ...nextDS],
          pagination: {
            ...this.photo.pagination,
            page: this.photo.pagination.page + 1
          },
          _loaded: getTimestamp()
        }
      }
      this.setState({
        photo: DS
      })
    }

    return Promise.resolve(DS)
  }
}

const Store = new UserStore()
dev(Store)

export default Store
