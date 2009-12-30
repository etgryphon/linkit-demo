// ==========================================================================
// Project:   LinkItDemo - mainPage
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals LinkItDemo */

// This page describes the main user interface for your application.  
LinkItDemo.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'master canvas buttons'.w(),
    
    master: SC.ListView.design({
      classNames: ['master-list'],
      layout: { left: 0, top: 0, width: 250, bottom: 0 },
      rowHeight: 35,
      selectionBinding: 'LinkItDemo.familiesController.selection',
      contentBinding: 'LinkItDemo.familiesController',
      contentValueKey: 'name'
    }), 
    
    canvas: LinkIt.CanvasView.design( SCUI.Cleanup, {
      layout: { left: 250, right: 0, top: 0, bottom: 0 },
      classNames: ['family-canvas'],
      contentBinding: SC.Binding.from('LinkItDemo.membersController').oneWay(),
      selectionBinding: 'LinkItDemo.membersController.selection',
      nodeViewDelegate: LinkItDemo.familyController
    }),
    
    buttons: SC.View.design({
      layout: {right: 0, top: 0, height: 170, width: 100},
      //childViews: 'addMale addFemale'.w(),
      childViews: 'addMale addFemale addPet'.w(),
      
      addMale: SC.LabelView.design( SCUI.SimpleButton, {
        layout: {left: 0, right: 0, top: 0, height: 50},
        classNames: ['add-button human male'],
        value: 'Add Male',
        target: LinkItDemo.familyController,
        action: 'addMale'
      }),
      
      addFemale: SC.LabelView.design( SCUI.SimpleButton, {
        layout: {left: 0, right: 0, top: 60, height: 50},
        classNames: ['add-button human female'],
        value: 'Add Female',
        target: LinkItDemo.familyController,
        action: 'addFemale'
      }),
      
      addPet: SC.LabelView.design( SCUI.SimpleButton, {
        layout: {left: 0, right: 0, top: 120, height: 50},
        classNames: ['add-button pet'],
        value: 'Add Pet',
        target: LinkItDemo.familyController,
        action: 'addPet'
      })
      
    })
  })

});
