/*
 * @Author: czy0729
 * @Date: 2019-06-13 09:28:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-14 11:56:07
 */
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@base/c-scroll-view'
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
    navigationBarTitleText: '搜索',
    navigationBarBackgroundColor: '#ededed'
  }

  render() {
    return (
      <CScrollView className={cls}>
        <SearchBar />
        <History />
        <Hot className='mt-24' />
      </CScrollView>
    )
  }
}

export default Search
