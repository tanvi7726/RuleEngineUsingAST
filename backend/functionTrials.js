'use strict';

const parser = require("@babel/parser");
const { default: generate } = require("@babel/generator");

function create_rule(rule) {
    try
    {
        const ast = parser.parseExpression(rule);
        return ast;
    }
    catch (error)
    {
        console.error("Error parsing rule:", error);
        return null;
    }
}

const t = require('@babel/types');
// Helper function to collect operator frequency
function collectOperatorFrequencies(ast, operatorFrequency)
{
    if (ast.type === 'LogicalExpression')
    {
        const operator = ast.operator; // && or ||
        operatorFrequency[operator] = (operatorFrequency[operator] || 0) + 1;
  
        // Recursively collect from left and right branches of the AST
        collectOperatorFrequencies(ast.left, operatorFrequency);
        collectOperatorFrequencies(ast.right, operatorFrequency);
    }
}

// Function to combine rules using the most frequent operator
function combine_rules(rules)
{
    const operatorFrequency = {};
    rules.forEach(ast => collectOperatorFrequencies(ast, operatorFrequency));
  
    // Determine the most frequent operator
    const mostFrequentOperator = Object.keys(operatorFrequency).reduce((a, b) => 
      	operatorFrequency[a] > operatorFrequency[b] ? a : b
    );
  
    // Combine the ASTs using the most frequent operator
    let combinedAST = rules[0];
    for (let i = 1; i < rules.length; i++)
	{
      	combinedAST = t.logicalExpression(mostFrequentOperator, combinedAST, rules[i]);
    }

    return combinedAST;
}

function evaluate_rule(node, userData)
{
    if (node.type === "BinaryExpression")
    {
        const left = node.left.name; // age, department
        const operator = node.operator; // >, ==
        const right = node.right.value; // 30, 'Sales'

        // Evaluate binary expression (e.g., "age > 30")
        switch (operator)
        {
            case '>':
                return userData[left] > right;
            case '==':
                return userData[left] == right;
            case '===':
                return userData[left] === right;
            case '<':
                return userData[left] < right;
            case '>=':
                return userData[left] >= right;
            case '<=':
                return userData[left] <= right;
            // Add more cases as needed
            default:
                throw new Error(`Unsupported operator: ${operator}`);
        }
    }

    if (node.type === "LogicalExpression")
    {
        const leftResult = evaluate_rule(node.left, userData);
        const rightResult = evaluate_rule(node.right, userData);

        // Handle logical expressions (AND, OR)
        if (node.operator === '&&')
        {
            return leftResult && rightResult;
        }
        else if (node.operator === '||')
        {
            return leftResult || rightResult;
        }
        else
        {
            throw new Error(`Unsupported logical operator: ${node.operator}`);
        }
    }

    throw new Error(`Unsupported node type: ${node.type}`);
}

// let rule = "age > 30 && department == 'sales'";
let userData = {
    'age': 30,
    'department': 'sales',
    'salary': 60000,
    'experience': 3
};

// console.log(create_rule(rule));
// console.log(evaluate_rule(create_rule(rule), userData));

const rules = [
	"age > 30 && department == 'marketing'",
	"salary > 50000 || experience > 5",
	"age < 25 || department == 'marketing'"
  ];
  
  // Combine the rules based on the most frequent operator
  const combinedAST = combine_rules(rules);
  
  console.log(evaluate_rule(combinedAST, userData));
  // Generate the combined rule string
//   const combinedrule = generate(combinedAST).code;
  
//   console.log("Combined Rule String (Most Frequent Operator):", combinedrule);

