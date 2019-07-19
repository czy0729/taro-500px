/*
 * @Author: czy0729
 * @Date: 2019-07-18 14:16:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-18 15:06:39
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import Component from '@components/component'
import { transform } from '@utils/style'
import { ENV, LIST_EMPTY } from '@constants'
import CImage from '../../img'
import Iconfont from '../../iconfont'
import './index.scss'

const cls = 'c-app-article-list'
const imageWidth = (ENV.screenWidth - (ENV.wind * 2 + 16) * ENV.pxRatio) / 2
const imageHeight = imageWidth * 0.668

class ArticleList extends Component {
  static defaultProps = {
    title: '',
    data: LIST_EMPTY
  }

  render() {
    const { className, data } = this.props

    return (
      <View className={classNames(cls, 'flex flex-wrap', className)}>
        {data.list.map((item, index) => (
          <View
            key={item.id}
            className={classNames(`${cls}__item`, {
              'mt-32': index >= 2,
              'ml-16': index % 2 !== 0
            })}
            style={{
              width: transform(imageWidth)
            }}
          >
            <CImage
              radius='sm'
              width={imageWidth}
              height={imageHeight}
              src={item.thumb}
            />
            <Text className='t-28 l-44 t-title t-c2 mt-16'>{item.title}</Text>
            <View className='flex mt-8'>
              <View className='flex-1'>
                <Text className='t-24 l-32 t-sub'>{item.time}</Text>
              </View>
              <View className='flex'>
                <Iconfont className='t-24 t-sub' name='star' />
                <Text className='t-24 l-32 t-sub ml-4'>{item.like}</Text>
                <Iconfont className='t-24 t-sub ml-16' name='star' />
                <Text className='t-24 l-32 t-sub ml-4 mr-16'>{item.favor}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default observer(ArticleList)
