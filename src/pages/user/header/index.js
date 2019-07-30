/*
 * @Author: czy0729
 * @Date: 2019-07-17 14:27:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 12:07:10
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import CImage from '@components/base/c-image'
import Iconfont from '@components/base/iconfont'
import { push } from '@utils'
import './index.scss'

const cls = 'page-user__header'

const Header = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className={`${cls}__header`} />
      <View onClick={() => push('/pages/zone/index')}>
        <View className='flex mt-32'>
          <CImage
            src={require('../../../assets/pages/index/11.png')}
            width={Taro.pxTransform(136)}
            style={{
              border: '2px solid #fff',
              borderRadius: Taro.pxTransform(136),
              overflow: 'hidden'
            }}
          />
          <View className='flex-1 ml-16'>
            <Text className='t-44 l-56 t-plain t-b'>云友_本空设计</Text>
            <Text className='t-24 l-40 t-plain mt-8'>照明设计师@设计工场</Text>
          </View>
          <Iconfont className='t-36 t-plain' name='angle-right' />
        </View>
        <View className='flex mt-48'>
          <View className='flex-1'>
            <Text className='t-40 l-48 t-plain t-b t-c'>128</Text>
            <Text className='t-24 l-32 t-plain t-c mt-8'>云币</Text>
          </View>
          <View className={`${cls}__split`} />
          <View
            className='flex-1'
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/fans/index'
              })
            }}
          >
            <Text className='t-40 l-48 t-plain t-b t-c'>20</Text>
            <Text className='t-24 l-32 t-plain t-c mt-8'>粉丝</Text>
          </View>
          <View className={`${cls}__split`} />
          <View
            className='flex-1'
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/follow/index'
              })
            }}
          >
            <Text className='t-40 l-48 t-plain t-b t-c'>20</Text>
            <Text className='t-24 l-32 t-plain t-c mt-8'>关注</Text>
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
