/*
 * @Author: czy0729
 * @Date: 2019-06-17 14:25:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-12 12:05:39
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@base/c-scroll-view'
import CSwiper from '@base/c-swiper'
import ActivityIndicator from '@base/activity-indicator'
import MasonryList from '@app/masonry-list'
import Comments from '@app/comments'
import FixedBar from '@app/fixed-bar'
import { ENV } from '@constants'
import Photos from './photos'
import Content from './content'
import Gallery from './gallery'
import { rootCls } from './ds'
import './index.scss'

const cls = rootCls

@inject('appStore')
@observer
class Detail extends Component {
  config = {
    navigationBarTitleText: '照片详情'
  }

  state = {
    loading: false
  }

  componentDidMount() {
    const { id = '1' } = this.$router.params
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
    const { id = '1' } = this.$router.params
    const { appStore } = this.props
    const { loading } = this.state
    const detail = appStore.detail(id)
    const comments = appStore.comments(id)
    const photo = appStore.photo
    return (
      <View>
        <CScrollView className={cls} onScrollToLower={this.onScrollToLower}>
          {id === '1' ? (
            <Photos data={detail.carousel} />
          ) : (
            <CSwiper
              height={ENV.screenWidth * 1.216}
              cover={`${this.$router.params.cover}!p1`}
              data={detail.carousel.map(item => `${item.url}!p5`)}
            />
          )}
          <View className={`${cls}__wrap`}>
            <Content
              avatar={
                detail.uploaderInfo.avatar.baseUrl || this.$router.params.avatar
              }
              nickName={
                detail.uploaderInfo.nickName || this.$router.params.nickName
              }
              content={detail.content}
              uploadedDate={detail.uploadedDate}
              liked={detail.pictureLikeedCount}
            />
            <Gallery
              className='mt-64'
              nickName={detail.uploaderInfo.nickName}
              data={detail.more.map(item => `${item}!p5`)}
            />
          </View>
          <Comments className='mt-64' data={comments} />
          <View className='bg'>
            <MasonryList data={photo} />
            <ActivityIndicator show={loading} />
          </View>
        </CScrollView>
        <FixedBar />
      </View>
    )
  }
}

export default Detail
