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
    childViews: 'title master footer canvas buttons'.w(),
    
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
      }
    }),
    
    master: SC.ListView.design({
      classNames: ['master-list'],
      layout: { left: 0, top: 56, width: 259, bottom: 37 },
      rowHeight: 44,
      rowSpacing: 2,
      selectionBinding: 'LinkItDemo.familiesController.selection',
      contentBinding: 'LinkItDemo.familiesController',
      contentValueKey: 'name'
    }),
    
    footer: SC.View.design({
      layout: {left: 0, bottom: 0, width: 259, height: 37},
      childViews: 'buttons'.w(),
      
      buttons: SC.SegmentedView.design({
        layout: {centerX: 0, centerY: 0, height: 24, width: 100 },
        allowsMultipleSelection: NO,
        allowsEmptySelection: YES,
        value: null,
        items: [
          {
            title: '',
            value: 'F',
            icon: 'contact-filter-icon',
            target: LinkItDemo.familiesController,
            action: 'addFamily'
          },
          {
            title: '',
            value: 'L',
            icon: 'contact-list-icon',
            target: LinkItDemo.familiesController,
            action: 'removeFamily'
          }
        ],
        itemTitleKey: 'title',
        itemTargetKey: 'target',
        itemActionKey: 'action',
        itemValueKey: 'value',
        itemIconKey: 'icon'
      })
    }),
    
    canvas: LinkIt.CanvasView.design( SCUI.Cleanup, {
      layout: { left: 259, right: 0, top: 56, bottom: 0 },
      classNames: ['family-canvas'],
      contentBinding: SC.Binding.from('LinkItDemo.membersController').oneWay(),
      selectionBinding: 'LinkItDemo.membersController.selection',
      nodeViewDelegate: LinkItDemo.familyController
    }),
    
    buttons: SC.View.design({
      layout: {right: 0, top: 56, height: 170, width: 100},
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
