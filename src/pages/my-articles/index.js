/*
 * @Author: czy0729
 * @Date: 2019-07-18 12:27:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 15:50:17
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@base/c-scroll-view'
import ArticleList from '@app/article-list'
import { myArticleDS } from '@constants/mock'
import './index.scss'

const cls = 'page-my-articles'

@inject('appStore')
@observer
class MyArticles extends Component {
  config = {
    navigationBarTitleText: '我的文章'
  }

  render() {
    return (
      <CScrollView>
        <View className={`${cls}__container`}>
          <ArticleList data={myArticleDS} />
        </View>
      </CScrollView>
    )
  }
}

export default MyArticles
