'use strict';

const router = require('express').Router();
const Oprate = require('../collections/oprate');

const log = require('../services/logger').createLogger('userAuthentication');

/**
 * @api {post} /v1/auth/register Oprate Register
 * @apiName OprateRegister
 * @apiGroup userAuthentication
 *
 * @apiParam {String} name  New user's name.
 * @apiParam {String} equipmentNumber  New user's password.
 * @apiParam {String} acquisition  New user's name.
 * @apiParam {String} instrument  New user's password.
 * @apiParam {String} instrumentNumber  New user's password.
 * @apiParam {String} value  New user's password.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "username": "gushen",
 *       "message": "Oprate registered successful"
 *     }
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Oprate register failure!"
 *    }
 */
function getLONGBO(doc) {
  const obj = {
    name: 'LONGBO',
    equipmentNumber: '',
    acquisition: [],
    instrument: {
      instrumentNumber: '',
      value: []
    }
  };
  obj.equipmentNumber = doc.LONGBO.slice(0, 4);
  if (doc.LONGBO.slice(0, 4) === 'AA02') {
    for (let i = 4; i <= 10;) {
      obj.acquisition.push({
        acquisitionChannel: doc.LONGBO.slice(i, i + 4),
        value: doc.LONGBO.slice(i + 4, i + 6)
      });
      i += 6;
    }
    obj.instrument.instrumentNumber = doc.LONGBO.slice(16, 20);
    for (let i = 20; i < (doc.LONGBO.length - 20);) {
      obj.instrument.value.push(doc.LONGBO.slice(i, i + 8));
      i += 8;
    }
  } else if (doc.LONGBO.slice(0, 4) === 'AA03') {
    for (let i = 4; i <= 10;) {
      obj.acquisition.push({
        acquisitionChannel: doc.LONGBO.slice(i, i + 4),
        value: doc.LONGBO.slice(i + 4, i + 6)
      });
      i += 6;
    }
    delete obj.instrument;
  } else if (doc.LONGBO.slice(0, 4) === 'AA04') {
    for (let i = 4; i <= 10;) {
      obj.acquisition.push({
        acquisitionChannel: doc.LONGBO.slice(i, i + 4),
        value: doc.LONGBO.slice(i + 4, i + 6)
      });
      i += 6;
    }
    obj.instrument.instrumentNumber = doc.LONGBO.slice(16, 20);
    for (let i = 20; i < (doc.LONGBO.length - 20);) {
      obj.instrument.value.push(doc.LONGBO.slice(i, i + 8));
      i += 8;
    }
  } else {
    return;
  }
  return obj;
}

router.post('/oprate', function(req, res, next) {
  const doc = req.body;
  console.log(doc);
  const obj = getLONGBO(doc);
  if (obj) {
    Oprate.create(getLONGBO(doc), function(err, res) {
      if (err) {
        log.error(err);
      }
    });
  }
});

/**
 * @api {get} /v1/auth/register Oprate get
 * @apiName OprateGet
 * @apiGroup oprate
 *
 * @apiSuccess {string} name  The name of company(公司名称).
 * @apiSuccess {object} instrument  Equipment name（设备名称）.
 * @apiSuccess {array} value  Device value（设备值）.
 * @apiSuccess {date} timestamp  Time to add data（添加数据的时间）.
 * @apiSuccess {string} equipmentNumber Acquisition device number（采集设备编号）.
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
 *        "equipmentNumber": "AA04",
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
 *      "message": "Oprate register failure!"
 *    }
 */
router.get('/', function(req, res, next) {
  Oprate.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});

/**
 * @api {delete} /v1/auth/register Oprate delete
 * @apiName OprateGet
 * @apiGroup oprate
 *
 * @apiSuccess {string} name  The name of company.
 * @apiSuccess {object} instrument  Equipment name.
 * @apiSuccess {array} value  Device value.
 * @apiSuccess {date} timestamp  Time to add data.
 * @apiSuccess {string} equipmentNumber Acquisition device number.
 * @apiSuccess {array} acquisition  Digital acquisition channel.
 * @apiSuccess {string} acquisitionChannel Digital acquisition channel model.
 * @apiSuccess {string} value  Digital acquisition channel model value.
 * @apiSuccess {date} createdAt  Time to get doc.
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
 *        "equipmentNumber": "AA04",
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
 *      "message": "Oprate register failure!"
 *    }
 */
router.delete(':id', function(req, res, next) {
  Oprate.findByIdAndRemove({}).then((doc) => {
    res.status(200).json(doc);
  });
});


module.exports = router;
