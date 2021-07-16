const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const util = require('util')

const writeFileAsync = util.promisify(fs.writeFile);

const chooseLicense = (license) => {
    switch (license) {
        case 'MIT':
            return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
            break;
        case 'IBM':
            return `[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)`
            break;
        case 'MOZ':
            return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`
            break;
        default:
    }
}

const promptUser = () => {
    return inquirer.prompt([{
            type: 'input',
            name: 'description',
            message: 'what is your description?'
        },
        {
            type: 'input',
            name: 'badge',
            message: 'what is your badge?'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'what is your installation codeblock?'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'what is your usage?'
        },
        {
            type: 'list',
            name: 'license',
            message: 'what is your license?',
            choices: ['MIT', 'IBM', 'MOZ']
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'what is your contributing?'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'what are your tests?'
        },
        {
            type: 'input',
            name: 'questions',
            message: 'what are your questions?'
        }
    ]);
}



const generateREADME = (answers) =>
    `# README-Generator
## ${answers.description}

## Badge 
* ${answers.badge}

## Table of Contents

**[Installation](#Installation)**  
**[Usage](#Usage)**  
**[License](#License)**  
**[Contributing](#Contributing)**  
**[Tests](#Tests)**  
**[Questions](#Questions)**  

## Installation

* ${answers.installation}

## Usage

* ${answers.usage}

## License


* ${chooseLicense(answers.license)}

## Contributing

* ${answers.contributing}

## Tests

* ${answers.tests}

## Questions

* ${answers.questions}

**[Back Up To Top](#README-Generator)**
`;


const init = () => {
    promptUser()
        .then((answers) => writeFileAsync('readme.md', generateREADME(answers)))
        .then(() => console.log('Successfully wrote to readme.md'))
        .catch((err) => console.error(err));
};

init();