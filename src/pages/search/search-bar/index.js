/*
 * @Author: czy0729
 * @Date: 2019-06-13 09:33:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-13 10:35:31
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { Ipt } from '@components'
import Component from '@components/component'
import './index.scss'

const cls = 'page-search__search-bar'

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

  render() {
    const { className } = this.props
    const { value } = this.state
    return (
      <View className={classNames(cls, 'flex', className)}>
        <View className='flex-1'>
          <Ipt
            placeholder='小云台灯'
            focus
            value={value}
            onChange={this.onChange}
          />
        </View>
        <Text className='t-26 t-sub ml-sm'>取消</Text>
      </View>
    )
  }
}
