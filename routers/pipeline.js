'use strict';

const router = require('express').Router();
const Pipeline = require('../collections/pipeline');

const log = require('../services/logger').createLogger('userAuthentication');

/**
 * @api {post} /v1/auth/register Pipeline Register
 * @apiName PipelineRegister
 * @apiGroup userAuthentication
 *
 * @apiParam {String} username  New user's name.
 * @apiParam {String} password  New user's password.
 *
 * @apiSuccess {String} username  The username of the register user.
 * @apiSuccess {string} message  The registering success info.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "username": "gushen",
 *       "message": "Pipeline registered successful"
 *     }
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

router.post('/', function(req, res, next) {
  const obj = {
    lineId: '',
    lineName: '',
    factoryName: '',
    companyName: '',
    equipmentList: []
  };
  Pipeline.create(obj, function(err, res) {
    if (err) {
      log.error(err);
    }
  });
});

/**
 * @api {get} /v1/auth/register Pipeline get
 * @apiName PipelineGet
 * @apiGroup oprate
 *
 * @apiSuccess {Number} lineId  The name of company.
 * @apiSuccess {string} lineName  Equipment name.
 * @apiSuccess {string} factoryName  Device value.
 * @apiSuccess {string} companyName  Time to add data.
 * @apiSuccess {array} equipmentList Acquisition device number.
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
 *      "message": "Pipeline register failure!"
 *    }
 */
router.get('/', function(req, res, next) {
  Pipeline.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});

module.exports = router;
