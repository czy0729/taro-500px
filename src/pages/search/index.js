/*
 * @Author: czy0729
 * @Date: 2019-06-13 09:28:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 18:15:26
 */
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@components/base/c-scroll-view'
import SearchBar from './search-bar'
import History from './history'
import Hot from './hot'
import { rootCls } from './ds'
import './index.scss'

const cls = rootCls

@inject('appStore')
@observer
class Search extends Component {
  config = {
    navigationBarTitleText: '搜索'
  }

  render() {
    return (
      <CScrollView className={classNames(cls, 'layout-screen')}>
        <SearchBar />
        <History />
        <Hot className='mt-24' />
      </CScrollView>
    )
  }
}

export default Search
