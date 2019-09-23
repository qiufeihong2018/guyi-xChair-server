'use strict';

const router = require('express').Router();
const PipelineCol = require('../collections/pipeline');
const CompanyCol = require('../collections/company');
const PipelineStateCol = require('../collections/pipelineState');
const PipelineModel = require('../models/pipeline');
const ProductCol = require('../collections/product');
const monitorService = require('../services/monitorService');
const MonitorCol = require('../collections/monitor');
const timeUtil = require('../utils/time');

const log = require('../services/logger').createLogger('userAuthentication');

function localDate(v) {
  v = Number(v);
  const d = new Date(v || Date.now());

  // d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString();
}

// 解析power的数据
function processDataOfPower(rawData) {
  return rawData.map(item => {
    return {
      positive: item.value.positiveEnergy,
      negative: item.value.negativeEnergy,
      time: item.createdAt
    };
  });
}

// 解析counter的数据
function processDataOfCounter(rawData) {
  return rawData.map(item => {
    return {
      in: item.value.repeatedCounting, // 入口数
      failed: item.value.defectiveNumber, // 次品数
      out: item.value.productionQuantity, // 出口数
      time: item.createdAt
    };
  });
}

/**
 * @api {get} /v1/pipeline/company/:companyId companyPipeline Get
 * @apiDescription 获取该公司所有生产线
 * @apiName GetPipelineList
 * @apiGroup pipeline
 *
 * @apiParam {string} id  The id of company(公司的id).
 *
 * @apiSuccess {String} _id  The id of pipeline(生产线id值). *
 * @apiSuccess {String} pipelineName  The name of pipeline(流水线名称).
 * @apiSuccess {String} companyId  The id of company(公司id值).
 * @apiSuccess {Array} probeList  The id of pipeline(采集器的id值列表).
 * @apiSuccess {date} createdAt  Time to insert db（数据添加的时间）.
 * @apiSuccess {date} updatedAt  Time to update db（数据更新的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *     {
 *        "_id": "5d7e7cc03af4bf6838e0addc",
 *        "pipelineName": "AA01",
 *        "companyId": "5d7e6459201b65318803e3a2"],
 *        "probeList": [ "5d7e6459201b65318803e3a2", "5d7e6459201b65318803e3a2"],
 *        "createdAt": "2019-09-15T18:02:40.759Z",
 *        "updatedAt": "2019-09-15T18:02:40.759Z",
 *        "__v": 0
 *    },
 *  ]
 */
router.get('/company/:companyId', async (req, res, next) => {
  const {
    companyId: companyId
  } = req.params;
  if (companyId) {
    const doc = await PipelineCol.find({
      companyId: companyId
    });
    res.status(200).json(doc);
  }
});

/**
 * @api {post} /v1/pipeline Pipeline post (新增pipeline)
 * @apiName PipelinePost
 * @apiGroup pipeline
 *
 * @apiParam {string} companyId  The id of pipeline(公司id).
 * @apiParam {string} pipelineName  The name of pipeline(流水线的名字).
 * @apiParam {array} probeList  The list of probe（流水线的id列表）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "data": "Add success",
 *    "status": 200
 *}
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Pipeline register failure!"Pipeline
 *    }
 */
// 传入 pipelineName、companyId、probeList
router.post('/', async (req, res, next) => {
  const { pipelineName, companyId } = req.body;
  const data = req.body;

  const pipeline = await PipelineCol.create(data);

  const company = await CompanyCol.findById(companyId);
  const pipelineList = company.pipelineList;

  CompanyCol.findByIdAndUpdate({
    _id: companyId
  }, {
    $set: {pipelineList: [...pipelineList, pipeline.id]}
  }, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    setOnInsert: true
  }, function(err, doc) {
    if (err) {
      log.error(err);
    }
    res.status(200).json({
      data: 'Update success',
      status: 200
    });
  });
});

