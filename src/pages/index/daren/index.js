/*
 * @Author: czy0729
 * @Date: 2019-06-11 15:56:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-18 15:40:52
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { SectionTitle, CImage, CButton } from '@components'
import './index.scss'

const cls = 'page-index__daren'
const DS = [
  {
    user: '本空设计',
    tip: '138万粉丝，1856笔记',
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
      <ScrollView className={`${cls}__scroll-view`} scrollX>
        {DS.map((item, index) => (
          <View
            key={item.title}
            className={classNames({
              [`${cls}__item`]: true,
              [`${cls}__item--first`]: index === 0,
              [`${cls}__item--last`]: index === DS.length - 1,
              'ml-16': !!index
            })}
          >
            <View className='flex flex-column'>
              <CImage
                width={Taro.pxTransform(96)}
                src={item.avatar}
                style={{
                  borderRadius: Taro.pxTransform(96),
                  overflow: 'hidden'
                }}
              />
              <Text className='t-30 l-40 t-title t-b mt-24 t-c1'>
                {item.user}
              </Text>
              <Text className='t-24 l-32 t-sub mt-8 t-c1'>{item.tip}</Text>
              <CButton
                className='mt-24'
                type='danger'
                ghost
                text='关注'
                size='mini'
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
