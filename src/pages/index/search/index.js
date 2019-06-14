/*
 * @Author: czy0729
 * @Date: 2019-06-12 14:46:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-14 15:51:10
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { Iconfont } from '@components'
import './index.scss'

const cls = 'page-index__search'

const Search = ({ className }) => {
  return (
    <View
      className={classNames(cls, 'flex', className)}
      onClick={() => {
        Taro.navigateTo({
          url: '/pages/search/index'
        })
      }}
    >
      <Iconfont className='t-36 t-sub' name='search' />
      <Text className='t-28 l-40 t-sub ml-8'>搜索</Text>
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
