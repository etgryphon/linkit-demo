/**
 * The base human family model.
 *
 * @extends LinkItDemo.Male
 * @author Evin Grano
 *
 * @version 0.1
 * @since 0.1
 */
sc_require('core');

LinkItDemo.Family = SC.Record.extend({ 
  primaryKey: 'id',
  name: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Enter Family Name' }),
  people: SC.Record.toMany('LinkItDemo.Human', {
    inverse: 'family',
    isMaster: YES
  }),
  pets: SC.Record.toMany('LinkItDemo.Pet', {
    inverse: 'family',
    isMaster: YES
  }),
  
  members: function(){
    var people = this.get('people');
    var pets = this.get('pets');
    
    var i, len, members = [];
    len = people.get('length');
    for(i = 0; i < len; i++ ){
      members.push(people.objectAt(i));
    }
    len = pets.get('length');
    for(i = 0; i < len; i++ ){
      members.push(pets.objectAt(i));
    }
    return members;
  }.property('people', 'pets').cacheable(),
  
  // ..........................................................
  // Methods
  // 
  
  /**
    Add a new member to the family.
  */
  addMember: function(memberModel, isMale) {
    var store = LinkItDemo.get('store');
    if (store && memberModel) {
      var member = LinkItDemo.createRecord(memberModel, {
        isMale: isMale,
        name: 'Name here...',
        kindOfPet: 'Dog'
      });
      if (member.instanceOf(LinkItDemo.Human)){
        var ppl = this.get('people');
        ppl.pushObject(member);
      }
      else if (member.instanceOf(LinkItDemo.Pet)){
        var pets = this.get('pets');
        pets.pushObject(member);
      }
      else {
        console.error('Bad member type');
      }
    }
  }
});
