var app = {
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
    li.className = value ? 'pass' : 'fail';
    li.appendChild(document.createTextNode(desc));
    document.querySelector('.results').appendChild(li);
  },
  firstHandler: function(event) {
    const results = document.querySelector('.results');
    if (!results) return;

    while(results.lastChild) {
      results.removeChild(results.lastChild);
    }
  },
  secondHandler: function(event) {
    console.log(event.type);
  },
  generateTable: function() {
    const rowCount = 20000;
    const divideInto = 4;
    const chunkSize = rowCount / divideInto; // 5000
    let iteration = 0;
    const table = document.getElementsByTagName('tbody')[0];
    setTimeout(function generateRows() {
      const base = chunkSize * iteration;
      for (let i = 0; i < chunkSize; i++) {
        const tr = document.createElement('li');
        for (let t = 0; t < 6; t++) {
          const td = document.createElement('td');
          td.appendChild(document.createTextNode((i + base) + ',' + t + ',' + iteration));
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      console.log(iteration);

      iteration++;
      if (iteration < divideInto) {
        setTimeout(generateRows, 0);
      }

    }, 0);
  },
  elems: {
    second: '.second',
    firstButton: '#firstButton',
    secondButton: '#secondButton',
    outerContainer: '#outerContainer',
    innerContainer: '#innerContainer',
    table: 'table',
    tbody: 'tbody'
  }
}

document
  .querySelector(app.elems.firstButton)
  .addEventListener('click', app.firstHandler)
document
  .querySelector(app.elems.secondButton)
  .addEventListener('click', app.secondHandler)

const outerContainer = document.querySelector(app.elems.outerContainer);
const innerContainer = document.querySelector(app.elems.innerContainer);

outerContainer.addEventListener('click', function(event) {
  app.report('OuterContainer handler: capture');
  app.assert(this === outerContainer, "This referes to the outerContainer");
  app.assert(event.target === innerContainer, 'event.target referes to the innerContainer');
}, true)

innerContainer.addEventListener('click', function(event) {
  app.report('innerContainer handler: bubble');
  app.assert(this === innerContainer, "This referes to the innerContainer");
  app.assert(event.target === innerContainer, 'event.target referes to the innerContainer');
})
