/*
 * @Author: czy0729
 * @Date: 2019-07-18 12:27:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 16:28:44
 */
import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import ArticleList from '@components/app/article-list'
import { ENV } from '@constants'
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
      <ScrollView
        style={{
          height: ENV.windowHeight
        }}
        scrollY
      >
        <View className={`${cls}__container`}>
          <ArticleList data={myArticleDS} />
        </View>
      </ScrollView>
    )
  }
}

export default MyArticles
