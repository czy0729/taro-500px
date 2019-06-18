/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 16:07:47
 */
import { observable, computed } from 'mobx'
import { dev, getTimestamp, HTMLTrim } from '@utils'
import store from '@utils/store'
import fetch from '@utils/fetch'
import { LIST_EMPTY } from '@constants'

// comments: [
//   {
//     userInfo: {
//       nickName: '会放电的小星星',
//       id: '2336138af4282805e9fe083ce18373146',
//       avatar: {
//         baseUrl:
//           'https://img.500px.me/2336138af4282805e9fe083ce18373146_1537541804270.jpg'
//       }
//     },
//     countLike: 0,
//     message: '巨巨',
//     id: 'bf60fba758b6495787e5e0c09c7d7c88',
//     childComments: [],
//     createDate: 1560499220
//   },
//   {
//     userInfo: {
//       nickName: '小粒儿',
//       id: 'a2240b4644ee8b21479f2d9caf0315240',
//       avatar: {}
//     },
//     countLike: 0,
//     message: '马克一下',
//     id: 'cbbe3c2c87664f1fa4f63fe848d682b3',
//     childComments: [],
//     createDate: 1560482182
//   },
//   {
//     userInfo: {
//       nickName: 'Licca花园',
//       id: 'fc975501640af8a4d18b9ed75eaf29259',
//       avatar: {
//         baseUrl:
//           'https://img.500px.me/fc975501640af8a4d18b9ed75eaf29259_1554548391265.jpg'
//       }
//     },
//     countLike: 0,
//     message: '非常赞 期待下半程',
//     id: 'a7fea1973ddc4a30aee2bf59638c91e7',
//     childComments: [],
//     createDate: 1559688756
//   }
// ]

const initDetail = {
  content: '',
  uploadedDate: 0,
  uploaderInfo: {
    avatar: {
      baseUrl: ''
    },
    nickName: ''
  },
  pictureLikeedCount: 0,
  carousel: [],
  more: []
}

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
    photo: LIST_EMPTY,
    detail: {
      // 0: initDetail
    },
    comments: {
      // 0: LIST_EMPTY
    }
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

  detail(id = 0) {
    return computed(() => this.state.detail[id] || initDetail).get()
  }

  comments(id = 0) {
    return computed(() => this.state.comments[id] || LIST_EMPTY).get()
  }

  // -------------------- fetch --------------------
  /**
   * 随心看
   */
  fetchPhoto = async refresh => {
    const data = await fetch({
      url: 'https://500px.me/community/discover/created_date',
      data: {
        resourceType: 3,
        page: refresh ? 1 : this.photo.pagination.page + 1,
        size: 20,
        type: 'json'
      }
    })

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
        count: item.pictureLikeedCount
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

  /**
   * 详情
   */
  fetchDetail = async ({ id } = {}) => {
    const HTML = await fetch({
      url: `https://500px.me/community/v2/graphic/detail/${id}`
    })
    let DS = initDetail
    if (HTML) {
      const matchHTML = HTMLTrim(HTML).match(
        /var graphicDetail = new Object\((.+?)\);<\/script>/
      )
      const { data } = JSON.parse(matchHTML[1])
      const photos = data.photos.filter(item => item.type === 'photo')
      DS = {
        content: data.description,
        uploadedDate: Math.floor(data.uploadedDate / 1000),
        uploaderInfo: {
          avatar: {
            baseUrl: data.uploaderInfo.avatar.baseUrl
          },
          nickName: data.uploaderInfo.nickName
        },
        pictureLikeedCount: data.pictureLikeedCount,
        carousel: photos
          .filter((item, index) => index < 10)
          .map(item => item.url.baseUrl),
        more: photos
          .reverse()
          .filter((item, index) => index < 5)
          .map(item => item.url.baseUrl),
        _loaded: getTimestamp()
      }

      this.setState({
        detail: {
          [id]: DS
        }
      })
    }

    return Promise.resolve(DS)
  }

  /**
   * 详情留言
   */
  fetchDetailComments = async ({ id }, refresh) => {
    const comments = this.comments(id)
    const data = await fetch({
      url: 'https://500px.me/community/comment/list',
      data: {
        type: 'json',
        page: refresh ? 1 : comments.list.pagination.page + 1,
        size: 10,
        resId: id
      }
    })

    let DS = LIST_EMPTY
    if (data) {
      const nextDS = data.comments.map(item => ({
        id: item.id,
        userInfo: {
          id: item.userInfo.id,
          nickName: item.userInfo.nickName,
          userName: item.userInfo.userName,
          avatar: {
            baseUrl: item.userInfo.avatar.baseUrl
          }
        },
        message: item.message,
        countLike: item.countLike,
        createDate: Math.floor(item.createDate / 1000),
        childComments: item.childComments.map(i => ({
          id: i.id,
          userInfo: {
            id: i.userInfo.id,
            nickName: i.userInfo.nickName,
            userName: item.userInfo.userName,
            avatar: {
              baseUrl: i.userInfo.avatar.baseUrl
            }
          },
          message: i.message,
          countLike: i.countLike,
          createDate: Math.floor(i.createDate / 1000)
        }))
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
          ...comments,
          list: [...comments.list, ...nextDS],
          pagination: {
            ...comments.pagination,
            page: comments.pagination.page + 1
          },
          _loaded: getTimestamp()
        }
      }
      this.setState({
        comments: {
          [id]: DS
        }
      })
    }

    return Promise.resolve(DS)
  }
}

const Store = new UserStore()
dev(Store)

export default Store
