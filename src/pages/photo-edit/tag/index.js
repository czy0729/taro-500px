/*
 * @Author: czy0729
 * @Date: 2019-08-08 15:33:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-08 15:47:54
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { Iconfont } from '@base/iconfont'
import { rootCls } from '../ds'
import './index.scss'

const cls = `${rootCls}__tag`

function Tag({
  className,
  reverse,
  page,
  index,
  name,
  control,
  onTagTouchStart,
  onTagReverse,
  onTagClick,
  onTagDel
}) {
  return (
    <View
      className={classNames(
        cls,
        {
          [`${cls}--reverse`]: reverse
        },
        className
      )}
    >
      <View
        className={`${cls}__dot`}
        data-page={page}
        data-index={index}
        onTouchStart={onTagTouchStart}
        onTouchEnd={onTagReverse}
      />
      <View className={`${cls}__angle`} />
      <Text
        className={`${cls}__text t-24 l-40 t-plain`}
        data-page={page}
        data-index={index}
        onTouchStart={onTagClick}
      >
        {name}
      </Text>
      {control === `${page}|${index}` && (
        <View
          className={`${cls}__del`}
          data-page={page}
          data-index={index}
          onTouchStart={onTagTouchStart}
          onTouchEnd={onTagDel}
        >
          <Iconfont className='t-20 t-plain' name='close' />
        </View>
      )}
    </View>
  )
}

Tag.defaultProps = {
  className: '',
  reverse: false,
  page: 0,
  index: 0,
  name: '',
  control: '',
  onTagTouchStart: Function.prototype,
  onTagReverse: Function.prototype,
  onTagClick: Function.prototype,
  onTagDel: Function.prototype
}

Tag.options = {
  addGlobalClass: true
}

export default observer(Tag)
