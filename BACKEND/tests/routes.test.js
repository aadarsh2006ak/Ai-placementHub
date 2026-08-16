const { describe, it } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../src/app');

describe('Backend Express Application & Routing Tests', () => {
    it('should successfully initialize express app without throwing', () => {
        assert.ok(app);
        assert.strictEqual(typeof app.listen, 'function');
        assert.strictEqual(typeof app.handle, 'function');
    });

    it('should respond to base health check / request', (t, done) => {
        const server = http.createServer(app);
        server.listen(0, () => {
            const port = server.address().port;
            http.get(`http://localhost:${port}/`, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    assert.strictEqual(res.statusCode, 200);
                    const parsed = JSON.parse(data);
                    assert.strictEqual(parsed.success, true);
                    server.close(done);
                });
            }).on('error', (err) => {
                server.close();
                done(err);
            });
        });
    });

    it('should respond 200 on /api/v1/health endpoint', (t, done) => {
        const server = http.createServer(app);
        server.listen(0, () => {
            const port = server.address().port;
            http.get(`http://localhost:${port}/api/v1/health`, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    assert.strictEqual(res.statusCode, 200);
                    const parsed = JSON.parse(data);
                    assert.strictEqual(parsed.success, true);
                    server.close(done);
                });
            }).on('error', (err) => {
                server.close();
                done(err);
            });
        });
    });
});
