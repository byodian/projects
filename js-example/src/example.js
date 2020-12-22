var app = {
  addMessage: function(selector, message) {
    var elem = document.querySelector(selector);
    if (!elem) return;
    
    var li = document.createElement('li');
    li.textContent = message;
    elem.appendChild(li);
  },
  elements: {
    second: '.second'
  }
}

document.body.addEventListener('mousemove', function() {
  app.addMessage(
    app.elements.second,
    'Event: mousemove'
  )
})

document.body.addEventListener('click', function() {
  app.addMessage(
    app.elements.second,
    'Event: Click'
  )
})