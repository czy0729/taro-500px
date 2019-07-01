/*
 * @Author: czy0729
 * @Date: 2019-06-13 09:28:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-14 15:53:02
 */
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { ENV } from '@constants'
import SearchBar from './search-bar'
import History from './history'
import Hot from './hot'
import './index.scss'

const cls = 'page-search'

@inject('appStore')
@observer
class Search extends Component {
  config = {
    navigationBarTitleText: '搜索'
  }

  render() {
    return (
      <ScrollView
        className={classNames(cls, 'layout-screen')}
        style={{
          height: ENV.windowHeight
        }}
      >
        <SearchBar />
        <History />
        <Hot className='mt-20' />
      </ScrollView>
    )
  }
}

export default Search
