/*
 * @Author: czy0729
 * @Date: 2019-06-19 15:14:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-24 10:46:27
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { SectionTitle, CImage } from '@components'
import './index.scss'

const cls = 'page-article__horizontal'
const width = 460
const height = width * 0.46

const Horizontal = ({ className, nickName, avatar, desc, data }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='layout-wind'>
        <SectionTitle desc={desc} />
      </View>
      <ScrollView className={`${cls}__scroll-view mt-30`} scrollX>
        {data
          .filter((item, index) => !!index)
          .map((item, index) => (
            <View
              key={item.user}
              className={classNames({
                [`${cls}__item`]: true,
                [`${cls}__item--first`]: index === 0,
                [`${cls}__item--last`]: index === data.length - 1,
                'ml-20': !!index
              })}
            >
              <CImage
                src={`${item}!p5`}
                width={Taro.pxTransform(width)}
                height={Taro.pxTransform(height)}
              />
              <View className={`${cls}__info`}>
                <Text className='t-32 l-44 t-desc t-b'>标题</Text>
                <View className='flex mt-20'>
                  <CImage
                    src={`${avatar}!p5`}
                    width={Taro.pxTransform(48)}
                    style={{
                      borderRadius: Taro.pxTransform(48),
                      overflow: 'hidden'
                    }}
                  />
                  <View className='flex-1 ml-16'>
                    <Text className='t-28 t-desc'>{nickName}</Text>
                  </View>
                  <Text className='t-28 t-sub'>三室 95平米</Text>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  )
}

Horizontal.defaultProps = {
  className: '',
  nickName: '',
  avatar: '',
  desc: '',
  data: []
}

Horizontal.options = {
  addGlobalClass: true
}

export default observer(Horizontal)
