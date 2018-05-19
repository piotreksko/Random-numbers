const ranking = new Ranking('#numbers-ranking');
const randomNumbers = new RandomNumbers('#random-numbers');
randomNumbers.init();
ranking.init();
setInterval('randomNumbers.init();', 10000);
setInterval('ranking.init();', 10000);
