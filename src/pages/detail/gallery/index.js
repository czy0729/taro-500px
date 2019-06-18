/*
 * @Author: czy0729
 * @Date: 2019-06-17 17:26:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 10:44:29
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { SectionTitle, CImage } from '@components'
import { transform } from '@utils/style'
import { ENV } from '@constants'

const cls = 'page-detail__gallery'
const imageHalfWidth = (ENV.screenWidth - ENV.wind * 2 * ENV.pxRatio) / 2
const imageLgWidth = imageHalfWidth - 10 * ENV.pxRatio // 8 -> 10
const imageSmWidth = imageHalfWidth / 2 - 14 * ENV.pxRatio // 16 -> 14

const Gallery = ({ className, nickName, data }) => {
  const [lg, ...md] = data
  return (
    <View className={classNames(cls, className)}>
      <SectionTitle text='查看全部' icon='angle-right'>
        {nickName}的更多图片
      </SectionTitle>
      <View className='flex mt-30'>
        <CImage src={lg} width={transform(imageLgWidth)} radius='sm' />
        <View className='flex flex-wrap ml-16'>
          {md.map((item, index) => (
            <CImage
              key={item}
              className={classNames({
                'ml-16': index % 2 !== 0,
                'mt-16': index > 1
              })}
              src={item}
              width={transform(imageSmWidth)}
              radius='sm'
            />
          ))}
        </View>
      </View>
    </View>
  )
}

Gallery.defaultProps = {
  className: '',
  nickName: '',
  data: ['', '']
}

Gallery.options = {
  addGlobalClass: true
}

export default observer(Gallery)
