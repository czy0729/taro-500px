/*
 * @Author: czy0729
 * @Date: 2019-06-11 16:15:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 14:50:31
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import Component from '@components/component'
import SectionTitle from '@components/base/section-title'
import { transform } from '@utils/style'
import { ENV, LIST_EMPTY } from '@constants'
import Item from './item'
import './index.scss'

const cls = 'c-app-masonry-list'
const imageWidth = (ENV.screenWidth - (ENV.wind * 2 + 16) * ENV.pxRatio) / 2
const infoHeight = 104 * ENV.pxRatio

class MasonryList extends Component {
  static defaultProps = {
    className: '',
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
      <View
        className={classNames(cls, className)}
        style={{
          minHeight: ENV.windowHeight
        }}
      >
        {!!title && <SectionTitle>{title}</SectionTitle>}
        <View className='flex flex-justify-between flex-align-start'>
          <View className='flex-item' style={{ width: transform(imageWidth) }}>
            {this.left.map(item => (
              <Item
                key={item.id}
                detailId={item.id}
                url={item.url}
                user={item.user}
                avatar={item.avatar}
                width={item.width}
                height={item.height}
                title={item.title}
                count={item.count}
                time={item.time}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/detail/index?id=${item.id}&cover=${
                      item.url
                    }&nickName=${item.user}&avatar=${item.avatar}`
                  })
                }}
              />
            ))}
          </View>
          <View
            className='flex-item'
            style={{
              width: transform(imageWidth),
              marginLeft: Taro.pxTransform(16)
            }}
          >
            {this.right.map(item => (
              <Item
                key={item.id}
                detailId={item.id}
                url={item.url}
                user={item.user}
                avatar={item.avatar}
                width={item.width}
                height={item.height}
                title={item.title}
                count={item.count}
                time={item.time}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/article/index?id=${item.id}&cover=${
                      item.url
                    }&nickName=${item.user}&avatar=${item.avatar}&title=${
                      item.title
                    }`
                  })
                }}
              />
            ))}
          </View>
        </View>
      </View>
    )
  }
}

export default observer(MasonryList)
