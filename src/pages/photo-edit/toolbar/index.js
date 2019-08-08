/*
 * @Author: czy0729
 * @Date: 2019-08-08 14:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-08 15:30:31
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import CImage from '@base/c-image'
import Iconfont from '@base/iconfont'
import imageNext from '@assets/common/next.png'
import { rootCls } from '../ds'
import './index.scss'

const cls = `${rootCls}__toolbar`

function Toolbar({ className, onShowCut, onNext }) {
  return (
    <View className={classNames(cls, 'flex', className)}>
      <View className='flex flex-column flex-1' onClick={onShowCut}>
        <View className={`${cls}__item flex flex-column`}>
          <Iconfont className='t-48 t-plain t-shadow' name='cut' />
          <Text className='t-26 l-48 t-default t-c t-shadow mt-8'>裁剪</Text>
        </View>
      </View>
      <View className='flex flex-column flex-1'>
        <View className={`${cls}__item flex flex-column`}>
          <Iconfont className='t-48 t-plain t-shadow' name='tag' />
          <Text className='t-26 l-48 t-default t-c t-shadow mt-8'>标签</Text>
        </View>
      </View>
      <View className='flex flex-column flex-1' onClick={onNext}>
        <View className={`${cls}__item flex flex-column`}>
          <CImage
            src={imageNext}
            width={Taro.pxTransform(48)}
            mode='aspectFit'
          />
          <Text className='t-26 l-48 t-default t-c t-shadow mt-8'>下一步</Text>
        </View>
      </View>
    </View>
  )
}

Toolbar.defaultProps = {
  className: '',
  onShowCut: Function.prototype,
  onNext: Function.prototype
}

Toolbar.options = {
  addGlobalClass: true
}

export default observer(Toolbar)
