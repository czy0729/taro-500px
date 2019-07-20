/*
 * @Author: czy0729
 * @Date: 2019-06-17 17:26:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-20 16:42:05
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
const imageLgWidth = imageHalfWidth - 8 * ENV.pxRatio
const imageSmWidth = imageHalfWidth / 2 - 12 * ENV.pxRatio

const Gallery = ({ className, nickName, data }) => {
  const [lg, ...md] = data
  return (
    <View className={classNames(cls, className)}>
      <SectionTitle
        desc={`${nickName}的更多图片`}
        text='查看全部'
        icon='angle-right'
      />
      <View className='flex'>
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
