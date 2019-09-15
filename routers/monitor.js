'use strict';

const router = require('express').Router();
const Monitor = require('../collections/monitor');

const log = require('../services/logger').createLogger('userAuthentication');
const getData = require('../services/type').getData;

/**
 * @api {post} /v1/auth/register Monitor Register
 * @apiName MonitorRegister
 * @apiGroup userAuthentication
 *
 * @apiParam {String} name  New user's name.
 * @apiParam {String} monitorNo  New user's password.
 * @apiParam {String} acquisition  New user's name.
 * @apiParam {String} instrument  New user's password.
 * @apiParam {String} instrumentNumber  New user's password.
 * @apiParam {String} value  New user's password.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "username": "gushen",
 *       "message": "Monitor registered successful"
 *     }
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Monitor register failure!"
 *    }
 */

router.post('/', function(req, res, next) {
  const doc = req.body;
  console.log(doc);
  const obj = getData(doc);
  if (obj) {
    Monitor.create(obj, function(err, res) {
      if (err) {
        log.error(err);
      }
    });
  }
});

/**
 * @api {get} /v1/auth/register Monitor get
 * @apiName MonitorGet
 * @apiGroup monitor
 *
 * @apiSuccess {string} name  The name of company(公司名称).
 * @apiSuccess {object} instrument  Equipment name（设备名称）.
 * @apiSuccess {array} value  Device value（设备值）.
 * @apiSuccess {date} timestamp  Time to add data（添加数据的时间）.
 * @apiSuccess {string} monitorNo Acquisition device number（采集设备编号）.
 * @apiSuccess {array} acquisition  Digital acquisition channel（数据采集通道）.
 * @apiSuccess {string} acquisitionChannel Digital acquisition channel model（数据采集通道模式）.
 * @apiSuccess {string} value  Digital acquisition channel model value（数据采集通道模式的值）.
 * @apiSuccess {date} createdAt  Time to get doc（从集合中获取数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *        "instrument": {
 *            "value": [],
 *            "instrumentNumber": "CD01"
 *        },
 *        "timestamp": "2019-09-12T05:19:27.857Z",
 *        "_id": "5d79d56ce9ec9524c552dea0",
 *        "name": "LONGBO",
 *        "monitorNo": "AA04",
 *        "acquisition": [
 *            {
 *                "_id": "5d79d56ce9ec9524c552dea2",
 *                "acquisitionChannel": "DD01",
 *                "value": "01"
 *            },
 *            {
 *                "_id": "5d79d56ce9ec9524c552dea1",
 *                "acquisitionChannel": "DD02",
 *                "value": "01"
 *            }
 *        ],
 *        "createdAt": "2019-09-12T05:19:40.884Z",
 *        "updatedAt": "2019-09-12T05:19:40.884Z",
 *        "__v": 0
 *    },
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Monitor register failure!"
 *    }
 */
router.get('/all', function(req, res, next) {
  Monitor.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});

module.exports = router;
