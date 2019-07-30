/*
 * @Author: czy0729
 * @Date: 2019-07-17 16:09:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 12:07:38
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import Iconfont from '@components/base/iconfont'
import './index.scss'

const cls = 'page-user__menu'
const DS = [
  {
    label: '图片视频',
    icon: 'star',
    url: '/pages/my-photos/index'
  },
  {
    label: '我的文章',
    icon: 'star',
    url: '/pages/my-article/index'
  },
  {
    label: '我的方案',
    icon: 'star'
  },
  {
    label: '草稿箱',
    icon: 'star'
  },
  {
    label: '我的收藏',
    icon: 'star',
    url: '/pages/my-favor/index'
  },
  {
    label: '浏览历史',
    icon: 'star'
  },
  {
    label: '我的关注',
    icon: 'star'
  },
  {
    label: '我的评论',
    icon: 'star'
  }
]

const Menu = ({ className }) => {
  return (
    <View className={classNames(cls, 'flex', 'flex-wrap', className)}>
      {DS.map(item => (
        <View
          key={item.label}
          className={`${cls}__item flex flex-column`}
          onClick={() => {
            if (item.url) {
              Taro.navigateTo({
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
