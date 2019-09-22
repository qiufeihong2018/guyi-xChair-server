'use strict';
const router = require('express').Router();
const Statistics = require('../collections/statistics');

const localDate = require('../utils/time').localDate;
/**
 * @api {post} /v1/monitor Monitor Post
 * @apiName MonitorPost
 * @apiGroup monitor
 *
 * @apiParam {String} monitor  The info of monitor.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "status": 200,
 *    "data": "Post success！"
 *}
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

router.post('/', async (req, res) => {
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const dateType = req.body.dateType;

  const result = await Statistics.find({
    $and: [
      {
        startTime: startTime
      },
      {
        endTime: endTime
      },
      {
        dateType: dateType
      }
    ]
  });
  if (result) {
    console.log(result);
    res.status(200).json(result);
  }
});

module.exports = router;
