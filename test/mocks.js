export const fakeRules = {
  paths: {
    "/api/account/role": {
      get: {
        summary: "Get Team Account Roles",
        tags: ["Company"],
        description: "Get array of valid roles for team account",
        produces: "application/json",
        responses: {
          200: {
            description: "Company account details",
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "success",
                },
                data: {
                  type: "array",
                  description: "an ARRAY of objects",
                  example: [
                    {
                      value: "owner",
                      label: "Owner",
                      restricted: true,
                    },
                    {
                      value: "full_access",
                      label: "Full Access",
                      restricted: false,
                    },
                    {
                      value: "viewer",
                      label: "Viewer",
                      restricted: false,
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/api/account/profile": {
      put: {
        summary: "Update Team Account",
        tags: ["Company"],
        description:
          "Update team account details of the currently logged in user",
        produces: "application/json",
        consumes: "application/json",
        parameters: [
          {
            in: "body",
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                job_title: {
                  type: "string",
                },
                photo_url: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: "Updated",
            schema: {
              $ref: "#/definitions/successResponsePlain",
            },
          },
        },
      },
    },
    "/api/account/member": {
      delete: {
        summary: "Delete a Team Member",
        tags: ["Company"],
        description: "Delete team member",
        produces: "application/json",
        consumes: "application/json",
        parameters: [
          {
            in: "body",
            schema: {
              type: "object",
              required: ["account_id"],
              properties: {
                account_id: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Deleted",
            schema: {
              $ref: "#/definitions/successResponsePlain",
            },
          },
        },
      },
    },
    "/api/account/search": {
      get: {
        summary: "Search Candidates",
        tags: ["Company"],
        description: "List candidates",
        consumes: "application/json",
        produces: "application/json",
        parameters: [
          {
            in: "query",
            name: "sort_by",
            type: "string",
            description:
              "Chooose to sort by `quality` of `last_active`. Defaults to `last_active`",
          },
          {
            in: "query",
            name: "page",
            type: "integer",
            description:
              "Page number. Defaults to 0. Shows 10 results per page",
          },
        ],
        responses: {
          200: {
            description: "OK",
            schema: {
              type: "object",
              properties: {
                results_count: {
                  type: "integer",
                  example: 1665,
                },
                ids: {
                  type: "array",
                  items: {
                    type: "integer",
                  },
                  example: [123, 34, 44],
                },
                values: {
                  type: "object",
                },
                ui: {
                  type: "string",
                  example: "4b8dfd07-babc-4ce3-9cd9-cbb17352115b",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const fakeGetRequest = {
  body: {},
  query: {},
  method: "GET",
  originalUrl: "/api/account/test",
};
