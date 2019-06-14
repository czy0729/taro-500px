/*
 * @Author: czy0729
 * @Date: 2019-06-11 15:56:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-14 12:11:49
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
        <SectionTitle text='更多达人' icon='angle-right'>
          达人推荐
        </SectionTitle>
      </View>
      <ScrollView className={`${cls}__scroll-view mt-30`} scrollX>
        {DS.map((item, index) => (
          <View
            key={item.title}
            className={classNames({
              [`${cls}__item`]: true,
              [`${cls}__item--first`]: index === 0,
              [`${cls}__item--last`]: index === DS.length - 1,
              'ml-20': !!index
            })}
          >
            <View className='flex flex-column'>
              <Img
                width={92}
                src={item.avatar}
                style={{
                  borderRadius: Taro.pxTransform(92),
                  overflow: 'hidden'
                }}
              />
              <Text className='t-30 l-36 t-desc t-b mt-20 t-c1'>
                {item.user}
              </Text>
              <Text className='t-28 l-32 t-sub mt-12 t-c1'>{item.tip}</Text>
              <Btn className='mt-20' type='main' text='关注' size='mini' />
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
