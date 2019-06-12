/*
 * @Author: czy0729
 * @Date: 2019-06-11 14:03:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-12 14:11:16
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { SectionTitle, Img, Btn } from '@components'
import './index.scss'

const cls = 'page-index__recommend'
const DS = [
  {
    user: '徐老师',
    sign: '首席设计师@云知光',
    tip: '1.2万粉丝，20笔记',
    avatar: require('../../../assets/pages/index/21.png'),
    preview: [
      {
        id: 1,
        src: require('../../../assets/pages/index/31.png')
      },
      {
        id: 2,
        src: require('../../../assets/pages/index/31.png')
      },
      {
        id: 3,
        src: require('../../../assets/pages/index/31.png')
      }
    ]
  },
  {
    user: '本空设计',
    sign: '照明设计工作室',
    tip: '0.8万粉丝，35笔记',
    avatar: require('../../../assets/pages/index/22.png'),
    preview: [
      {
        id: 1,
        src: require('../../../assets/pages/index/31.png')
      },
      {
        id: 2,
        src: require('../../../assets/pages/index/31.png')
      },
      {
        id: 3,
        src: require('../../../assets/pages/index/31.png')
      }
    ]
  }
]

const Recommend = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='layout-wind'>
        <SectionTitle rightText='换一批'>设计师推荐</SectionTitle>
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
            <View className='flex'>
              <View className='flex-item'>
                <Text className='t-22 t-sub'>{item.tip}</Text>
              </View>
              <Btn
                type='main'
                text='关注'
                size='mini'
                styles={{
                  width: Taro.pxTransform(84),
                  height: Taro.pxTransform(42),
                  borderRadius: Taro.pxTransform(42)
                }}
              />
            </View>
            <View className='flex mt-sm'>
              <Img
                src={item.avatar}
                width={66}
                style={{
                  borderRadius: Taro.pxTransform(66),
                  overflow: 'hidden'
                }}
              />
              <View className='flex-item ml-sm'>
                <View>
                  <Text className='t-24'>{item.user}</Text>
                </View>
                <View>
                  <Text className='t-22 t-sub'>{item.sign}</Text>
                </View>
              </View>
            </View>
            <View className='flex flex-justify-between mt-sm'>
              {item.preview.map(i => (
                <Img key={i.id} src={i.src} width={110} radius />
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
