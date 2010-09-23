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
    selection: null,
    
    changedFamily: function(){
      LinkItDemo.getPath('mainPage.mainPane.canvas').displayDidChange();
    },
    
    addFamily: function(){
      var store = LinkItDemo.get('store');
      if (store) {
        var family = LinkItDemo.createRecord(LinkItDemo.Family, {
          name: 'New Family',
          people: [],
          pets: []
        });
      }
    },
    
    removeFamily: function(){
      var sel = this.getPath('selection.firstObject');
      LinkItDemo.destroyRecord(sel);
    }
});