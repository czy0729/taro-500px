/*
 * @Author: czy0729
 * @Date: 2019-06-13 14:39:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 16:50:27
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Component from '@components/component'
import imagePublish from '@assets/tab-bar/publish.png'
import Preview from './preview'
import { rootCls, listDS } from './ds'
import './index.scss'

const cls = rootCls

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
          {listDS.map((item, index) => (
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
