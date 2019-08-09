/*
 * @Author: czy0729
 * @Date: 2019-08-08 20:29:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 14:36:14
 */
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@base/c-scroll-view'
import { back } from '@utils'
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
    const { _data } = appStore.state.photoEdit
    const tags = {}
    _data.forEach(item => {
      item.tags.forEach(i => {
        tags[i.name] = i.id
      })
    })
    this.setState({
      tags: Object.keys(tags)
        .map(tag => ({
          id: tags[tag],
          name: tag
        }))
        .sort((a, b) => b.id - a.id)
    })
  }

  onAddTag = tag => {
    const { appStore } = this.props
    appStore.addPhotoEditTag({
      name: tag
    })
    back()
  }

  onSelectTag = tag => {
    const { appStore } = this.props
    appStore.addPhotoEditTag(tag)
    back()
  }

  render() {
    const { tags } = this.state
    return (
      <CScrollView className={classNames(cls, 'layout-screen')}>
        <SearchBar onAdd={this.onAddTag} />
        <History data={tags} onClick={this.onSelectTag} />
      </CScrollView>
    )
  }
}

export default Search
