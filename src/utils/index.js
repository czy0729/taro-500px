/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:56:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-07 14:06:24
 */
import Taro from '@tarojs/taro'

const PAGE_WEBVIEW = '/pages/webview/index'

/**
 * @todo 深拷贝
 * @param {*} target
 */
export function deepmerge(target) {
  return JSON.parse(JSON.stringify(target))
}

/**
 * 跳转
 * @param {*} url
 * @param {*} options
 */
export function push(url, options) {
  Taro.navigateTo({
    url,
    ...options
  })
}

/**
 * // NOTE 后端返回的 url 可能是网页链接，需要在 webview 中打开
 * 也可能是小程序自身的链接，只能用 navigate/redirect 之类的打开
 * 就需要有个地方统一判断处理
 */
export function jump(options) {
  const { url, title = '', payload = {}, method = 'navigateTo' } = options

  if (/^https?:\/\//.test(url)) {
    Taro[method]({
      url: `${PAGE_WEBVIEW}?${urlStringify({ url, title })}`
    })
  } else if (/^\/pages\//.test(url)) {
    // TODO H5 不支持 switchTab，暂时 hack 下
    if (process.env.TARO_ENV === 'h5' && method === 'switchTab') {
      Taro.navigateBack({ delta: Taro.getCurrentPages().length - 1 })
      setTimeout(() => {
        Taro.redirectTo({ url })
      }, 100)
      return
    }

    Taro[method]({
      url: `${url}?${urlStringify(payload)}`
    })
  }
}

/**
 * 返回timestamp
 * @version 170814 1.0
 * @version 181107 1.1
 * @param  {String} date  指定时间，例2018/11/11 00:00:00
 * @return {Int}    时间戳
 */
// eslint-disable-next-line no-shadow
export function getTimestamp(date) {
  if (date) {
    return Math.floor(new Date(date.replace(/-/g, '/')).valueOf() / 1000)
  }
  return Math.floor(new Date().valueOf() / 1000)
}

/**
 *
 * @version 190221 1.0
 * @param {*} payload
 * @param {*} encode
 */
export function urlStringify(payload, encode = true) {
  const arr = Object.keys(payload).map(
    key => `${key}=${encode ? encodeURIComponent(payload[key]) : payload[key]}`
  )
  return arr.join('&')
}

/**
 * 补零
 * @version 190301 1.0
 * @param {*} n
 * @param {*} c
 */
export function pad(n, c) {
  if ((n = n + '').length < c) {
    return new Array(++c - n.length).join('0') + n
  } else {
    return n
  }
}

/**
 * 睡眠函数
 * @version 180417 1.0
 * @return {Promise}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 和PHP一样的时间戳格式化函数
 * @version 160421 1.0
 * @version 170104 1.1 变得可以省略format
 * @param  {String} format    格式化格式
 * @param  {Int}    timestamp 时间戳
 * @return {String}
 */
