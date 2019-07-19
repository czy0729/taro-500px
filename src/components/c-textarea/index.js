/*
 * @Author: czy0729
 * @Date: 2019-07-19 10:43:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 10:53:59
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { Textarea } from '@tarojs/components'
import Component from '@components/component'
import { colorDefault } from '@constants/style'
import './index.scss'

const cls = 'c-textarea'

export default class CTextarea extends Component {
  static defaultProps = {
    type: 'text',
    value: '',
    placeholder: '',
    focus: false,
    clear: true, // #todo
    onChange: Function.prototype
  }

  onInput = ({ detail }) => {
    const { onChange } = this.props
    onChange(detail.value)
  }

  render() {
    const { className, style, type, value, placeholder, focus } = this.props
    return (
      <Textarea
        className={classNames(cls, className)}
        style={style}
        type={type}
        value={value}
        focus={focus}
        placeholder={placeholder}
        placeholderStyle={`color: ${colorDefault}`}
        onInput={this.onInput}
      />
    )
  }
}