/*
 * @Author: czy0729
 * @Date: 2019-06-11 10:37:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-11 13:59:06
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Component from '@components/component'

const cls = 'c-section-title'

export default class SectionTitle extends Component {
  static defaultProps = {
    rightText: '',
    rightIcon: '',
    onRightPress: Function.prototype
  }

  render() {
    const { className, style, rightText } = this.props
    return (
      <View className={classNames(cls, 'flex', className)} style={style}>
        <View className='flex-item'>
          <Text className='t-desc t-b t-34 l-48'>{this.props.children}</Text>
        </View>
        {!!rightText && (
          <View>
            <Text className='t-sub t-22 l-30'>{rightText}</Text>
          </View>
        )}
      </View>
    )
  }
}
