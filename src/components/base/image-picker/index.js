/*
 * @Author: czy0729
 * @Date: 2019-07-23 13:48:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-31 12:01:16
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import CImage from '../c-image'
import Iconfont from '../iconfont'
import './index.scss'

const cls = 'c-image-picker'
const ENV = Taro.getEnv()

export default class ImagePicker extends Component {
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
    const filePathName =
      ENV === Taro.ENV_TYPE.ALIPAY ? 'apFilePaths' : 'tempFiles'
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
        const targetFiles = res.tempFilePaths.map((path, i) => ({
          url: path,
          file: res[filePathName][i]
        }))
        const newFiles = files.concat(targetFiles)
        onChange(newFiles, 'add')
      })
      .catch(onFail)
  }

  handleImageClick = index => {
    const { files, onImageClick } = this.props
    onImageClick(index, files[index])
  }

  handleRemoveImg = index => {
    const { files, onChange } = this.props
    if (ENV === Taro.ENV_TYPE.WEB) {
      window.URL.revokeObjectURL(files[index].url)
    }
    const newFiles = files.filter((file, i) => i !== index)
    onChange(newFiles, 'remove', index)
  }

  render() {
    const { className, style, files } = this.props
    return (
      <View
        className={classNames(cls, 'flex flex-wrap', className)}
        style={style}
      >
        {files.map((item, index) => (
          <View key={item.url} className={`${cls}__item`}>
            <View
              className={`${cls}__delete flex flex-justify-center`}
              onClick={() => this.handleRemoveImg(index)}
            >
              <Iconfont className='t-22 t-plain' name='close' />
            </View>
            <CImage
              src={item.url}
              width={Taro.pxTransform(176)}
              radius='xs'
              onClick={() => this.handleImageClick(index)}
            />
          </View>
        ))}
        <View
          className={`${cls}__item ${cls}__choose`}
          onClick={this.chooseFile}
        >
          <Iconfont className='t-48 t-default' name='plus' />
        </View>
      </View>
    )
  }
}
