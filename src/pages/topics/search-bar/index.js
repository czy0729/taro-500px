/*
 * @Author: czy0729
 * @Date: 2019-08-08 20:30:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-13 15:37:32
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
          <Iconfont className='t-36 t-sub' name='search' />
          <CInput
            className='ml-8'
            placeholder='查询话题'
            focus
            value={value}
            onChange={this.onChange}
          />
        </View>
        <Text className={`${cls}__cancel t-link`} onClick={this.onClick}>
          取消
        </Text>
      </View>
    )
  }
}
