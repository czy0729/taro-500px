/*
 * @Author: czy0729
 * @Date: 2019-07-17 14:27:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-10 11:06:55
 */
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import CImage from '@base/c-image'
import Iconfont from '@base/iconfont'
import { c, push } from '@utils'
import image11 from '@assets/pages/index/11.png'
import { rootCls } from '../ds'
import './index.scss'

const cls = `${rootCls}__header`

function Header({ className }) {
  return (
    <View className={c(cls, className)}>
      <View className={`${cls}__header`} />
      <View>
        <View className='flex mt-32' onClick={() => push('/pages/zone/index')}>
          <View className={`${cls}__avatar`}>
            <CImage src={image11} width={136} />
          </View>
          <View className='flex-1 ml-16'>
            <Text className='t-44 l-56 t-plain t-b'>云友_本空设计</Text>
            <Text className='t-24 l-40 t-plain mt-8'>照明设计师@设计工场</Text>
          </View>
          <Iconfont className='t-36 t-plain' name='angle-right' />
        </View>
        <View className='flex mt-48'>
          <View className='flex-1' onClick={() => push('')}>
            <Text className='t-40 l-48 t-plain t-b t-c'>128</Text>
            <Text className={`${cls}__extra t-24 l-32 t-c mt-8`}>云币</Text>
          </View>
          <View className={`${cls}__split`} />
          <View className='flex-1' onClick={() => push('/pages/fans/index')}>
            <Text className='t-40 l-48 t-plain t-b t-c'>20</Text>
            <Text className={`${cls}__extra t-24 l-32 t-c mt-8`}>粉丝</Text>
          </View>
          <View className={`${cls}__split`} />
          <View className='flex-1' onClick={() => push('/pages/follow/index')}>
            <Text className='t-40 l-48 t-plain t-b t-c'>20</Text>
            <Text className={`${cls}__extra t-24 l-32 t-c mt-8`}>关注</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

Header.defaultProps = {
  className: ''
}

Header.options = {
  addGlobalClass: true
}

export default observer(Header)
