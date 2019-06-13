/*
 * @Author: czy0729
 * @Date: 2019-06-12 14:46:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-13 11:20:26
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import './index.scss'

const cls = 'page-index__search'

const Search = ({ className }) => {
  return (
    <View
      className={classNames(cls, className)}
      onClick={() => {
        Taro.navigateTo({
          url: '/pages/search/index'
        })
      }}
    >
      <Text className='t-28 t-sub'>搜索</Text>
    </View>
  )
}

Search.defaultProps = {
  className: ''
}

Search.options = {
  addGlobalClass: true
}

export default observer(Search)
