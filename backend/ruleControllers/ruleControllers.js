const parser = require("@babel/parser");

function create_rule(rule) {
    try {
        const ast = parser.parseExpression(rule);
        return ast;
    }
    catch (error) {
        console.error("Error parsing rule:", error);
        return null;
    }
}

module.exports = {
    create_rule
};