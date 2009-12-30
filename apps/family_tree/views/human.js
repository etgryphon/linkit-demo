/**
 * The base human view.
 * @class LinkItDemo.HumanView
 * @extends SC.View
 * @author Evin Grano
 *
 * @version 0.1
 * @since 0.1
 */
sc_require('core');
sc_require('mixins/gender');

LinkItDemo.HumanView = SC.View.extend(SCUI.Cleanup, LinkIt.NodeView, LinkItDemo.Gender, {
  classNames: ['human'],
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
    
    var isMale = content.get('isMale');
    
    // This is the content of the view
    var contentView = this.createChildView(
      SC.LabelView.extend({
        classNames: ['name'],
        content: content,
        isEditable: YES,
        layout: { top: 20, left: 20, right: 20, bottom: 20},
        textAlign: SC.ALIGN_CENTER,
        valueBinding: SC.binding('.name', content)
      })
    );
    childViews.push(contentView);
    
    // Father Terminal
    this._term_dad = this.createChildView(
      SC.View.extend(LinkIt.Terminal, {
        classNames: ['father-terminal'],
        layout: { left: 40, top: -5, width: 10, height: 10 },
        linkStyle: { lineStyle: LinkIt.STRAIGHT, width: 3, color: '#A5C0DC', cap: LinkIt.ROUND},
        node: content,
        terminal: 'dad',
        direction: LinkIt.INPUT_TERMINAL
      })
    );
    childViews.push(this._term_dad);
    
    // Mother Terminal
    this._term_mom = this.createChildView(
      SC.View.extend(LinkIt.Terminal, {
        classNames: ['mother-terminal'],
        layout: { right: 40, top: -5, width: 10, height: 10 },
        linkStyle: { lineStyle: LinkIt.STRAIGHT, width: 3, color: '#E08CDF', cap: LinkIt.ROUND},
        node: content,
        terminal: 'mom',
        direction: LinkIt.INPUT_TERMINAL
      })
    );
    childViews.push(this._term_mom);
    
    var spouseLayout = isMale ? { right: -5, centerY: 0, width: 10, height: 10 } : { left: -5, centerY: 0, width: 10, height: 10 } ;
    this._term_sig = this.createChildView(
      SC.View.extend(LinkIt.Terminal, {
        classNames: ['spouse-terminal'],
        layout: spouseLayout,
        linkStyle: { lineStyle: LinkIt.HORIZONTAL_CURVED, width: 3, color: 'red', cap: LinkIt.ROUND},      
        node: content,
        terminal: 'sig'
      })
    );
    childViews.push(this._term_sig);
    
    // pets
    var petsLayout = isMale ? { left: -5, centerY: 0, width: 10, height: 10 } :{ right: -5, centerY: 0, width: 10, height: 10 };
    this._term_animals = this.createChildView(
      SC.View.extend(LinkIt.Terminal, {
        classNames: ['pets-terminal'],
        layout: petsLayout,
        linkStyle: { lineStyle: LinkIt.STRAIGHT, width: 3, color: '#4EE76B', cap: LinkIt.ROUND},
        node: content,
        terminal: 'animals',
        direction: LinkIt.OUTPUT_TERMINAL
      })
    );
    childViews.push(this._term_animals);
    
    // children
    var kidsColor = isMale ? '#A5C0DC' : '#E08CDF' ;
    this._term_kids = this.createChildView(
      SC.View.extend(LinkIt.Terminal, {
        classNames: ['children-terminal'],
        layout: { bottom: -5, centerX: 0, width: 10, height: 10 },
        linkStyle: { lineStyle: LinkIt.STRAIGHT, width: 3, color: kidsColor, cap: LinkIt.ROUND},
        node: content,
        terminal: 'kids',
        direction: LinkIt.OUTPUT_TERMINAL
      })
    );
    childViews.push(this._term_kids);

    this.set('childViews', childViews);
  },
  
  // ..........................................................
  // LINKIT Specific for the view
  // 
  /**
    Implements LinkIt.NodeView.terminalViewFor()
  */
  terminalViewFor: function(terminalKey) {
    return this['_term_' + terminalKey];
  }
});
