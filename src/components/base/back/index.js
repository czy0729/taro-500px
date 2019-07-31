/*
 * @Author: czy0729
 * @Date: 2019-06-18 16:15:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-31 12:26:43
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import Iconfont from '../iconfont'
import './index.scss'

const cls = 'c-back'

export default class Back extends Component {
  static defaultProps = {
    theme: 'dark' // dark | light
  }

  render() {
    const { theme } = this.props
    const isDark = theme === 'dark'
    return (
      <View
        className={cls}
        onClick={() => {
          Taro.navigateBack()
        }}
      >
        <Iconfont
          className={classNames('t-32', {
            't-plain': !isDark,
            't-title': isDark
          })}
          name='angle-left'
        />
      </View>
    )
  }
}
