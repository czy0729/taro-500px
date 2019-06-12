/* eslint-disable */
Object.defineProperty(exports, '__esModule', { value: true })
var _jsxFileName =
  '/Users/luckyadam/Dev/jdc/taro/packages/taro-components-rn/src/components/Button/index.js'
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()
var _react = require('react')
var React = _interopRequireWildcard(_react)
var _reactNative = require('react-native')
var _styles = require('./styles')
var _styles2 = _interopRequireDefault(_styles)
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  } else {
    var newObj = {}
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key]
      }
    }
    newObj.default = obj
    return newObj
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}
var _Button = (function(_React$Component) {
  _inherits(_Button, _React$Component)
  function _Button() {
    var _ref
    var _temp, _this, _ret
    _classCallCheck(this, _Button)
    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }
    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        (_ref = _Button.__proto__ || Object.getPrototypeOf(_Button)).call.apply(
          _ref,
          [this].concat(args)
        )
      )),
      _this)),
      (_this.state = {
        valve: new _reactNative.Animated.Value(0),
        isHover: false
      }),
      (_this._simulateNativePress = function() {
        _this.$touchable.touchableHandlePress()
      }),
      (_this.animate = function() {
        if (!_this.props.loading) return
        _reactNative.Animated.sequence([
          _reactNative.Animated.timing(_this.state.valve, {
            toValue: 1,
            easing: _reactNative.Easing.linear,
            duration: 1000
          }),
          _reactNative.Animated.timing(_this.state.valve, {
            toValue: 0,
            duration: 0
          })
        ]).start(function() {
          _this.animate()
        })
      }),
      (_this.onPress = function(evt) {
        var _this$props = _this.props,
          disabled = _this$props.disabled,
          onClick = _this$props.onClick
        !disabled && onClick && onClick(evt)
      }),
      (_this.onPressIn = function() {
        _this.setState({ isHover: true })
      }),
      (_this.onPressOut = function() {
        _this.setState({ isHover: false })
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    )
  }
  _createClass(_Button, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.animate()
      }
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (!prevProps.loading && this.props.loading) {
          this.animate()
        }
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var _props = this.props,
          style = _props.style,
          children = _props.children,
          size = _props.size,
          type = _props.type,
          plain = _props.plain,
          disabled = _props.disabled,
          loading = _props.loading,
          hoverStyle = _props.hoverStyle,
          hoverStartTime = _props.hoverStartTime,
          hoverStayTime = _props.hoverStayTime
        var isDefaultSize = size === 'default'
        var isDefaultType = type === 'default'
        var themeColorMap = {
          default: ['#F8F8F8', '#f7f7f7'],
          primary: ['#1AAD19', '#9ED99D'],
          warn: ['#E64340', '#EC8B89']
        }
        var themeColor =
          plain && isDefaultType
            ? 'rgba(53,53,53,' + (disabled ? 0.6 : 1) + ')'
            : themeColorMap[type][disabled ? 1 : 0]
        var backgroundColor = plain ? 'transparent' : themeColor
        var borderStyle = plain && { borderWidth: 1, borderColor: themeColor }
        var textColor = plain
          ? themeColor
          : isDefaultType
          ? 'rgba(0,0,0,' + (disabled ? 0.3 : 1) + ')'
          : 'rgba(255,255,255,' + (disabled ? 0.6 : 1) + ')'
        var rotateDeg = this.state.valve.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
        return React.createElement(
          _reactNative.TouchableOpacity,
          {
            activeOpacity: 1,
            delayPressIn: hoverStartTime,
            delayPressOut: hoverStayTime,
            onPress: this.onPress,
            onPressIn: this.onPressIn,
            onPressOut: this.onPressOut,
            ref: function ref(touchable) {
              _this2.$touchable = touchable
            },
            __source: { fileName: _jsxFileName, lineNumber: 146 }
          },
          React.createElement(
            _reactNative.View,
            {
              style: [
                _styles2.default.btn,
                !isDefaultSize && _styles2.default.btnMini,
                { backgroundColor: backgroundColor },
                borderStyle,
                style,
                this.state.isHover && hoverStyle
              ],
              __source: { fileName: _jsxFileName, lineNumber: 156 }
            },
            loading &&
              React.createElement(
                _reactNative.Animated.View,
                {
                  style: [
                    _styles2.default.loading,
                    { transform: [{ rotate: rotateDeg }] }
                  ],
                  __source: { fileName: _jsxFileName, lineNumber: 167 }
                },
                React.createElement(_reactNative.Image, {
                  source:
                    type === 'warn'
                      ? require('./assets/loading-warn.png')
                      : require('./assets/loading.png'),
                  style: _styles2.default.loadingImg,
                  __source: { fileName: _jsxFileName, lineNumber: 170 }
                })
              ),
            typeof children === 'string'
              ? React.createElement(
                  _reactNative.Text,
                  {
                    style: [
                      _styles2.default.btnText,
                      !isDefaultSize && _styles2.default.btnTextMini,
                      { color: textColor }
                    ],
                    __source: { fileName: _jsxFileName, lineNumber: 176 }
                  },
                  children
                )
              : children
          )
        )
      }
    }
  ])
  return _Button
})(React.Component)
_Button.defaultProps = {
  size: 'default',
  type: 'default',
  hoverStartTime: 20,
  hoverStayTime: 70
}
exports.default = _Button
