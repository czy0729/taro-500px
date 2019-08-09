/*
 * @Author: czy0729
 * @Date: 2019-07-17 17:17:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 17:08:08
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import ListItem from '@base/list-item'
import { push } from '@utils'
import { rootCls, listDS } from '../ds'

const cls = `${rootCls}__list`

const List = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      {listDS.map(item => (
        <ListItem
          key={item.label}
          text={item.label}
          onClick={() => push(item.url)}
        />
      ))}
    </View>
  )
}

List.defaultProps = {
  className: ''
}

List.options = {
  addGlobalClass: true
}

export default observer(List)
