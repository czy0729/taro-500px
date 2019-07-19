/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 12:09:06
 */
import { observable, computed } from 'mobx'
import { dev, getTimestamp, HTMLTrim } from '@utils'
import store from '@utils/store'
import fetch from '@utils/fetch'
import { genRichTextNodes } from '@utils/app'
import { LIST_EMPTY } from '@constants'
import { initDetail } from './init'

class AppStore extends store {
  @observable state = {
    photo: LIST_EMPTY,
    detail: {
      // 0: initDetail
    },
    comments: {
      // 0: LIST_EMPTY
    }
  }

  // -------------------- get --------------------
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
        title: data.title,
        cover: data.url.baseUrl,
        content: data.description,
        uploadedDate: Math.floor(data.uploadedDate / 1000),
        uploaderInfo: {
          avatar: {
            baseUrl: data.uploaderInfo.avatar.baseUrl
          },
          nickName: data.uploaderInfo.nickName
        },
        pictureLikeedCount: data.pictureLikeedCount,
        carousel: [
          data.url.baseUrl,
          ...photos
            .filter((item, index) => index > 0 && index < 10)
            .map(item => item.url.baseUrl)
        ],
        more: photos
          .reverse()
          .filter((item, index) => index < 5)
          .map(item => item.url.baseUrl),
        richText: genRichTextNodes(data.photos || []),
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

const Store = new AppStore()
dev(Store)

export default Store
