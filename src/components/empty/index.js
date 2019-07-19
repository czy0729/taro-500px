/*
 * @Author: czy0729
 * @Date: 2019-07-19 16:50:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 17:05:22
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import image1 from '../../assets/components/empty/01.jpg'
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
      <CImage src={image1} width={Taro.pxTransform(280)} />
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
