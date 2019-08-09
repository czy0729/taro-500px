/*
 * @Author: czy0729
 * @Date: 2019-07-19 11:08:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 15:40:30
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import CImage from '@base/c-image'
import { push } from '@utils'
import { LIST_EMPTY } from '@constants'

const cls = 'page-my-favor__list'

const List = ({ className, data }) => {
  return (
    <View className={classNames(cls, 'layout-wind', className)}>
      {data.list.map((item, index) => (
        <View
          key={item.id}
          className={classNames('flex', {
            'mt-32': !!index
          })}
          onClick={() => push('/pages/favor-detail/index')}
        >
          <CImage src={item.thumb} width={Taro.pxTransform(160)} radius='sm' />
          <View className='flex-1 ml-24'>
            <Text className='t-30 l-48 t-title'>{item.title}</Text>
            <Text className='t-24 l-32 t-sub mt-8'>
              共{item.total}个 {item.recent === 1 ? '最近使用' : ''}
            </Text>
          </View>
        </View>
      ))}
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
