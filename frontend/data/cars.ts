interface Spec {
  label: string;
  value: string;
}

export interface Car {
  _id: string;
  name: string;
  icon: string;
  description: string;
  specs: Spec[];
  price: string;
}

export const dummyCars: Car[] = [
  {
    _id: '1',
    name: 'Tesla Model S',
    icon: '🚗',
    description: 'The flagship sedan, combining performance, range, and luxury.',
    specs: [
      { label: 'Range', value: '405 miles' },
      { label: '0-60 mph', value: '1.99s' },
      { label: 'Top Speed', value: '200 mph' },
    ],
    price: '$74,990',
  },
  {
    _id: '2',
    name: 'Tesla Model 3',
    icon: '🚙',
    description: 'Our most affordable electric vehicle, with quick acceleration and long range.',
    specs: [
      { label: 'Range', value: '333 miles' },
      { label: '0-60 mph', value: '3.1s' },
      { label: 'Top Speed', value: '162 mph' },
    ],
    price: '$40,240',
  },
  {
    _id: '3',
    name: 'Tesla Model X',
    icon: 'SUV',
    description: 'The safest, quickest, and most capable SUV on the road.',
    specs: [
      { label: 'Range', value: '333 miles' },
      { label: '0-60 mph', value: '2.5s' },
      { label: 'Top Speed', value: '149 mph' },
    ],
    price: '$79,990',
  },
  {
    _id: '4',
    name: 'Tesla Model Y',
    icon: 'SUV',
    description: 'A mid-size SUV with seating for up to seven, ample storage, and a panoramic glass roof.',
    specs: [
      { label: 'Range', value: '330 miles' },
      { label: '0-60 mph', value: '4.8s' },
      { label: 'Top Speed', value: '135 mph' },
    ],
    price: '$44,240',
  },
  {
    _id: '5',
    name: 'Tesla Cybertruck',
    icon: '🚚',
    description: 'Built to be a better truck than trucks, while also delivering more utility than a sports car.',
    specs: [
      { label: 'Range', value: '340 miles' },
      { label: '0-60 mph', value: '2.6s' },
      { label: 'Towing', value: '11,000 lbs' },
    ],
    price: '$60,990',
  },
  {
    _id: '6',
    name: 'Tesla Roadster',
    icon: '🏎️',
    description: 'The quickest car in the world, with record-setting acceleration, range and performance.',
    specs: [
      { label: 'Range', value: '620 miles' },
      { label: '0-60 mph', value: '1.9s' },
      { label: 'Top Speed', value: '250+ mph' },
    ],
    price: '$200,000',
  },
];