/* eslint-disable */
export function date(format, timestamp) {
  // 假如第二个参数不存在，第一个参数作为timestamp
  if (!timestamp) {
    timestamp = format
    format = 'Y-m-d H:i:s'
  }

  let jsdate = timestamp ? new Date(timestamp * 1000) : new Date()
  let txt_weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  let txt_ordin = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    21: 'st',
    22: 'nd',
    23: 'rd',
    31: 'st'
  }
  let txt_months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  let f = {
    d: function() {
      return pad(f.j(), 2)
    },
    D: function() {
      t = f.l()
      return t.substr(0, 3)
    },
    j: function() {
      return jsdate.getDate()
    },
    l: function() {
      return txt_weekdays[f.w()]
    },
    N: function() {
      return f.w() + 1
    },
    S: function() {
      return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
    },
    w: function() {
      return jsdate.getDay()
    },
    z: function() {
      return (
        ((jsdate - new Date(jsdate.getFullYear() + '/1/1')) / 86400000) >> 0
      )
    },
    W: function() {
      let a = f.z(),
        b = 364 + f.L() - a
      let nd2,
        nd = (new Date(jsdate.getFullYear() + '/1/1').getDay() || 7) - 1
      if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
        return 1
      } else {
        if (a <= 2 && nd >= 4 && a >= 6 - nd) {
          nd2 = new Date(jsdate.getFullYear() - 1 + '/12/31')
          return date('W', Math.round(nd2.getTime() / 1000))
        } else {
          return (1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7)) >> 0
        }
      }
    },
    F: function() {
      return txt_months[f.n()]
    },
    m: function() {
      return pad(f.n(), 2)
    },
    M: function() {
      t = f.F()
      return t.substr(0, 3)
    },
    n: function() {
      return jsdate.getMonth() + 1
    },
    t: function() {
      let n
      if ((n = jsdate.getMonth() + 1) == 2) {
        return 28 + f.L()
      } else {
        if ((n & 1 && n < 8) || (!(n & 1) && n > 7)) {
          return 31
        } else {
          return 30
        }
      }
    },
    L: function() {
      let y = f.Y()
      return !(y & 3) && (y % 100 || !(y % 400)) ? 1 : 0
    },
    Y: function() {
      return jsdate.getFullYear()
    },
    y: function() {
      return (jsdate.getFullYear() + '').slice(2)
    },
    a: function() {
      return jsdate.getHours() > 11 ? 'pm' : 'am'
    },
    A: function() {
      return f.a().toUpperCase()
    },
    B: function() {
      let off = (jsdate.getTimezoneOffset() + 60) * 60
      let theSeconds =
        jsdate.getHours() * 3600 +
        jsdate.getMinutes() * 60 +
        jsdate.getSeconds() +
        off
      let beat = Math.floor(theSeconds / 86.4)
      if (beat > 1000) {
        beat -= 1000
      }
      if (beat < 0) {
        beat += 1000
      }
      if (String(beat).length == 1) {
        beat = '00' + beat
      }
      if (String(beat).length == 2) {
        beat = '0' + beat
      }
      return beat
    },
    g: function() {
      return jsdate.getHours() % 12 || 12
    },
    G: function() {
      return jsdate.getHours()
    },
    h: function() {
      return pad(f.g(), 2)
    },
    H: function() {
      return pad(jsdate.getHours(), 2)
    },
    i: function() {
      return pad(jsdate.getMinutes(), 2)
    },
    s: function() {
      return pad(jsdate.getSeconds(), 2)
    },
    O: function() {
      let t = pad(Math.abs((jsdate.getTimezoneOffset() / 60) * 100), 4)
      if (jsdate.getTimezoneOffset() > 0) {
        t = '-' + t
      } else {
        t = '+' + t
      }
      return t
    },
    P: function() {
      let O = f.O()
      return O.substr(0, 3) + ':' + O.substr(3, 2)
    },
    c: function() {
      return (
        f.Y() +
        '-' +
        f.m() +
        '-' +
        f.d() +
        'T' +
        f.h() +
        ':' +
        f.i() +
        ':' +
        f.s() +
        f.P()
      )
    },
    U: function() {
      return Math.round(jsdate.getTime() / 1000)
    }
  }
  return format.replace(/[\\]?([a-zA-Z])/g, function(t, s) {
    let ret = ''
    if (t != s) {
      ret = s
    } else {
      if (f[s]) {
        ret = f[s]()
      } else {
        ret = s
      }
    }
    return ret
  })
}
/* eslint-enable */

/**
 * 时间戳距离现在时间的描述
 * @version 170217 1.0
 * @version 170605 1.1 修复年份非常小导致的问题
 * @version 180628 1.2 [+]simple
 * @param  {String} *timestamp         时间戳
 * @param  {String} overDaysToShowTime 多少天之后就显示具体时间
 * @return {String} simple             简单模式
 */
