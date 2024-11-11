const responses = {}; 
const resArr = {};
const totalRequests = 100; 
let receivedCount = 0;

async function getData() {
    let rawResponse = await fetch("http://codingtest.brique.kr:8080/random");
    let jsonResponse = await rawResponse.json();

    handleResponse(jsonResponse);
}

const handleResponse = (response) => {
    if (!resArr.hasOwnProperty(responses[response.id])) resArr[response.id] = response;
    responses[response.id] = (responses[response.id] || 0) + 1;
    receivedCount += 1;

    if (receivedCount === totalRequests) {
        const sortedResponses = Object.entries(responses)
            .sort((a, b) => b[1] - a[1]);

        for (let i = 0; i < sortedResponses.length; i++) {
            console.log('count: ', sortedResponses[i][1], JSON.stringify(resArr[sortedResponses[i][0]]))
        }
        console.log('Total count: ', totalRequests)
    }
}

for (let i = 0; i < totalRequests; i++) {
    getData();
}
