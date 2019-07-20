/*
 * @Author: czy0729
 * @Date: 2019-07-20 15:05:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-20 15:26:49
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import Iconfont from '../../iconfont'
import './index.scss'

const cls = 'c-app-btn-goods'

const BtnGoods = ({ className, onClick }) => {
  return (
    <View
      className={classNames(
        cls,
        'flex flex-column flex-justify-center',
        className
      )}
    >
      <View
        className={classNames(`${cls}__btn`, 'flex flex-justify-center')}
        onClick={onClick}
      >
        <Iconfont className='t-36 t-sub' name='good' />
      </View>
      <Text className='t-24 l-32 t-sub mt-16'>支持一下</Text>
    </View>
  )
}

BtnGoods.defaultProps = {
  className: '',
  onClick: Function.prototype
}

BtnGoods.options = {
  addGlobalClass: true
}

export default observer(BtnGoods)
