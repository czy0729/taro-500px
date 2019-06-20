/*
 * @Author: czy0729
 * @Date: 2019-06-19 09:48:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-19 15:57:17
 */
import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { ActivityIndicator, Back, CImage } from '@components'
import MasonryList from '@components/app/masonry-list'
import Comments from '@components/app/comments'
import { getWindowHeight } from '@utils/style'
import { ENV } from '@constants'
import { screenWidth } from '@constants/style'
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
          <CImage src={`${detail.cover}!p5`} height={screenWidth * 0.56} />
          {/* <Content
              title={detail.title}
              avatar={
                detail.uploaderInfo.avatar.baseUrl || this.$router.params.avatar
              }
              nickName={
                detail.uploaderInfo.nickName || this.$router.params.nickName
              }
              richText={detail.richText}
              uploadedDate={detail.uploadedDate}
            /> */}
          <Horizontal
            className='mt-d'
            desc={`${detail.uploaderInfo.nickName}的更多案例`}
            // data={detail}
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
