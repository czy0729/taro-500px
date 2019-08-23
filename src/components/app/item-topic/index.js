/*
 * @Author: czy0729
 * @Date: 2019-08-23 14:56:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-23 15:24:50
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import CImage from '@base/c-image'
import './index.scss'

const cls = 'c-app-item-topic'

function ItemTopic(props) {
  const { className, title, image, anwser, follow, border, onClick } = props
  return (
    <View
      key={title}
      className={classNames(
        `${cls} flex`,
        {
          [`${cls}--border`]: border
        },
        className
      )}
      onClick={() => onClick(props)}
    >
      <CImage src={image} width={Taro.pxTransform(88)} radius />
      <View className='ml-16'>
        <Text className='t-28 l-32 t-desc t-c1'>{title}</Text>
        <View className='flex mt-16'>
          <Text className='t-20 l-24 t-sub'>回答 {anwser}</Text>
          <Text className='t-20 l-24 t-sub ml-32'>关注 {follow}</Text>
        </View>
      </View>
    </View>
  )
}

ItemTopic.defaultProps = {
  className: '',
  title: '',
  image: '',
  anwser: '',
  follow: '',
  border: false,
  onClick: Function.prototype
}

ItemTopic.options = {
  addGlobalClass: true
}

export default observer(ItemTopic)
