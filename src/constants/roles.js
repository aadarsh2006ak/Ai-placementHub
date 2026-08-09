const ROLES = Object.freeze({
    STUDENT: 'student',
    COMPANY: 'company',
    ADMIN: 'admin'
});

const ALL_ROLES = Object.values(ROLES);

module.exports = {
    ROLES,
    ALL_ROLES
};
