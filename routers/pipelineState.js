'use strict';

const router = require('express').Router();
const PipelineState = require('../collections/pipelineState');

const log = require('../services/logger').createLogger('userAuthentication');

const localDate = require('../utils/time').localDate;
const getState = require('../services/pipelineState').getState;
/**
 * @api {get} /v1/pipeline/:pipelineId PipelineState get
 * @apiName PipelineStateGet
 * @apiGroup pipelineState
 *
 * @apiSuccess {String} state  The state of PipelineState(流水线状态:off(关机), on(运行), pending(待机)).
 * @apiSuccess {date} startTime  The startTime of PipelineState(流水线状态开始时间).
 * @apiSuccess {date} endTime  The endTime of PipelineState(流水线状态结束时间).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *    {
 *        "_id": "5d80b45533495b71f34654a3",
 *        "state": "pending",
 *        "startTime": "2019-09-17T10:23:40.011Z",
 *        "endTime": "2019-09-17T10:24:21.378Z",
 *        "difTime": 69212,
 *        "count": 2212,
 *        "createdAt": "2019-09-17T10:24:21.388Z",
 *        "updatedAt": "2019-09-17T10:24:21.388Z",
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
 *      "message": "PipelineState register failure!"
 *    }
 */


router.get('/pipeline/:pipelineId', function(req, res, next) {
  const pipelineId = req.params.pipelineId;
  PipelineState.find({
    pipelineId: pipelineId
  }).then((doc) => {
    log.info('Get data success');
    res.status(200).json(doc);
  });
});


/**
 * @api {post} /v1/pipelineState/search PipelineState search
 * @apiName PipelineStateSearch
 * @apiGroup pipelineState
 *
 * @apiParam {String} start  The startTime of pipelineState.
 * @apiParam {String} end  The endTime of pipelineState.
 * @apiParam {String} pipelineId  The pipelineId of pipelineState.
 *
 * @apiSuccess {String} state  The state of PipelineState(流水线状态:off(关机), on(运行), pending(待机)).
 * @apiSuccess {date} startTime  The startTime of PipelineState(流水线状态开始时间).
 * @apiSuccess {date} endTime  The endTime of PipelineState(流水线状态结束时间).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *    {
 *        "_id": "5d80b45533495b71f34654a3",
 *        "pipelineId": "5d7f03636278515386017dc7",
 *        "state": "pending",
 *        "startTime": "2019-09-17T10:23:40.011Z",
 *        "endTime": "2019-09-17T10:24:21.378Z",
 *        "difTime": 69212,
 *        "count": 2212,
 *        "createdAt": "2019-09-17T10:24:21.388Z",
 *        "updatedAt": "2019-09-17T10:24:21.388Z",
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
 *      "message": "PipelineState register failure!"
 *    }
 */

router.post('/search', function(req, res) {
  getState();
  const start = localDate(req.body.start);
  const end = localDate(req.body.end);
  console.log(start)
  console.log(end)
  const pipelineId = req.body.pipelineId;
  PipelineState.find({
    $and: [{
      'startTime': {
        '$gte': start,
        '$lte': end
      }
    }, {
      'pipelineId': pipelineId
    }]
  }).sort({
    'startTime': 1
  }).then((doc) => {
    log.info('Search PipelineState');
    // console.log(doc[doc.length - 1])
    // doc[doc.length - 1].endTime = '2019-09-22T00:00:00.000Z'
    // eslint-disable-next-line max-len
    // doc[doc.length - 1].difTime = 116009542 - (new Date('2019-09-22T16:46:41.099Z').getTime() - new Date('2019-09-22T16:46:41.099Z').getTime())
    // console.log(doc[doc.length - 1])
    res.status(200).json(doc);
  });
});

/**
 * @api {post} /v1/pipelineState/time PipelineState time
 * @apiName PipelineStateTime
 * @apiGroup pipelineState
 *
 * @apiParam {String} start  The startTime of pipelineState.
 * @apiParam {String} end  The endTime of pipelineState.
 *
 * @apiSuccess {Number} offTime  The time of off(关闭的时间).
 * @apiSuccess {Number} onTime  The time of on(运行的时间).
 * @apiSuccess {Number} pendingTime  The time of pending(空转的时间).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "offTime": 3163746,
 *    "onTime": 787098,
 *    "pendingTime": 706623
 *}
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "PipelineState register failure!"
 *    }
 */
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
}

// 放弃
router.post('/time', function(req, res) {

  const start = localDate(req.body.start);
  const end = localDate(req.body.end);


  PipelineState.find({
    'createdAt': {
      '$gte': start,
      '$lte': end
    }
  }).then((doc) => {
    getTime(doc).then((data) => {
      log.info('Search time');
      res.status(200).json(data);
    });
  });
});

// {
// 	"_id" : ObjectId("5d89dee56d385020a05c0526"),
// 	"state" : "off",
// 	"startTime" : ISODate("2019-09-24T09:10:59.670Z"),
// 	"endTime" : ISODate("2019-09-24T23:11:34.167Z"),
// 	"difTime" : 50434497,
// 	"count" : 8862,
// 	"createdAt" : ISODate("2019-09-24T09:16:21.380Z"),
// 	"updatedAt" : ISODate("2019-09-24T23:11:34.167Z"),
// 	"__v" : 0
// }
// 2019-09-24T16:00:00.007Z
// db.pipelinestates.findByIdAndUpdate({
//   _id: '5d89dee56d385020a05c0526'
// }, {
//   $set: {
//     endTime: '2019-09-24T16:00:00.007Z',
//     difTime: '24541000'
//   }
// }, {
//   new: true,
//   upsert: true,
//   setDefaultsOnInsert: true,
//   setOnInsert: true
// })
router.put('/', function(req, res) {
  const {
    _id,
    endTime,
    difTime,
    startTime,
    createdAt,
    pipelineId,
  } = req.body;
  PipelineState.findByIdAndUpdate({
    _id: _id
  }, {
    $set: {
      endTime: endTime,
      difTime: difTime,
      startTime: startTime,
      createdAt: createdAt,
      pipelineId: pipelineId
    }
  }, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    setOnInsert: true
  }, function(err, doc) {
    log.info(doc);
  });
});

router.post('/', function(req, res) {
  const data = req.body;
  // console.log(data)
  PipelineState.create(data).then((doc) => {
    log.info(doc);
  });
});

module.exports = router;
