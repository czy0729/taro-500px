/*
 * @Author: czy0729
 * @Date: 2019-06-19 09:48:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-31 09:55:59
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@base/c-scroll-view'
import ActivityIndicator from '@base/activity-indicator'
import MasonryList from '@app/masonry-list'
import Comments from '@app/comments'
import FixedBar from '@app/fixed-bar'
import Cover from './cover'
import Content from './content'
import Horizontal from './horizontal'
import { rootCls } from './ds'
import './index.scss'

const cls = rootCls

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
    const {
      id = '4b635f43f5ceba488bc24dd8d7d41189',
      cover,
      title,
      avatar,
      nickName
    } = this.$router.params
    const { appStore } = this.props
    const { loading } = this.state
    const detail = appStore.detail(id)
    const comments = appStore.comments(id)
    const photo = appStore.photo
    return (
      <View>
        <CScrollView className={cls} onScrollToLower={this.onScrollToLower}>
          <Cover cover={`${cover}!p1`} src={`${detail.cover}!p5`} />
          <Content
            className='mt-48'
            title={detail.title || title}
            avatar={detail.uploaderInfo.avatar.baseUrl || avatar}
            nickName={detail.uploaderInfo.nickName || nickName}
            richText={detail.richText}
            uploadedDate={detail.uploadedDate}
          />
          <Horizontal
            className='mt-40'
            desc={`${detail.uploaderInfo.nickName}的更多案例`}
            data={detail.carousel}
          />
          <Comments className='mt-64' data={comments} />
          <View className='bg'>
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
