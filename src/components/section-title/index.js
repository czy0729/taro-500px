/*
 * @Author: czy0729
 * @Date: 2019-06-11 10:37:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-14 12:10:32
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Component from '@components/component'
import Iconfont from '../iconfont'

const cls = 'c-section-title'

export default class SectionTitle extends Component {
  static defaultProps = {
    text: '',
    icon: '',
    onPress: Function.prototype
  }

  render() {
    const { className, style, text, icon } = this.props
    return (
      <View className={classNames(cls, 'flex', className)} style={style}>
        <View className='flex-item'>
          <Text className='t-desc t-b t-36 l-60'>{this.props.children}</Text>
        </View>
        {!!text && (
          <View className='flex'>
            <Text className='t-sub t-28 l-60'>{text}</Text>
            {!!icon && <Iconfont className='t-30 t-sub ml-16' name={icon} />}
          </View>
        )}
      </View>
    )
  }
}
