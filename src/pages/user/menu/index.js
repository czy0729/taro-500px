/*
 * @Author: czy0729
 * @Date: 2019-07-17 16:09:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 16:23:21
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import { push } from '@utils'
import Iconfont from '@components/base/iconfont'
import { rootCls, menuDS } from '../ds'
import './index.scss'

const cls = `${rootCls}__menu`

const Menu = ({ className }) => {
  return (
    <View className={classNames(cls, 'flex flex-wrap', className)}>
      {menuDS.map(item => (
        <View
          key={item.label}
          className={`${cls}__item flex flex-column`}
          onClick={() => {
            if (item.url) {
              push({
                url: item.url
              })
            }
          }}
        >
          <Iconfont className='t-44 t-main' name={item.icon} />
          <Text className='t-24 l-32 t-desc t-c mt-16'>{item.label}</Text>
        </View>
      ))}
    </View>
  )
}

Menu.defaultProps = {
  className: ''
}

Menu.options = {
  addGlobalClass: true
}

export default observer(Menu)
