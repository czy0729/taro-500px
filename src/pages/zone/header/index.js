/*
 * @Author: czy0729
 * @Date: 2019-07-17 14:27:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 16:54:57
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import CImage from '@base/c-image'
import CButton from '@base/c-button'
import { push } from '@utils'
import './index.scss'

const cls = 'page-zone__header'
const DS = [
  {
    label: '云币',
    value: 128
  },
  {
    label: '粉丝',
    value: 20
  },
  {
    label: '关注',
    value: 20
  }
]

const Header = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className={`${cls}__header flex flex-justify-center`}>
        <Text className='t-34 l-68 t-plain t-c'>云友_本空设计</Text>
      </View>
      <View className='flex mt-32'>
        <CImage
          src={require('../../../assets/pages/index/11.png')}
          width={Taro.pxTransform(160)}
          style={{
            border: '2px solid #fff',
            borderRadius: Taro.pxTransform(160),
            overflow: 'hidden'
          }}
        />
        <View className='flex-1 ml-56'>
          <View className='flex'>
            {DS.map(item => (
              <View key={item.label} className='flex-1'>
                <Text className='t-32 l-40 t-plain t-b t-c'>{item.value}</Text>
                <Text className='t-22 l-40 t-plain t-c'>{item.label}</Text>
              </View>
            ))}
          </View>
          <View className='flex mt-16'>
            <View className='flex-1'>
              <CButton
                ghost
                size='mini'
                text='编辑个人资料'
                onClick={() => push('/pages/my-info/index')}
              />
            </View>
            <View className='flex-1 ml-32'>
              <CButton
                ghost
                size='mini'
                text='更改封面'
                onClick={() => push('')}
              />
            </View>
          </View>
        </View>
      </View>
      <View className='mt-48'>
        <Text className='t-22 l-32 t-plain'>半小时前来过 | 广州</Text>
        <Text className='t-28 l-40 t-plain mt-8'>追求人居中光环境</Text>
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
