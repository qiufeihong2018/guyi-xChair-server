'use strict';
const PipelineState = require('../collections/pipelineState');

const log = require('../services/logger').createLogger('userAuthentication');


exports.zeroUpdatePipeState = () => {
  const plState = {
    pipelineId: '',
    state: '',
    startTime: '',
    endTime: '',
    difTime: '',
    count: ''
  };
  PipelineState.find({}).sort({
    createdAt: -1
  }).limit(1).exec((err, data) => {
    // 运行状态业务
    const prevVal = data[0];
    PipelineState.findByIdAndUpdate({
      _id: prevVal._id
    }, {
      $set: {
        endTime: new Date(),
        difTime: new Date() - prevVal.startTime,
        count: prevVal.count
      }
    }, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      setOnInsert: true
    }, function (err, doc) {
      if (err) {
        log.error(err);
      }
      log.info(`Update PipelineState ${prevVal._id} - ${prevVal.state} success`);
      plState.pipelineId = prevVal.pipelineId;
      plState.state = prevVal.state;
      plState.startTime = new Date();
      plState.endTime = new Date();
      plState.difTime = 0;
      plState.count = prevVal.count;
      PipelineState.create(plState, function (err) {
        if (err) {
          console.log(err);
        }
        log.info('Add 00:00:00 pipelineState success');
      });
    });
  });
};

function startUpdateTime(updateTime) {
  const {
    prevVal,
    currentTime,
    difTime
  } = updateTime;
  PipelineState.findByIdAndUpdate({
    _id: prevVal._id
  }, {
    $set: {
      endTime: currentTime,
      difTime: difTime,
      count: prevVal.count
    }
  }, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    setOnInsert: true
  }, function (err, doc) {
    if (err) {
      log.error(err);
    }
    log.info(`Update PipelineState ${prevVal._id} - ${prevVal.state} success`);
  });
}
exports.getState = () => {
  // Simulate off state before next upload of pipelineState
  const plState = {
    pipelineId: '',
    state: '',
    startTime: '',
    endTime: '',
    difTime: '',
    count: ''
  };

  PipelineState.find({}).sort({
    createdAt: -1
  }).limit(1).exec((err, data) => {
    // 运行状态业务
    const prevVal = data[0];
    // 当前时间
    const currentTime = new Date();
    // 上一个pipelineState的结束时间
    const lastTime = prevVal.endTime;
    // 当前时间-上一个pipelineState的结束时间
    const differentTime = currentTime - lastTime;
    // 当前时间-上一个pipelineState的开始时间
    const difTime = currentTime - prevVal.startTime;
    // 判断关闭状态
    if (Math.abs(differentTime) > 300000) {
      plState.pipelineId = prevVal.pipelineId;
      plState.state = 'off';
      plState.startTime = lastTime;
      plState.endTime = currentTime;
      plState.difTime = differentTime;
      plState.count = prevVal.count;

      // 1. 与上一个pipelineState同一个state更新数据
      if (prevVal.state === plState.state) {

        PipelineState.findByIdAndUpdate({
          _id: prevVal._id
        }, {
          $set: {
            endTime: currentTime,
            difTime: difTime,
            count: prevVal.count
          }
        }, {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
          setOnInsert: true
        }, function (err, doc) {
          if (err) {
            log.error(err);
          }
          log.info(`Update PipelineState ${prevVal._id} - ${prevVal.state} success`);
        });
      } else {
        // 1. 与上一个pipelineState的state不相同创建数据
        PipelineState.create(plState, function (err) {
          if (err) {
            console.log(err);
          }
          log.info('Add pipelineState success');
        });
      }
    }
    const updateTime = {
      prevVal,
      currentTime,
      difTime
    };
    startUpdateTime(updateTime);
  });
};

exports.getPipelineState = (obj, probe) => {
  let prevVal = {};
  let difVal = '';
  let difTime = '';
  const plState = {
    pipelineId: '',
    state: '',
    startTime: '',
    endTime: '',
    difTime: '',
    count: ''
  };

  PipelineState.find({}).sort({
    createdAt: -1
  }).limit(1).exec((err, doc) => {
    // 运行状态业务
    prevVal = doc[0];
    difVal = obj.repeatedCounting - prevVal.count;
    difTime = obj.createdAt - prevVal.endTime;

    if (Math.abs(difVal) > 0) {
      plState.state = 'on';
    }
    if (Math.abs(difVal) === 0) {
      if (Math.abs(difTime) > 300000) {
        plState.state = 'off';
      } else {
        plState.state = 'pending';
      }
    }


    if (prevVal.state === plState.state) {
      PipelineState.findByIdAndUpdate({
        _id: prevVal._id
      }, {
        $set: {
          endTime: obj.createdAt,
          difTime: obj.createdAt - prevVal.startTime,
          count: obj.repeatedCounting
        }
      }, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        setOnInsert: true
      }, function (err, doc) {
        if (err) {
          log.error(err);
        }
        log.info(`Update PipelineState ${prevVal._id} - ${prevVal.state}  success`);
      });
    } else {
      plState.difTime = difTime;
      plState.startTime = prevVal.endTime;
      plState.endTime = obj.createdAt;
      plState.count = obj.repeatedCounting;
      plState.pipelineId = probe.pipelineId;
      // console.log(plState);
      PipelineState.create(plState, function (err) {
        if (err) {
          console.log(err);
        }
        log.info('Add status success');
      });
    }
  });
};
