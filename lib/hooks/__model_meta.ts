/* eslint-disable */
const metadata = {
    fields: {
        User: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            email: {
                name: 'email',
                type: 'String',
            },
            firstName: {
                name: 'firstName',
                type: 'String',
            },
            lastName: {
                name: 'lastName',
                type: 'String',
            },
            age: {
                name: 'age',
                type: 'Int',
            },
            gender: {
                name: 'gender',
                type: 'String',
            },
            password: {
                name: 'password',
                type: 'String',
            },
            Image: {
                name: 'Image',
                type: 'String',
            },
            visitedCountries: {
                name: 'visitedCountries',
                type: 'VisitedCountry',
                isDataModel: true,
                isArray: true,
                backLink: 'user',
            },
            accounts: {
                name: 'accounts',
                type: 'Account',
                isDataModel: true,
                isArray: true,
                backLink: 'user',
            },
        },
        EuCountry: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            name: {
                name: 'countryName', // Updated to match Prisma schema field name
                type: 'String',
            },
            capital: {
                name: 'capital', // Assuming this is supposed to be the capital city of the country
                type: 'String',
            },
            visitedBy: {
                name: 'visitedBy',
                type: 'VisitedCountry',
                isDataModel: true,
                isArray: true,
                backLink: 'country',
            },
        },
        VisitedCountry: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            userId: {
                name: 'userId',
                type: 'String',
                isForeignKey: true,
            },
            countryId: {
                name: 'countryId',
                type: 'String',
                isForeignKey: true,
            },
            dateVisited: {
                name: 'dateVisited',
                type: 'DateTime',
            },
            user: {
                name: 'user',
                type: 'User',
                isDataModel: true,
                backLink: 'visitedCountries',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'userId' },
            },
            country: {
                name: 'country',
                type: 'EuCountry',
                isDataModel: true,
                backLink: 'visitedBy',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'countryId' },
            },
        },
        Account: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            userId: {
                name: 'userId',
                type: 'String',
                isForeignKey: true,
            },
            type: {
                name: 'type',
                type: 'String',
            },
            provider: {
                name: 'provider',
                type: 'String',
            },
            providerAccountId: {
                name: 'providerAccountId',
                type: 'String',
                attributes: [{ name: '@unique', args: [] }],
            },
            refresh_token: {
                name: 'refresh_token',
                type: 'String',
                isOptional: true,
            },
            refresh_token_expires_in: {
                name: 'refresh_token_expires_in',
                type: 'Int',
                isOptional: true,
            },
            access_token: {
                name: 'access_token',
                type: 'String',
                isOptional: true,
            },
            expires_at: {
                name: 'expires_at',
                type: 'Int',
                isOptional: true,
            },
            token_type: {
                name: 'token_type',
                type: 'String',
                isOptional: true,
            },
            scope: {
                name: 'scope',
                type: 'String',
                isOptional: true,
            },
            id_token: {
                name: 'id_token',
                type: 'String',
                isOptional: true,
            },
            session_state: {
                name: 'session_state',
                type: 'String',
                isOptional: true,
            },
            user: {
                name: 'user',
                type: 'User',
                isDataModel: true,
                backLink: 'accounts',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'userId' },
            },
        },
    },
    uniqueConstraints: {
        User: {
            email: {
                name: 'email',
                fields: ['email'],
            },
        },
        Account: {
            provider_providerAccountId: {
                name: 'provider_providerAccountId',
                fields: ['provider', 'providerAccountId'],
            },
        },
    },
    deleteCascade: {
        User: ['VisitedCountry', 'Account'],
    },
    authModel: 'User',
};

export default metadata;
