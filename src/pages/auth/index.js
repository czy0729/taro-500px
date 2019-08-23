/*
 * @Author: czy0729
 * @Date: 2019-08-23 13:53:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-23 14:09:11
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import CScrollView from '@components/base/c-scroll-view'
import CImage from '@components/base/c-image'
import CButton from '@components/base/c-button'
import { ENV } from '@constants'
import imageCover from '@assets/pages/auth.png'
import './index.scss'

const cls = 'page-auth'

@inject('appStore')
@observer
class Auth extends Component {
  config = {
    navigationBarTitleText: '设计师/服务商入驻'
  }

  render() {
    return (
      <CScrollView className={cls}>
        <CImage src={imageCover} height={ENV.screenWidth * 0.858} />
        <View className={`${cls}__btns`}>
          <CButton type='main' text='申请为设计师账号' round={false} />
          <CButton
            className='mt-40'
            type='main'
            text='服务商/品牌商入驻'
            round={false}
          />
        </View>
      </CScrollView>
    )
  }
}

export default Auth
