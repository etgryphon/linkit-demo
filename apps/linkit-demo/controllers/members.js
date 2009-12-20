// ==========================================================================
// LinkItDemo.membersController
// ==========================================================================

sc_require('core');

/**
  @extends SC.ArrayController
  @author Evin Grano
  
  
  This controller holds all the members of a family that LinkIt can use
*/
LinkItDemo.membersController = SC.ArrayController.create( 
  /* @scope LinkItDemo.membersController */{
    contentBinding: 'LinkItDemo.familyController.members',
    contentBindingDefault: SC.Binding.multiple().oneWay(),
    selection: null
});