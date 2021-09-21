const errorCode = {
    BAD_IMPLEMENTATION: 'BI',
    BAD_REQUEST:'BR',
    NOT_ACCEPTABLE:'NA',
    SERVER_UNAVAILABLE:'SU',
    DATA_NOT_FOUND:'NF',
    TOKEN_EXP:'TE'
}

const responseCode = {
    SUCCESS_RESPONSE:'SC'
}

const codeMsg = {
    ERROR_QUERY: 5001,
    DATA_FOUND: 4005,
    DATA_NOT_FOUND: 4004,
    PASSWORD_NOT_MATCH: 7007,
    USER_IN_ACTIVE: 9876
}

module.exports = {
    errorCode,
    responseCode,
    codeMsg
}