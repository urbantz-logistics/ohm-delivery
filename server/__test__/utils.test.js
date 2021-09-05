const utils = require('../src/utils');

describe('db return ohm', () => {
    test('returns Ohm object', () => {
        expect(utils.getOhmById('1')).toBeDefined();
    });

    test('has a valid history', async () => {
        const ohmPromise = utils.getOhmById('1');
        const ALLOWED_STATUSES = ['CREATED', 'PREPARING', 'READY', 'IN_DELIVERY', 'DELIVERED', 'REFUSED'];

        // then: it resolves
        await expect(ohmPromise).resolves.toBeDefined();

        // then:
        const ohm = await ohmPromise;

        expect(ohm).toMatchObject({
            id: "1",
            history: expect.arrayContaining([
                expect.objectContaining({
                    state: expect.any(String)
                })
            ])
        });

        // then: all history items have correct format
        ohm.history.forEach(historyItem => {
            expect(historyItem.state).toBeOneOf(ALLOWED_STATUSES);
            expect(historyItem.at).toMatch(/^\d+$/);
        });
    });
})
