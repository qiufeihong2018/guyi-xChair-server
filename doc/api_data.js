define({ "api": [
  {
    "type": "get",
    "url": "/v1/auth/register",
    "title": "Oprate get",
    "name": "OprateGet",
    "group": "oprate",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "LONGBO",
            "description": "<p>The details of instrument.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "instrument",
            "description": "<p>Equipment name.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "value",
            "description": "<p>Device value.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Time to add data.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "equipmentNumber",
            "description": "<p>Acquisition device number.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "acquisition",
            "description": "<p>Digital acquisition channel.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "acquisitionChannel",
            "description": "<p>Digital acquisition channel model.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "created_at",
            "description": "<p>Time to get doc.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n    \"LONGBO\": {\n        \"instrument\": {\n            \"value\": []\n        },\n        \"timestamp\": \"2019-09-12T03:00:19.011Z\",\n        \"equipmentNumber\": \"AA03\",\n        \"acquisition\": [\n            {\n                \"_id\": \"5d79b4e16f680f1d2b808b80\",\n                \"acquisitionChannel\": \"DD01\",\n                \"value\": \"00\"\n            },\n            {\n                \"_id\": \"5d79b4e16f680f1d2b808b7f\",\n                \"acquisitionChannel\": \"DD02\",\n                \"value\": \"01\"\n            }\n        ]\n    },\n    \"_id\": \"5d79b4e16f680f1d2b808b7e\",\n    \"created_at\": \"2019-09-12T03:00:49.088Z\",\n    \"updatedAt\": \"2019-09-12T03:00:49.088Z\",\n    \"__v\": 0\n},",
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
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Oprate register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/oprate.js",
    "groupTitle": "oprate"
  },
  {
    "type": "post",
    "url": "/v1/auth/register",
    "title": "Oprate Register",
    "name": "OprateRegister",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"username\": \"gushen\",\n  \"message\": \"Oprate registered successful\"\n}",
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
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Oprate register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/oprate.js",
    "groupTitle": "userAuthentication"
  },
  {
    "type": "post",
    "url": "/v1/auth/register",
    "title": "Oprate Register",
    "name": "OprateRegister",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"username\": \"gushen\",\n  \"message\": \"Oprate registered successful\"\n}",
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
          "content": " HTTP/1.1 500 Internal Server Error\n{\n  \"err\": \"REGISTER_FAILURE\",\n  \"message\": \"Oprate register failure!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routers/oprate.js",
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