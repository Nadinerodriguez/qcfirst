// getData();
// async function getData() {
//   const response = await fetch('/courses/10002');
//   const data = await response.json();
//   console.log(data);
// }
getData();
async function getData() {
  const response = await fetch('/courses');
  const data = await response.json();
  console.log(data);
}