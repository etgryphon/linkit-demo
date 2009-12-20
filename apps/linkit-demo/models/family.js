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
    var members = SC.clone(people);
    // TODO: [EG] Add the pets...
    return members;//members.concat(pets);
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
        name: 'Name here...'
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
