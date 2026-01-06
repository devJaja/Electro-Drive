const mongoose = require('mongoose');
const connectDB = require('./db');
const Car = require('./models/Car');

const cars = [
  {
    name: 'Model S',
    icon: '🚗',
    description: 'The flagship sedan with unmatched performance and luxury. Experience acceleration that defies physics.',
    specs: [
      { label: '0-60 MPH', value: '1.99s' },
      { label: 'Range', value: '405 mi' },
      { label: 'Top Speed', value: '200 mph' }
    ],
    price: '$89,990'
  },
  {
    name: 'Model 3',
    icon: '🏎️',
    description: 'Affordable luxury meets cutting-edge technology. The perfect entry into the world of electric vehicles.',
    specs: [
      { label: '0-60 MPH', value: '3.1s' },
      { label: 'Range', value: '358 mi' },
      { label: 'Top Speed', value: '162 mph' }
    ],
    price: '$42,990'
  },
  {
    name: 'Model X',
    icon: '🚙',
    description: 'The ultimate SUV with falcon-wing doors and room for seven. Luxury meets versatility.',
    specs: [
      { label: '0-60 MPH', value: '2.5s' },
      { label: 'Range', value: '348 mi' },
      { label: 'Seating', value: '7' }
    ],
    price: '$99,990'
  },
  {
    name: 'Model Y',
    icon: '🚐',
    description: 'Compact SUV with maximum versatility. Perfect for families and adventure seekers.',
    specs: [
      { label: '0-60 MPH', value: '3.5s' },
      { label: 'Range', value: '330 mi' },
      { label: 'Cargo', value: '76 ft³' }
    ],
    price: '$52,990'
  },
  {
    name: 'Cybertruck',
    icon: '🛻',
    description: 'Revolutionary design meets unmatched capability. Built for the extraterrestrial highway.',
    specs: [
      { label: '0-60 MPH', value: '2.6s' },
      { label: 'Range', value: '340 mi' },
      { label: 'Towing', value: '11K lbs' }
    ],
    price: '$79,990'
  },
  {
    name: 'Roadster',
    icon: '🏁',
    description: 'The quickest car in the world. A true supercar experience with electric precision.',
    specs: [
      { label: '0-60 MPH', value: '1.9s' },
      { label: 'Range', value: '620 mi' },
      { label: 'Top Speed', value: '250+ mph' }
    ],
    price: '$200,000'
  }
];

const seedDB = async () => {
  await connectDB();
  await Car.deleteMany({});
  await Car.insertMany(cars);
  console.log('Database seeded');
  mongoose.connection.close();
};

seedDB();
