/*
 * @Author: czy0729
 * @Doc: https://nervjs.github.io/taro/docs/components/viewContainer/swiper.html
 * @Date: 2019-06-17 15:07:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 17:37:09
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import Component from '@components/component'
import { ENV } from '@constants'
import { transform } from '@utils/style'
import CImage from '../img'
import './index.scss'

const cls = 'c-swiper'

export default class CSwiper extends Component {
  static defaultProps = {
    className: '',
    data: [],
    cover: '',
    width: ENV.screenWidth,
    height: ENV.screenWidth,
    indicatorDots: false,
    indicatorColor: '#999',
    indicatorActiveColor: '#333',
    autoplay: false,
    current: 0,
    onChange: Function.prototype
  }

  state = {
    index: this.props.current
  }

  onChange = evt => {
    const { onChange } = this.props
    const { detail } = evt
    const { current } = detail
    this.setState({
      index: current
    })
    onChange(current)
  }

  render() {
    const {
      className,
      data,
      cover,
      width,
      height,
      indicatorDots,
      indicatorColor,
      indicatorActiveColor,
      autoplay,
      current
    } = this.props
    const { index } = this.state
    return (
      <View className={classNames(cls, className)}>
        {!!cover && (
          <View className={`${cls}__cover`}>
            <CImage src={cover} width={width} height={height} />
          </View>
        )}
        <Swiper
          style={{
            height: transform(height)
          }}
          circular
          indicatorColor={indicatorColor}
          indicatorActiveColor={indicatorActiveColor}
          indicatorDots={indicatorDots}
          autoplay={autoplay}
          current={current}
          onChange={this.onChange}
        >
          {data.map(item => (
            <SwiperItem key={item}>
              <CImage src={item} width={width} height={height} />
            </SwiperItem>
          ))}
        </Swiper>
        {!!data.length && (
          <View className={`${cls}__text`}>
            <Text className='t-28 l-40 t-plain'>
              {index + 1} / {data.length}
            </Text>
          </View>
        )}
      </View>
    )
  }
}