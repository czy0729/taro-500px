/*
 * @Author: czy0729
 * @Date: 2019-06-18 16:15:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 16:38:08
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import Iconfont from '../iconfont'
import './index.scss'

const cls = 'c-back'

export default class Back extends Component {
  render() {
    return (
      <View
        className={cls}
        onClick={() => {
          Taro.navigateBack()
        }}
      >
        <Iconfont className='t-32 t-plain' name='angle-left' />
      </View>
    )
  }
}