/**
 * @api {delete} /v1/pipeline/:id Pipeline delete (删除指定pipeline)
 * @apiName PipelineDelete
 * @apiGroup pipeline
 *
 * @apiParam {string} id  The id of pipeline(流水线的id).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "data": "Delete success",
 *    "status": 200
 *}
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Pipeline register failure!"
 *    }
 */
router.delete('/:id', async(req, res, next) => {
  const id = req.params.id;
  const pipeline = await PipelineCol.findByIdAndRemove({
    _id: id
  });

  const companyId = pipeline.companyId;
  const company = await CompanyCol.findById(companyId);
  const pipelineList = company.pipelineList;
  const index = pipelineList.indexOf(pipeline._id);
  pipelineList.splice(index, 1);


  await CompanyCol.findByIdAndUpdate({
    _id: companyId
  }, {
    $set: {pipelineList: [...pipelineList]}
  }, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    setOnInsert: true
  });

  res.status(200).json({
    data: 'Update success',
    status: 200
  });  

});

/**
 * @api {put} /v1/pipeline Pipeline put
 * @apiName PipelinePut
 * @apiGroup pipeline
 *
 * @apiParam {string} id  The id of pipeline(流水线的id)
 * @apiParam {string} pipelineName  The id of pipeline(流水线的名称).
 * @apiParam {string} companyId  The id of pipeline(公司id).
 * @apiParam {array} probeList  The id list of probe（采集器的id列表）.
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "data": "Update success",
 *    "status": 200
 *}
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Pipeline register failure!"
 *    }
 */
router.put('/', function(req, res, next) {
  const data = req.body;

  PipelineCol.findByIdAndUpdate({
    _id: data.id
  }, {
    $set: data
  }, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    setOnInsert: true
  }, function(err, doc) {
    if (err) {
      log.error(err);
    }
    res.status(200).json({
      data: 'Update success',
      status: 200
    });
  });
});

/**
 * @api {get} /v1/pipeline Pipeline get
 * @apiName PipelineGet
 * @apiGroup pipeline
 *
 * @apiSuccess {String} pipelineName  The name of pipeline(流水线名称).
 * @apiSuccess {String} companyId  The id of company(公司id值).
 * @apiSuccess {Array} probeList  The id of pipeline(采集器的id值列表).
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *     {
 *        "companyId": [],
 *        "probeList": [],
 *        "_id": "5d7e7cc03af4bf6838e0addc",
 *        "pipelineName": "pipeline",
 *        "created_at": "2019-09-15T18:02:40.759Z",
 *        "updatedAt": "2019-09-15T18:02:40.759Z",
 *        "__v": 0
 *    },
 *  ]
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Pipeline register failure!"
 *    }
 */
router.get('/', function(req, res, next) {
  PipelineCol.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});

// 获取生产线详情
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const doc = await PipelineCol.findById(id);
  const pipeline = new PipelineModel(id);
  const state = await pipeline.getCurrentState();
  res.status(200).json(state);
});

// 某个pipeline的当前的(开机、关机、空转)状态
// 基于pipeline的ID查询
router.get('/:id/state', async (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    id: id
  });
});

// 用于多条生产线对比
// 多个pipeline的当前的(开机、关机、空转)状态
// 基于ids这个数组，元素为pipeline的ID
router.post('/list/state', async (req, res, next) => {
  const ids = req.body.ids;
  const pipelineList = await PipelineModel.getListCurrentState(ids);
  res.status(200).json(pipelineList);
});

router.post('/state/stats', async (req, res, next) => {
  // 对 couter、power、electricity 这三个进行统计
  /**
   * id pipelineId
   * dataType counter power
   * durationType today yesterday
   */
  const pipelineId = req.body.id;
  const dataType = req.body.dataType;
  const durationType = req.body.durationType;

  const sqlResult = await monitorService.dataAnalysis(pipelineId, dataType, durationType);
  let result = undefined;
  if (dataType === 'power') {
    result = processDataOfPower(sqlResult);
  } else {
    // counter
    result = processDataOfCounter(sqlResult);
  }
  res.status(200).json({
    data: result
  });
});

