# Zoover reviews api

> Project was built using node 12.

## Installing

```
$ npm install 
```

## Usage example

```
$ npm start // starts on port 8080 by default.
$ npm test 
```

## Docker 

```
// Build docker image
$ docker build -t zoover/reviews-api .
$ docker run -p 8080:8080 zoover/reviews-api
```

## API DOC

### Get reviews

**URL** : `/v1/reviews`

**Method** : `GET`

**Query parameters**:
```
| field        | type   | description                                              |
|--------------|--------|----------------------------------------------------------|
| page         | number | pagination offset                                        |
| limit        | number | items per page                                           |
| traveledWith | string | supported values: family, other, couple, single, friends |
| sortBy       | string | supported values: entryDate, travelDate                  |
| order        | string | supported values: asc, desc                              |
```
`example: ?page=1&limit=20&traveledWith=family&sortBy=entryDate&order=asc`

#### Response

**Code** : `200 OK`

**Response example**

```json
{
    "resources": [
        {
            "parents": [
                {
                    "id": "96e83a90-48da-4e81-9d06-7f1b76e5364e"
                }
            ],
            "id": "a8f5843e-2229-42b6-ae27-32a49ef539ca",
            "traveledWith": "FAMILY",
            "entryDate": 1472717951673,
            "travelDate": 1470009600000,
            "ratings": {
                "general": {
                    "general": 8
                },
                "aspects": {
                    "location": 9,
                    "service": 0,
                    "priceQuality": 8,
                    "food": 0,
                    "room": 0,
                    "childFriendly": 9,
                    "interior": 0,
                    "size": 0,
                    "activities": 0,
                    "restaurants": 0,
                    "sanitaryState": 0,
                    "accessibility": 0,
                    "nightlife": 0,
                    "culture": 0,
                    "surrounding": 0,
                    "atmosphere": 0,
                    "noviceSkiArea": 0,
                    "advancedSkiArea": 0,
                    "apresSki": 0,
                    "beach": 0,
                    "entertainment": 0,
                    "environmental": 0,
                    "pool": 6,
                    "terrace": 0
                }
            },
            "titles": {
                "en": "Accommodation fabulous, loads space, few cars"
            },
            "texts": {
                "en": "Pool a bit disappointing for my 10 and 12 year olds. Slides slow and land in very shallow water\nI think for younger the pools would be fabulous"
            },
            "user": "rachel abbott",
            "locale": "en"
        }
    ],
    "meta": {
        "page": "1",
        "limit": "1",
        "totalPages": 200,
        "totalItems": 200
    }
}
```

### Get reviews statistics

**URL** : `/v1/reviews/stats`

**Method** : `GET`

#### Response

**Code** : `200 OK`

**Response**: `Stats calculated from reviews`
