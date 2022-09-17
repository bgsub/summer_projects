export const HIGH_SCORES_QUERY = [
        {
            $group: {
                _id: '$score',
                docs: {
                    $addToSet: '$$CURRENT',
                },
            },
        },
        {
            $sort: {
                _id: -1,
            },
        },
        {
            $limit: 5,
        },
    ];
