'use strict';

var test = require('tape');
var request = require('supertest');

/*

https://github.com/substack/tape
https://github.com/visionmedia/supertest

	test.skip(name, cb)
	test.onFinish(fn)
	test.only(name, cb)
	test.createStream().pipe(process.stdout);
	test.createStream({ objectMode: true }).on('data', function (row) {
		console.log(JSON.stringify(row))
	});

	t.plan(n)
	t.end(err)
	t.fail(msg)
	t.pass(msg)
	t.timeoutAfter(ms)
	t.skip(msg)
	t.ok(value, msg)
	t.notOk(value, msg)
	t.error(err, msg)
	t.equal(actual, expected, msg)
	t.notEqual(actual, expected, msg)
	t.deepEqual(actual, expected, msg)
	t.notDeepEqual(actual, expected, msg)
	t.deepLooseEqual(actual, expected, msg)
	t.notDeepLooseEqual(actual, expected, msg)
	t.throws(fn, expected, msg)
	t.doesNotThrow(fn, expected, msg)
	t.test(name, [opts], cb)
	t.comment(message)

*/

// test('Codegenerator', function (t) {
// 	var codegenerator = require('../app/lib/codegenerator');
// 	t.plan(3);
// 	t.equal(codegenerator.generateCode(0), 'ba');
// 	t.equal(codegenerator.generateCode(20000), 'bibaba');
// 	t.equal(codegenerator.generateCode(12345678), 'fakiqevo');
// 	t.equal(codegenerator.generateCode(1000000), 'fakiqevo');
// 	t.end();
// });

var app = require('../app/app');

test('GET Items', function (t) {
	request(app)
	.get('/api/items')
	.expect('Content-Type', /json/)
	.expect(200)
	.end(function (err, res) {
		t.error(err, 'No error');
		t.ok(res.body.length, 'Returned items list');
		t.ok(res.body[0].item, 'Item #0 looks valid');
		//t.same(res.body, expectedUsers, 'Users as expected');
		t.end();
	});
});

test('POST new Item', function (t) {
	var itemReference = 'test-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
	request(app)
	.post('/api/items')
	.send({ item: itemReference })
	.expect('Content-Type', /json/)
	.expect(200)
	.end(function (err, res) {
		t.error(err, 'No error');
		t.same(res.body.item, itemReference, 'Item reference is correct');
		t.end();
	});
});

//app.closeDatabase();