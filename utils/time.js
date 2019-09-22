// 获取时间（排除无difTime属性）
function getTime(doc) {
  return new Promise(function(resolve, reject) {
    const time = {
      offTime: 0,
      onTime: 0,
      pendingTime: 0
    };

    for (let i = 0; i < doc.length; i++) {
      if (doc[i].difTime !== undefined) {
        const docDifTime = doc[i].difTime;
        if (doc[i].state === 'off') {
          time.offTime += docDifTime;
        }
        if (doc[i].state === 'on') {
          time.onTime += docDifTime;
        }
        if (doc[i].state === 'pending') {
          time.pendingTime += docDifTime;
        }
      }
    }
    resolve(time);
  });
};


// 获取时间范围
/**
 * 
 * @param {*} duration day yester week month
 */
function getDuration(duration) {
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

const durationType = {
  latestDay: getDuration('day'),
  yesterday: getDuration('yester'),
  week: getDuration('week'),
  month: getDuration('month')
}

module.exports = {
  getTime
}

