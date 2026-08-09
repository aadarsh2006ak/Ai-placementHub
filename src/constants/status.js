const APPLICATION_STATUS = Object.freeze({
    APPLIED: 'applied',
    SHORTLISTED: 'shortlisted',
    SELECTED: 'selected',
    REJECTED: 'rejected'
});

const JOB_TYPE = Object.freeze({
    FULL_TIME: 'Full-time',
    PART_TIME: 'Part-time',
    INTERNSHIP: 'Internship',
    CONTRACT: 'Contract'
});

const JOB_STATUS = Object.freeze({
    ACTIVE: 'active',
    CLOSED: 'closed',
    DRAFT: 'draft'
});

module.exports = {
    APPLICATION_STATUS,
    ALL_APPLICATION_STATUSES: Object.values(APPLICATION_STATUS),
    JOB_TYPE,
    ALL_JOB_TYPES: Object.values(JOB_TYPE),
    JOB_STATUS,
    ALL_JOB_STATUSES: Object.values(JOB_STATUS)
};
