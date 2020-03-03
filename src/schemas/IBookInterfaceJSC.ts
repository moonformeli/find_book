export default {
  "type": "object",
  "properties": {
    "kind": {
      "type": "string"
    },
    "totalItems": {
      "type": "number"
    },
    "items": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/IBookItem"
      }
    }
  },
  "required": [
    "items",
    "kind",
    "totalItems"
  ],
  "definitions": {
    "IBookItem": {
      "type": "object",
      "properties": {
        "kind": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "etag": {
          "type": "string"
        },
        "selfLink": {
          "type": "string"
        },
        "volumeInfo": {
          "$ref": "#/definitions/IVolumeInfo"
        },
        "saleInfo": {
          "$ref": "#/definitions/ISaleInfo"
        },
        "accessInfo": {
          "$ref": "#/definitions/IAccessInfo"
        }
      },
      "required": [
        "accessInfo",
        "etag",
        "kind",
        "saleInfo",
        "selfLink",
        "volumeInfo"
      ]
    },
    "IVolumeInfo": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "subtitle": {
          "type": "string"
        },
        "authors": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "publisher": {
          "type": "string"
        },
        "publishedDate": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "industryIdentifiers": {
          "$ref": "#/definitions/Array"
        },
        "readingModes": {
          "type": "object",
          "properties": {
            "text": {
              "type": "boolean"
            },
            "image": {
              "type": "boolean"
            }
          },
          "required": [
            "image",
            "text"
          ]
        },
        "pageCount": {
          "type": "number"
        },
        "printedPageCount": {
          "type": "number"
        },
        "printType": {
          "type": "string"
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "maturityRating": {
          "type": "string"
        },
        "allowAnonLogging": {
          "type": "boolean"
        },
        "contentVersion": {
          "type": "string"
        },
        "panelizationSummary": {
          "type": "object",
          "properties": {
            "containsEpubBubbles": {
              "type": "boolean"
            },
            "containsImageBubbles": {
              "type": "boolean"
            }
          },
          "required": [
            "containsEpubBubbles",
            "containsImageBubbles"
          ]
        },
        "imageLinks": {
          "type": "object",
          "properties": {
            "smallThumbnail": {
              "type": "string"
            },
            "thumbnail": {
              "type": "string"
            },
            "small": {
              "type": "string"
            },
            "medium": {
              "type": "string"
            },
            "large": {
              "type": "string"
            },
            "extraLarge": {
              "type": "string"
            }
          }
        },
        "language": {
          "type": "string"
        },
        "previewLink": {
          "type": "string"
        },
        "infoLink": {
          "type": "string"
        },
        "canonicalVolumeLink": {
          "type": "string"
        }
      },
      "required": [
        "allowAnonLogging",
        "canonicalVolumeLink",
        "categories",
        "contentVersion",
        "description",
        "imageLinks",
        "industryIdentifiers",
        "infoLink",
        "language",
        "maturityRating",
        "pageCount",
        "panelizationSummary",
        "previewLink",
        "printType",
        "publishedDate",
        "publisher",
        "readingModes",
        "title"
      ]
    },
    "Array": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "identifier": {
            "type": "string"
          }
        },
        "required": [
          "identifier",
          "type"
        ]
      }
    },
    "ISaleInfo": {
      "type": "object",
      "properties": {
        "country": {
          "type": "string"
        },
        "saleability": {
          "type": "string"
        },
        "isEbook": {
          "type": "boolean"
        },
        "listPrice": {
          "type": "object",
          "properties": {
            "amount": {
              "type": "number"
            },
            "currencyCode": {
              "type": "string"
            }
          },
          "required": [
            "amount",
            "currencyCode"
          ]
        },
        "retailPrice": {
          "type": "object",
          "properties": {
            "amount": {
              "type": "number"
            },
            "currencyCode": {
              "type": "string"
            }
          },
          "required": [
            "amount",
            "currencyCode"
          ]
        },
        "buyLink": {
          "type": "string"
        }
      },
      "required": [
        "buyLink",
        "country",
        "isEbook",
        "listPrice",
        "retailPrice",
        "saleability"
      ]
    },
    "IAccessInfo": {
      "type": "object",
      "properties": {
        "country": {
          "type": "string"
        },
        "viewability": {
          "type": "string"
        },
        "embeddable": {
          "type": "boolean"
        },
        "publicDomain": {
          "type": "boolean"
        },
        "textToSpeechPermission": {
          "type": "string"
        },
        "epub": {
          "type": "object",
          "properties": {
            "isAvailable": {
              "type": "boolean"
            },
            "acsTokenLink": {
              "type": "string"
            }
          },
          "required": [
            "acsTokenLink",
            "isAvailable"
          ]
        },
        "pdf": {
          "type": "object",
          "properties": {
            "isAvailable": {
              "type": "boolean"
            }
          },
          "required": [
            "isAvailable"
          ]
        },
        "accessViewStatus": {
          "type": "string"
        }
      },
      "required": [
        "accessViewStatus",
        "country",
        "embeddable",
        "epub",
        "pdf",
        "publicDomain",
        "textToSpeechPermission",
        "viewability"
      ]
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
}