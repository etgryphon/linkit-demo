/**
 * The base Pet view.
 * @class LinkItDemo.PetView
 * @extends SC.View
 * @author Evin Grano
 *
 * @version 0.1
 * @since 0.1
 */
sc_require('core');
sc_require('mixins/gender');

LinkItDemo.PetView = SC.View.extend(SCUI.Cleanup, LinkIt.NodeView, {
  classNames: ['pet'],
  layout: { top: 0, left: 0, width: 150, height: 60 },
  displayProperties: ['content'],
  content: null,
  
  createChildViews: function(){
    var childViews = [];
    var content = this.get('content');
    if(SC.none(content)) return;
    
    // This is the content of the view
    var contentView = this.createChildView(
      SC.View.design( LinkItDemo.Gender, {
        classNames: ['pet'],
        content: content,
        layout: { left: 0, top: 20, right: 0, bottom: 0},
        childViews: 'name petType'.w(),
        
        name: SC.LabelView.extend({
          classNames: ['name'],
          layout: { left: 0, top: 0, right: 0, height: 30},
          isEditable: YES,
          textAlign: SC.ALIGN_CENTER,
          valueBinding: SC.binding('.name', content)
        }),
        
        petType: SC.LabelView.extend({
          classNames: ['name'],
          layout: { left: 0, bottom: 0, right: 0, height: 30},
          isEditable: YES,
          textAlign: SC.ALIGN_CENTER,
          valueBinding: SC.binding('.kindOfPet', content)
        })
      })
    );
    childViews.push(contentView);
    
    // Owner Terminal
    this._term_myOwner = this.createChildView(
      SC.View.extend(LinkIt.Terminal, {
        classNames: ['master-terminal'],
        layout: { centerX: 0, top: 0, width: 20, height: 20 },
        linkStyle: { lineStyle: LinkIt.STRAIGHT, width: 3, color: '#4C678E', cap: LinkIt.ROUND},
        node: content,
        terminal: 'myOwner'
      })
    );
    //this.cacheTerminalView(outputTerminal, outputTerminal.get('terminal'));
    childViews.push(this._term_myOwner);
    
    this.set('childViews', childViews);
  },
  
  // ..........................................................
  // LINKIT Specific functions
  // 
  terminalViewFor: function(terminalKey) {
    return this['_term_' + terminalKey];
  }
  
});
