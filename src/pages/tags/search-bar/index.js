/*
 * @Author: czy0729
 * @Date: 2019-08-08 20:30:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 14:30:42
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import Component from '@components/component'
import CInput from '@base/c-input'
import Iconfont from '@base/iconfont'
import { rootCls } from '../ds'
import './index.scss'

const cls = `${rootCls}__search-bar`

@observer
export default class SearchBar extends Component {
  static defaultProps = {
    onAdd: Function.prototype
  }

  state = {
    value: ''
  }

  onChange = value => {
    this.setState({
      value
    })
  }

  onAdd = () => {
    const { onAdd } = this.props
    const { value } = this.state
    onAdd(value)
  }

  render() {
    const { className } = this.props
    const { value } = this.state
    return (
      <View className={classNames(cls, 'flex', className)}>
        <View className={`${cls}__input flex flex-1`}>
          <Iconfont className='t-36 t-sub' name='tag' />
          <CInput
            className='ml-8'
            placeholder='添加品牌、标签'
            focus
            value={value}
            onChange={this.onChange}
          />
        </View>
        <Text
          className={classNames(`${cls}__cancel`, {
            't-sub': value === '',
            't-danger': value !== ''
          })}
          onClick={this.onAdd}
        >
          添加
        </Text>
      </View>
    )
  }
}
