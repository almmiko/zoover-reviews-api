const CalculateStats = require('../../utils/calculateStats');
const Review = require('../../models/review');

describe('calculateStats', () => {
  const reviews = [
    {
      "traveledWith": "FAMILY",
      "entryDate": 1252359116000, //k = 0.5
      "travelDate": 1252359116000,
      "ratings": {
        "general": {
          "general": 8
        },
        "aspects": {
          "location": 9,
          "service": 0,
          "priceQuality": 9,
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
          "pool": 0,
          "terrace": 0
        }
      },
    },
    {
      "traveledWith": "FAMILY",
      "entryDate": 1266252490713, //k = 0.5
      "travelDate": 1262304000000,
      "ratings": {
        "general": {
          "general": 7
        },
        "aspects": {
          "location": 7,
          "service": 0,
          "priceQuality": 0,
          "food": 0,
          "room": 0,
          "childFriendly": 0,
          "interior": 0,
          "size": 0,
          "activities": 0,
          "restaurants": 6,
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
          "pool": 0,
          "terrace": 0
        }
      },
    },
    {
      "traveledWith": "OTHER",
      "entryDate": 1449970631852, //k = 0.6
      "travelDate": 1246406400000,
      "ratings": {
        "general": {
          "general": 9
        },
        "aspects": {
          "location": 9,
          "service": 0,
          "priceQuality": 9,
          "food": 0,
          "room": 0,
          "childFriendly": 10,
          "interior": 0,
          "size": 0,
          "activities": 0,
          "restaurants": 9,
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
          "pool": 0,
          "terrace": 0
        }
      },
    },
  ];

  test('should return correct general rating', () => {
    const calculateStats = new CalculateStats();
    const AVERAGE_RATING = 4.3;
    const ITEMS_COUNT = 3;
    const GENERAL_RATING = 12;

    reviews.map((review) => {
      calculateStats.calculateGeneralRatingSum(new Review(review));
    });

    expect(calculateStats.getAverageGeneralRating()).toEqual(AVERAGE_RATING);
    expect(Math.floor(calculateStats.rating.general)).toEqual(GENERAL_RATING);
    expect(calculateStats.rating.count).toEqual(ITEMS_COUNT);
  });

  test('should return traveledWith with count', () => {
    const calculateStats = new CalculateStats();
    const EXPECTED = {
      FAMILY: 2,
      OTHER: 1,
    };

    reviews.map((review) => {
      calculateStats.calculateTraveledWith(new Review(review));
    });

    expect(calculateStats.getTraveledWith()).toEqual(EXPECTED);
  });

  test('should return correct rating aspects', () => {
    const calculateStats = new CalculateStats();
    const EXPECTED = {
      location: 4.47,
      service: 0,
      priceQuality: 3.3,
      food: 0,
      room: 0,
      childFriendly: 3.5,
      interior: 0,
      size: 0,
      activities: 0,
      restaurants: 2.8,
      sanitaryState: 0,
      accessibility: 0,
      nightlife: 0,
      culture: 0,
      surrounding: 0,
      atmosphere: 0,
      noviceSkiArea: 0,
      advancedSkiArea: 0,
      apresSki: 0,
      beach: 0,
      entertainment: 0,
      environmental: 0,
      pool: 0,
      terrace: 0
    };

    reviews.map((review) => {
      calculateStats.calculateRatingAspectsSum(new Review(review));
    });

    expect(calculateStats.getAverageAspectsRating()).toEqual(EXPECTED);
  });
});
