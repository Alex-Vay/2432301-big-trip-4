import {getTempDate, getRandomArrayElement, getRandomValue} from '../utils.js';

const POINTS_COUNT = 5;
const IMAGE_COUNT = 4;
const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Washington', 'Chicago', 'New York', 'Moskow', 'Monaco'];
const OFFERS = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train'];
const DESCRIPTIONS = [
  'Fusce tristique felis at fermentum pharetra.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];
const ElementsCount = {
  MIN: 1,
  MAX: 4
};

const IMAGE_URL = 'https://loremflickr.com/248/152?random=';

const generateOffer = (id, pointType) => ({
  'id': id,
  'title': `offer for ${pointType}`,
  'price': getRandomValue()
});

const generateOffersByType = (pointType) => ({
  type: pointType,
  offers: Array.from({length: getRandomValue(ElementsCount.MIN, ElementsCount.MAX)}).map((value, index) => generateOffer(index + 1, pointType)),
});

const getRandomOffer = () => Array.from({length: POINT_TYPES.length}).map((value, index) => generateOffersByType(POINT_TYPES[index]));

const generateTown = (id) => ({
  'id': id,
  'name': DESTINATIONS[id],
  'photos': Array.from({length: IMAGE_COUNT}, () => `${IMAGE_URL}${getRandomValue()}`),
  'description': getRandomArrayElement(DESCRIPTIONS).repeat(getRandomValue(ElementsCount.MIN, ElementsCount.MAX))
});

const getRandomTown = () => Array.from({length: DESTINATIONS.length}).map((value, index) => generateTown(index));

const generatePoint = () => {
  const offersByTypePoint = getRandomArrayElement(getRandomOffer());
  const allOfferIdsByTypePoint = offersByTypePoint.offers.map((offer) => offer.id);
  return {
    'id': crypto.randomUUID(),
    'basePrice': getRandomValue(),
    'dateFrom': getTempDate({flag: false}),
    'dateTo': getTempDate({flag: true}),
    'destinationId': getRandomArrayElement(getRandomTown()).id,
    'isFavorite': getRandomArrayElement([0, 1]),
    'offerIds': Array.from({length: getRandomValue(0, allOfferIdsByTypePoint.length)}).map(() => allOfferIdsByTypePoint[getRandomValue(0, allOfferIdsByTypePoint.length - 1)]),
    'type': offersByTypePoint.type
  };
};

const getRandomPoint = () => Array.from({length: POINTS_COUNT}).map(() => generatePoint()).sort();

export {getRandomOffer, getRandomPoint, getRandomTown,
  POINTS_COUNT, IMAGE_COUNT, POINT_TYPES, DESTINATIONS, OFFERS, IMAGE_URL};
