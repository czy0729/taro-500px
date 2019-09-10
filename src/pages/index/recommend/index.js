/*
 * @Author: czy0729
 * @Date: 2019-06-11 14:03:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-10 11:00:13
 */
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import SectionTitle from '@base/section-title'
import CImage from '@base/c-image'
import CButton from '@base/c-button'
import { c, push } from '@utils'
import { rootCls, recommendDS } from '../ds'
import './index.scss'

const cls = `${rootCls}__recommend`

function Recommend({ className }) {
  return (
    <View className={c(cls, className)}>
      <View className='layout-wind'>
        <SectionTitle desc='设计师推荐' text='换一批' icon='refresh' />
      </View>
      <ScrollView className={`${cls}__scroll-view`} scrollX>
        {recommendDS.map((item, index) => (
          <View
            key={item.user}
            className={c({
              [`${cls}__item`]: true,
              [`${cls}__item--first`]: index === 0,
              [`${cls}__item--last`]: index === recommendDS.length - 1,
              'ml-16': !!index
            })}
            onClick={() => push('')}
          >
            <View className='flex'>
              <View className='flex-1'>
                <Text className='t-24 l-48 t-sub t-c1'>{item.tip}</Text>
              </View>
              <CButton
                className='ml-16'
                type='danger'
                ghost
                text='关注'
                size='mini'
              />
            </View>
            <View className='flex mt-24'>
              <View className={`${cls}__avatar`}>
                <CImage src={item.avatar} width={72} />
              </View>
              <View className='flex-1 ml-16'>
                <Text className='t-30 l-40 t-title t-c1'>{item.user}</Text>
                <Text className='t-24 l-32 t-sub t-c1'>{item.sign}</Text>
              </View>
            </View>
            <View className='flex mt-24'>
              {item.preview.map((i, idx) => (
                <CImage
                  key={i.id}
                  className={c({
                    'ml-16': !!idx
                  })}
                  src={i.src}
                  width={120}
                  radius
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

Recommend.options = {
  addGlobalClass: true
}

export default observer(Recommend)
