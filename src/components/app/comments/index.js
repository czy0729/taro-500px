/*
 * @Author: czy0729
 * @Date: 2019-06-18 10:43:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 17:39:07
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import SectionTitle from '@base/section-title'
import { LIST_EMPTY } from '@constants'
import Item from './item'
import './index.scss'

const cls = 'c-app-comments'

const Comments = ({ className, data }) => {
  return (
    <View>
      <View className={classNames(cls, className)}>
        <SectionTitle desc={`${data.list.length} 条评论`} />
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
                    sub
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
      {!!data.list.length && (
        <View className={`${cls}__more`}>
          <Text className='t-30 l-48 t-link t-c'>查看更多评论</Text>
        </View>
      )}
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