// 带着详细的时间节点
// 带start & end
router.post('/stateDetail', async (req, res, next) => {
  const id = req.body.id;
  const dataType = req.body.dataType;
  // const durationType = req.body.durationType; // day 和 yester
  const start = localDate(req.body.start);
  const end = localDate(req.body.end);

  let sqlResult = await MonitorCol.find({
    createdAt: {
      $gte: start,
      $lte: end
    },
    // _id: {$regex: /5$/},
    pipelineId: id,
    dataType: dataType
  });

  let result = undefined;
  if (dataType === 'power') {
    result = processDataOfPower(sqlResult);
  } else {
    // counter
    result = processDataOfCounter(sqlResult);
  }

  res.status(200).json({
    type: dataType,
    data: result
  });
});

// 时间累计
router.post('/state/time', async (req, res, next) => {
  const id = req.body.id;
  const start = localDate(req.body.start);
  const end = localDate(req.body.end);

  // PipelineStateCol.find({
  //   'createdAt': {
  //     '$gte': start,
  //     '$lte': end
  //   }
  // }).then((doc) => {
  //   timeUtil.getTime(doc).then((data) => {
  //     log.info('Search time');
  //     res.status(200).json(data);
  //   });
  // });

  const sqlResult = await PipelineStateCol.find({
    pipelineId: id,
    createdAt: {
      $gte: start,
      $lte: end
    }
  });
  const result = await timeUtil.getTime(sqlResult);

  res.status(200).json({
    data: result
  });
});


router.post('/state', async (req, res, next) => {
  // 对 couter、power、electricity 这三个进行统计
  const { id, type } = req.body;
  const timeSpan = 60 * 60 * 1000;
  const dayStart = +new Date(new Date(new Date().toLocaleDateString()).getTime()) - 24 * timeSpan;
  const dayEnd = dayStart + 24 * timeSpan;

  const timeList = Array.from({ length: 25 }, (_, i) => i-1).map(i => {
    return {
      start: localDate(dayStart + i * timeSpan),
      end: localDate(dayStart + (i + 1) * timeSpan)
    };
  });

  const durationType = {
    latestDay: '', // 
    yesterday: '', // 昨天
    week: '', //
    year: '' // 
  };

  let counter = await MonitorCol.find({
    createdAt: {
      $gte: timeList[0].start,
      $lte: timeList[23].end
    },
    pipelineId: id,
    dataType: 'counter',
  }, {dataType: 1, value:1, createdAt:1});

  const list = [];
  // 数据的value可能不增加；数据可能会丢失
  timeList.map(time => {
    let item = counter.find(el => {
      if ((+ new Date(el.createdAt)) >= (+ new Date(time.start)) && (+ new Date(el.createdAt)) <= (+ new Date(time.end)) ) {
        return true;
      }
    });
    if (!item) return list.push(item);
    return list.push(item.value.productionQuantity);
  });  

  const result = {
    value: list,
    time: ['00:00-01:00','01:00-02:00','02:00-03:00','03:00-04:00','04:00-05:00','05:00-06:00',
          '06:00-07:00','07:00-08:00', '08:00-09:00','09:00-10:00','10:00-11:00','11:00-12:00',
          '12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00',
          '18:00-19:00','19:00-20:00','20:00-21:00','21:00-22:00','22:00-23:00','23:00-24:00']
  };

  // console.log('list', list)


  // const power = await MonitorCol.find({
  //   'createdAt': {
  //     "$gte": start,
  //     "$lte": end
  //   },
  //   'pipelineId': id,
  //   'dataType': 'power'
  // })
  res.status(200).json(result);
});


// 获取该生产线的所有产品
router.get('/:id/product', function(req, res, next) {
  const { id } = req.params;
  if (id) {
    ProductCol.find({
      pipelineId: id
    }).then((doc) => {
      res.status(200).json(doc);
    });
  }
});

module.exports = router;
