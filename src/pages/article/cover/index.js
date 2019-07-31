/*
 * @Author: czy0729
 * @Date: 2019-06-24 13:58:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-31 09:52:40
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import CImage from '@base/c-image'
import { transform } from '@utils/style'
import { screenWidth } from '@constants/style'
import { rootCls } from '../ds'

const cls = `${rootCls}__cover`
const height = screenWidth * 0.66667

const Cover = ({ className, cover, src }) => {
  return (
    <View
      className={classNames(cls, className)}
      style={{
        height: transform(height)
      }}
    >
      <CImage
        className={`${cls}__placeholder`}
        src={cover}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0
        }}
      />
      <CImage
        className={`${cls}__cover`}
        src={src}
        height={height}
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 0,
          right: 0,
          left: 0
        }}
      />
    </View>
  )
}

Cover.defaultProps = {
  className: '',
  cover: '',
  src: ''
}

Cover.options = {
  addGlobalClass: true
}

export default observer(Cover)
