/*
 * @Author: czy0729
 * @Date: 2019-07-19 15:16:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 16:34:04
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { SectionTitle } from '@components'
import PhotosGrid from '@components/app/photos-grid'
import VideosGrid from '@components/app/videos-grid'
import ArticleList from '@components/app/article-list'
import { push } from '@utils'
import { zoneDS } from '@constants/mock'
import './index.scss'

const cls = 'page-zone__home'

const Home = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      <SectionTitle
        className='layout-wind'
        text='查看全部'
        icon='angle-right'
        onClick={() => push('/pages/my-photos/index')}
      >
        图片
      </SectionTitle>
      <PhotosGrid data={zoneDS.images} />
      <SectionTitle
        className='layout-wind mt-40'
        text='查看全部'
        icon='angle-right'
        onClick={() => push('/pages/my-videos/index')}
      >
        视频
      </SectionTitle>
      <VideosGrid data={zoneDS.videos} />
      <SectionTitle
        className='layout-wind mt-40'
        text='查看全部'
        icon='angle-right'
        onClick={() => push('/pages/my-articles/index')}
      >
        文章
      </SectionTitle>
      <ArticleList data={zoneDS.articles} />
    </View>
  )
}

Home.defaultProps = {
  className: ''
}

Home.options = {
  addGlobalClass: true
}

export default observer(Home)
