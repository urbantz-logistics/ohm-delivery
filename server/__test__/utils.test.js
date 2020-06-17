const utils = require('../src/utils');

describe('db return ohm', () => {
    test('returns Ohm object', () => {
        expect(utils.getOhmById('1').toBeDefined());
    });

    test('has a valid history', () => {
        const ohm = utils.getOhmById('1');
        const statuses = [ 'CREATED', 'PREPARING', 'READY', 'IN_DELIVERY','DELIVERED', 'REFUSED']
        const isValidStatus = statuses.includes(ohm.history[0].state)
        expect(isValidStatus).toBe(true);
    });
})
