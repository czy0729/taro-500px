/*
 * @Author: czy0729
 * @Date: 2019-06-14 11:57:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-14 12:00:21
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { Text } from '@tarojs/components'
import Component from '@components/component'

const cls = 'c-iconfont'

export default class Iconfont extends Component {
  static defaultProps = {
    className: '',
    name: ''
  }

  render() {
    const { className, name } = this.props
    return (
      <Text
        className={classNames(cls, 'iconfont', `icon-${name}`, className)}
      />
    )
  }
}
