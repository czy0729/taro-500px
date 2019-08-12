/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:37:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-12 12:06:28
 */
import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import { userStore, appStore } from '@stores'
import { colorDanger, colorSub, colorPlain } from '@constants/style'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/index/index'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  userStore,
  appStore
}

class App extends Component {
  config = {
    pages: [
      'pages/index/index', // 首页
      'pages/user/index', // 个人中心
      'pages/detail/index', // 图片详情
      'pages/article/index', // 文章详情
      'pages/search/index', // 搜索
      'pages/fans/index', // 我的粉丝
      'pages/follow/index', // 我的关注
      'pages/my-favor/index', // 我的收藏
      'pages/new-favor/index', // 新建收藏
      'pages/favor-detail/index', // 收藏夹详情
      'pages/my-photos/index', // 我的图片
      'pages/my-videos/index', // 我的视频
      'pages/my-articles/index', // 我的文章
      'pages/history/index', // 浏览历史
      'pages/zone/index', // 个人空间
      'pages/setting/index', // 设置
      'pages/publish-photos/index', // 发布图片
      'pages/publish-article/index', // 发布文章
      'pages/publish-video/index', // 发布视频
      'pages/photo-edit/index', // 图片编辑
      'pages/tags/index', // 图片标签
      'pages/my-info/index', // 图片标签
      'pages/empty/index' // 开发占位页
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '云知光',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      custom: true,
      color: colorSub,
      selectedColor: colorDanger,
      backgroundColor: colorPlain,
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: './assets/tab-bar/home.png',
          selectedIconPath: './assets/tab-bar/home-active.png',
          text: '首页'
        },
        {
          pagePath: 'pages/user/index',
          iconPath: './assets/tab-bar/user.png',
          selectedIconPath: './assets/tab-bar/user-active.png',
          text: '我'
        }
      ]
    },
    usingComponents: {}
  }

  // componentDidMount() {}

  // componentDidShow() {}

  // componentDidHide() {}

  // componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
