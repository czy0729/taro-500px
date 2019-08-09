/*
 * @Author: czy0729
 * @Date: 2019-07-18 11:59:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 17:12:03
 */
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import CScrollView from '@base/c-scroll-view'
import CButton from '@base/c-button'
import ListItem from '@base/list-item'
import { push } from '@utils'
import './index.scss'

const cls = 'page-setting'
const DS = [
  {
    id: 1,
    data: [
      {
        label: '个人资料',
        url: '/pages/my-info/index'
      }
    ]
  },
  {
    id: 2,
    data: [
      {
        label: '账号绑定'
      },
      {
        label: '账号与安全'
      }
    ]
  },
  {
    id: 3,
    data: [
      {
        label: '清除缓存'
      },
      {
        label: '用户协议'
      },
      {
        label: '隐私条款说明'
      },
      {
        label: '关于云知光'
      }
    ]
  }
]

@inject('appStore')
@observer
class Setting extends Component {
  config = {
    navigationBarTitleText: '设置'
  }

  render() {
    return (
      <CScrollView className={cls}>
        {DS.map((item, index) => (
          <View
            key={item.id}
            className={classNames({
              'mt-64': !!index
            })}
          >
            {item.data.map(i => (
              <ListItem
                key={i.label}
                text={i.label}
                onClick={() => push(i.url)}
              />
            ))}
          </View>
        ))}
        <View className={`${cls}__fixed`}>
          <CButton type='default'>退出登录</CButton>
        </View>
      </CScrollView>
    )
  }
}

export default Setting