export function lastDate(timestamp, overDaysToShowTime = 365, simple = true) {
  const d = new Date(timestamp * 1000)
  const _date = `${d.getFullYear()}/${d.getMonth() +
    1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  const dateTime = new Date(_date)
  const currentTime = new Date()

  if (overDaysToShowTime) {
    if (
      Math.floor((currentTime - d) / 1000 / (60 * 60 * 24)) > overDaysToShowTime
    )
      return date(timestamp)
  }

  let totalTime = currentTime.getTime() - dateTime.getTime()
  let _, years, months, weeks, days, hours, minutes
  const getNumber = () => Math.floor(totalTime / _)
  const modTimestamp = () => totalTime % _

  _ = 1000 * 60 * 60 * 24 * 365
  years = getNumber()
  totalTime = modTimestamp()

  _ = 1000 * 60 * 60 * 24 * 30
  months = getNumber()
  totalTime = modTimestamp()

  if (years > 0) return simple ? `${years}年前` : `${years}年${months}月前`

  _ = 1000 * 60 * 60 * 24 * 7
  weeks = getNumber()
  totalTime = modTimestamp()

  if (months > 0) return simple ? `${months}月前` : `${months}月${weeks}周前`

  _ = 1000 * 60 * 60 * 24
  days = getNumber()
  totalTime = modTimestamp()

  if (weeks > 0) return simple ? `${weeks}周前` : `${weeks}周${days}天前`

  _ = 1000 * 60 * 60
  hours = getNumber()
  totalTime = modTimestamp()

  if (days > 0) return simple ? `${days}天前` : `${days}天${hours}时前`

  _ = 1000 * 60
  minutes = getNumber()
  totalTime = modTimestamp()

  if (hours > 0) return simple ? `${hours}时前` : `${hours}时${minutes}分前`

  if (minutes > 0) return `${minutes}分前`

  return '刚刚'
}

/**
 * 字符串填充
 * @version 171011 1.0
 * @param {*} str
 * @param {*} len
 */
export function fill(str, len = 32) {
  if (str.length > len) return str
  for (let i = str.length; i < len; i++) {
    str += ' '
  }
  return str
}

/**
 * 测试log
 * @version 171024 0.1
 * @version 181101 1.0 测试环境才显示
 * @param {String} type  消息类型
 * @param {String} key   消息键
 * @param {Any}    value 消息值
 */
export function log(type, key, value, ...other) {
  const res = [
    '[DEV]',
    '|',
    date('H:i:s', new Date().valueOf() / 1000),
    '|',
    fill(type, 6),
    '|',
    fill(key, 24),
    '|',
    fill(value, 24)
  ]
  if (other && other.length) {
    res.push('|', other)
  }
  console.log(...res)
}

/**
 * @version 190306 1.0
 * @param {*} key
 */
export function getStorage(key) {
  return Taro.getStorage({ key })
    .then(res => res.data)
    .catch(() => '')
}

/**
 * @version 190306 1.0
 * @param {*} key
 * @param {*} data
 */
export function setStorage(key, data = '') {
  return Taro.setStorage({ key, data })
}

/**
 * HTML压缩
 * @param {*} str
 */
export function HTMLTrim(str = '') {
  return (
    str
      // .replace(/<!--.*?-->/gi, '')
      // .replace(/\/\*.*?\*\//gi, '')
      // .replace(/[ ]+</gi, '<')
      // eslint-disable-next-line no-control-regex, no-tabs
      .replace(/\n+|\s\s\s*|\t/g, '')
      .replace(/"class="/g, '" class="')
  )
}

/**
 * h5测试
 * 190228 v1.0
 * @param {*} config
 * @param {*} stateKey
 * @return {Promise}
 */
export function dev(key, store) {
  if (process.env.TARO_ENV === 'h5') {
    if (!window.Stores) {
      window.Stores = {
        toJS: () => {
          const stores = {}
          Object.keys(window.Stores).forEach(storeKey => {
            if (window.Stores[storeKey].toJS) {
              stores[storeKey] = window.Stores[storeKey].toJS()
            }
          })
          console.log(stores)
        }
      }
    }
    window.Stores[key] = store
  }

  if (process.env.TARO_ENV === 'weapp') {
  }
}

// window.Utils
if (process.env.TARO_ENV === 'h5') {
  if (!window.Utils) {
    window.Utils = {
      ...module.__proto__.exports
    }
  }
}
