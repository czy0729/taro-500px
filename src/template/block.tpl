import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { rootCls } from '../ds'
import './index.scss'

const cls = `${rootCls}__daren`

function Block({ className }) {
  return <View className={classNames(cls, className)}>1</View>
}

Block.defaultProps = {
}

Block.options = {
  addGlobalClass: true
}

export default observer(Block)
