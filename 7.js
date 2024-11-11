const solution = (str) => {
    let tmpArr = []; 
    let max = 0;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            tmpArr.push(i);
        } else {
            tmpArr.pop();

            if (tmpArr.length === 0) tmpArr.push(i);
            else max = Math.max(max, i - tmpArr[tmpArr.length - 1]);
        }
    }

    return max;
}

console.log(solution(")()())"));
console.log(solution("(()"));