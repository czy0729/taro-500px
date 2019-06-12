/*
 * @Author: czy0729
 * @Date: 2019-06-11 11:26:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-11 17:58:53
 */
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-img'

export default class Img extends Component {
  static propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    src: PropTypes.string,
    mode: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    round: PropTypes.bool,
    radius: PropTypes.bool,
    onClick: PropTypes.func
  }

  static defaultProps = {
    className: '',
    styles: null,
    src: '',
    mode: 'aspectFill',
    width: null,
    height: null,
    round: false,
    radius: false,
    onClick: null
  }

  render() {
    const {
      className,
      style,
      styles,
      src,
      mode,
      width,
      height,
      round,
      radius,
      onClick
    } = this.props
    const _style = {
      width: Taro.pxTransform(width),
      height: Taro.pxTransform(height || width)
    }
    if (process.env.TARO_ENV === 'h5') {
      _style.backgroundImage = `url(${src})`
    }

    if (round) {
      _style.borderRadius = Taro.pxTransform(width)
    }
    if (radius) {
      _style.borderRadius = Taro.pxTransform(8)
    }

    return (
      <View
        className={classNames(cls, className)}
        style={styles || style}
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
