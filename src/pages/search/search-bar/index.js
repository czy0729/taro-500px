/*
 * @Author: czy0729
 * @Date: 2019-06-13 09:33:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-14 11:57:23
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
  state = {
    value: ''
  }

  onChange = value => {
    this.setState({
      value
    })
  }

  back = () => {
    Taro.navigateBack()
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
            placeholder='小云台灯'
            focus
            value={value}
            onChange={this.onChange}
          />
        </View>
        <Text className={`${cls}__cancel t-link`} onClick={this.back}>
          取消
        </Text>
      </View>
    )
  }
}
