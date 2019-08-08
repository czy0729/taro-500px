/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-08 15:17:51
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
    },

    // 图片编辑数据
    photoEdit: {
      current: 0,
      data: [
        {
          url:
            'https://img.haohaozhu.cn/App-imageShow/o_nphone/b550e226x33o0L600pochi9',
          width: 750,
          height: 1061,
          tags: [
            {
              id: 10,
              name: '舒梵',
              top: 0.49538171536286524,
              left: 0.06373333333333334
            },
            {
              id: 11,
              name: '宜家',
              top: 0.5741753063147974,
              left: 0.41333333333333333,
              reverse: true
            },
            {
              id: 12,
              name: '爱格板',
              top: 0.32855796418473143,
              left: 0.2608,
              reverse: true
            },
            {
              id: 13,
              name: '海信',
              top: 0.48803016022620166,
              left: 0.5450666666666667
            },
            {
              id: 14,
              name: '依诺维绅',
              top: 0.5969839773798303,
              left: 0.6893333333333334,
              reverse: false
            },
            {
              id: 15,
              name: '陌希生活',
              top: 0.6373232799245995,
              left: 0.28586666666666666,
              reverse: true
            },
            {
              id: 16,
              name: '白色垃圾桶',
              top: 0.695004712535344,
              left: 0.5573333333333333
            },
            { id: 17, name: '菲林格尔', top: 0.8197926484448633, left: 0.2616 }
          ]
        },
        {
          url:
            'https://img.haohaozhu.cn/App-imageShow/o_nphone/759a6232f2c00df00pochdp',
          width: 750,
          height: 571,
          tags: [
            {
              id: 20,
              name: '伸缩杆',
              top: 0.27075306479859895,
              left: 0.1576,
              reverse: true
            },
            {
              id: 21,
              name: '依诺维绅',
              top: 0.6507880910683013,
              left: 0.13386666666666666,
              reverse: true
            },
            {
              id: 22,
              name: 'ANNA ART画芯',
              top: 0.2991243432574431,
              left: 0.6456,
              reverse: false
            },
            {
              id: 23,
              name: '宜家',
              top: 0.6273204903677758,
              left: 0.6570666666666667
            },
            {
              id: 24,
              name: '陌希生活',
              top: 0.8581436077057794,
              left: 0.33813333333333334,
              reverse: false
            }
          ]
        },
        {
          url:
            'https://img.haohaozhu.cn/App-imageShow/o_nphone/26fab22c03400z600pochdp',
          width: 750,
          height: 1000,
          tags: [
            {
              id: 30,
              name: '马贝填缝剂141',
              top: 0.3952,
              left: 0.11893333333333334
            },
            { id: 31, name: '芝麻开门', top: 0.5738, left: 0.4565333333333333 }
          ]
        },
        {
          url:
            'https://img.haohaozhu.cn/App-imageShow/o_nphone/fac2c22c02lx0a600pochcr',
          width: 750,
          height: 839,
          tags: [
            { id: 40, name: '羽毛灯', top: 0.17497020262216925, left: 0.5896 },
            {
              id: 41,
              name: '南希映画，画芯',
              top: 0.6762812872467222,
              left: 0.5874666666666667,
              reverse: false
            },
            {
              id: 42,
              name: '二黑木作',
              top: 0.9053635280095352,
              left: 0.5221333333333333,
              reverse: true
            }
          ]
        },
        {
          url:
            'https://img.haohaozhu.cn/App-imageShow/o_nphone/7761222c03400y300pochds',
          width: 750,
          height: 1000,
          tags: [
            {
              id: 50,
              name: '尤加利',
              top: 0.8462000000000001,
              left: 0.1648,
              reverse: true
            },
            {
              id: 51,
              name: '南希映画，画芯',
              top: 0.4646,
              left: 0.1888,
              reverse: true
            }
          ]
        }
      ]
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

  // -------------------- method --------------------
  /**
   * 保存图片编辑数据
   */
  savePhotoEditData = photoEdit => {
    this.setState({
      photoEdit
    })
  }
}

const Store = new AppStore()
dev(Store)

export default Store
