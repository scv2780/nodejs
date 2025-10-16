// promise.js
// pending/ fulfilled/ rejected , then()/catch()
const promise = new Promise(function (resolve, reject) {
  // 정상완료=> 첫번쨰 매개값으로 받은 합수호출.
  // 거부=> 두번째 매개값으로 받은 함수호출.
  try {
    setTimeout(function () {
      resolve({ retCode: "Success", retVal: ["hong", "kom", "park"] });
    }, 1000);
  } catch (err) {
    reject(new Error("Error !!!"));
  }
});

promise
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.error(err);
  });

fetch("")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
