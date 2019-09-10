/*
 * @Author: czy0729
 * @Date: 2019-07-01 16:57:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-10 11:10:22
 */
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Component from '@components/component'
import CButton from '@base/c-button'
import CImage from '@base/c-image'
import Iconfont from '@base/iconfont'
import { c, height, push } from '@utils'
import image11 from '@assets/pages/index/11.png'
import image12 from '@assets/pages/index/12.png'
import image13 from '@assets/pages/index/13.png'
import { rootCls, menuDS } from '../ds'
import './index.scss'

const cls = `${rootCls}__preview`

class Preview extends Component {
  static defaultProps = {
    onClose: Function.prototype
  }

  onDelayClose = pagePath => {
    const { onClose } = this.props
    push(pagePath)

    setTimeout(() => {
      onClose()
    }, 2000)
  }

  renderPlan() {
    return (
      <View className={`${cls}__plan flex`} onClick={() => push('')}>
        <View className='flex-1'>
          <View className={`${cls}__wrap`}>
            <Text className='t-24 l-40 t-c t-warning'>正在征集</Text>
          </View>
          <Text className='t-36 l-50 t-title t-b mt-8'>晒晒你家的照明方案</Text>
          <View className={`${cls}__btn mt-40`}>
            <CButton type='warning' text='点击参与' size='mini' />
          </View>
        </View>
        <View className={`${cls}__thumbs`}>
          <View className={`${cls}__img3`}>
            <CImage src={image13} width={160} radius />
          </View>
          <View className={`${cls}__img2`}>
            <CImage src={image12} width={80} radius />
          </View>
          <View className={`${cls}__img1`}>
            <CImage src={image11} width={124} radius />
          </View>
        </View>
      </View>
    )
  }

  renderPublish() {
    const { onClose } = this.props
    return (
      <View className={`${cls}__publish`}>
        <View className='flex'>
          {menuDS.map(item => (
            <View
              key={item.text}
              className={`${cls}__item flex flex-column flex-1`}
              onClick={() => this.onDelayClose(item.pagePath)}
            >
              <View className='flex flex-justify-center'>
                <Iconfont className='t-52 t-title' name={item.icon} />
              </View>
              <Text className='t-26 l-48 t-title mt-16'>{item.text}</Text>
            </View>
          ))}
        </View>
        <View
          className={`${cls}__btn-close flex flex-justify-center`}
          onClick={onClose}
        >
          <Iconfont className='t-32 t-default' name='close' />
        </View>
      </View>
    )
  }

  render() {
    const { show } = this.props
    return (
      <View
        className={c(cls, {
          [`${cls}--show`]: show
        })}
        style={{
          height: height()
        }}
      >
        <View className={`${cls}__container`}>
          {this.renderPlan()}
          {this.renderPublish()}
        </View>
      </View>
    )
  }
}

export default Preview
