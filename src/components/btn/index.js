/*
 * @Author: czy0729
 * @Date: 2019-06-11 15:37:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-11 15:43:29
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { Button, Text } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-btn'

/**
 * Taro的RN端Button的onClick没有回传event对象
 * 本项目有场景需要, 手动修改下源文件
 */
const ButtonRN = process.env.TARO_ENV === 'rn' ? require('./rn').default : null

export default class Btn extends Component {
  static defaultProps = {
    className: '',
    styles: null,
    type: 'plain',
    size: '',
    shadow: false,
    loading: false,
    disabled: false,
    text: '',
    onClick: Function.prototype
  }

  render() {
    const {
      className,
      style,
      styles,
      type,
      size,
      shadow,
      loading,
      disabled,
      text,
      onClick
    } = this.props
    const _cls = classNames(
      cls,
      {
        // NOTE Taro提供的Button带有paddingHorizontal而且不能通过padding重置
        [`${cls}--rn`]: process.env.TARO_ENV === 'rn',
        [`${cls}--${type}`]: type,
        [`${cls}--${size}`]: size,
        [`${cls}--shadow`]: shadow
      },
      className
    )
    const _clsText = classNames(`${cls}__text`, {
      [`${cls}__text--${type}`]: type,
      [`${cls}__text--${size}`]: size
    })

    if (process.env.TARO_ENV === 'rn') {
      return (
        <ButtonRN
          className={_cls}
          loading={loading}
          disabled={disabled}
          style={styles || style}
          onClick={onClick}
        >
          <Text className={_clsText} selectable={false}>
            {text || this.props.children}
          </Text>
        </ButtonRN>
      )
    }

    return (
      <Button
        className={_cls}
        loading={loading}
        disabled={disabled}
        style={styles || style}
        onClick={onClick}
      >
        <Text className={_clsText}>{text || this.props.children}</Text>
      </Button>
    )
  }
}
