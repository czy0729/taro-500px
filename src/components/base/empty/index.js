/*
 * @Author: czy0729
 * @Date: 2019-07-19 16:50:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 11:50:32
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import imgEmpty from '@assets/components/empty/01.jpg'
import CImage from '../img'
import './index.scss'

const cls = 'c-empty'

const Empty = ({ className, text }) => {
  return (
    <View
      className={classNames(
        cls,
        'flex flex-justify-center flex-column',
        className
      )}
    >
      <CImage src={imgEmpty} width={Taro.pxTransform(280)} />
      {!!text && <Text className='t-26 l-40 t-sub mt-8'>{text}</Text>}
    </View>
  )
}

Empty.defaultProps = {
  className: '',
  text: ''
}

Empty.options = {
  addGlobalClass: true
}

export default Empty
