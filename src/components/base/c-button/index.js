/*
 * @Author: czy0729
 * @Date: 2019-07-18 11:32:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-18 11:53:53
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
    type: 'plain',
    ghost: false,
    size: '',
    shadow: false,
    loading: false,
    disabled: false,
    round: true,
    text: '',
    onClick: Function.prototype
  }

  render() {
    const {
      className,
      style,
      type,
      ghost,
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
