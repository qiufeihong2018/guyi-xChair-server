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
            "field": "createdAt",
            "description": "<p>Time to get doc（添加数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n   {\n       \"pipelineList\": [],\n       \"_id\": \"5d7e63c1ba35562fe1084626\",\n       \"companyName\": \"中源家居股份有限公司\",\n       \"created_at\": \"2019-09-15T16:16:01.907Z\",\n       \"updatedAt\": \"2019-09-15T16:16:01.907Z\",\n       \"__v\": 0\n   },\n ]",
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
    "url": "/v1/monitor:company",
    "title": "Monitor companyIdGet",
    "name": "CompanyIdGet",
    "group": "monitor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of company(公司的id).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "probeId",
            "description": "<p>The id of probe.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "repeatedCounting",
            "description": "<p>入口数量（重复计次品次数）.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "defectiveNumber",
            "description": "<p>次品次数.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "productionQuantity",
            "description": "<p>出品数量（真实的产量）.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "positiveEnergy",
            "description": "<p>「正向电能」.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "negativeEnergy",
            "description": "<p>「反向电能」.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>产品型号代号.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "voltage",
            "description": "<p>电压.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "electric",
            "description": "<p>电流.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "activePower",
            "description": "<p>有功功率.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "reactivePower",
            "description": "<p>无功功率.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "apparentPower",
            "description": "<p>视在功率.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "powerFactor",
            "description": "<p>功率因数.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time to get doc（添加数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n     \"probeId\": [],\n     \"value\": [\n         {\n             \"repeatedCounting\": \"00006B06\",\n             \"defectiveNumber\": \"0001AD97\",\n             \"productionQuantity\": \"000E65E8\"\n         }\n     ],\n     \"_id\": \"5d7ed20118564770825d06df\",\n     \"probeNo\": \"AA02\",\n     \"dataType\": \"counter\",\n     \"createdAt\": \"2019-09-16T00:06:25.170Z\",\n     \"updatedAt\": \"2019-09-16T00:06:25.170Z\",\n     \"__v\": 0\n },\n {\n     \"probeId\": [],\n     \"value\": [\n         {\n             \"positiveEnergy\": 1677787136199683.2,\n             \"negativeEnergy\": 1677787136199683.2\n         }\n     ],\n     \"_id\": \"5d7ed20618564770825d06e0\",\n     \"probeNo\": \"AA04\",\n     \"dataType\": \"power\",\n     \"createdAt\": \"2019-09-16T00:06:30.985Z\",\n     \"updatedAt\": \"2019-09-16T00:06:30.985Z\",\n     \"__v\": 0\n },\n {\n     \"probeId\": [],\n     \"value\": [\n         \"90\"\n     ],\n     \"_id\": \"5d7ed27618564770825d06e1\",\n     \"probeNo\": \"AA04\",\n     \"dataType\": \"product\",\n     \"createdAt\": \"2019-09-16T00:08:22.690Z\",\n     \"updatedAt\": \"2019-09-16T00:08:22.690Z\",\n     \"__v\": 0\n }",
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
    "url": "/v1/monitor",
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
            "field": "probeId",
            "description": "<p>The id of probe.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "repeatedCounting",
            "description": "<p>入口数量（重复计次品次数）.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "defectiveNumber",
            "description": "<p>次品次数.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "productionQuantity",
            "description": "<p>出品数量（真实的产量）.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "positiveEnergy",
            "description": "<p>「正向电能」.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "negativeEnergy",
            "description": "<p>「反向电能」.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "value",
            "description": "<p>产品型号代号.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "voltage",
            "description": "<p>电压.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "electric",
            "description": "<p>电流.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "activePower",
            "description": "<p>有功功率.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "reactivePower",
            "description": "<p>无功功率.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "apparentPower",
            "description": "<p>视在功率.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "powerFactor",
            "description": "<p>功率因数.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time to get doc（添加数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n     \"probeId\": [],\n     \"value\": [\n         {\n             \"repeatedCounting\": \"00006B06\",\n             \"defectiveNumber\": \"0001AD97\",\n             \"productionQuantity\": \"000E65E8\"\n         }\n     ],\n     \"_id\": \"5d7ed20118564770825d06df\",\n     \"probeNo\": \"AA02\",\n     \"dataType\": \"counter\",\n     \"createdAt\": \"2019-09-16T00:06:25.170Z\",\n     \"updatedAt\": \"2019-09-16T00:06:25.170Z\",\n     \"__v\": 0\n },\n {\n     \"probeId\": [],\n     \"value\": [\n         {\n             \"positiveEnergy\": 1677787136199683.2,\n             \"negativeEnergy\": 1677787136199683.2\n         }\n     ],\n     \"_id\": \"5d7ed20618564770825d06e0\",\n     \"probeNo\": \"AA04\",\n     \"dataType\": \"power\",\n     \"createdAt\": \"2019-09-16T00:06:30.985Z\",\n     \"updatedAt\": \"2019-09-16T00:06:30.985Z\",\n     \"__v\": 0\n },\n {\n     \"probeId\": [],\n     \"value\": [\n         \"90\"\n     ],\n     \"_id\": \"5d7ed27618564770825d06e1\",\n     \"probeNo\": \"AA04\",\n     \"dataType\": \"product\",\n     \"createdAt\": \"2019-09-16T00:08:22.690Z\",\n     \"updatedAt\": \"2019-09-16T00:08:22.690Z\",\n     \"__v\": 0\n }",
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
    "type": "post",
    "url": "/v1/monitor",
    "title": "Monitor Post",
    "name": "MonitorPost",
    "group": "monitor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "monitor",
            "description": "<p>The info of monitor.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"status\": 200,\n   \"data\": \"Post success！\"\n}",
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
    "type": "post",
    "url": "/v1/monitor/search",
    "title": "Monitor search",
    "name": "MonitorSearch",
    "group": "monitor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of company(公司的id).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start",
            "description": "<p>The startTime of monitor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end",
            "description": "<p>The endTime of monitor.</p>"
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
            "field": "probeId",
            "description": "<p>The id of probe.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "repeatedCounting",
            "description": "<p>入口数量（重复计次品次数）.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "defectiveNumber",
            "description": "<p>次品次数.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "productionQuantity",
            "description": "<p>出品数量（真实的产量）.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "positiveEnergy",
            "description": "<p>「正向电能」.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "negativeEnergy",
            "description": "<p>「反向电能」.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "voltage",
            "description": "<p>电压.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "electric",
            "description": "<p>电流.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "activePower",
            "description": "<p>有功功率.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "reactivePower",
            "description": "<p>无功功率.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "apparentPower",
            "description": "<p>视在功率.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "powerFactor",
            "description": "<p>功率因数.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time to get doc（添加数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n     \"probeId\": [],\n     \"value\": [\n         {\n             \"repeatedCounting\": \"00006B06\",\n             \"defectiveNumber\": \"0001AD97\",\n             \"productionQuantity\": \"000E65E8\"\n         }\n     ],\n     \"_id\": \"5d7ed20118564770825d06df\",\n     \"probeNo\": \"AA02\",\n     \"dataType\": \"counter\",\n     \"createdAt\": \"2019-09-16T00:06:25.170Z\",\n     \"updatedAt\": \"2019-09-16T00:06:25.170Z\",\n     \"__v\": 0\n }",
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
    "url": "/v1/pipeline/:companyId",
    "title": "Pipeline companyIdGet",
    "name": "CompanyIdGet",
    "group": "pipeline",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of pipeline(公司的id).</p>"
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
            "field": "pipelineName",
            "description": "<p>The name of pipeline(流水线名称).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of company(公司id值).</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "probeList",
            "description": "<p>The id of pipeline(采集器的id值列表).</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time to get doc（添加数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n       \"companyId\": [ \"5d7e6459201b65318803e3a2\"],\n       \"probeList\": [ \"5d7e6459201b65318803e3a2\",\n           \"5d7e6459201b65318803e3a2\"],\n       \"_id\": \"5d7e7cc03af4bf6838e0addc\",\n       \"pipelineName\": \"pipeline\",\n       \"created_at\": \"2019-09-15T18:02:40.759Z\",\n       \"updatedAt\": \"2019-09-15T18:02:40.759Z\",\n       \"__v\": 0\n   },\n ]",
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
    "groupTitle": "pipeline"
  },
  {
    "type": "delete",
    "url": "/v1/pipeline/:id",
    "title": "Pipeline delete",
    "name": "PipelineDelete",
    "group": "pipeline",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>The id of pipeline(流水线的id).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"data\": \"Delete success\",\n   \"status\": 200\n}",
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
    "groupTitle": "pipeline"
  },
  {
    "type": "get",
    "url": "/v1/pipeline",
    "title": "Pipeline get",
    "name": "PipelineGet",
    "group": "pipeline",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pipelineName",
            "description": "<p>The name of pipeline(流水线名称).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of company(公司id值).</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "probeList",
            "description": "<p>The id of pipeline(采集器的id值列表).</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time to get doc（添加数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n       \"companyId\": [],\n       \"probeList\": [],\n       \"_id\": \"5d7e7cc03af4bf6838e0addc\",\n       \"pipelineName\": \"pipeline\",\n       \"created_at\": \"2019-09-15T18:02:40.759Z\",\n       \"updatedAt\": \"2019-09-15TpipelineName18:02:40.759Z\",\n       \"__v\": 0\n   },\n ]",
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
    "groupTitle": "pipeline"
  },
  {
    "type": "post",
    "url": "/v1/pipeline",
    "title": "Pipeline post",
    "name": "PipelinePost",
    "group": "pipeline",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pipelineName",
            "description": "<p>The name of pipeline(流水线的名字).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of pipeline(公司id).</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "probeList",
            "description": "<p>The list of probe（流水线的id列表）.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"data\": \"Add success\",\n   \"status\": 200\n}",
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
    "groupTitle": "pipeline"
  },
  {
    "type": "put",
    "url": "/v1/pipeline",
    "title": "Pipeline put",
    "name": "PipelinePut",
    "group": "pipeline",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>The id of pipeline(流水线的id)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pipelineName",
            "description": "<p>The id of pipeline(流水线的名称).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of pipeline(公司id).</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "probeList",
            "description": "<p>The id list of probe（采集器的id列表）.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time to get doc（添加数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"data\": \"Update success\",\n   \"status\": 200\n}",
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
    "groupTitle": "pipeline"
  },
  {
    "type": "get",
    "url": "/v1/pipelineState",
    "title": "PipelineState get",
    "name": "PipelineStateGet",
    "group": "pipelineState",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>The state of PipelineState(流水线状态).</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "startTime",
            "description": "<p>The startTime of PipelineState(流水线状态开始时间).</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "endTime",
            "description": "<p>The endTime of PipelineState(流水线状态结束时间).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n   {\n       \"_id\": \"5d80b45533495b71f34654a3\",\n       \"state\": \"pending\",\n       \"startTime\": \"2019-09-17T10:23:40.011Z\",\n       \"endTime\": \"2019-09-17T10:24:21.378Z\",\n       \"createdAt\": \"2019-09-17T10:24:21.388Z\",\n       \"updatedAt\": \"2019-09-17T10:24:21.388Z\",\n       \"__v\": 0\n   },\n ]",
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
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"PipelineState register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/pipelineState.js",
    "groupTitle": "pipelineState"
  },
  {
    "type": "get",
    "url": "/v1/probe/:companyId",
    "title": "Probe companyIdGet",
    "name": "CompanyIdGet",
    "group": "probe",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of company(公司的id).</p>"
          }
        ]
      }
    },
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
            "description": "<p>The name of probe(采集器名称).</p>"
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
            "field": "createdAt",
            "description": "<p>Time to get doc（添加数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n   {\n       \"monitorList\": [\n           \"DD01\"\n       ],\n       \"_id\": \"5d7e68ae00f0693b353895ab\",\n       \"probeNo\": \"AA02\",\n       \"createdAt\": \"2019-09-15T16:37:02.515Z\",\n       \"updatedAt\": \"2019-09-15T16:37:02.515Z\",\n       \"__v\": 0\n   }\n]",
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
          "content": "    HTTP/1.1 200 OK\n{\n   \"data\": \"Delete success\",\n   \"status\": 200\n}",
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
            "field": "pipelineId",
            "description": "<p>The Id list of pipeline(流水线的id).</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of company（公司id值）.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "monitorList",
            "description": "<p>The name of probe(采集器名称).</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>The id of probe（采集器的id值）.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "probeNo",
            "description": "<p>The number of probe（采集器的型号）.</p>"
          },
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Time to get doc（添加数据的时间）.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n {\n       \"pipelineId\": \"5d7eda1aa88b42050147b6ce\",\n       \"companyId\": \"5d7e6459201b65318803e3a2\",\n       \"monitorList\": [\n           \"DD01\"\n       ],\n       \"_id\": \"5d7ee0a84152b1118bee06b6\",\n       \"probeNo\": \"AA02\",\n       \"createdAt\": \"2019-09-16T01:08:56.613Z\",\n       \"updatedAt\": \"2019-09-16T01:08:56.613Z\",\n       \"__v\": 0\n   }\n]",
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
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of probe(公司id).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "probeNo",
            "description": "<p>The number of probe（采集器的型号）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
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
          "content": "    HTTP/1.1 200 OK\n{\n   \"data\": \"Add success\",\n   \"status\": 200\n}",
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
    "type": "put",
    "url": "/v1/probe",
    "title": "Probe put",
    "name": "ProbePut",
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
          "content": "    HTTP/1.1 200 OK\n{\n   \"data\": \"Update success\",\n   \"status\": 200\n}",
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
    "url": "/v1/product/:companyId",
    "title": "Product companyIdGet",
    "name": "CompanyIdGet",
    "group": "product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of product(公司的id).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pipelineId",
            "description": "<p>The id of product(流水线的id).</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productNo",
            "description": "<p>The number of product（产品型号代号(生产线上采集器设置的)(纯数字)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productType",
            "description": "<p>The type of product（产品类型(沙发椅，办公椅，酒吧椅)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productModel",
            "description": "<p>The model of product（产品注册代码(记录在册)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productCraft",
            "description": "<p>The craft of product（产品工艺）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "suttleWeight",
            "description": "<p>The weight of product（产品净重）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "totalWeight",
            "description": "<p>The totalweight of product（产品总重）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "createdAt",
            "description": "<p>The createtime of product（创建时间）.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n       \"companyId\": [ \"5d7e6459201b65318803e3a2\"],\n       \"probeList\": [ \"5d7e6459201b65318803e3a2\",\n           \"5d7e6459201b65318803e3a2\"],\n       \"_id\": \"5d7e7cc03af4bf6838e0addc\",\n       \"productName\": \"product\",\n       \"created_at\": \"2019-09-15T18:02:40.759Z\",\n       \"updatedAt\": \"2019-09-15T18:02:40.759Z\",\n       \"__v\": 0\n   },\n ]",
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
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Product register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/product.js",
    "groupTitle": "product"
  },
  {
    "type": "delete",
    "url": "/v1/product/:id",
    "title": "Product delete",
    "name": "ProductDelete",
    "group": "product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>The id of product(产品的id).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"data\": \"Delete success\",\n   \"status\": 200\n}",
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
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Product register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/product.js",
    "groupTitle": "product"
  },
  {
    "type": "get",
    "url": "/v1/product",
    "title": "Product get",
    "name": "ProductGet",
    "group": "product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pipelineId",
            "description": "<p>The id of product(流水线的id).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of product(公司id).</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productNo",
            "description": "<p>The number of product（产品型号代号(生产线上采集器设置的)(纯数字)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productType",
            "description": "<p>The type of product（产品类型(沙发椅，办公椅，酒吧椅)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productModel",
            "description": "<p>The model of product（产品注册代码(记录在册)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productCraft",
            "description": "<p>The craft of product（产品工艺）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "suttleWeight",
            "description": "<p>The weight of product（产品净重）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "totalWeight",
            "description": "<p>The totalweight of product（产品总重）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "createdAt",
            "description": "<p>The createtime of product（创建时间）.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n    {\n       \"companyId\": [],\n       \"probeList\": [],\n       \"_id\": \"5d7e7cc03af4bf6838e0addc\",\n       \"productName\": \"product\",\n       \"created_at\": \"2019-09-15T18:02:40.759Z\",\n       \"updatedAt\": \"2019-09-15TproductName18:02:40.759Z\",\n       \"__v\": 0\n   },\n ]",
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
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Product register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/product.js",
    "groupTitle": "product"
  },
  {
    "type": "post",
    "url": "/v1/product",
    "title": "Product post",
    "name": "ProductPost",
    "group": "product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pipelineId",
            "description": "<p>The id of product(流水线的id).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of product(公司id).</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productNo",
            "description": "<p>The number of product（产品型号代号(生产线上采集器设置的)(纯数字)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productType",
            "description": "<p>The type of product（产品类型(沙发椅，办公椅，酒吧椅)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productModel",
            "description": "<p>The model of product（产品注册代码(记录在册)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productCraft",
            "description": "<p>The craft of product（产品工艺）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "suttleWeight",
            "description": "<p>The weight of product（产品净重）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "totalWeight",
            "description": "<p>The totalweight of product（产品总重）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "createdAt",
            "description": "<p>The createtime of product（创建时间）.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"data\": \"Add success\",\n   \"status\": 200\n}",
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
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Product register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/product.js",
    "groupTitle": "product"
  },
  {
    "type": "put",
    "url": "/v1/product",
    "title": "Product put",
    "name": "ProductPut",
    "group": "product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pipelineId",
            "description": "<p>The id of product(流水线的id).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of product(公司id).</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productNo",
            "description": "<p>The number of product（产品型号代号(生产线上采集器设置的)(纯数字)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productType",
            "description": "<p>The type of product（产品类型(沙发椅，办公椅，酒吧椅)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productModel",
            "description": "<p>The model of product（产品注册代码(记录在册)）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "productCraft",
            "description": "<p>The craft of product（产品工艺）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "suttleWeight",
            "description": "<p>The weight of product（产品净重）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "totalWeight",
            "description": "<p>The totalweight of product（产品总重）.</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "createdAt",
            "description": "<p>The createtime of product（创建时间）.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"data\": \"Update success\",\n   \"status\": 200\n}",
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
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Product register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/product.js",
    "groupTitle": "product"
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
