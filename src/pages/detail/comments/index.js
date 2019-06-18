/*
 * @Author: czy0729
 * @Date: 2019-06-18 10:43:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 15:46:24
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { LIST_EMPTY } from '@constants'
import Item from './item'
import './index.scss'

const cls = 'page-detail__comments'

const Comments = ({ className, data }) => {
  return (
    <View className={classNames(cls, className)}>
      <View>
        <Text className='t-30 l-52 t-sub'>共 {data.list.length} 条评论</Text>
      </View>
      {data.list.slice().map((item, index) => (
        <View key={item.id}>
          <Item
            index={index}
            avatar={item.userInfo.avatar.baseUrl}
            nickName={item.userInfo.nickName}
            userName={item.userInfo.userName}
            message={item.message}
            createDate={item.createDate}
            countLike={item.countLike}
          />
          {!!item.childComments.length && (
            <View className={`${cls}__child-comments`}>
              {item.childComments.map(i => (
                <Item
                  key={i.id}
                  avatar={i.userInfo.avatar.baseUrl}
                  nickName={i.userInfo.nickName}
                  userName={i.userInfo.userName}
                  message={i.message}
                  createDate={i.createDate}
                  countLike={i.countLike}
                />
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  )
}

Comments.defaultProps = {
  className: '',
  data: LIST_EMPTY
}

Comments.options = {
  addGlobalClass: true
}

export default observer(Comments)
