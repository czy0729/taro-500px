/*
 * @Author: czy0729
 * @Date: 2019-07-17 17:17:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 12:07:26
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import ListItem from '@components/base/list-item'
import { push } from '@utils'

const cls = 'page-user__list'
const DS = [
  {
    label: '我的装修信息'
  },
  {
    label: '设计师/品牌入驻'
  },
  {
    label: '我的云币'
  },
  {
    label: '向朋友推荐云知光'
  },
  {
    label: '帮助与反馈'
  },
  {
    label: '加入我们'
  },
  {
    label: '设置',
    url: '/pages/setting/index'
  }
]

const List = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      {DS.map(item => (
        <ListItem
          key={item.label}
          text={item.label}
          onClick={() => {
            if (item.url) {
              push(item.url)
            }
          }}
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
