/*
 * @Author: czy0729
 * @Date: 2019-07-18 09:45:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-18 11:21:19
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Component from '@components/component'
import Iconfont from '../iconfont'
import './index.scss'

const cls = 'c-list-item'

export default class ListItem extends Component {
  static defaultProps = {
    text: '',
    arrow: true,
    border: true,
    renderExtra: null,
    onClick: Function.prototype
  }

  render() {
    const { text, arrow, border, onClick } = this.props
    return (
      <View className={cls} onClick={onClick}>
        <View
          className={classNames(`${cls}__item flex`, {
            [`${cls}__item--border`]: border
          })}
        >
          {!!text && (
            <View className='flex-1'>
              <Text className='t-30 l-48 t-title'>{text}</Text>
            </View>
          )}
          {this.props.children}
          {arrow && <Iconfont className='t-28 t-sub' name='angle-right' />}
          {this.props.renderExtra}
        </View>
      </View>
    )
  }
}
