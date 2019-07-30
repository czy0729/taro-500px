/*
 * @Author: czy0729
 * @Date: 2019-06-11 14:03:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 14:57:44
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import SectionTitle from '@components/base/section-title'
import CImage from '@components/base/c-image'
import CButton from '@components/base/c-button'
import { rootCls, recommendDS } from '../ds'
import './index.scss'

const cls = `${rootCls}__recommend`

const Recommend = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='layout-wind'>
        <SectionTitle desc='设计师推荐' text='换一批' icon='refresh' />
      </View>
      <ScrollView className={`${cls}__scroll-view`} scrollX>
        {recommendDS.map((item, index) => (
          <View
            key={item.user}
            className={classNames({
              [`${cls}__item`]: true,
              [`${cls}__item--first`]: index === 0,
              [`${cls}__item--last`]: index === recommendDS.length - 1,
              'ml-16': !!index
            })}
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
              <CImage
                src={item.avatar}
                width={Taro.pxTransform(72)}
                style={{
                  borderRadius: Taro.pxTransform(72),
                  overflow: 'hidden'
                }}
              />
              <View className='flex-1 ml-16'>
                <Text className='t-30 l-40 t-title t-c1'>{item.user}</Text>
                <Text className='t-24 l-32 t-sub t-c1'>{item.sign}</Text>
              </View>
            </View>
            <View className='flex mt-24'>
              {item.preview.map((i, idx) => (
                <CImage
                  key={i.id}
                  className={classNames({
                    'ml-16': !!idx
                  })}
                  src={i.src}
                  width={Taro.pxTransform(120)}
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
