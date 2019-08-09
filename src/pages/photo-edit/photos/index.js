/*
 * @Author: czy0729
 * @Date: 2019-08-06 16:19:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 14:58:00
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import {
  View,
  Text,
  Swiper,
  SwiperItem,
  MovableArea,
  MovableView
} from '@tarojs/components'
import Component from '@components/component'
import CImage from '@base/c-image'
import Iconfont from '@base/iconfont'
import { deepmerge } from '@utils'
import { getWindowHeight, transform } from '@utils/style'
import { screenWidth, pxRatio } from '@constants/style'
import { rootCls } from '../ds'
import './index.scss'

const cls = `${rootCls}__photos`
const initTagData = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  page: 0,
  index: 0
}

@observer
class Photos extends Component {
  static defaultProps = {
    className: '',
    current: 0,
    data: [],
    onSwiperChange: Function.prototype,
    onDataChange: Function.prototype
  }

  state = {
    index: 0,
    files: [],
    animation: true,
    moving: false,
    control: ''
  }

  tagData = initTagData

  componentDidMount() {
    const { current, data } = this.props
    this.setState({
      index: current,
      files: data
    })
  }

  componentWillReceiveProps(nextProps) {
    const { current, data } = nextProps
    this.setState({
      index: current,
      files: data
    })
  }

  /**
   * 轮播移动回调
   */
  onSwiperChange = event => {
    const { onSwiperChange } = this.props
    const { detail } = event
    const { current } = detail
    this.setState({
      index: current
    })
    onSwiperChange(current)
  }

  /**
   * 屏蔽轮播的移动
   */
  onSwiperItemTouchMove = event => {
    event.preventDefault()
    event.stopPropagation()
    return false
  }

  /**
   * 标签点击显示控制按钮
   */
  onTagClick = event => {
    const { currentTarget } = event
    const { page, index } = currentTarget.dataset
    this.setState({
      control: `${page}|${index}`
    })
  }

  /**
   * 删除标签
   */
  onTagDel = event => {
    const { currentTarget } = event
    const { page, index } = currentTarget.dataset
    const files = deepmerge(this.state.files)
    files[page].tags = files[page].tags.filter(item => item.id !== index)
    this.setState({
      files
    })
  }

  /**
   * 反转标签
   */
  onTagReverse = event => {
    const { currentTarget } = event
    const { page, index } = currentTarget.dataset
    const files = deepmerge(this.state.files)
    const findIndex = files[page].tags.findIndex(item => item.id === index)

    if (findIndex !== -1) {
      // let width
      // Taro.createSelectorQuery()
      //   .in(this.$scope)
      //   .select(`.${cls}__tag--${page}-${index}`)
      //   .boundingClientRect(rect => {
      //     width = rect.width
      //   })
      //   .exec(() => {
      //     const reverse = !files[page].tags[findIndex].reverse

      //     // 40是红点宽
      //     const offset = ((width + 40) * pxRatio) / screenWidth
      //     if (reverse) {
      //       // 反转要计算中心锚点偏移位置比例
      //       files[page].tags[findIndex] = {
      //         ...files[page].tags[findIndex],
      //         left: files[page].tags[findIndex].left - offset,
      //         reverse
      //       }
      //     } else {
      //       files[page].tags[findIndex] = {
      //         ...files[page].tags[findIndex],
      //         left: files[page].tags[findIndex].left + offset,
      //         reverse
      //       }
      //     }

      //     this.setState({
      //       files
      //     })
      //   })

      const reverse = !files[page].tags[findIndex].reverse
      files[page].tags[findIndex] = {
        ...files[page].tags[findIndex],
        left: files[page].tags[findIndex].left,
        reverse
      }

      this.setState({
        files
      })
    }
  }

  /**
   * 开始移动标签, 要屏蔽轮播的移动
   */
  onTagTouchStart = event => {
    const { moving } = this.state
    if (!moving) {
      this.setState({
        moving: true
      })
      event.preventDefault()
      event.stopPropagation()
    }
  }

  /**
   * 标签移动中
   */
  onTagMove = event => {
    const { detail, currentTarget } = event
    if (detail.source !== 'touch') {
      // 非用户行为则不处理
      event.preventDefault()
      event.stopPropagation()
      return false
    }

    const { moving } = this.state
    if (moving) {
      // 记录标签移动的临时信息
      const { width, height, page, index } = currentTarget.dataset
      this.tagData = {
        x: detail.x,
        y: detail.y,
        width,
        height,
        page,
        index
      }
    }
  }

  /**
   * 标签移动释放, 标签移动信息入state, 并初始化临时信息
   * 松手后真正修改图片的顺序。
   * 如果开启了动画 会出现奇怪的现象，暂时在松手的时候关闭动画。
   */
  onTagTouchEnd = () => {
    this.setState(
      {
        animation: false,
        moving: false
      },
      () => {
        const files = deepmerge(this.state.files)
        const { x, y, width, height, page, index } = this.tagData
        const findIndex = files[page].tags.findIndex(item => item.id === index)
        if (findIndex !== -1) {
          files[page].tags[findIndex] = {
            ...files[page].tags[findIndex],
            top: parseFloat(y / height),
            left: parseFloat(x / width)
          }
        }

        this.setState(
          {
            files
          },
          () => {
            const { onDataChange } = this.props
            onDataChange(files)
            this.tagData = initTagData
            this.setState({
              animation: true
            })
          }
        )
      }
    )
  }

  renderItem(item, page) {
    const { animation, control } = this.state
    const imageHeight = (screenWidth / item.width) * item.height
    return (
      <MovableArea
        className={`${cls}__tags`}
        style={{
          height: transform(imageHeight)
        }}
      >
        <CImage mode='aspectFit' src={item.url} height={imageHeight} />
        {item.tags.map(i => (
          <MovableView
            key={i.id}
            className={classNames(`${cls}__tag`, {
              [`${cls}__tag--reverse`]: i.reverse,
              [`${cls}__tag--${page}-${i.id}`]: true
            })}
            x={`${(i.left * screenWidth) / pxRatio}rpx`}
            y={`${(i.top * imageHeight) / pxRatio}rpx`}
            direction='all'
            animation={animation}
            data-width={screenWidth}
            data-height={imageHeight}
            data-page={page}
            data-index={i.id}
            outOfBounds={false}
            onTouchStart={this.onTagTouchStart}
            onChange={this.onTagMove}
            onTouchEnd={this.onTagTouchEnd}
            onClick={this.onTagClick}
          >
            <View
              className={`${cls}__tag-dot`}
              data-page={page}
              data-index={i.id}
              onTouchStart={this.onTagClick}
              onTouchEnd={this.onTagReverse}
            />
            <View className={`${cls}__tag-angle`} />
            <Text
              className={`${cls}__tag-text t-24 l-40 t-plain`}
              data-page={page}
              data-index={i.id}
              onTouchStart={this.onTagClick}
            >
              {i.name}
            </Text>
            {control === `${page}|${i.id}` && (
              <View
                className={`${cls}__tag-del`}
                data-page={page}
                data-index={i.id}
                onTouchStart={this.onTagTouchStart}
                onTouchEnd={this.onTagDel}
              >
                <Iconfont className='t-20 t-plain' name='close' />
              </View>
            )}
          </MovableView>
        ))}
      </MovableArea>
    )
  }

  render() {
    const { className, current } = this.props
    const { index, files, moving } = this.state
    const height = getWindowHeight()
    return (
      <View className={classNames(cls, className)}>
        <Swiper
          style={{
            height
          }}
          circular
          indicatorDots={false}
          autoplay={false}
          current={current}
          onChange={this.onSwiperChange}
        >
          {files.map((item, idx) => (
            <SwiperItem
              key={item.url}
              className={`${cls}__item`}
              onTouchMove={moving ? this.onSwiperItemTouchMove : undefined}
            >
              {this.renderItem(item, idx)}
            </SwiperItem>
          ))}
        </Swiper>
        {!!files.length && (
          <View className={`${cls}__text t-shadow`}>
            <Text className='t-28 l-40 t-plain'>
              {index + 1} / {files.length}
            </Text>
          </View>
        )}
      </View>
    )
  }
}

export default Photos
