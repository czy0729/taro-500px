/*
 * @Author: czy0729
 * @Date: 2019-06-19 09:48:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-22 15:07:23
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { CScrollView, ActivityIndicator } from '@components'
import MasonryList from '@components/app/masonry-list'
import Comments from '@components/app/comments'
import FixedBar from '@components/app/fixed-bar'
import Cover from './cover'
import Content from './content'
import Horizontal from './horizontal'
import './index.scss'

const cls = 'page-article'

@inject('appStore')
@observer
class Article extends Component {
  config = {
    navigationBarTitleText: '文章详情'
  }

  state = {
    loading: false
  }

  componentDidMount() {
    const { id = '4b635f43f5ceba488bc24dd8d7d41189' } = this.$router.params
    const { appStore } = this.props
    appStore.fetchDetail({
      id
    })
    appStore.fetchDetailComments(
      {
        id
      },
      true
    )
  }

  onScrollToLower = async () => {
    const { appStore } = this.props
    this.setState({
      loading: true
    })

    await appStore.fetchPhoto()
    this.setState({
      loading: false
    })
  }

  render() {
    const { id = '4b635f43f5ceba488bc24dd8d7d41189' } = this.$router.params
    const { appStore } = this.props
    const { loading } = this.state
    const detail = appStore.detail(id)
    const comments = appStore.comments(id)
    const photo = appStore.photo
    return (
      <View>
        <CScrollView className={cls} onScrollToLower={this.onScrollToLower}>
          <Cover
            cover={`${this.$router.params.cover}!p1`}
            src={`${detail.cover}!p5`}
          />
          <Content
            className='mt-48'
            title={detail.title || this.$router.params.title}
            avatar={
              detail.uploaderInfo.avatar.baseUrl || this.$router.params.avatar
            }
            nickName={
              detail.uploaderInfo.nickName || this.$router.params.nickName
            }
            richText={detail.richText}
            uploadedDate={detail.uploadedDate}
          />
          <Horizontal
            className='mt-40'
            desc={`${detail.uploaderInfo.nickName}的更多案例`}
            data={detail.carousel}
          />
          <Comments className='mt-64' data={comments} />
          <View className='layout-bg'>
            <MasonryList className='mt-56' data={photo} />
            <ActivityIndicator show={loading} />
          </View>
        </CScrollView>
        <FixedBar />
      </View>
    )
  }
}

export default Article
