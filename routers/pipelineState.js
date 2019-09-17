'use strict';

const router = require('express').Router();
const PipelineState = require('../collections/pipelineState');

const log = require('../services/logger').createLogger('userAuthentication');

/**
 * @api {get} /v1/pipelineState PipelineState get
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
router.get('/', function(req, res, next) {
  PipelineState.find({}).then((doc) => {
    log.info('Get data success');
    res.status(200).json(doc);
  });
});

module.exports = router;
