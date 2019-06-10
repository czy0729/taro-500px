/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:37:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-10 11:40:45
 */
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-flex'

export default class Flex extends Component {
  static propTypes = {
    direction: PropTypes.oneOf([
      'row',
      'row-reverse',
      'column',
      'column-reverse'
    ]),
    wrap: PropTypes.oneOf(['wrap', 'nowrap']),
    justify: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around']),
    align: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
    className: PropTypes.string,
    styles: PropTypes.object
  }
  static defaultProps = {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'start',
    align: 'center',
    className: '',
    styles: null
  }
  render() {
    const { direction, wrap, justify, align, className, styles } = this.props
    return (
      <View
        className={classNames(
          cls,
          {
            [`${cls}__direction--${direction}`]: !!direction,
            [`${cls}__${wrap}`]: !!wrap,
            [`${cls}__justify--${justify}`]: !!justify,
            [`${cls}__align--${align}`]: !!align
          },
          className
        )}
        style={styles}
      >
        {this.props.children}
      </View>
    )
  }
}
