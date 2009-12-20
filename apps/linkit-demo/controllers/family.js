// ==========================================================================
// LinkItDemo.familyController
// ==========================================================================

sc_require('core');

/**
  @extends SC.ArrayController
  @author Evin Grano
  
  
  This controller holds all the family tree information. It transforms the objects array into a list of nodes
  that LinkIt can use.
*/
LinkItDemo.familyController = SC.ObjectController.create( 
  /* @scope */{

  // PUBLIC PROPERTIES

  /**
    Don't allow typical array actions on the content of this controller since
    our model setup doesn't let us do that either.  We have to add and remove
    campaign elements in particular ways.
  */
  isEditable: NO,
  
  contentBinding: 'LinkItDemo.familiesController.selection',
  contentBindingDefault: SC.Binding.oneWay().single(),

  // PUBLIC METHODS
  /**
    Add a new male to the family.
  */
  addMale: function() {
    var c = this.get('content') || null;
    if(c) c.addMember(LinkItDemo.Human, YES);
  },

  addFemale: function() {
    var c = this.get('content') || null;
    if(c) c.addMember(LinkItDemo.Human, NO);
  },
  
  addPet: function() {
    var c = this.get('content') || null;
    if(c) c.addMember(LinkItDemo.Pet, YES);
  },
  
  
  // Special Function for LinkIt to create the Example View for the Node
  exampleViewForNode: function(node) {
    //console.log('%@.exampleViewForContent(%@)'.fmt(this, node));

    if (node.instanceOf(LinkItDemo.Pet)) {
      return LinkItDemo.PetView;
    }
    else if (node.instanceOf(LinkItDemo.Human)) {
      return LinkItDemo.HumanView;
    }
    
    return null;
  }

});
