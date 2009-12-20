/**
 * The base human model.
 *
 * @extends LinkItDemo.Human
 * @author Evin Grano
 *
 * @version 0.1
 * @since 0.1
 */
sc_require('core');

LinkItDemo.Pet = SC.Record.extend(LinkIt.Node, { 
  primaryKey: 'id',
  name: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Enter Name' }),
  kindOfPet: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Dog' }),
  isMale: SC.Record.attr(Boolean, { isRequired: YES, defaultValue: YES }),
  belongsTo: SC.Record.attr('LinkItDemo.Human'),
    
  // ..........................................................
  // LINKIT SPECIFIC INFORMTION
  // 
  terminals: ['myOwner'],
  position: SC.Record.attr(Object),
  
  links: function(){    
    // get master
    var master = this.get('belongsTo');
    var masterLink;
    if (master){
      masterLink = SC.Object.create( LinkIt.Link, {
        startNode: master,
        startTerminal: 'animals',
        endNode: this,
        endTerminal: 'myOwner'
      });
    }
    
    return [masterLink];
  }.property('belongsTo').cacheable()
});
