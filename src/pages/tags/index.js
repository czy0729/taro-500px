/*
 * @Author: czy0729
 * @Date: 2019-08-08 20:29:45
 * @Last Modified by:   czy0729
 * @Last Modified time: 2019-08-08 20:29:45
 */
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@components/base/c-scroll-view'
import SearchBar from './search-bar'
import History from './history'
import { rootCls } from './ds'

const cls = rootCls

@inject('appStore')
@observer
class Search extends Component {
  config = {
    navigationBarTitleText: '标签'
  }

  state = {
    tags: []
  }

  componentDidMount() {
    const { appStore } = this.props
    const { data } = appStore.state.photoEdit
    const tags = {}
    data.forEach(item => {
      item.tags.forEach(i => {
        tags[i.name] = true
      })
    })
    this.setState({
      tags: Object.keys(tags)
    })
  }

  render() {
    const { tags } = this.state
    return (
      <CScrollView className={classNames(cls, 'layout-screen')}>
        <SearchBar />
        <History data={tags} />
      </CScrollView>
    )
  }
}

export default Search
