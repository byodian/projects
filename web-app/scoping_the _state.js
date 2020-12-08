var Component = (function () {

  var Constructor = function (selector, options) {
    this.selector = selector;
    this.data = options.data;
    this.template = options.template;
  }

  Constructor.prototype.render = function () {
    var target = document.querySelector(this.selector);
    if (!target) return;
    target.innerHTML = this.template(this.data);
  }

  Constructor.prototype.setData = function (obj) {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        this.data[key] = obj[key];
      }
    }

    this.render();
  } 

  Constructor.prototype.getData = function () {
    return JSON.parse(JSON.stringify(this.data));
  }

  return Constructor;
})();


// Create a componet
var lists = new Component('#list', {
  data: {
    listItems: ['apple', 'orange']
  },
  template: function (props) {
    // If there are no list items
    if (props.listItems.length < 1) {
      return '<p><em>You do not have any list items yet. Try adding one with the form above.</em></p>';
    }

    // If there are
    return '<ul>' + props.listItems.map(function (item) {
        return '<li>' + item + '</li>';
    }).join('') + '</ul>';
  }
})

// Render the initial UI
lists.render();

document.querySelector('#add_to_list').addEventListener('submit', function(event) {
  if (!event.target.matches('#add_to_list')) return;
  event.preventDefault();
  
  var item = document.querySelector('#list-item');
  if (!item || !item.value) return;
  
  var items = lists.getData();
  items.listItems.push(item.value);
  lists.setData({listItems: items.listItems});
  
  item.value = '';
  item.focus();
});


