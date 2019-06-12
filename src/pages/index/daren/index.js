/*
 * @Author: czy0729
 * @Date: 2019-06-11 15:56:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-11 21:43:15
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { SectionTitle, Img, Btn } from '@components'
import './index.scss'

const cls = 'page-index__daren'
const DS = [
  {
    user: '本空设计',
    tip: '38万粉丝，185笔记',
    avatar: require('../../../assets/pages/index/41.png')
  },
  {
    user: '上海小梧桐',
    tip: '1.3万粉丝，219笔记',
    avatar: require('../../../assets/pages/index/42.png')
  },
  {
    user: '北欧君',
    tip: '51万粉丝，99笔记',
    avatar: require('../../../assets/pages/index/43.png')
  }
]

const Collect = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='layout-wind'>
        <SectionTitle rightText='更多达人'>达人推荐</SectionTitle>
      </View>
      <ScrollView className={`${cls}__scroll-view`} scrollX>
        {DS.map((item, index) => (
          <View
            key={item.title}
            className={classNames(`${cls}__item`, {
              [`${cls}__item--first`]: index === 0,
              [`${cls}__item--last`]: index === DS.length - 1
            })}
          >
            <View className='flex flex-column'>
              <Img
                width={104}
                src={item.avatar}
                style={{
                  borderRadius: Taro.pxTransform(104),
                  overflow: 'hidden'
                }}
              />
              <Text className='t-26 t-desc t-b mt-sm'>{item.user}</Text>
              <Text className='t-20 t-sub mt-xs'>{item.tip}</Text>
              <Btn
                className='mt-sm'
                type='main'
                text='关注'
                size='mini'
                styles={{
                  width: Taro.pxTransform(146),
                  height: Taro.pxTransform(42),
                  borderRadius: Taro.pxTransform(42)
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

Collect.options = {
  addGlobalClass: true
}

export default observer(Collect)
