const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembers = [];
function startApp() {
    inquirer.prompt([
        {
            name: 'role',
            type: 'list',
            message: 'select team member role',
            choices: [
                'manager',
                'engineer',
                'intern'
            ]
        }
    ])
    .then(response => {
        if(response.role === 'manager'){
            newManager()
        } else if(response.role === 'engineer'){
            newEngineer()
        } else {
            newIntern()
        }
    })
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function newManager() {
    //prompt user for manager info using inquirer npm package
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'Enter team member name: ',
            },
            {
                name: 'id',
                type: 'input',
                message: 'Enter id of team member: ',
            },
            {
                name: 'email',
                type: 'input',
                message: 'Enter team member email: '
            },
            {
                name: 'number',
                type: 'input',
                message: 'What is the office number'
            },
            {
                name: 'moreMember',
                type: 'list',
                message: 'Do you need to add another team member?',
                choices: [
                    'yes',
                    'no'
                ]   
            }
        ])
        .then(answers => {
           var teamMember = new Manager(answers.name, answers.id, answers.email, answers.number) 
           teamMembers.push(teamMember)
           if(answers.moreMember === 'yes'){
               startApp()
           } else {
               buildPage()
           }
        });
        
}

function newEngineer() {
//similar to new Manager
inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'Enter team member name: ',
            },
            {
                name: 'id',
                type: 'input',
                message: 'Enter id of team member: ',
            },
            {
                name: 'email',
                type: 'input',
                message: 'Enter team member email: '
            },
            {
                name: 'github',
                type: 'input',
                message: 'What is your GitHub username'
            },
            {
                name: 'moreMember',
                type: 'list',
                message: 'Do you need to add another team member?',
                choices: [
                    'yes',
                    'no'
                ]   
            }
        ])
        .then(answers => {
           var teamMember = new Engineer(answers.name, answers.id, answers.email, answers.github) 
           teamMembers.push(teamMember)
           if(answers.moreMember === 'yes'){
               startApp()
           } else {
               buildPage()
           }
        });
}

function newIntern() {
    //similar to new Manager
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'Enter team member name: ',
            },
            {
                name: 'id',
                type: 'input',
                message: 'Enter id of team member: ',
            },
            {
                name: 'email',
                type: 'input',
                message: 'Enter team member email: '
            },
            {
                name: 'school',
                type: 'input',
                message: 'What school do you go to'
            },
            {
                name: 'moreMember',
                type: 'list',
                message: 'Do you need to add another team member?',
                choices: [
                    'yes',
                    'no'
                ]   
            }
        ])
        .then(answers => {
           var teamMember = new Intern(answers.name, answers.id, answers.email, answers.school) 
           teamMembers.push(teamMember)
           if(answers.moreMember === 'yes'){
               startApp()
           } else {
               buildPage()
           }
        });
}

function buildPage(){
    // check if output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
}


startApp();