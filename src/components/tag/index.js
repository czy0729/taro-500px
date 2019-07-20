/*
 * @Author: czy0729
 * @Date: 2019-06-13 10:58:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-20 14:56:38
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-tag'

export default class Tag extends Component {
  static defaultProps = {
    className: '',
    style: null,
    type: null,
    onClick: Function.prototype
  }

  render() {
    const { className, style, type, onClick } = this.props
    return (
      <View
        className={classNames(
          cls,
          {
            [`${cls}--${type}`]: type
          },
          className
        )}
        style={style}
        onClick={onClick}
      >
        <Text
          className={classNames('t-30 l-42', {
            't-title': !type,
            [`${cls}__text--${type}`]: type
          })}
        >
          {this.props.children}
        </Text>
      </View>
    )
  }
}
