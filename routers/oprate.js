'use strict';

const router = require('express').Router();
const Oprate = require('../collections/oprate');
const Time = require('../collections/time');

const log = require('../services/logger').createLogger('userAuthentication');
const AUTH_ERR = require('../constant/errMessage').AUTH;

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
function getLONGBO(doc) {
  const obj = {
    LONGBO: {
      equipmentNumber: '',
      acquisition: [],
      instrument: {
        instrumentNumber: '',
        value: []
      }
    }
  };
  if (doc.LONGBO.slice(0, 4) === 'AA02') {
    obj.LONGBO.equipmentNumber = doc.LONGBO.slice(0, 4);
    for (let i = 4; i <= 10;) {
      obj.LONGBO.acquisition.push({
        acquisitionChannel: doc.LONGBO.slice(i, i + 4),
        value: doc.LONGBO.slice(i + 4, i + 6)
      });
      i += 6;
    }
    obj.LONGBO.instrument.instrumentNumber = doc.LONGBO.slice(16, 20);
    for (let i = 20; i < (doc.LONGBO.length - 20);) {
      obj.LONGBO.instrument.value.push(doc.LONGBO.slice(i, i + 8));
      i += 8;
    }
  } else if (doc.LONGBO.slice(0, 4) === 'AA03') {
    obj.LONGBO.equipmentNumber = doc.LONGBO.slice(0, 4);
    for (let i = 4; i <= 10;) {
      obj.LONGBO.acquisition.push({
        acquisitionChannel: doc.LONGBO.slice(i, i + 4),
        value: doc.LONGBO.slice(i + 4, i + 6)
      });
      i += 6;
    }
    delete obj.LONGBO.instrument;
  } else if (doc.LONGBO.slice(0, 4) === 'AA04') {
    obj.LONGBO.equipmentNumber = doc.LONGBO.slice(0, 4);
    for (let i = 4; i <= 10;) {
      obj.LONGBO.acquisition.push({
        acquisitionChannel: doc.LONGBO.slice(i, i + 4),
        value: doc.LONGBO.slice(i + 4, i + 6)
      });
      i += 6;
    }
    obj.LONGBO.instrument.instrumentNumber = doc.LONGBO.slice(16, 20);
    for (let i = 20; i < (doc.LONGBO.length - 20);) {
      obj.LONGBO.instrument.value.push(doc.LONGBO.slice(i, i + 8));
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
router.get('/oprate', function(req, res, next) {
  Oprate.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});


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
function getTime() {
  Oprate.find({
    'LONGBO.equipmentNumber': 'AA04'
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

router.get('/AA04Time', async function(req, res, next) {
  let gCount = 0;
  let lCount = 0;
  const gTime = [];
  const lTime = [];


  await getTime();
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
