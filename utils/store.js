/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-10 12:00:33
 */
import {
  // configure,
  extendObservable,
  action,
  toJS
} from 'mobx'
import fetch from '@utils/fetch'

// configure({ enforceActions: 'observed' })

export default class Common {
  /**
   * 统一setState方法
   */
  @action
  setState(state) {
    Object.keys(state).forEach(key => {
      const data = state[key]
      if (!this.state[key]) {
        // 键值不存在时需手动创建观察
        extendObservable(this.state, {
          [key]: data
        })
      } else if (typeof data === 'object' && !Array.isArray(data)) {
        this.state[key] = {
          ...this.state[key],
          ...data
        }
      } else {
        this.state[key] = data
      }
    })
  }

  /**
   * 请求并入库, 请求失败后会在1秒后递归重试
   * @param {*} urlOrConfig
   * @param {*} stateKey
   * @return {Promise}
   */
  async fetch(urlOrConfig, stateKey) {
    let config = {}
    if (typeof urlOrConfig === 'object') {
      config = {
        ...urlOrConfig
      }
    } else {
      config.url = urlOrConfig
    }
    config.retryCb = () => this.fetch(urlOrConfig, stateKey)

    const res = fetch(config)
    const data = await res
    if (Array.isArray(stateKey)) {
      this.setState({
        [stateKey[0]]: {
          [stateKey[1]]: data
        }
      })
    } else {
      this.setState({
        [stateKey]: data || this.state[stateKey]
      })
    }
    return res
  }

  /**
   * 将一个observableObject转化为javascript原生的对象
   * Mobx: toJS(value: any, supportCycles?=true: boolean)
   * @param  {String} key 保存值的键值
   * @return {Object}
   */
  toJS(key) {
    return toJS(this.state[key] || this.state)
  }
}

/**
 * h5测试
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
}
