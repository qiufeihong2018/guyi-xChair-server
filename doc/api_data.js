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
    "url": "/v1/monitor",
    "title": "Monitor get",
    "name": "MonitorGet",
    "group": "monitor",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "probeId",
            "description": "<p>The id of probe.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "repeatedCounting",
            "description": "<p>入口数量（重复计次品次数）.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "defectiveNumber",
            "description": "<p>次品次数.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "productionQuantity",
            "description": "<p>出品数量（真实的产量）.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "positiveEnergy",
            "description": "<p>「正向电能」.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "negativeEnergy",
            "description": "<p>「反向电能」.</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "value",
            "description": "<p>产品型号代号.</p>"
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
          "content": "  HTTP/1.1 200 OK\n{\n     \"probeId\": [],\n     \"value\": [\n         {\n             \"repeatedCounting\": \"00006B06\",\n             \"defectiveNumber\": \"0001AD97\",\n             \"productionQuantity\": \"000E65E8\"\n         }\n     ],\n     \"timestamp\": \"2019-09-16T00:00:13.693Z\",\n     \"_id\": \"5d7ed20118564770825d06df\",\n     \"probeNo\": \"AA02\",\n     \"dataType\": \"counter\",\n     \"createdAt\": \"2019-09-16T00:06:25.170Z\",\n     \"updatedAt\": \"2019-09-16T00:06:25.170Z\",\n     \"__v\": 0\n },\n {\n     \"probeId\": [],\n     \"value\": [\n         {\n             \"positiveEnergy\": 1677787136199683.2,\n             \"negativeEnergy\": 1677787136199683.2\n         }\n     ],\n     \"timestamp\": \"2019-09-16T00:00:13.693Z\",\n     \"_id\": \"5d7ed20618564770825d06e0\",\n     \"probeNo\": \"AA04\",\n     \"dataType\": \"power\",\n     \"createdAt\": \"2019-09-16T00:06:30.985Z\",\n     \"updatedAt\": \"2019-09-16T00:06:30.985Z\",\n     \"__v\": 0\n },\n {\n     \"probeId\": [],\n     \"value\": [\n         \"90\"\n     ],\n     \"timestamp\": \"2019-09-16T00:00:13.693Z\",\n     \"_id\": \"5d7ed27618564770825d06e1\",\n     \"probeNo\": \"AA04\",\n     \"dataType\": \"product\",\n     \"createdAt\": \"2019-09-16T00:08:22.690Z\",\n     \"updatedAt\": \"2019-09-16T00:08:22.690Z\",\n     \"__v\": 0\n }",
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
            "type": "object",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of pipeline(公司id).</p>"
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
          "content": "    HTTP/1.1 200 OK\n[\n    {\n       \"companyId\": [ \"5d7e6459201b65318803e3a2\"],\n       \"probeList\": [ \"5d7e6459201b65318803e3a2\",\n           \"5d7e6459201b65318803e3a2\"],\n       \"timestamp\": \"2019-09-15T17:54:46.571Z\",\n       \"_id\": \"5d7e7cc03af4bf6838e0addc\",\n       \"pipelineName\": \"pipeline\",\n       \"created_at\": \"2019-09-15T18:02:40.759Z\",\n       \"updatedAt\": \"2019-09-15T18:02:40.759Z\",\n       \"__v\": 0\n   },\n ]",
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
          "content": "    HTTP/1.1 200 OK\n[\n    {\n       \"companyId\": [],\n       \"probeList\": [],\n       \"timestamp\": \"2019-09-15T17:54:46.571Z\",\n       \"_id\": \"5d7e7cc03af4bf6838e0addc\",\n       \"pipelineName\": \"pipeline\",\n       \"created_at\": \"2019-09-15T18:02:40.759Z\",\n       \"updatedAt\": \"2019-09-15TpipelineName18:02:40.759Z\",\n       \"__v\": 0\n   },\n ]",
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
            "description": "<p>The Id list of pipeline(流水线的id列表).</p>"
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
          "content": "    HTTP/1.1 200 OK\n[\n {\n       \"pipelineId\": \"5d7eda1aa88b42050147b6ce\",\n       \"companyId\": \"5d7e6459201b65318803e3a2\",\n       \"monitorList\": [\n           \"DD01\"\n       ],\n       \"timestamp\": \"2019-09-16T01:00:34.199Z\",\n       \"_id\": \"5d7ee0a84152b1118bee06b6\",\n       \"probeNo\": \"AA02\",\n       \"createdAt\": \"2019-09-16T01:08:56.613Z\",\n       \"updatedAt\": \"2019-09-16T01:08:56.613Z\",\n       \"__v\": 0\n   }\n]",
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "companyId",
            "description": "<p>The id of company(流水线的id列表).</p>"
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
