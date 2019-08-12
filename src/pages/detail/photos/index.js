/*
 * @Author: czy0729
 * @Date: 2019-08-09 17:58:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-12 14:23:29
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import Component from '@components/component'
import CImage from '@base/c-image'
import { transform } from '@utils/style'
import { screenWidth } from '@constants/style'
import { rootCls } from '../ds'
import './index.scss'

const cls = `${rootCls}__photos`
const itemHeight = screenWidth * 1.216

@observer
class Photos extends Component {
  static defaultProps = {
    className: '',
    current: 0,
    data: [],
    onChange: Function.prototype
  }

  state = {
    files: [],
    index: 0
  }

  componentDidMount() {
    const { data, current } = this.props
    const files = data.map(item => {
      const { width, height } = item
      let _width
      let _height
      if (height > width) {
        _width = (width / height) * itemHeight
        _height = itemHeight
      } else {
        _width = screenWidth
        _height = (screenWidth / width) * height
      }
      return {
        url: item.url,
        width: _width,
        height: _height,
        tags: item.tags
      }
    })
    this.setState({
      files,
      index: current
    })
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

  onImageClick = index => {
    const { files } = this.state
    Taro.previewImage({
      urls: files.map(item => item.url),
      current: files[index].url
    })
  }

  render() {
    const { className, current } = this.props
    const { index, files } = this.state
    return (
      <View className={classNames(cls, className)}>
        <Swiper
          style={{
            height: transform(itemHeight)
          }}
          circular
          indicatorDots={false}
          autoplay={false}
          current={current}
          onChange={this.onChange}
        >
          {files.map((item, idx) => (
            <SwiperItem key={item.url} className={`${cls}__item`}>
              <View
                className={`${cls}__image-wrap`}
                style={{
                  width: transform(item.width),
                  height: transform(item.height)
                }}
              >
                <CImage
                  mode='aspectFit'
                  src={item.url}
                  width={item.width}
                  height={item.height}
                  onClick={() => this.onImageClick(idx)}
                />
                {item.tags.map(i => (
                  <View
                    key={i.id}
                    className={classNames(`${cls}__tag`, {
                      [`${cls}__tag--reverse`]: i.reverse
                    })}
                    style={{
                      top: `${i.top * 100}%`,
                      left: `${i.left * 100}%`
                    }}
                  >
                    <View className={`${cls}__tag-dot`} />
                    <View className={`${cls}__tag-angle`} />
                    <Text className={`${cls}__tag-text t-24 l-40 t-plain`}>
                      {i.name}
                    </Text>
                  </View>
                ))}
              </View>
            </SwiperItem>
          ))}
        </Swiper>
        {!!files.length && (
          <View className={`${cls}__text t-shadow`}>
            <Text className='t-28 l-40 t-plain'>
              {index + 1} / {files.length}
            </Text>
          </View>
        )}
      </View>
    )
  }
}

export default Photos
