/*
 * @Author: czy0729
 * @Date: 2019-07-18 17:38:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-18 17:40:03
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import Component from '@components/component'
import { ENV } from '@constants'

const cls = 'c-scroll-view'

export default class CScrollView extends Component {
  static defaultProps = {
    className: ''
  }

  render() {
    const { className } = this.props
    return (
      <ScrollView
        className={classNames(cls, className)}
        style={{
          height: ENV.windowHeight
        }}
        scrollY
      >
        {this.props.children}
      </ScrollView>
    )
  }
}
