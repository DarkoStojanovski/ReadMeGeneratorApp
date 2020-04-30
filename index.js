
const axios = require('axios');
const fs = require("fs");
const inquirer = require("inquirer");
const questions = [];

inquirer
    .prompt([
        {
            type: "input",
            name: "githubName",
            message: "What is your github name?",
        },
        {
            type: "input",
            name: "projectName",
            message: "What is your project name?"
        },
        {
            type: "input",
            name: "tableOfContents",
            message: "Write table of contents"
        },
        {
            type: "input",
            name: "installation",
            message: "What are the comends to install your software?"
        },
        {
            type: "list",
            name: "licence",
            message: "Choose your licence.",
            choices: ['MIT', 'BSD', 'none']
        },

    ])
    .then(answers => {
        console.log(answers);
        // Make a request for a user with a given ID
        axios.get('https://api.github.com/users/' + answers.githubName)
            .then(function (response) {
                // handle success
                answers.avatar_url = response.data.avatar_url
                answers.email = response.data.email
                console.log(response);
                var markDownText = creatMarkdown(answers);
                console.log(markDownText);
                writeAnswers(markDownText);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    

        // Use user feedback for... whatever!!
    })
    .catch(error => {
        if (error.isTtyError) {
            console.log(error);
        } else {

        }
    });


function creatMarkdown(answers) {
    // var output = "";
    // output += answers.githubName;
    var output = 
    `# Name: ${answers.githubName}
    ## Project Name: ${answers.projectName}
    ### Table of Contents: ${answers.tableOfContents}
    #### Installation: ${answers.installation}
    ##### Licence: ${answers.licence}
    ![alt text](${answers.avatar_url} "users image") 
    ###### Email: ${answers.email}`;
    
    



    return output;
}
// inquirer.prompt(questions) 
function writeAnswers(markDownText) {
    fs.writeFile("README.md", markDownText, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");

    });
}



