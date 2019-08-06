/*
 * @Author: czy0729
 * @Date: 2019-08-06 11:22:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-06 14:23:21
 */
import { pxRatio } from '@constants'

export const cls = 'c-image-moveable-picker'

export const imageWidth = 176
export const imageMargin = 24

const lineHeight = imageWidth + imageMargin
export const moveableViewHeight = {
  0: lineHeight,
  1: lineHeight,
  2: lineHeight,
  3: lineHeight * 2,
  4: lineHeight * 2,
  5: lineHeight * 2,
  6: lineHeight * 3,
  7: lineHeight * 3,
  8: lineHeight * 3,
  9: lineHeight * 3
}

export const standardPositions = [
  // 第一排
  {
    x: 0,
    y: 0
  },
  {
    x: 0 + imageWidth + imageMargin,
    y: 0
  },
  {
    x: 0 + imageWidth + imageMargin + imageWidth + imageMargin,
    y: 0
  },
  // 第二排
  {
    x: 0,
    y: 0 + imageWidth + imageMargin
  },
  {
    x: 0 + imageWidth + imageMargin,
    y: 0 + imageWidth + imageMargin
  },
  {
    x: 0 + imageWidth + imageMargin + imageWidth + imageMargin,
    y: 0 + imageWidth + imageMargin
  },
  // 第三排
  {
    x: 0,
    y: 0 + imageWidth + imageMargin + imageWidth + imageMargin
  },
  {
    x: 0 + imageWidth + imageMargin,
    y: 0 + imageWidth + imageMargin + imageWidth + imageMargin
  },
  {
    x: 0 + imageWidth + imageMargin + imageWidth + imageMargin,
    y: 0 + imageWidth + imageMargin + imageWidth + imageMargin
  },
  // 防止添加按钮报错 ，虽然报错的时候添加按钮是隐藏的 但是还是先保留。
  {
    x: 0,
    y: 0
  },
  {
    x: 0,
    y: 0
  }
]

/**
 * 移动数组的一个条目到另一个位置
 */
export function sortArr(arr, fromIndex, toIndex) {
  let files = arr.slice(0, arr.length)
  let newArr = []
  for (let i = 0; i < files.length; i++) {
    if (i == toIndex) {
      // 当前拖动的这条
      newArr.push(files[fromIndex])
    } else {
      newArr.push('')
    }
  }
  files.splice(fromIndex, 1)
  for (let i = 0, j = 0; i < newArr.length, j < files.length; i++, j++) {
    // 新数组为空 则填入
    if (!newArr[i]) {
      newArr[i] = files[j]
    } else {
      j--
    }
  }
  return newArr
}

/**
 * 根据坐标计算当前图片移动到了哪个索引应该存在的位置，返回索引值
 */
export function calculateTargetIndex(detail) {
  // 80的目的是为了更接近用户手指按下的位置
  let x = detail.x / pxRatio + 80
  let y = detail.y / pxRatio + 80
  let index = -1
  if (y <= 200) {
    // 第一行
    if (x <= 200) {
      // 第1个
      index = 0
    } else if (x >= 200 && x <= 410) {
      // 第2个
      index = 1
    } else if (x >= 410 && x <= 620) {
      // 第3个
      index = 2
    }
  } else if (y >= 200 && y <= 410) {
    // 第二行
    if (x <= 200) {
      // 第4个
      index = 3
    } else if (x >= 200 && x <= 410) {
      // 第5个
      index = 4
    } else if (x >= 410 && x <= 620) {
      // 第6个
      index = 5
    }
  } else if (y >= 410 && y <= 620) {
    // 第三行
    if (x <= 200) {
      // 第7个
      index = 6
    } else if (x >= 200 && x <= 410) {
      // 第8个
      index = 7
    } else if (x >= 410 && x <= 620) {
      // 第9个
      index = 8
    }
  }
  return index
}
