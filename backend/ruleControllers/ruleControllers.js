const parser = require("@babel/parser");
const t = require('@babel/types');

function replaceLogicalOperators(inputString) {
    return inputString
        .replace(/\bAND\b/g, "&&")  // Replace "AND" with "&&"
        .replace(/\bOR\b/g, "||");  // Replace "OR" with "||"
}

function create_rule(rule) {
    try {
        const newRule = replaceLogicalOperators(rule);
        const ast = parser.parseExpression(newRule);
        return ast;
    }
    catch (error) {
        console.error("Error parsing rule:", error);
        return null;
    }
}

// Helper function to collect operator frequency
function collectOperatorFrequencies(ast, operatorFrequency) {
    if (ast.type === 'LogicalExpression') {
        const operator = ast.operator; // && or ||
        operatorFrequency[operator] = (operatorFrequency[operator] || 0) + 1;

        // Recursively collect from left and right branches of the AST
        collectOperatorFrequencies(ast.left, operatorFrequency);
        collectOperatorFrequencies(ast.right, operatorFrequency);
    }
}

// Function to combine rules using the most frequent operator
function combine_rules(rules) {
    const operatorFrequency = {};
    rules.forEach(ast => collectOperatorFrequencies(ast, operatorFrequency));

    let combinedAST = rules[0];
    if (Object.keys(operatorFrequency).length === 0) {
        for (let i = 1; i < rules.length; i++) {
            combinedAST = t.logicalExpression("&&", combinedAST, rules[i]);
        }
    }
    else {
        // Determine the most frequent operator
        const mostFrequentOperator = Object.keys(operatorFrequency).reduce((a, b) =>
            operatorFrequency[a] > operatorFrequency[b] ? a : b
        );

        // Combine the ASTs using the most frequent operator
        for (let i = 1; i < rules.length; i++) {
            combinedAST = t.logicalExpression(mostFrequentOperator, combinedAST, rules[i]);
        }
    }


    return combinedAST;
}


module.exports = {
    create_rule,
    combine_rules
};