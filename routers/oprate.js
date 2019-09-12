'use strict';

const router = require('express').Router();
const Oprate = require('../collections/oprate');
const Time = require('../collections/time');

const log = require('../services/logger').createLogger('userAuthentication');

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
    name: 'LONGBO',
    equipmentNumber: '',
    acquisition: [],
    instrument: {
      instrumentNumber: '',
      value: []
    }
  };
  if (doc.LONGBO.slice(0, 4) === 'AA02') {
    obj.equipmentNumber = doc.LONGBO.slice(0, 4);
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
    obj.equipmentNumber = doc.LONGBO.slice(0, 4);
    for (let i = 4; i <= 10;) {
      obj.acquisition.push({
        acquisitionChannel: doc.LONGBO.slice(i, i + 4),
        value: doc.LONGBO.slice(i + 4, i + 6)
      });
      i += 6;
    }
    delete obj.instrument;
  } else if (doc.LONGBO.slice(0, 4) === 'AA04') {
    obj.equipmentNumber = doc.LONGBO.slice(0, 4);
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
 * @apiSuccess {Object} LONGBO  The details of instrument.
 * @apiSuccess {string} instrument  Equipment name.
 * @apiSuccess {string} value  Device value.
 * @apiSuccess {string} timestamp  Time to add data.
 * @apiSuccess {string} equipmentNumber Acquisition device number.
 * @apiSuccess {string} acquisition  Digital acquisition channel.
 * @apiSuccess {string} acquisitionChannel Digital acquisition channel model.
 * @apiSuccess {string} value  Digital acquisition channel model value.
 * @apiSuccess {string} created_at  Time to get doc.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "LONGBO": {
 *            "instrument": {
 *                "value": []
 *            },
 *            "timestamp": "2019-09-12T03:00:19.011Z",
 *            "equipmentNumber": "AA03",
 *            "acquisition": [
 *                {
 *                    "_id": "5d79b4e16f680f1d2b808b80",
 *                    "acquisitionChannel": "DD01",
 *                    "value": "00"
 *                },
 *                {
 *                    "_id": "5d79b4e16f680f1d2b808b7f",
 *                    "acquisitionChannel": "DD02",
 *                    "value": "01"
 *                }
 *            ]
 *        },
 *        "_id": "5d79b4e16f680f1d2b808b7e",
 *        "created_at": "2019-09-12T03:00:49.088Z",
 *        "updatedAt": "2019-09-12T03:00:49.088Z",
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
