/*
 * @Author: czy0729
 * @Date: 2019-07-25 09:44:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 12:03:52
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import Iconfont from '@base/iconfont'
import './index.scss'

const cls = 'c-app-video-mask'

const VideoMask = ({ className, style, onClick }) => {
  return (
    <View
      className={classNames(cls, className)}
      style={style}
      onClick={onClick}
    >
      {this.props.children}
      <View className={`${cls}__mask flex flex-justify-center`}>
        <Iconfont className='t-48 t-plain' name='play' />
      </View>
    </View>
  )
}

VideoMask.defaultProps = {
  className: '',
  style: {},
  onClick: Function.prototype
}

VideoMask.options = {
  addGlobalClass: true
}

export default observer(VideoMask)
