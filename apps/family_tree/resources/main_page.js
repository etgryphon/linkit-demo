// ==========================================================================
// Project:   LinkItDemo - mainPage
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals LinkItDemo */
sc_require('core');
sc_require('views/family_item');
sc_require('views/add_button');
sc_require('views/list_button');

// This page describes the main user interface for your application.  
LinkItDemo.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'title master footer canvas palette'.w(),
    
    title: SC.View.design({
      layout: {left: 0, top: 0, right: 0, height: 56},
      classNames: ['header'],
      render: function(context, firstTime){
        context = context.begin('div')
                    .addClass('logo')
                      .text('family tree')
                  .end();
        context = context.begin('div')
                    .addClass('blurb')
                      .text('a scui linkit example')
                  .end();
        context = context.begin('div')
                   .addClass('leaves')
                  .end();
      }
    }),
    
    master: SC.ListView.design({
      classNames: ['master-list'],
      layout: { left: 0, top: 56, width: 259, bottom: 36 },
      rowHeight: 43,
      rowSpacing: 2,
      exampleView: LinkItDemo.FamilyItemView,
      selectionBinding: 'LinkItDemo.familiesController.selection',
      contentBinding: 'LinkItDemo.familiesController',
      contentValueKey: 'name'
    }),
    
    footer: SC.View.design({
      classNames: ['footer'],
      layout: {left: 0, bottom: 0, width: 259, height: 35},
      childViews: 'addFamilyButton removeFamilyButton'.w(),
      
      addFamilyButton: LinkItDemo.ListButtonView.design({
        layout: {centerX: -14, centerY: 0, height: 24, width: 27 },
        classNames: ['add'],
        target: LinkItDemo.familiesController,
        action: 'addFamily'
      }),
      
      removeFamilyButton: LinkItDemo.ListButtonView.design({
        layout: {centerX: 13, centerY: 0, height: 24, width: 27 },
        classNames: ['remove'],
        target: LinkItDemo.familiesController,
        action: 'removeFamily'
      })
    }),
    
    canvas: LinkIt.CanvasView.design( SCUI.Cleanup, {
      layout: { left: 259, right: 0, top: 56, bottom: 0 },
      classNames: ['family-canvas'],
      contentBinding: SC.Binding.from('LinkItDemo.membersController').oneWay(),
      selectionBinding: 'LinkItDemo.membersController.selection',
      nodeViewDelegate: LinkItDemo.familyController
    }),    
    
    palette: SC.View.design({
      layout: {right: 0, top: 56, height: 96, width: 84 },
      childViews: 'addMale addFemale addPet'.w(),
      
      addMale: LinkItDemo.AddButtonView.design({
        layout: { top: 4, right: -54 },
        title: "Male",
        target: LinkItDemo.familyController,
        action: 'addMale'
      }),
            
      addFemale: LinkItDemo.AddButtonView.design({
        layout: { top: 36, right: -54 },
        title: "Female",
        target: LinkItDemo.familyController,
        action: 'addFemale'
      }),
      
      addPet: LinkItDemo.AddButtonView.design({
        layout: { top: 69, right: -54 },
        title: "Pet",
        target: LinkItDemo.familyController,
        action: 'addPet'
      })
    })
  })

});
