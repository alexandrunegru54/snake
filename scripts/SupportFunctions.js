export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// export function generateRandomNumber(min, max, ignoreList) {
//   let randomNumber;

//   do {
//     randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
//   } while (ignoreList.includes(randomNumber));

//   return randomNumber;
// }
