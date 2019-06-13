/*
 * @Author: czy0729
 * @Date: 2019-06-13 10:58:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-13 11:17:49
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
    onClick: Function.prototype
  }

  render() {
    const { className, style, onClick } = this.props
    return (
      <View
        className={classNames(cls, className)}
        style={style}
        onClick={onClick}
      >
        <Text className='t-26 t-desc'>{this.props.children}</Text>
      </View>
    )
  }
}
