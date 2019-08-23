/*
 * @Author: czy0729
 * @Date: 2019-08-23 15:14:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-23 15:24:13
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@base/c-scroll-view'
import ItemTopic from '@app/item-topic'
import { push } from '@utils'
import { rootCls, data } from './ds'

const cls = rootCls

@inject('appStore')
@observer
class MyTopics extends Component {
  config = {
    navigationBarTitleText: '关注的话题'
  }

  render() {
    return (
      <CScrollView className={cls}>
        {data.map((i, index) => (
          <ItemTopic
            key={i.id}
            title={i.title}
            image={i.image}
            anwser={i.anwser}
            follow={i.follow}
            border={index !== 0}
            onClick={() =>
              push('/pages/topic-detail/index', {
                id: i.id
              })
            }
          />
        ))}
      </CScrollView>
    )
  }
}

export default MyTopics
