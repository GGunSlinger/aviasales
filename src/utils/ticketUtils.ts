export const getCarrierImage = (carrierCode: string): string => {
  return `https://pics.avs.io/99/36/${carrierCode}.png`;
};

export const pluralize = (number: number, titles: string[]): string => {
  // здесь значения массива лучше занести в константы, потому что
  // когда другой разработчик будет смотреть код, то числа массива будут для него магическими
  // и непонятными
  const cases = [2, 0, 1, 1, 1, 2];
  const title =
    titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];

  return `${number} ${title}`;
};

export const minutesToHoursMinutes = (minutes: number): string => {
  if (minutes >= 60) {
    const minutesLeftInHour = minutes % 60;
    const hours = (minutes - minutesLeftInHour) / 60;

    return `${hours}ч ${minutesLeftInHour}м`;
  }

  return `${minutes}м`;
};
