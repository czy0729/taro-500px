/*
 * @Author: czy0729
 * @Date: 2019-07-18 11:32:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-23 11:07:28
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { Button, Text } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-button'

export default class CButton extends Component {
  static defaultProps = {
    className: '',
    type: 'plain', // 颜色类型
    ghost: false, // 是否透明反白
    plain: false, // 是否白底, plain优先级大于ghost
    size: '', // 大小 mini | medium | null
    shadow: false, // 是否显示阴影
    loading: false, // 是否loading
    disabled: false, // 是否禁用
    round: true, // 是否圆角
    text: '', // 文字
    onClick: Function.prototype
  }

  render() {
    const {
      className,
      style,
      type,
      ghost,
      plain,
      size,
      shadow,
      loading,
      disabled,
      round,
      text,
      onClick
    } = this.props
    let _type = type
    if (ghost) {
      _type = `ghost-${_type}`
    }
    if (plain) {
      _type = `plain-${_type}`
    }
    return (
      <Button
        className={classNames(
          cls,
          {
            [`${cls}--${_type}`]: _type,
            [`${cls}--${size}`]: size,
            [`${cls}--shadow`]: shadow,
            [`${cls}--round`]: round
          },
          className
        )}
        style={style}
        loading={loading}
        disabled={disabled}
        onClick={onClick}
      >
        <Text
          className={classNames(`${cls}__text`, {
            [`${cls}__text--${_type}`]: _type,
            [`${cls}__text--${size}`]: size
          })}
        >
          {text || this.props.children}
        </Text>
      </Button>
    )
  }
}
