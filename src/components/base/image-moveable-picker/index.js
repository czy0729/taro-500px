/*
 * @Author: czy0729
 * @Date: 2019-08-05 16:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-07 18:15:47
 */
import classNames from 'classnames'
import deepmerge from 'deepmerge'
import Taro from '@tarojs/taro'
import { View, MovableArea, MovableView, Image } from '@tarojs/components'
import Component from '@components/component'
import imageClose from '@assets/common/close.png'
import Iconfont from '../iconfont'
import {
  cls,
  moveableViewHeight,
  standardPositions,
  sortArr,
  calculateTargetIndex
} from './ds'
import './index.scss'

export default class ImageMoveablePicker extends Component {
  static defaultProps = {
    className: '',
    style: null,
    files: [],
    multiple: false,
    count: 9,
    sizeType: '',
    sourceType: '',
    onChange: Function.prototype,
    onFail: Function.prototype,
    onImageClick: Function.prototype
  }

  state = {
    reallyPositons: standardPositions,
    currentTouchIndex: -1, // 当前拖动的那个坐标
    animation: true, // 拖动排序时是否执行动画。现在在松手时不执行动画
    movedCount: 0 // 移动过的次数, 用于生成key来防止MovableView移动后不更新
  }

  componentDidMount() {
    const { files } = this.props
    this.setState({
      reallyPositons: standardPositions.slice(0, files.length)
    })
  }

  componentWillReceiveProps(nexrProps) {
    const { files } = nexrProps
    this.setState({
      reallyPositons: standardPositions.slice(0, files.length)
    })
  }

  /**
   * 增加图片
   */
  chooseFile = () => {
    const {
      files,
      multiple,
      count,
      sizeType,
      sourceType,
      onChange,
      onFail
    } = this.props
    // const filePathName = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY ? 'apFilePaths' : 'tempFiles'
    // const count = multiple ? 99 : 1
    const params = {}
    if (multiple) {
      params.count = 99
    }
    if (count) {
      params.count = count
    }
    if (sizeType) {
      params.sizeType = sizeType
    }
    if (sourceType) {
      params.sourceType = sourceType
    }
    Taro.chooseImage(params)
      .then(res => {
        Taro.getImageInfo({
          src: res.tempFilePaths[0],
          success: image => {
            const targetFiles = res.tempFilePaths.map(path => ({
              url: path,
              width: image.width,
              height: image.height,

              // @todo 分离
              tags: []
            }))
            const newFiles = files.concat(targetFiles)
            onChange(newFiles, 'add')
          }
        })
      })
      .catch(onFail)
  }

  /**
   * 图片点击
   */
  onImageClick = index => {
    const { files, onImageClick } = this.props
    onImageClick(index, files[index])
  }

