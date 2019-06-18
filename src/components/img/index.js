/*
 * @Author: czy0729
 * @Date: 2019-06-11 11:26:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 09:47:43
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Component from '@components/component'
import { transform } from '@utils/style'
import { radiusXs, radiusSm } from '@constants/style'
import './index.scss'

const cls = 'c-img'

export default class Img extends Component {
  static defaultProps = {
    className: '',
    styles: null,
    src: '',
    mode: 'aspectFill',
    width: null,
    height: null,
    round: false,
    radius: null,
    onClick: Function.prototype
  }

  render() {
    const {
      className,
      style,
      src,
      mode,
      width,
      height,
      round,
      radius,
      onClick
    } = this.props
    const _style = {
      width: transform(width),
      height: transform(height || width)
    }
    if (process.env.TARO_ENV === 'h5') {
      _style.backgroundImage = `url(${src})`
    }

    if (round) {
      _style.borderRadius = Taro.pxTransform(width)
    }
    if (radius) {
      if (radius === 'sm') {
        _style.borderRadius = Taro.pxTransform(radiusSm)
      } else {
        _style.borderRadius = Taro.pxTransform(radiusXs)
      }
    }

    return (
      <View
        className={classNames(cls, className)}
        style={{
          ..._style,
          ...style
        }}
        onClick={onClick}
      >
        <Image
          className={classNames({
            [`${cls}--h5`]: process.env.TARO_ENV === 'h5'
          })}
          src={src}
          mode={mode}
          style={_style}
          lazyLoad
        />
      </View>
    )
  }
}
