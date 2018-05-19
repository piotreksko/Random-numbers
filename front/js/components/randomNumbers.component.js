let numbersArray = [],
    fetchCounter = 0,
    popularity = {},
    uniques;

//Init popularity dictionary with keys from 1 to 10 - values 0
getPopularity();
function getPopularity () {
    for (var i = 1; i < 11; i++) {
    popularity[i] = 0;
  }
}

function RandomNumbers(selector) {
    Component.call(this, selector);
    this.randomNumbers = [];
}

RandomNumbers.prototype = Object.create(Component.prototype);
RandomNumbers.constructor = RandomNumbers;

RandomNumbers.prototype.init = function() {
    const self = this;

    axios.get('http://localhost:3000/random-numbers')
        .then(function(response) {
            fetchCounter +=1;
            document.getElementById('fetchCounter').innerHTML = fetchCounter + dataFetchCounter(fetchCounter);

            self.randomNumbers = response.data.data.map(function(number) {
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

RandomNumbers.prototype.render = function() {
    const container = this.getDOMElement();

    //Push fetched numbers into an array
    this.randomNumbers.forEach(function(number) {
        numbersArray.push(number.id);
    });

    updateValues(numbersArray);

    document.getElementById('random-numbers').innerHTML = '';
    this.randomNumbers.forEach(function(number) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerHTML = number.id;
        container.appendChild(listElement);
    });
};

//Update key values
function updateValues(array) {
    numbersArray.forEach(function(value) {
        popularity[value] = 0;
    });

    uniques = numbersArray.filter(function(value) {
        return ++popularity[value] == 1;
    });

}

//Time or times
function dataFetchCounter(fetchCounter){
  if( fetchCounter === 1) {
   return " time"
}else{
   return " times"
}
}
