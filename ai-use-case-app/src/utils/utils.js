import { faker } from "@faker-js/faker";
import {
  COUNT_OF_CORRECT_DATA,
  COUNT_OF_INCORRECT_DATA,
  INCORRECT_DATA,
  AGE_CERTIFICATION,
  GENRES,
} from "../constants/constants";

export const generateData = () => {
  const titlesData = [];
  const creditsData = [];

  // In this case, it was divided into correct and incorrect dates in order to make it more convenient to read the CSV file,
  // if necessary. This will not affect the testing functionality

  for (let i = 1; i <= COUNT_OF_CORRECT_DATA; i++) {
    titlesData.push(generateCorrectTitle(i));
    creditsData.push(generateCorrectCredit(i));
  }

  for (let i = 1; i <= COUNT_OF_INCORRECT_DATA; i++) {
    titlesData.push(generateIncorreсtTitle());
    creditsData.push(generateIncorreсtCredit());
  }

  convertToCsvAndDownload(titlesData, "titles");
  convertToCsvAndDownload(creditsData, "credits");
};

const convertToCsvAndDownload = (data, type) => {
  let csvContent = "data:text/csv;charset=utf-8,";

  data.forEach(function (row) {
    let rowString = Object.values(row)
      .map((value) => `"${value}"`)
      .join(",");
    csvContent += rowString + "\r\n";
  });

  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${type}.csv`);
  document.body.appendChild(link);

  link.click();
};

const generateCorrectTitle = (id) => {
  return {
    id: id,
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    release_year: faker.date
      .between({
        from: "1900-01-01T00:00:00.000Z",
        to: "2023-01-01T00:00:00.000Z",
      })
      .getFullYear(),
    age_certification: faker.helpers.arrayElement(AGE_CERTIFICATION),
    runtime: faker.number.int({ min: 1, max: 600 }),
    genres: faker.helpers.arrayElements(GENRES, { min: 1, max: 3 }),
    production_country: faker.location.country(),
    seasons: faker.number.int({ min: 1, max: 50 }),
  };
};

const generateCorrectCredit = (id) => {
  return {
    id: id,
    title_id: faker.number.int({
      min: 0,
      max: COUNT_OF_CORRECT_DATA,
    }),
    real_name: faker.person.fullName(),
    character_name: faker.person.fullName(),
    role: faker.person.jobTitle(),
  };
};

const generateIncorreсtTitle = () => {
  return {
    id: faker.helpers.arrayElement(INCORRECT_DATA),
    title: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElement(INCORRECT_DATA)
      : faker.commerce.productName(),
    description: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElement(INCORRECT_DATA)
      : faker.commerce.productDescription(),
    release_year: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElement(
          INCORRECT_DATA.concat([2300, 11032, 3213, 441, 2030, 20234])
        )
      : faker.date
          .between({
            from: "1900-01-01T00:00:00.000Z",
            to: "2023-01-01T00:00:00.000Z",
          })
          .getFullYear(),
    age_certification: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElement(INCORRECT_DATA)
      : faker.helpers.arrayElement(AGE_CERTIFICATION),
    runtime: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElement(INCORRECT_DATA)
      : faker.number.int({ min: 1, max: 600 }),
    genres: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElements(INCORRECT_DATA, { min: 1, max: 3 })
      : faker.helpers.arrayElements(GENRES, { min: 1, max: 3 }),
    production_country: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElement(INCORRECT_DATA)
      : faker.location.country(),
    seasons: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElement(INCORRECT_DATA)
      : faker.number.int({ min: 1, max: 50 }),
  };
};

const generateIncorreсtCredit = () => {
  return {
    id: faker.helpers.arrayElement(INCORRECT_DATA),
    title_id: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElement(INCORRECT_DATA)
      : faker.number.int({
          min: 0,
          max: COUNT_OF_CORRECT_DATA,
        }),
    real_name: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElement(INCORRECT_DATA)
      : faker.person.fullName(),
    character_name: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElement(INCORRECT_DATA)
      : faker.person.fullName(),
    role: faker.datatype.boolean(0.2)
      ? faker.helpers.arrayElement(INCORRECT_DATA)
      : faker.person.jobTitle(),
  };
};
