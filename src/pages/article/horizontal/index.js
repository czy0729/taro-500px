/*
 * @Author: czy0729
 * @Date: 2019-06-19 15:14:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-22 15:03:19
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { SectionTitle, CImage } from '@components'
import './index.scss'

const cls = 'page-article__horizontal'
const width = 472
const height = width * 0.56

const Horizontal = ({ className, desc, data }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='layout-wind'>
        <SectionTitle desc={desc} text='查看全部' icon='angle-right' />
      </View>
      <ScrollView className={`${cls}__scroll-view`} scrollX>
        {data
          .filter((item, index) => !!index)
          .map((item, index) => (
            <View
              key={item.user}
              className={classNames(`${cls}__item`, {
                [`${cls}__item--first`]: index === 0,
                [`${cls}__item--last`]: index === data.length - 1,
                'ml-16': !!index
              })}
            >
              <CImage
                src={`${item}!p5`}
                width={Taro.pxTransform(width)}
                height={Taro.pxTransform(height)}
              />
              <Text className={`${cls}__tag t-20 l-28 t-title`}>三室 95平米</Text>
              <View className={`${cls}__info`}>
                <Text className='t-30 l-40 t-title t-c1'>
                  欧美无主灯装修风格怎么做
                </Text>
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
