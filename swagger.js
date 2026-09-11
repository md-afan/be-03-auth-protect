const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "BE-03 Auth API",
    version: "1.0.0",
    description: "Secure API using Supabase Authentication"
  },

  servers: [
    {
      url: "http://localhost:3000"
    }
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },

  paths: {
    "/public/info": {
      get: {
        summary: "Get public information",
        responses: {
          "200": {
            description: "Success"
          }
        }
      }
    },

    "/auth/signup": {
      post: {
        summary: "Create a new account",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string"
                  },
                  password: {
                    type: "string"
                  }
                }
              }
            }
          }
        },

        responses: {
          "201": {
            description: "User created"
          },
          "400": {
            description: "Bad request"
          }
        }
      }
    },

    "/auth/login": {
      post: {
        summary: "Login user",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string"
                  },
                  password: {
                    type: "string"
                  }
                }
              }
            }
          }
        },

        responses: {
          "200": {
            description: "Login successful"
          },
          "400": {
            description: "Missing input"
          },
          "401": {
            description: "Invalid credentials"
          }
        }
      }
    },

    "/protected/profile": {
      get: {
        summary: "Get authenticated user profile",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "200": {
            description: "Profile returned"
          },
          "401": {
            description: "Unauthorized"
          }
        }
      }
    },

    "/protected/dashboard": {
      get: {
        summary: "Get protected dashboard",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "200": {
            description: "Dashboard returned"
          },
          "401": {
            description: "Unauthorized"
          }
        }
      }
    },

    "/protected/logout": {
      post: {
        summary: "Logout authenticated user",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          "204": {
            description: "Logout successful"
          },
          "401": {
            description: "Unauthorized"
          }
        }
      }
    }
  }
};

module.exports = {
  swaggerUi,
  swaggerDocument
};