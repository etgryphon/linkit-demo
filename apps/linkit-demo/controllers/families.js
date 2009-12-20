// ==========================================================================
// LinkItDemo.familiesController
// ==========================================================================

sc_require('core');

/**
  @extends SC.ArrayController
  @author Evin Grano
  
  
  This controller holds all the family tree information. It transforms the objects array into a list of nodes
  that LinkIt can use.
*/
LinkItDemo.familiesController = SC.ArrayController.create( 
  /* @scope LinkItDemo.familiesController */{
    content: null,
    selection: null
});