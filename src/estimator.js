const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;

  // 😑 Best case estimated number infected cases as a factor of reported cases
  const assessImpact = reportedCases * 10;

  // 😥 Worst case estimated number infected cases as a factor of reported cases
  const assessSevereImpact = reportedCases * 50;

  // Calculate numer of days in a given time period provided weeks, months
  const numberOfDays = (timeToElapse, periodType) => {
    switch (periodType) {
      case 'days':
        return timeToElapse;
      case 'weeks':
        return timeToElapse * 7;
      case 'months':
        return timeToElapse * 30;
      default:
        return 0;
    }
  };

  // Calculates number of infections over a given period
  const infectionsByRequestedTime = (
    currentlyInfected,
    periodType,
    timeToElapse
  ) => currentlyInfected * 2 ** Math.floor(numberOfDays(timeToElapse, periodType) / 3);

  // Calculates 😑 best case number of infections over a given time lapse
  const infectionsByRequestedTimeImpact = infectionsByRequestedTime(
    assessImpact,
    data.periodType,
    data.timeToElapse
  );

  // Calculates 😥 worst case number of infections over a given time lapse
  const infectionsByRequestedTimeSevere = infectionsByRequestedTime(
    assessSevereImpact,
    data.periodType,
    data.timeToElapse
  );

  // 😑 Best case number of severe positive cases over a given time lapse
  const severeCasesByRequestedTimeImpact = 0.15 * infectionsByRequestedTimeImpact;

  // 😥 Worst case number of severe positive cases over a given time lapse
  const severeCasesByRequestedTimeSevere = 0.15 * infectionsByRequestedTimeSevere;

  // 😑 Best case number of available hospital beds for severe patients after a given period if time
  const hospitalBedsByRequestedTimeImpact = Math.trunc(0.35 * data.totalHospitalBeds
    - severeCasesByRequestedTimeImpact);

  // 😥 Worst case number of available hospital beds for severe patients after a given period if time
  const hospitalBedsByRequestedTimeSevere = Math.trunc(0.35 * data.totalHospitalBeds
    - severeCasesByRequestedTimeSevere);

  // 😑 Best case number of severe patients that will require ICU after a given period if time
  const casesForICUByRequestedTimeImpact = Math.trunc(0.05 * infectionsByRequestedTimeImpact);

  // 😥 Worst case number of severe patients that will require ICU after a given period if time
  const casesForICUByRequestedTimeSevere = Math.trunc(0.05 * infectionsByRequestedTimeSevere);

  // 😑 Best case estimated number of severe patients who will require ventilators
  const casesForVentilatorsByRequestedTimeImpact = Math.trunc(0.02
    * infectionsByRequestedTimeImpact);

  // 😥 Worst case estimated number of severe patients who will require ventilators
  const casesForVentilatorsByRequestedTimeSevere = Math.trunc(0.02
    * infectionsByRequestedTimeSevere);

  // 😑 Best case estimated economic impact
  const dollarsInFlightImpact = Math.floor(infectionsByRequestedTimeImpact
    * 0.65 * data.region.avgDailyIncomeInUSD * numberOfDays(data.timeToElapse, data.periodType));

  // 😥 Best case estimated economic impact
  const dollarsInFlightSevere = Math.floor(infectionsByRequestedTimeSevere
    * 0.65 * data.region.avgDailyIncomeInUSD * numberOfDays(data.timeToElapse, data.periodType));

  // Response Object
  const response = {
    data,
    impact: {
      currentlyInfected: assessImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeImpact,
      casesForICUByRequestedTime: casesForICUByRequestedTimeImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeImpact,
      dollarsInFlight: dollarsInFlightImpact
    },
    severeImpact: {
      currentlyInfected: assessSevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSevere,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevere,
      severeCasesByRequestedTime: severeCasesByRequestedTimeSevere,
      casesForICUByRequestedTime: casesForICUByRequestedTimeSevere,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeSevere,
      dollarsInFlight: dollarsInFlightSevere
    }
  };

  return response;
};

module.exports = covid19ImpactEstimator;
