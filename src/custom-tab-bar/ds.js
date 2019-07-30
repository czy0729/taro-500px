/*
 * @Author: czy0729
 * @Date: 2019-07-30 16:40:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 16:51:35
 */
import imageHome from '@assets/tab-bar/home.png'
import imageHomeActive from '@assets/tab-bar/home-active.png'
import imageUser from '@assets/tab-bar/user.png'
import imageUserActive from '@assets/tab-bar/user-active.png'

export const rootCls = 'custom-tab-bar'

export const listDS = [
  {
    pagePath: '/pages/index/index',
    iconPath: imageHome,
    selectedIconPath: imageHomeActive,
    text: '首页'
  },
  {
    pagePath: 'add'
  },
  {
    pagePath: '/pages/user/index',
    iconPath: imageUser,
    selectedIconPath: imageUserActive,
    text: '我'
  }
]

export const menuDS = [
  {
    text: '文章',
    icon: 'document'
  },
  {
    text: '图片',
    icon: 'picture'
  },
  {
    text: '视频',
    icon: 'video'
  },
  {
    text: '案例',
    icon: 'plan'
  }
]
