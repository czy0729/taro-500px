/*
 * @Author: czy0729
 * @Date: 2019-07-31 13:50:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-31 15:35:35
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { Text } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-navigation-title'

export default class NavigationTitle extends Component {
  static defaultProps = {
    theme: 'dark', // dark | light
    text: ''
  }

  render() {
    const { theme, text } = this.props
    const isDark = theme === 'dark'
    return (
      <Text
        className={classNames(cls, {
          't-plain': !isDark,
          't-title': isDark
        })}
      >
        {text}
      </Text>
    )
  }
}
