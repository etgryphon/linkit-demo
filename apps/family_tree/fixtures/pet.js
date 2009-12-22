sc_require('core');
sc_require('models/pet');

LinkItDemo.Pet.FIXTURES = [
  // ..........................................................
  // Doe Family
  // 
  {
    id: '1',
    type: 'Pet',
    name: 'Fluffy',
    kindOfPet: 'Dog',
    isMale: true,
    belongsTo: '4',
    family: '1',
    position: {top: 400, left: 450}
  },
  
  // ..........................................................
  // Obama Family
  // 
  {
    id: '2',
    type: 'Pet',
    name: 'Rahm Emanuel',
    kindOfPet: 'Dog',
    isMale: true,
    belongsTo: '8',
    family: '2',
    position: {top: 300, left: 150}
  }
];
