/*
 * @Author: czy0729
 * @Date: 2019-06-13 14:39:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-13 18:23:53
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { CoverView, CoverImage } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'custom-tab-bar'
const list = [
  {
    pagePath: '/pages/index/index',
    iconPath: require('../assets/tab-bar/home.png'),
    selectedIconPath: require('../assets/tab-bar/home-active.png')
  },
  {
    pagePath: 'add',
    iconPath: require('../assets/tab-bar/add.png'),
    selectedIconPath: require('../assets/tab-bar/add.png')
  },
  {
    pagePath: '/pages/user/index',
    iconPath: require('../assets/tab-bar/user.png'),
    selectedIconPath: require('../assets/tab-bar/user-active.png')
  }
]

class CustomTabBar extends Component {
  state = {
    selected: 0
  }

  switchTab = toPath => {
    if (toPath === 'add') {
      //
    } else {
      Taro.switchTab({
        url: toPath
      })
    }
  }

  render() {
    const { selected } = this.state
    return (
      <CoverView className={classNames(cls, 'flex')}>
        {list.map((item, index) => (
          <CoverView
            key={item.pagePath}
            className={`${cls}__item`}
            onClick={() => this.switchTab(item.pagePath)}
          >
            <CoverImage
              className={`${cls}__thumb`}
              src={selected === index ? item.selectedIconPath : item.iconPath}
            />
          </CoverView>
        ))}
      </CoverView>
    )
  }
}

export default CustomTabBar
