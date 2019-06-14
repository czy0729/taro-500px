/*
 * @Author: czy0729
 * @Date: 2019-06-11 16:15:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-14 13:43:36
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { SectionTitle } from '@components'
import Component from '@components/component'
import { ENV, LIST_EMPTY } from '@constants'
import Item from './item'
import './index.scss'

const cls = 'page-index__list'
const imageWidth = (ENV.screenWidth - ENV.wind * 3 * ENV.pxRatio) / 2
const infoHeight = 248 * ENV.pxRatio

class List extends Component {
  static defaultProps = {
    title: '',
    data: LIST_EMPTY
  }

  index = -1
  leftHeight = 0
  rightHeight = 0
  left = []
  right = []

  render() {
    const { className, title, data } = this.props

    // 缓存每次的计算
    const _data = data.list.slice()
    _data.forEach((item, index) => {
      if (index > this.index) {
        const currentHeight = Math.floor(
          (imageWidth / item.width) * item.height
        )
        if (this.leftHeight <= this.rightHeight) {
          this.leftHeight += currentHeight + infoHeight
          this.left.push({
            ...item,
            height: currentHeight
          })
        } else {
          this.rightHeight += currentHeight + infoHeight
          this.right.push({
            ...item,
            height: currentHeight
          })
        }
      }
    })
    this.index = _data.length - 1

    return (
      <View className={classNames(cls, 'layout-wind', className)}>
        {!!title && <SectionTitle>{title}</SectionTitle>}
        <View className='flex flex-align-start mt-30'>
          <View className='flex-item' style={{ width: `${imageWidth}px` }}>
            {this.left.map(item => (
              <Item
                key={item.id}
                url={item.url}
                user={item.user}
                avatar={item.avatar}
                width={item.width}
                height={item.height}
                title={item.title}
                count={item.count}
              />
            ))}
          </View>
          <View
            className='flex-item'
            style={{
              width: `${imageWidth}px`,
              marginLeft: Taro.pxTransform(ENV.wind)
            }}
          >
            {this.right.map(item => (
              <Item
                key={item.id}
                url={item.url}
                user={item.user}
                avatar={item.avatar}
                width={item.width}
                height={item.height}
                title={item.title}
                count={item.count}
              />
            ))}
          </View>
        </View>
      </View>
    )
  }
}

export default observer(List)
