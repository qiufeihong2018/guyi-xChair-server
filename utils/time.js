// 获取时间范围
/**
 * 
 * @param {*} duration day yester week month
 */
export function getDuration(duration) {
  let today = +new Date(new Date(new Date().toLocaleDateString()).getTime()) // 今天零点
  let end = +new Date()
  let start = 0
  if (duration === 'month') {
    start = today - 1000 * 60 * 60 * 24 * 30
  } else if (duration === 'week') {
    const day = today - 1000 * 60 * 60 * 24 * 7
    start = today - 1000 * 60 * 60 * 24 * 7
  } else if (duration === 'yester') {
    start = today - 1000 * 60 * 60 * 24
    end = today
  } else {
    start = today
  }

  return {
    start,
    end
  }
}

export const durationType = {
  latestDay: getDuration('day'),
  yesterday: getDuration('yester'),
  week: getDuration('week'),
  month: getDuration('month')
}