  /**
   * 删除图片
   */
  onRemoveImage = index => {
    const { files, onChange } = this.props
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      window.URL.revokeObjectURL(files[index].url)
    }
    const newFiles = files.filter((file, i) => i !== index)
    onChange(newFiles, 'remove', index)
  }

  /**
   * 图片正在移动
   * 当图片被拖动的时候需要做的事情：
   * -- 将当前这张图片的zIndex调大，让他始终不会被其他图片挡住；
   * -- 获得当前拖动的图片的index
   * -- 根据当前的坐标计算他移动到哪了 目标的index
   * -- 如果移动到了别人的底盘，让别人给他让位置，并记录目标位置的index
   */
  onImageMove(event) {
    if (event.detail.source !== 'touch') {
      // 非用户行为则不处理
      return
    }

    const { files } = this.props
    let imgListLength = files.length // 当前图片列表的长度
    let touchIndex = event.currentTarget.dataset.index // 跟随手指移动的那张图的index
    let detail = event.detail // 手指在屏幕上的坐标信息

    this.isMoving = true // 将状态修改为正在拖动
    let targetIndex = calculateTargetIndex(detail) // 当前被拖动到了哪儿

    // 只需要修改我和目标位置之间的坐标（不包含我，包含目标），其他不要动
    if (targetIndex >= 0) {
      // 至少有一个目的地
      if (
        (!this.currentTargetIndex && this.currentTargetIndex !== 0) ||
        this.currentTargetIndex !== targetIndex
      ) {
        // 每次进入一个目标 只执行一次动画
        this.currentTargetIndex = targetIndex
        this.setState(
          {
            currentTouchIndex: touchIndex
          },
          () => {
            let data = {
              reallyPositons: deepmerge([], this.state.reallyPositons)
            }

            // 重新计算每一个图片应该在的位置
            for (let i = 0; i < imgListLength; i++) {
              // 默认设置为标准位置
              let position = standardPositions[i]
              if (touchIndex > targetIndex) {
                // 向前移动，不需要处理touchIndex之后的数据，不需要处理 targetIndex 之前的数据
                if (i <= touchIndex && i >= targetIndex) {
                  // 设置为标准位置往后移动一位
                  position = standardPositions[i + 1]
                }
              } else {
                // 向后移动，不需要处理touchIndex之前的数据，不需要处理 targetIndex 之后的数据
                if (i >= touchIndex && i <= targetIndex) {
                  // 设置为标准位置往前移动一位
                  position = standardPositions[i - 1]
                }
              }

              // 不修改当前拖动的这张图的位置，避免发生晃动
              if (i !== touchIndex) {
                data.reallyPositons[i] = position
              }
            }

            // 一顿计算之后 如果发现生成了新的data数据
            this.setState(data)
          }
        )
      }
    }
  }

  /**
   * 手指从屏幕上离开了
   */
  onImageTouchEnd = event => {
    if (this.isMoving) {
      this.setState(
        {
          animation: false
        },
        () => {
          this.isMoving = false
          const { files } = this.props
          const imgListLength = files.length
          let index = event.currentTarget.dataset.index
          if (this.currentTargetIndex >= imgListLength) {
            // 目标位置超出了图片数组的长度，将以图片数组长度为目标位置
            this.currentTargetIndex = imgListLength - 1
          }

          /**
           * 松手后真正修改图片的顺序。
           * 如果开启了动画 会出现奇怪的现象，暂时在松手的时候关闭动画。
           */
          const { onChange } = this.props
          onChange(sortArr(files, index, this.currentTargetIndex))

          this.setState(
            {
              currentTouchIndex: -1,
              reallyPositons: standardPositions.slice(0, imgListLength),
              movedCount: this.state.movedCount + 1
            },
            () => {
              // 开启动画
              this.setState({
                animation: true
              })
            }
          )
        }
      )
    }
  }

  render() {
    const { className, files, count } = this.props
    const {
      currentTouchIndex,
      reallyPositons,
      animation,
      movedCount
    } = this.state
    const showChoose = files.length < count
    return (
      <MovableArea
        className={classNames(cls, className)}
        style={{
          height: `${moveableViewHeight[files.length]}rpx`
        }}
      >
        {files.map((item, index) => {
          const key = `${movedCount}|${item.url}|${index}`
          return (
            <MovableView
              key={key}
              className={`${cls}__wrap`}
              style={{
                zIndex: currentTouchIndex === index ? 2 : 1
              }}
              x={`${reallyPositons[index].x}rpx`}
              y={`${reallyPositons[index].y}rpx`}
              direction='all'
              animation={animation}
              outOfBounds={false}
              data-index={index}
              onChange={this.onImageMove}
              onTouchEnd={this.onImageTouchEnd}
            >
              <View className={`${cls}__image-wrap`}>
                <Image
                  class={`${cls}__image`}
                  mode='aspectFill'
                  src={item.url}
                  data-index={index}
                  data-images={item.url}
                  onClick={() => this.onImageClick(index)}
                />
                <Image
                  className={`${cls}__delete`}
                  src={imageClose}
                  onClick={() => this.onRemoveImage(index)}
                />
              </View>
            </MovableView>
          )
        })}
        {showChoose && (
          <View
            className={`${cls}__wrap`}
            style={{
              position: 'absolute',
              top: `${standardPositions[files.length].y}rpx`,
              left: `${standardPositions[files.length].x}rpx`
            }}
            onClick={this.chooseFile}
          >
            <View className={`${cls}__choose`}>
              <Iconfont className='t-48 t-default' name='plus' />
            </View>
          </View>
        )}
      </MovableArea>
    )
  }
}
