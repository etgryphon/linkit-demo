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

LinkItDemo.PetView = SC.View.extend(SCUI.Cleanup, LinkIt.NodeView, LinkItDemo.Gender, {
  classNames: ['pet'],
  layout: { top: 0, left: 0, width: 150, height: 80 },
  displayProperties: ['content', 'isSelected'],
  content: null,
  
  render: function(context){
    sc_super();
    if (this.get("isSelected")) context.addClass("selected");
  },
  
  createChildViews: function(){
    var childViews = [];
    var content = this.get('content');
    if(SC.none(content)) return;
    
    // This is the content of the view
    var contentView = this.createChildView(
      SC.View.design({
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
        layout: { centerX: 0, top: -5, width: 10, height: 10 },
        linkStyle: { lineStyle: LinkIt.STRAIGHT, width: 3, color: '#4EE76B', cap: LinkIt.ROUND},
        node: content,
        terminal: 'myOwner'
      })
    );
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
