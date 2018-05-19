let rankingArray = [];

function Ranking(selector) {
  Component.call(this, selector);
  this.numbers = [];
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

Ranking.prototype.init = function() {
  const self = this;

  axios.get('http://localhost:3000/numbers')
    .then(function(response) {
      self.numbers = response.data.data.map(function(number) {
        return {
          id: number
        }
      });

      self.render();
    })
    .catch(function(error) {
      console.error(error);
    });
};

Ranking.prototype.render = function() {
  const container = this.getDOMElement();

  sortRanking();

  document.getElementById('numbers-ranking').innerHTML = '';
  rankingArray.forEach(function(number) {
      const listElement = document.createElement('li');
      listElement.classList.add('list-group-item');
      listElement.innerHTML = "Number " + number[0] + " was fetched " + number[1] + numbersFetchCounter(number);

      container.appendChild(listElement);
  });
};

//Sort numbers by values assigned to keys
function sortRanking() {
  rankingArray = [];

  for (var number in popularity) {
      rankingArray.push([number, popularity[number]]);
  }

  rankingArray.sort(function(a, b) {
      return b[1] - a[1];
  });
}

//Time or times
function numbersFetchCounter(number){
  if( number[1] === 1) {
   return " time"
}else{
   return " times"
}
}
