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
  e.preventDefault();
  const population = document.querySelector('#population').value;
  const timeToElapse = document.querySelector('#timeToElapse').value;
  const reportedCases = document.querySelector('#reportedCases').value;
  const totalHospitalBeds = document.querySelector('#totalHospitalBeds').value;
  const period = document.querySelector('#periodType');
  const periodType = period.options[period.selectedIndex].value;

  const region = {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  };

  const data = {
    region,
    population,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    periodType
  };

  fetchEstimates(data);
});
