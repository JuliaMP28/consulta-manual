export default {
    "development": {
        "database": {
            "host": "localhost",
            "port": 27017,
            "dbName": "consulta-manuais",
            "user": "user-manuais",
            "pass": "manuais"
        },
        "secret": "dev-api-key",
        "debug": true,
        "users": [
            { id: 1, username: 'julia', password: 'julia', admin: true, hasRestrictedAccess: true },
            { id: 2, username: 'camila', password: 'camila', admin: false, hasRestrictedAccess: false },
        ]
    },
    "production": {
        "database": {
            "host": "consulta-manuais-db",
            "port": 27017,
            "dbName": "consulta-manuais",
            "user": "user-prod",
            "pass": "prod-pass"
        },
        "secret": "prod-api-key",
        "debug": false,
        "users": [
            { id: 1, username: 'julia', password: 'julia', admin: true, hasRestrictedAccess: true },
            { id: 2, username: 'camila', password: 'camila', admin: false, hasRestrictedAccess: false },
        ]
    }
}
