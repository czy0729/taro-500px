/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:37:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-20 09:40:59
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
      // 'pages/article/index',
      // 'pages/detail/index',
      // 'pages/fans/index',
      // 'pages/favor-detail/index',
      // 'pages/follow/index',
      // 'pages/my-articles/index',
      // 'pages/my-favor/index',
      // 'pages/my-photos/index',
      // 'pages/my-videos/index',
      // 'pages/new-favor/index',
      // 'pages/preview/index',
      // 'pages/publish/index',
      // 'pages/search/index',
      // 'pages/zone/index',

      'pages/user/index',
      'pages/setting/index',
      'pages/index/index'
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
