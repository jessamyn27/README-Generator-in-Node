const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const util = require('util')

const writeFileAsync = util.promisify(fs.writeFile);

const chooseLicenseBadge = (license) => {
    switch (license) {
        case 'MIT':
            return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
        case 'IBM':
            return `[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)`
        case 'MOZ':
            return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`
        case 'None':
            return `N/A`;
    }
}

const chooseLicenseLink = (license) => {
    switch (license) {
        case 'MIT':
            return `[MIT License](https://opensource.org/licenses/MIT)`
        case 'IBM':
            return `[IBM License](https://opensource.org/licenses/IPL-1.0)`
        case 'MOZ':
            return `[Mozilla License](https://opensource.org/licenses/MPL-2.0)`
        case 'None':
            return `N/A`;
    }
}

const promptUser = () => {
    return inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: 'what is your project title?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'what is your project description?'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'what is your terminal installation command for this project?'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'what is the best usage for this project?'
        },
        {
            type: 'list',
            name: 'license',
            message: 'what is your license?',
            choices: ['MIT', 'IBM', 'MOZ', 'None']
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'who are your contributors?'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'what are your test instructions?'
        },
        {
            type: 'input',
            name: 'questions',
            message: 'please enter your github username for answering questions'
        }
    ]);
}

const generateREADME = (answers) =>
    `### top
    
# ${answers.title}

## ${answers.description}

## Badge 
* ${chooseLicenseBadge(answers.license)}

## Table of Contents

**[Installation](#Installation)**  
**[Usage](#Usage)**  
**[License](#License)**  
**[Contributing](#Contributing)**  
**[Tests](#Tests)**  
**[Questions](#Questions)**  

## Installation

\`\`\`${answers.installation}\`\`\`

## Usage

* ${answers.usage}

## License

* ${chooseLicenseLink(answers.license)}

## Contributing

* ${answers.contributing}

## Tests

* ${answers.tests}

## Questions

### Contact Me at: **[github.com/${answers.questions}](https://github.com/${answers.questions})**

## Thanks for Checking Out my README for ${answers.title}

**[Back Up To Top](###top)**
`;


const init = () => {
    promptUser()
        .then((answers) => writeFileAsync('readme.md', generateREADME(answers)))
        .then(() => console.log('Successfully wrote to readme.md'))
        .catch((err) => console.error(err));
};

init();