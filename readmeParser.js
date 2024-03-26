const fs = require('fs');
const resultFile = 'aws-qa.json';

function parseReadme(readmeContent) {
    const lines = readmeContent.split('\n');
    const questions = [];
    let currentQuestion = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith("###")) {
            // Start of a new question
            if (currentQuestion.question) {
                // Push the previous question before starting a new one
                questions.push(currentQuestion);
            }
            currentQuestion = { question: { text: line.slice(4).trim() }, answers: [] };
        } else if (line.startsWith("- [")) {
            // Answer line
            const answerText = line.slice(line.indexOf("]") + 2).trim();
            const isCorrect = line.includes('[x]');
            currentQuestion.answers.push({ text: answerText, isCorrect });
        }
    }

    if (currentQuestion.question) {
        questions.push(currentQuestion);
    }

    return questions;
}

const readmeContent = fs.readFileSync('Readme.md', 'utf-8');

const parsedQuestions = parseReadme(readmeContent);

fs.writeFileSync(resultFile, JSON.stringify(parsedQuestions, null, 2));

console.log(`Readme.md parsed successfully and saved as ${resultFile}!`);
