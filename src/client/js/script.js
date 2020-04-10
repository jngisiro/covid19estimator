const fetchEstimates = (data) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch(
    'https://whispering-waters-00388.herokuapp.com/api/v1/on-covid-19',
    options
  )
    .then((res) => res.json())
    .then((res) => console.log(res));
};

document.querySelector('form').addEventListener('submit', (e) => {
  const data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 28,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };
  e.preventDefault();
  fetchEstimates(data);
});
