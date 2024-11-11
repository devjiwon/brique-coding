const fs = require("fs");

let totalLine = 0;
let errorArray = '';

fs.readFile("./sample.csv", "utf-8", (err, data) => {

    const resultArray = csvToArray(data);

    console.log("---------------------------------------------");
    console.log("The total number of lines: ", totalLine);
    console.log("The calculated lines: ", resultArray.length);
    console.log("The error values: ", errorArray);

})


function csvToArray(csv_string) {

    const rows = csv_string.split("\r\n");
    const jsonArray = [];
    const header = rows[0].split(" ");

    for (let i = 1; i < rows.length; i++) {
        totalLine++;

        let errorCnt = 0;
        let row = rows[i].split(",");

        for (let j = 0; j < header.length; j++) {

            if (isNaN(row[j]) === true) { 
                errorArray += row[j];
                errorCnt++;
            } else row[j] = Number(row[j])
        }

        if (errorCnt === 0) {
            jsonArray.push(row);
            calculatedArray(row);
        }
    }

    return jsonArray;
}

function calculatedArray(arr) {
    let answerArr = [];

    arr.sort(function (a, b) {
        return a - b;
    });

    // 1. 최솟값
    answerArr.push(arr[0]);

    // 2. 최댓값
    answerArr.push(arr[arr.length - 1]);

    // 3. 합계
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    answerArr.push(sum);

    // 4. 평균
    let avg = sum / arr.length;
    answerArr.push(avg);

    // 5. 표준편차
    let tempSum = 0;
    for (let i = 0; i < arr.length; i++) {
        tempSum += Math.pow((arr[i] - avg), 2);
    }
    tempSum = tempSum / arr.length;
    tempSum = Math.sqrt(tempSum);
    answerArr.push(tempSum);

    // 6. 중간값
    answerArr.push(Number((arr[4] + arr[5]) / 2));

    console.log(answerArr);

}
