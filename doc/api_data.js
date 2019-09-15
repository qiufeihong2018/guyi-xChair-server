define({ "api": [
  {
    "type": "get",
    "url": "/v1/company",
    "title": "Company get",
    "name": "CompanyGet",
    "group": "company",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "pipelineList",
            "description": "<p>The Id list of pipeline(流水线的id列表).</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "companyName",
            "description": "<p>The name of company(公司名称).</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "_id",
            "description": "<p>The id of company（公司id值）.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time to add data（添加数据的时间）.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time to get doc（从集合中获取数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n   {\n       \"pipelineList\": [],\n       \"timestamp\": \"2019-09-15T16:15:15.318Z\",\n       \"_id\": \"5d7e63c1ba35562fe1084626\",\n       \"companyName\": \"中源家居股份有限公司\",\n       \"created_at\": \"2019-09-15T16:16:01.907Z\",\n       \"updatedAt\": \"2019-09-15T16:16:01.907Z\",\n       \"__v\": 0\n   },\n ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REGISTER_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Company register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/company.js",
    "groupTitle": "company"
  },
  {
    "type": "get",
    "url": "/v1/auth/register",
    "title": "Monitor get",
    "name": "MonitorGet",
    "group": "monitor",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>The name of company(公司名称).</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "instrument",
            "description": "<p>Equipment name（设备名称）.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "value",
            "description": "<p>Device value（设备值）.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time to add data（添加数据的时间）.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "monitorNo",
            "description": "<p>Acquisition device number（采集设备编号）.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "acquisition",
            "description": "<p>Digital acquisition channel（数据采集通道）.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "acquisitionChannel",
            "description": "<p>Digital acquisition channel model（数据采集通道模式）.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time to get doc（从集合中获取数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n     \"instrument\": {\n         \"value\": [],\n         \"instrumentNumber\": \"CD01\"\n     },\n     \"timestamp\": \"2019-09-12T05:19:27.857Z\",\n     \"_id\": \"5d79d56ce9ec9524c552dea0\",\n     \"name\": \"LONGBO\",\n     \"monitorNo\": \"AA04\",\n     \"acquisition\": [\n         {\n             \"_id\": \"5d79d56ce9ec9524c552dea2\",\n             \"acquisitionChannel\": \"DD01\",\n             \"value\": \"01\"\n         },\n         {\n             \"_id\": \"5d79d56ce9ec9524c552dea1\",\n             \"acquisitionChannel\": \"DD02\",\n             \"value\": \"01\"\n         }\n     ],\n     \"createdAt\": \"2019-09-12T05:19:40.884Z\",\n     \"updatedAt\": \"2019-09-12T05:19:40.884Z\",\n     \"__v\": 0\n },",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REGISTER_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Monitor register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/monitor.js",
    "groupTitle": "monitor"
  },
  {
    "type": "get",
    "url": "/v1/auth/register",
    "title": "Pipeline get",
    "name": "PipelineGet",
    "group": "oprate",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "lineId",
            "description": "<p>The name of company(公司id).</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "lineName",
            "description": "<p>Equipment name（设备名称）.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "factoryName",
            "description": "<p>Device value（设备值）.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "companyName",
            "description": "<p>Time to add data（添加数据的时间）.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "equipmentList",
            "description": "<p>Acquisition device number（采集设备编号）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n     \"instrument\": {\n         \"value\": [],\n         \"instrumentNumber\": \"CD01\"\n     },\n     \"timestamp\": \"2019-09-12T05:19:27.857Z\",\n     \"_id\": \"5d79d56ce9ec9524c552dea0\",\n     \"name\": \"LONGBO\",\n     \"equipmentNumber\": \"AA04\",\n     \"acquisition\": [\n         {\n             \"_id\": \"5d79d56ce9ec9524c552dea2\",\n             \"acquisitionChannel\": \"DD01\",\n             \"value\": \"01\"\n         },\n         {\n             \"_id\": \"5d79d56ce9ec9524c552dea1\",\n             \"acquisitionChannel\": \"DD02\",\n             \"value\": \"01\"\n         }\n     ],\n     \"createdAt\": \"2019-09-12T05:19:40.884Z\",\n     \"updatedAt\": \"2019-09-12T05:19:40.884Z\",\n     \"__v\": 0\n },",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REGISTER_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Pipeline register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/pipeline.js",
    "groupTitle": "oprate"
  },
  {
    "type": "delete",
    "url": "/v1/probe",
    "title": "Probe delete",
    "name": "ProbeDelete",
    "group": "probe",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>The id of probe(采集器的id).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"monitorList\": [\n       \"DD01\"\n   ],\n   \"timestamp\": \"2019-09-15T16:37:01.051Z\",\n   \"_id\": \"5d7e68ae00f0693b353895ab\",\n   \"probeNo\": \"AA01\",\n   \"createdAt\": \"2019-09-15T16:37:02.515Z\",\n   \"updatedAt\": \"2019-09-15T16:48:35.738Z\",\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REGISTER_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Probe register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/probe.js",
    "groupTitle": "probe"
  },
  {
    "type": "get",
    "url": "/v1/probe",
    "title": "Probe get",
    "name": "ProbeGet",
    "group": "probe",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "pipelineList",
            "description": "<p>The Id list of pipeline(流水线的id列表).</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "probeName",
            "description": "<p>The name of probe(公司名称).</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "_id",
            "description": "<p>The id of probe（公司id值）.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time to add data（添加数据的时间）.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time to get doc（从集合中获取数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n   {\n       \"monitorList\": [\n           \"DD01\"\n       ],\n       \"timestamp\": \"2019-09-15T16:37:01.051Z\",\n       \"_id\": \"5d7e68ae00f0693b353895ab\",\n       \"probeNo\": \"AA02\",\n       \"createdAt\": \"2019-09-15T16:37:02.515Z\",\n       \"updatedAt\": \"2019-09-15T16:37:02.515Z\",\n       \"__v\": 0\n   }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REGISTER_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Probe register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/probe.js",
    "groupTitle": "probe"
  },
  {
    "type": "post",
    "url": "/v1/probe",
    "title": "Probe post",
    "name": "ProbePost",
    "group": "probe",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pipelineId",
            "description": "<p>The id of pipeline(流水线的id).</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of probe(公司id).</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "probeNo",
            "description": "<p>The number of probe（采集器的型号）.</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "monitorList",
            "description": "<p>The name of monitor（添加数据的时间）.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n   {\n       \"pipelineList\": [],\n       \"timestamp\": \"2019-09-15T16:15:15.318Z\",\n       \"_id\": \"5d7e63c1ba35562fe1084626\",\n       \"probeName\": \"中源家居股份有限公司\",\n       \"created_at\": \"2019-09-15T16:16:01.907Z\",\n       \"updatedAt\": \"2019-09-15T16:16:01.907Z\",\n       \"__v\": 0\n   },\n ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REGISTER_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Probe register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/probe.js",
    "groupTitle": "probe"
  },
  {
    "type": "post",
    "url": "/v1/probe",
    "title": "Probe post",
    "name": "ProbePost",
    "group": "probe",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>The id of probe(采集器的id)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pipelineId",
            "description": "<p>The id of pipeline(流水线的id).</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of probe(公司id).</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "probeNo",
            "description": "<p>The number of probe（采集器的型号）.</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "monitorList",
            "description": "<p>The name of monitor（添加数据的时间）.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"monitorList\": [\n       \"DD01\"\n   ],\n   \"timestamp\": \"2019-09-15T16:37:01.051Z\",\n   \"_id\": \"5d7e68ae00f0693b353895ab\",\n   \"probeNo\": \"AA01\",\n   \"createdAt\": \"2019-09-15T16:37:02.515Z\",\n   \"updatedAt\": \"2019-09-15T16:48:35.738Z\",\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REGISTER_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Probe register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/probe.js",
    "groupTitle": "probe"
  },
  {
    "type": "post",
    "url": "/v1/auth/register",
    "title": "Monitor Register",
    "name": "MonitorRegister",
    "group": "userAuthentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>New user's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "monitorNo",
            "description": "<p>New user's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "acquisition",
            "description": "<p>New user's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instrument",
            "description": "<p>New user's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instrumentNumber",
            "description": "<p>New user's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>New user's password.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"username\": \"gushen\",\n  \"message\": \"Monitor registered successful\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REGISTER_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Monitor register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/monitor.js",
    "groupTitle": "userAuthentication"
  },
  {
    "type": "post",
    "url": "/v1/auth/register",
    "title": "Pipeline Register",
    "name": "PipelineRegister",
    "group": "userAuthentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>New user's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New user's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the register user.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>The registering success info.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"username\": \"gushen\",\n  \"message\": \"Pipeline registered successful\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REGISTER_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Pipeline register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/pipeline.js",
    "groupTitle": "userAuthentication"
  },
  {
    "type": "get",
    "url": "/v1/auth/",
    "title": "User auth information",
    "name": "UserAuthInfo",
    "group": "userAuthentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "null.",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the current user.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "last",
            "description": "<p>User last logon time.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"username\": \"test\",\n  \"last\": \"2019-06-03T06:22:53.567Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOT_LOGIN",
            "description": "<p>The current User was not logon.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"err\": \"NOT_LOGIN\",\n  \"message\": \"User has not logon in!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/userAuthentication.js",
    "groupTitle": "userAuthentication"
  },
  {
    "type": "post",
    "url": "/v1/auth/changepassword",
    "title": "User change password",
    "name": "UserChangePassword",
    "group": "userAuthentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldpassword",
            "description": "<p>User's old password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newpassword",
            "description": "<p>User's old password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>The message if changing password successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n  \"username\": \"test\",\n  \"message\": \"change password successful\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AUTHENTICATE_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "  HTTP/1.1 401 Unauthorized\n{\n  \"err\": \"AUTHENTICATE_FAILURE\",\n  \"message\": \"Password or username is incorrect\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/userAuthentication.js",
    "groupTitle": "userAuthentication"
  },
  {
    "type": "post",
    "url": "/v1/auth/user/:username",
    "title": "User delete",
    "name": "UserDelete",
    "group": "userAuthentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the deleted user.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>The message if deleting successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n  \"username\": \"gushen\",\n  \"message\": \"Delete User Successful\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOT_LOGIN",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Unauthorized\n{\n  \"err\": \"NOT_LOGIN\",\n  \"message\": \"User has not logon in!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/userAuthentication.js",
    "groupTitle": "userAuthentication"
  },
  {
    "type": "post",
    "url": "/v1/auth/login",
    "title": "User login",
    "name": "UserLogin",
    "group": "userAuthentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the register user.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>The messgaer if the user login in successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  \"username\": \"test\",\n  \"message\": \"Authentication Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REGISTER_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "  HTTP/1.1 401 Unauthorized\n {\n   \"err\": \"AUTHENTICATE_FAILURE\",\n   \"message\": \"Authenticate failure\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/userAuthentication.js",
    "groupTitle": "userAuthentication"
  },
  {
    "type": "get",
    "url": "/v1/auth/logout",
    "title": "User login out",
    "name": "UserLogout",
    "group": "userAuthentication",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>The message if user login out successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"username\": \"test\",\n  \"message\": \"logout successful\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOT_LOGIN",
            "description": "<p>There is no user logon in.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "  HTTP/1.1 401 Unauthorized\n{\n  \"err\": \"NOT_LOGIN\",\n  \"message\": \"No user has been logon\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/userAuthentication.js",
    "groupTitle": "userAuthentication"
  },
  {
    "type": "post",
    "url": "/v1/auth/register",
    "title": "User Register",
    "name": "UserRegister",
    "group": "userAuthentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>New user's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New user's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the register user.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>The registering success info.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"username\": \"gushen\",\n  \"message\": \"User registered successful\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REGISTER_FAILURE",
            "description": "<p>The register failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"User register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/userAuthentication.js",
    "groupTitle": "userAuthentication"
  }
] });
