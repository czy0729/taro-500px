/*
 * @Author: czy0729
 * @Date: 2019-06-11 10:37:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 17:06:53
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Component from '@components/component'
import Iconfont from '../iconfont'
import './index.scss'

const cls = 'c-section-title'

export default class SectionTitle extends Component {
  static defaultProps = {
    desc: '',
    text: '',
    icon: '',
    onClick: Function.prototype
  }

  render() {
    const { className, style, desc, text, icon, onClick } = this.props
    return (
      <View className={classNames(cls, 'flex', className)} style={style}>
        <View className='flex-item'>
          <Text className='t-title t-36 l-48 t-b'>
            {desc || this.props.children}
          </Text>
        </View>
        {!!text && (
          <View className='flex' onClick={onClick}>
            <Text className='t-sub t-24 l-48'>{text}</Text>
            {!!icon && <Iconfont className='t-24 t-sub ml-16' name={icon} />}
          </View>
        )}
      </View>
    )
  }
}
