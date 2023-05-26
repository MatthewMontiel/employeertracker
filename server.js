const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "emp_db",
});

const viewTitles = `
SELECT role.title, role.salary, dept.dept_area
FROM role
JOIN dept ON dept.id = role.dept_id
`;

const viewEmps = `
select employee.first_name, employee.last_name, role.title, role.salary, dept.dept_area, concat(m.first_name, ' ', m.last_name) AS manager_name
FROM employee
JOIN role ON employee.role_id = role.id
JOIN dept ON role.dept_id = dept.id
LEFT JOIN employee m ON employee.manager_id = m.id
`;

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What dept are you joining?",
        name: "addDept",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO DEPT (dept_area) VALUES (?)",
        [answers.addDept],
        (err, dataRes) => {
          main();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your job position?",
        name: "role",
      },
      {
        type: "input",
        message: "How much will you make?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department ID?",
        name: "deptId",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO ROLE (title, salary, dept_area) VALUES (?, ?, ?)",
        [answers.role, answers.salary, answers.dept_area],
        (err, dataRes) => {
          main();
        }
      );
    });
}

function addEmployee() {
  db.query("SELECT * FROM ROLE", (err, data) => {
    const roles = data.map((row) => {
      return { name: row.title, value: row.id };
    });
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employees first name?",
          name: "firstName",
        },
        {
          type: "input",
          message: "What is the employees last name?",
          name: "lastName",
        },
        {
          type: "list",
          message: "What is the employee's role?",
          name: "roleID",
          choices: roles,
        },
        {
          type: "input",
          message: "What is the manager id?",
          name: "managerId",
        },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [
            answers.firstName,
            answers.lastName,
            answers.roleId,
            answers.managerId,
          ],
          (err, dataRes) => {
            main();
          }
        );
      });
  });
}

function updateRole() {
  db.query("SELECT * FROM employee", (err, data) => {
    const employees = data.map((row) => {
      return { name: `${row.first_name} ${row.last_name}`, value: row.id };
    });
    db.query("SELECT * FROM role", (err, data) => {
      const newRole = data.map((row) => {
        return { name: row.title, value: row.id };
      });
      console.log(employees);
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee's role would you like to update?",
            name: "employeeUpdate",
            choices: employees,
          },
          {
            type: "list",
            message:
              "What role would you like to assign the selected employee?",
            name: "newRole",
            choices: newRole,
          },
        ])
        .then((answers) => {
          console.log(answers);
          db.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [answers.newRole, answers.employeeUpdate],
            (err, data) => {
              main();
            }
          );
        });
    });
  });
}

function main() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to choose?",
        name: "action",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "add a department",
          "add a role",
          "add a employee",
          "update a employee role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "View all departments":
          db.query("SELECT * FROM dept", (err, dataRes) => {
            console.table(dataRes);
            main();
          });
          break;
        case "View all roles":
          db.query(viewTitles, (err, dataRes) => {
            console.table(dataRes);
            main();
          });
          break;
        case "View all employees":
          db.query(viewEmps, (err, dataRes) => {
            console.table(dataRes);
            main();
          });
          break;
        case "add a department":
          addDept();
          break;
        case "add a role":
          addRole();
          break;
        case "add a employee":
          addEmployee();
          break;
        case "update a employee role":
          updateRole();
          break;
        default:
          console.log("Not the Droid your looking for");
          main();
          break;
      }
    });
}
main();
