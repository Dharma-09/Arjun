 Arjun

## npm run analyze contracts scope.txt {github URL}
AST-Types
Esprima has actually an object accessible to compare node by Syntax type, this alternative is more suitable for Unit Testing.

```javascript
var assert = require("assert");
var n = require("ast-types").namedTypes;
var b = require("ast-types").builders;

var fooId = b.identifier("foo");
var ifFoo = b.ifStatement(fooId, b.blockStatement([
    b.expressionStatement(b.callExpression(fooId, []))
]));

assert.ok(n.IfStatement.check(ifFoo));
assert.ok(n.Statement.check(ifFoo));
assert.ok(n.Node.check(ifFoo));

assert.ok(n.BlockStatement.check(ifFoo.consequent));
assert.strictEqual(
    ifFoo.consequent.body[0].expression.arguments.length,
    0);

assert.strictEqual(ifFoo.test, fooId);
assert.ok(n.Expression.check(ifFoo.test));
assert.ok(n.Identifier.check(ifFoo.test));
assert.ok(!n.Statement.check(ifFoo.test));
```


https://github.com/federicobond/solidity-parser-antlr
