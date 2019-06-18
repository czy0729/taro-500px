/*
 * @Author: czy0729
 * @Date: 2019-06-11 10:23:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 11:22:13
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { SectionTitle, CImage } from '@components'
import './index.scss'

const cls = 'page-index__collect'
const DS = [
  {
    title: '客厅无主灯',
    image: require('../../../assets/pages/index/11.png')
  },
  {
    title: '镜前灯怎么选',
    image: require('../../../assets/pages/index/12.png')
  },
  {
    title: '开放式厨房灯',
    image: require('../../../assets/pages/index/13.png')
  }
]

const Collect = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='layout-wind'>
        <SectionTitle text='更多征集' icon='angle-right'>
          正在征集
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
            <CImage
              width={Taro.pxTransform(270)}
              height={Taro.pxTransform(180)}
              src={item.image}
            />
            <View className={`${cls}__mask flex flex-justify-center`}>
              <Text className='t-plain t-30 l-50'>{item.title}</Text>
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
