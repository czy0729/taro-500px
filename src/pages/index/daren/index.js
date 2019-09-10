/*
 * @Author: czy0729
 * @Date: 2019-06-11 15:56:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-10 10:28:33
 */
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import SectionTitle from '@base/section-title'
import CImage from '@base/c-image'
import CButton from '@base/c-button'
import { c, push } from '@utils'
import { rootCls, darenDS } from '../ds'
import './index.scss'

const cls = `${rootCls}__daren`

function Collect({ className }) {
  return (
    <View className={c(cls, className)}>
      <View className='layout-wind'>
        <SectionTitle desc='达人推荐' text='更多达人' icon='angle-right' />
      </View>
      <ScrollView className={`${cls}__scroll-view`} scrollX>
        {darenDS.map((item, index) => (
          <View
            key={item.title}
            className={c({
              [`${cls}__item`]: true,
              [`${cls}__item--first`]: index === 0,
              [`${cls}__item--last`]: index === darenDS.length - 1,
              'ml-16': !!index
            })}
            onClick={() => push('')}
          >
            <View className='flex flex-column'>
              <View className={`${cls}__avatar`}>
                <CImage width={96} src={item.avatar} />
              </View>
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
