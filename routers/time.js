'use strict';

const router = require('express').Router();
const Oprate = require('../collections/oprate');
const Time = require('../collections/time');

/**
 * @api {post} /v1/auth/register Oprate Register
 * @apiName OprateRegister
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
function getTime(id) {
  Oprate.find({
    'LONGBO.equipmentNumber': id
  }).then((doc) => {
    for (let i = 0; i < doc.length - 1; i++) {
      let time = 0;
      time = doc[i + 1].created_at - doc[i].created_at;
      Time.create({
        time,
        event: doc[i]
      }, (err, t) => {
        // console.log(t);
      });
    }
  });
}

router.get('/time/:id', async function(req, res, next) {
  const id = req.params.id;
  let gCount = 0;
  let lCount = 0;
  const gTime = [];
  const lTime = [];


  await getTime(id);
  Time.find({}).then((arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].time >= 45000 * 1.8) {
        gCount += 1;
        gTime.push(arr[i]);
      }
      if (arr[i].time <= 45000 * 0.5) {
        lCount += 1;
        lTime.push(arr[i]);
      }
    }
    res.status(200).json({
      gCount,
      lCount,
      gTime,
      lTime,
      arr
    });
  });
});

module.exports = router;
