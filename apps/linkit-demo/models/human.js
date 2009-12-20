/**
 * The base human model.
 *
 * @extends LinkItDemo.Human
 * @author Evin Grano
 *
 * @version 0.1
 * @since 0.1
 */
sc_require('core');

LinkItDemo.Human = SC.Record.extend(LinkIt.Node, { 
  primaryKey: 'id',
  name: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Enter Name' }),
  isMale: SC.Record.attr(Boolean, { isRequired: YES, defaultValue: YES }),
  family: SC.Record.attr('LinkItDemo.Family'),
  mother: SC.Record.attr('LinkItDemo.Human'),
  father: SC.Record.attr('LinkItDemo.Human'),
  spouse: SC.Record.attr('LinkItDemo.Human'),
  pets: SC.Record.toMany('LinkItDemo.Pet', {
    inverse: 'owner',
    isMaster: YES
  }),
    
  // ..........................................................
  // LINKIT SPECIFIC INFORMTION
  // 
  terminals: ['mom', 'dad', 'sig', 'kids', 'animals'],
  position: SC.Record.attr(Object),
  
  links: function(){
    var links = [];
    
    // get mother
    var mom = this.get('mother');
    if (mom){
      var momLink = SC.Object.create( LinkIt.Link, {
        startNode: this,
        startTerminal: 'mom',
        endNode: mom,
        endTerminal: 'kids'
      });
      links.push(momLink);
    }
    
    // get father
    var dad = this.get('father');
    if (dad){
      var dadLink = SC.Object.create( LinkIt.Link, {
        startNode: this,
        startTerminal: 'dad',
        endNode: dad,
        endTerminal: 'kids'
      });
      links.push(dadLink);
    }
    
    // spouse if you are the male
    var spouse = this.get('spouse');
    var isMale = this.get('isMale');
    if (isMale && spouse){
      var spouseLink = SC.Object.create( LinkIt.Link, {
        startNode: this,
        startTerminal: 'sig',
        endNode: spouse,
        endTerminal: 'sig'
      });
      links.push(spouseLink);
    }
    
    return links;
  }.property('mother', 'father', 'spouse', 'isMale').cacheable(),
  
  canLink: function(link) {
    if (!link) return NO;

    // Make sure we don't connect to ourselves.
    var endNode = link.get('endNode');
    if (endNode === this) return NO;

    // Make sure we don't already have this link.
    if (this._hasLink(link)) return NO;

    return YES;
  },
  
  _hasLink: function(link) {
    var links = this.get('links') || [];
    var len = links.get('length'), n;
    var linkID = LinkIt.genLinkID(link);
    for (var i = 0; i < len; i++) {
      n = links.objectAt(i);
      if (LinkIt.genLinkID(n) === linkID) {
        return YES;
      }
    }
  },
  
  didCreateLink: function(link) {
    var sn = link.get('startNode');
    var st = link.get('startTerminal');
    var en = link.get('endNode');
    var et = link.get('endTerminal');
    console.log('(%@) SN: %@, ST: %@, EN, %@, ET: %@'.fmt(this.get('name'), sn.get('name'), st, en.get('name'), et));
    if(et === 'sig'){
      this.set('spouse', en);
    }
    else if (st === 'mom'){
      this.set('mother', en);
    }
    else if (st === 'dad'){
      this.set('father', en);
    }
  }
});
