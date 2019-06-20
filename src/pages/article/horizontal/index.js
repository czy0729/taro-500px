/*
 * @Author: czy0729
 * @Date: 2019-06-19 15:14:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-19 15:35:34
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { SectionTitle, CImage, Btn } from '@components'
import './index.scss'

const cls = 'page-article__horizontal'

const Horizontal = ({ className, desc, data }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='layout-wind'>
        <SectionTitle desc={desc} />
      </View>
      <ScrollView className={`${cls}__scroll-view mt-30`} scrollX>
        {data.map((item, index) => (
          <View
            key={item.user}
            className={classNames({
              [`${cls}__item`]: true,
              [`${cls}__item--first`]: index === 0,
              [`${cls}__item--last`]: index === DS.length - 1,
              'ml-20': !!index
            })}
          >
            <View className='flex'>
              <View className='flex-item'>
                <Text className='t-28 l-50 t-sub t-c1'>{item.tip}</Text>
              </View>
              <Btn className='ml-sm' type='main' text='关注' size='mini' />
            </View>
            <View className='flex mt-24'>
              <CImage
                src={item.avatar}
                width={Taro.pxTransform(92)}
                style={{
                  borderRadius: Taro.pxTransform(92),
                  overflow: 'hidden'
                }}
              />
              <View className='flex-item ml-28'>
                <View>
                  <Text className='t-30 l-52 t-desc t-c1'>{item.user}</Text>
                </View>
                <View>
                  <Text className='t-28 l-40 t-sub t-c1'>{item.sign}</Text>
                </View>
              </View>
            </View>
            <View className='flex mt-24'>
              {item.preview.map((i, idx) => (
                <CImage
                  key={i.id}
                  className={classNames({
                    'ml-20': !!idx
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

Horizontal.defaultProps = {
  className: '',
  desc: '',
  data: []
}

Horizontal.options = {
  addGlobalClass: true
}

export default observer(Horizontal)
