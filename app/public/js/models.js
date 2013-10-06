var attr = DS.attr
var hasMany = DS.hasMany

//App.ApplicationAdapter = DS.FixtureAdapter

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: ''
});


App.Volunteer = DS.Model.extend({
  name: attr('string'),
  email: attr('string'),
  causes: attr('string'),
  skills: attr('string'),
  location: attr('string'),
  lat: attr('number'),
  long: attr('number'),
});

App.Opportunity = DS.Model.extend({
  title: attr('string'),
  orgName: attr('string'),
  orgURL: attr('string'),
  email: attr('string'),
  location: attr('string'),
  lat: attr('number'),
  long: attr('number'),
  description: attr('string'),
  commitment: attr('string'),
  causes: attr('string'),
  skills: attr('string')
});

App.Volunteer.FIXTURES = [
  {
    id: 1,
    name: 'Gabriel',
    email: 'g@briel.ca',
    causes: 'this,that, the other',
    skills: 'stuff, numb-chux',
    location: 'San Francisco',
    lat: 98,
    long: 23,
  }
]

App.Opportunity.FIXTURES = [
  {
    id: 1,
    title: 'op 1',
    orgName: 'org 1',
    orgURL: 'org url 1',
    email: 'joe@org1.org',
    location: 'San Francisco, CA',
    lat: 73,
    long: 49,
    description: 'desc',
    commitment: 'your whole life. forever.',
    causes: 'this, that, the, other',
    skills: 'finance'
  }
];
