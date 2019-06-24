/*
 * @Author: czy0729
 * @Date: 2019-06-19 09:48:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-24 14:01:58
 */
import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { ActivityIndicator, Back } from '@components'
import MasonryList from '@components/app/masonry-list'
import Comments from '@components/app/comments'
import { getWindowHeight } from '@utils/style'
import { ENV } from '@constants'
import Cover from './cover'
import Content from './content'
import Horizontal from './horizontal'
import './index.scss'

const cls = 'page-article'

@inject('userStore')
@observer
class Article extends Component {
  config = {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white'
  }

  state = {
    loading: false
  }

  componentDidMount() {
    const { id } = this.$router.params
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
    const { id } = this.$router.params
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
          <Cover
            cover={`${this.$router.params.cover}!p1`}
            src={`${detail.cover}!p5`}
          />
          <Content
            className='mt-d'
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
            className='mt-d'
            desc={`${detail.uploaderInfo.nickName}的更多案例`}
            avatar={
              detail.uploaderInfo.avatar.baseUrl || this.$router.params.avatar
            }
            data={detail.carousel}
            nickName={detail.uploaderInfo.nickName}
          />
          <Horizontal
            className='mt-d'
            desc='更多两室案例'
            avatar={
              detail.uploaderInfo.avatar.baseUrl || this.$router.params.avatar
            }
            data={detail.more}
            nickName={detail.uploaderInfo.nickName}
          />
          <View className='layout-wind mt-d'>
            <Comments data={comments} />
          </View>
          <MasonryList className='mt-d' title='你可能也想看' data={photo} />
          <ActivityIndicator show={loading} />
        </ScrollView>
      </View>
    )
  }
}

export default Article
