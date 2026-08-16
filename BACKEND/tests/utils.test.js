const { describe, it } = require('node:test');
const assert = require('node:assert');
const ApiError = require('../src/utils/ApiError');
const ApiResponse = require('../src/utils/ApiResponse');
const { ROLES } = require('../src/constants/roles');

describe('Backend Utilities & Constants Unit Tests', () => {
    it('should properly instantiate ApiError with status and message', () => {
        const error = new ApiError(404, 'User Not Found', [{ field: 'id', message: 'Invalid ID' }]);
        assert.strictEqual(error.statusCode, 404);
        assert.strictEqual(error.message, 'User Not Found');
        assert.strictEqual(error.success, false);
        assert.strictEqual(error.errors.length, 1);
    });

    it('should properly instantiate ApiResponse with success boolean', () => {
        const response = new ApiResponse(200, { user: 'Test' }, 'Fetched successfully');
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.success, true);
        assert.strictEqual(response.data.user, 'Test');
    });

    it('should have standard RBAC roles defined', () => {
        assert.strictEqual(ROLES.STUDENT, 'student');
        assert.strictEqual(ROLES.COMPANY, 'company');
        assert.strictEqual(ROLES.ADMIN, 'admin');
    });
});
