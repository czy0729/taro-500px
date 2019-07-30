/*
 * @Author: czy0729
 * @Date: 2019-06-13 14:39:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 12:09:50
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Component from '@components/component'
import imageHome from '@assets/tab-bar/home.png'
import imageHomeActive from '@assets/tab-bar/home-active.png'
import imageUser from '@assets/tab-bar/user.png'
import imageUserActive from '@assets/tab-bar/user-active.png'
import imagePublish from '@assets/tab-bar/publish.png'
import Preview from './preview'
import './index.scss'

const cls = 'custom-tab-bar'
const list = [
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

class CustomTabBar extends Component {
  state = {
    selected: 0,
    showPreview: false
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

  showPreview = () => {
    this.setState({
      showPreview: true
    })
  }

  closePreview = () => {
    this.setState({
      showPreview: false
    })
  }

  render() {
    const { selected, showPreview } = this.state
    return (
      <View>
        <Preview show={showPreview} onClose={this.closePreview} />
        <View className={classNames(cls, 'flex')}>
          {list.map((item, index) => (
            <View
              key={item.pagePath}
              className={`${cls}__item`}
              onClick={() => this.switchTab(item.pagePath)}
            >
              {item.pagePath === 'add' ? (
                <View onClick={this.showPreview}>
                  <Image className={`${cls}__publish`} src={imagePublish} />
                </View>
              ) : (
                <View className='flex flex-column'>
                  <Image
                    className={`${cls}__thumb`}
                    src={
                      selected === index ? item.selectedIconPath : item.iconPath
                    }
                  />
                  <Text className='t-20 l-24 t-sub mt-8'>{item.text}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    )
  }
}

export default CustomTabBar
