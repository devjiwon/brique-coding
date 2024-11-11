function solution(towerHeights) {
    var answer = [0];

    for(var i=1; i<towerHeights.length; i++){
        var num = 0;
        for(var j=0; j<i; j++){
            if(towerHeights[i] < towerHeights[j])
                num = j+1
        }
        answer.push(num)
    }

    return answer;
}

const towerHeights = [6, 9, 5, 7, 4];
console.log(solution(towerHeights));
