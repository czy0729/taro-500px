/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 18:06:15
 */
import { observable, computed } from 'mobx'
import { dev, getTimestamp, HTMLTrim, deepmerge } from '@utils'
import store from '@utils/store'
import fetch from '@utils/fetch'
import { genRichTextNodes } from '@utils/app'
import { LIST_EMPTY } from '@constants'
import { initPhotoItem, initDetail } from './init'

class AppStore extends store {
  @observable state = {
    // 照片
    photo: LIST_EMPTY,

    // 文章
    detail: {
      // 0: initDetail
      1: {
        title: '短腿大脸猫的图片',
        cover:
          'https://img.haohaozhu.cn/App-imageShow/o_nphone/b550e226x33o0L600pochi9',
        content:
          '\n我家就是北欧风，走的简洁、大方、实用的总方针。\n\n图1，2。客厅\n舒梵的门洞形状的大镜子，大爱，质量特别好，很有分量，显得家里都大了，蓬荜生辉！\n\n一整面墙的爱格板电视柜，白色简约好看，收纳能力强大，是家里保持干净整洁的独门秘籍。最爱。\n\n图3。客厅\n桌子、椅子、沙发都是细腿高脚。精致、好打扫卫生。\n客厅配色：主要是莫兰迪蓝 珊瑚粉 少量金色点缀，看着比较舒服。\n\n图4\n厨房\n25mm细边框玻璃移门，有质感。\n门槛石取消，用移门轨道直接压住厨房地砖和客厅地板。\n橱柜的白色玻璃门板，简约、好打理。\n西门子白色冰箱，容量大，简约、好看、大气。\n博世白色油烟机，颜值高。\n武峰伊丽莎白全自净吊顶，简约好看。\n瓷砖美缝，马贝141填缝剂，哑光，有质感\n\n图5\n卫生间\n15mm细边框玻璃吊轨门 玉砂玻璃，有质感。\n浴室柜的白色玻璃门板，简约、好打理。\n浴室柜的亚历克台面：细腻光滑有质感。\n瓷砖美缝：马贝141填缝剂，哑光，有质感\n\n\n图6，7，8\n装饰画是亚克力板 画芯，淘宝买材料，自己DIY。成本才几十块。全屋的装饰画都是自己DIY，成本只有500块左右，不仅省钱，而且比买的成品画还好看！\n\n图9\n金色小花瓶是要几朵花就可以插满，漂漂亮亮，很省钱。\n\n',
        uploadedDate: getTimestamp(),
        uploaderInfo: {
          avatar: {
            baseUrl:
              'https://img.haohaozhu.cn/App-imageShow/o_nphone/b550e226x33o0L600pochi9'
          },
          nickName: '短腿大脸猫'
        },
        pictureLikeedCount: 53,
        carousel: initPhotoItem,
        more: [
          'https://img.haohaozhu.cn/App-imageShow/sq_thumb/877/ca81a245c2rp0XU00phxkn2?w=230&h=230&iv=1',
          'https://img.haohaozhu.cn/App-imageShow/sq_thumb/94f/8a60021jk1110qg00ponn3y?w=230&h=230&iv=1',
          'https://img.haohaozhu.cn/App-imageShow/sq_thumb/fd0/37a1e20ih0m80mc00po1gp93q8g4?w=230&h=230&iv=1',
          'https://img.haohaozhu.cn/App-imageShow/sq_thumb/d62/9bdef20ku0ok00000om2n07?w=230&h=230&iv=1',
          'https://img.haohaozhu.cn/App-imageShow/sq_thumb/629/c8a0623402c00MA00plxfuy?w=230&h=230&iv=1'
        ],
        richText: [],
        _loaded: getTimestamp()
      }
    },

    // 留言
    comments: {
      // 0: LIST_EMPTY
    },

    // 照片编辑数据
    photoEdit: {
      current: 0,
      data: initPhotoItem,
      _data: [],
      _onUpdate: Function.prototype
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
          list: [
            {
              id: 1,
              height: 1061,
              width: 750,
              url:
                'https://img.haohaozhu.cn/App-imageShow/o_nphone/b550e226x33o0L600pochi9',
              user: '短腿大脸猫',
              avatar:
                'https://img.haohaozhu.cn/Pic-imageShow/sq_big/00018dt9?iv=1&v=8',
              title: '短腿大脸猫的图片',
              count: 1486
            },
            ...nextDS
          ],
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
          {
            url: data.url.baseUrl,
            width: 0,
            height: 0,
            tags: []
          },
          ...photos
            .filter((item, index) => index > 0 && index < 10)
            .map(item => ({
              url: item.url.baseUrl,
              width: 0,
              height: 0,
              tags: []
            }))
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

  /**
   * 图片跨页面增加标签
   */
  addPhotoEditTag = tag => {
    const { current, _data, _onUpdate } = this.state.photoEdit
    const data = deepmerge(_data)
    data[current].tags.push({
      ...tag,
      id: getTimestamp(),
      top: 0.4,
      left: 0.4
    })

    // 使用页面提供的回调函数更新页面state
    _onUpdate(data)

    // 清理临时引用
    this.savePhotoEditData({
      _data: [],
      _onUpdate: Function.prototype
    })
  }
}

const Store = new AppStore()
dev(Store)

export default Store
