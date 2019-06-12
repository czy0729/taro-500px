/*
 * @Author: czy0729
 * @Date: 2019-06-11 16:15:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-12 10:28:08
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { SectionTitle } from '@components'
import { ENV, LIST_EMPTY } from '@constants'
import Item from './item'
import './index.scss'

const cls = 'page-index__list'
const imageWidth = (ENV.screenWidth - ENV.wind * 3 * ENV.pxRatio) / 2
const infoHeight = 40

const List = ({ className, data }) => {
  let leftHeight = 0
  let rightHeight = 0
  const left = []
  const right = []
  data.list.slice().forEach(item => {
    const currentHeight = Math.floor((imageWidth / item.width) * item.height)
    if (leftHeight - rightHeight <= 1) {
      leftHeight += currentHeight + infoHeight
      left.push({
        ...item,
        height: currentHeight
      })
    } else {
      rightHeight += currentHeight + infoHeight
      right.push({
        ...item,
        height: currentHeight
      })
    }
  })

  return (
    <View className={classNames(cls, 'layout-wind', className)}>
      <SectionTitle>随心看</SectionTitle>
      <View className={`${cls}__flow flex flex-align-start`}>
        <View className='flex-item'>
          {left.map(item => (
            <Item
              key={item.id}
              url={item.url}
              user={item.user}
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
            marginLeft: Taro.pxTransform(ENV.wind)
          }}
        >
          {right.map(item => (
            <Item
              key={item.id}
              url={item.url}
              user={item.user}
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

List.options = {
  addGlobalClass: true
}

List.defaultProps = {
  data: LIST_EMPTY
}

export default observer(List)
