/*
 * @Author: czy0729
 * @Date: 2019-06-17 14:25:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 17:56:09
 */
import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { CSwiper, ActivityIndicator, Back } from '@components'
import MasonryList from '@components/app/masonry-list'
import { getWindowHeight } from '@utils/style'
import { ENV } from '@constants'
import Content from './content'
import Gallery from './gallery'
import Comments from './comments'
import './index.scss'

const cls = 'page-detail'

@inject('userStore')
@observer
class Detail extends Component {
  config = {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white'
  }

  state = {
    loading: false
  }

  componentDidMount() {
    const { id = '45eb320de44b4bb5a020480b3c0ed494' } = this.$router.params
    const { userStore } = this.props
    userStore.fetchDetail({
      id
    })
    userStore.fetchDetailComments(
      {
        id
      },
      true
    )
  }

  onScrollToLower = async () => {
    const { userStore } = this.props
    this.setState({
      loading: true
    })

    await userStore.fetchPhoto()
    this.setState({
      loading: false
    })
  }

  render() {
    const { id = '45eb320de44b4bb5a020480b3c0ed494' } = this.$router.params
    const { userStore } = this.props
    const { loading } = this.state
    const detail = userStore.detail(id)
    const comments = userStore.comments(id)
    const photo = userStore.photo
    return (
      <View>
        <Back />
        <ScrollView
          className={cls}
          scrollY
          style={{
            height: getWindowHeight()
          }}
          lowerThreshold={ENV.screenWidth * 0.64}
          onScrollToLower={this.onScrollToLower}
        >
          <CSwiper
            className={cls}
            height={ENV.screenWidth * 1.28}
            cover={`${this.$router.params.cover}!p1`}
            data={detail.carousel.map(item => `${item}!p5`)}
          />
          <View className='layout-inner'>
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
              className='mt-d'
              nickName={detail.uploaderInfo.nickName}
              data={detail.more.map(item => `${item}!p5`)}
            />
            <Comments className='mt-d' data={comments} />
          </View>
          <MasonryList title='你可能也想看' data={photo} />
          <ActivityIndicator show={loading} />
        </ScrollView>
      </View>
    )
  }
}

export default Detail
