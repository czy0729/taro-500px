/*
 * @Author: czy0729
 * @Date: 2019-07-19 15:07:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 12:03:27
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import CImage from '@base/c-image'
import { transform } from '@utils/style'
import { ENV } from '@constants'

const cls = 'c-app-photos-grid'
const imageWidth = (ENV.screenWidth - (ENV.wind * 2 + 8 * 2) * ENV.pxRatio) / 3

const PhotosGrid = ({ className, data }) => {
  return (
    <View className={classNames(cls, 'layout-wind flex flex-wrap', className)}>
      {data.map((item, index) => (
        <CImage
          key={item.id}
          className={classNames({
            'ml-8': index % 3 !== 0,
            'mt-8': index >= 3
          })}
          src={item.thumb}
          width={transform(imageWidth)}
          radius='sm'
        />
      ))}
    </View>
  )
}

PhotosGrid.defaultProps = {
  className: '',
  data: []
}

PhotosGrid.options = {
  addGlobalClass: true
}

export default observer(PhotosGrid)
