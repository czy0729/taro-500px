/*
 * @Author: czy0729
 * @Date: 2019-07-18 11:59:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-20 09:38:59
 */
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, ScrollView } from '@tarojs/components'
import { ListItem, CButton } from '@components'
import { ENV } from '@constants'
import './index.scss'

const cls = 'page-setting'
const DS = [
  {
    id: 1,
    data: [
      {
        label: '个人资料'
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
      <ScrollView
        className={cls}
        style={{
          height: ENV.windowHeight
        }}
        scrollY
      >
        {DS.map((item, index) => (
          <View
            key={item.id}
            className={classNames({
              'mt-64': !!index
            })}
          >
            {item.data.map((i) => (
              <ListItem key={i.label} text={i.label} />
            ))}
          </View>
        ))}
        <View className={`${cls}__fixed`}>
          <CButton type='default'>退出登录</CButton>
        </View>
      </ScrollView>
    )
  }
}

export default Setting
