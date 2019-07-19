/*
 * @Author: czy0729
 * @Date: 2019-07-19 15:42:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 15:49:04
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { transform } from '@utils/style'
import { ENV } from '@constants'
import CImage from '../../img'
import './index.scss'

const cls = 'c-app-videos-grid'
const imageWidth = (ENV.screenWidth - (ENV.wind * 2 + 8 * 2) * ENV.pxRatio) / 3

const VideosGrid = ({ className, data }) => {
  return (
    <View className={classNames(cls, 'layout-wind flex flex-wrap', className)}>
      {data.map((item, index) => (
        <View
          key={item.id}
          className={classNames(`${cls}__item`, {
            'ml-8': index % 3 !== 0,
            'mt-8': index >= 3
          })}
        >
          <CImage src={item.thumb} width={transform(imageWidth)} radius='sm' />
          <Text className={`${cls}__info t-24 t-plain t-r`}>{item.time}</Text>
        </View>
      ))}
    </View>
  )
}

VideosGrid.defaultProps = {
  className: '',
  data: []
}

VideosGrid.options = {
  addGlobalClass: true
}

export default observer(VideosGrid)
