/*
 * @Doc: https://nervjs.github.io/taro/docs/components/base/rich-text.html
 * @Doc: https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html
 * @Author: czy0729
 * @Date: 2019-06-19 14:24:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-19 14:41:09
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'
import Component from '@components/component'

const cls = 'c-rich-text'

export default class CRichText extends Component {
  static defaultProps = {
    className: '',
    nodes: []
  }

  render() {
    const { className, nodes } = this.props
    const _nodes = nodes
    return (
      <View className={classNames(cls, className)}>
        <RichText nodes={_nodes} />
      </View>
    )
  }
}
