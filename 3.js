const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'codingtest.brique.kr',
    user: 'codingtest',
    password: '12brique!@',
    database: 'employees'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected successfully');
})

const query = `SELECT 
    e.emp_no,
    e.first_name,
    e.last_name,
    e.gender,
    e.hire_date,
    d.dept_name,
    t.title,
    MAX(s.salary) AS max_salary
FROM 
    employees e
JOIN 
    dept_emp de ON e.emp_no = de.emp_no
JOIN 
    departments d ON de.dept_no = d.dept_no
JOIN 
    titles t ON e.emp_no = t.emp_no 
JOIN 
    salaries s ON e.emp_no = s.emp_no
WHERE 
    e.hire_date >= '2000-01-01'
GROUP BY 
    e.emp_no, e.first_name, e.last_name, e.gender, e.hire_date, d.dept_name, t.title
ORDER BY 
    e.first_name;`

con.query(query, function (error, result) {
    if (error) {
        console.log(error);
    }
    
    console.log('emp_no first_name last_name gender hire_date dept_name title max_salary')
    for(let i=0;i<result.length;i++){
        console.log(result[i].emp_no, result[i].first_name, result[i].last_name, result[i].gender, result[i].hire_date, result[i].dept_name, result[i].title, result[i].max_salary);
    }
    console.log(result.length, " rows in set");
});

