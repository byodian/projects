var testApp = {
  addMessage: function(selector, message) {
    var elem = document.querySelector(selector);
    if (!elem) return;
    
    var li = document.createElement('li');
    li.textContent = message;
    elem.appendChild(li);
  },

  report: function(message) {
    const results = document.querySelector('.results');
    if (!results) return;

    const li = document.createElement('li');
    li.className = message ? 'report' : 'fail';
    li.appendChild(document.createTextNode(message));
    results.appendChild(li);
  },

  assert: function (value, desc) {
    var li = document.createElement('li');
    var results = document.querySelector('.results');
    if(!results) {
      console.error('Not found a results element');
      return;
    }
    li.className = value ? 'pass' : 'fail';
    li.appendChild(document.createTextNode(desc));
    
    results.appendChild(li);
  },
};