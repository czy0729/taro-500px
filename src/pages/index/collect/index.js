/*
 * @Author: czy0729
 * @Date: 2019-06-11 10:23:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 16:48:31
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import CImage from '@base/c-image'
import SectionTitle from '@base/section-title'
import { push } from '@utils'
import { rootCls, collectDS } from '../ds'
import './index.scss'

const cls = `${rootCls}__collect`

const Collect = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='layout-wind'>
        <SectionTitle desc='正在征集' text='更多征集' icon='angle-right' />
      </View>
      <ScrollView className={`${cls}__scroll-view`} scrollX>
        {collectDS.map((item, index) => (
          <View
            key={item.title}
            className={classNames(`${cls}__item`, {
              [`${cls}__item--first`]: index === 0,
              [`${cls}__item--last`]: index === collectDS.length - 1,
              'ml-16': !!index
            })}
            onClick={() => push('')}
          >
            <CImage
              width={Taro.pxTransform(270)}
              height={Taro.pxTransform(180)}
              src={item.image}
              radius='sm'
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
