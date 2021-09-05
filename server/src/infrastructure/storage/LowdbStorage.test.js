const fs = require("fs");
const {LowdbStorage} = require("./LowdbStorage");


describe('LowdbStorage', function () {
    let filename;
    const defaults = {
        key: [
            { id: "0", property: "xyz" },
            { id: "1", property: "abc" },
        ]
    };
    const FILENAME = 'data/lowdb.test.json';
    /**
     * @var storage {LowdbStorage}
     */
    let storage;

    beforeAll(async () => {
        fs.writeFileSync(FILENAME, "");
        storage = await LowdbStorage.create(FILENAME, defaults);
    });

    afterAll(() => {
        fs.unlinkSync(FILENAME);
    });

    it("when .fetch(KEY, '0') is called, then returns data from JSON file.", () => {
        // when & then
        expect(storage.fetch("key", "0")).toEqual({
            id: "0", property: "xyz"
        });
    });

    it("when .fetch(KEY, '100') is called for non-existing data, then undefined is returned.", () => {
        expect(storage.fetch("key", "100")).toBeUndefined();
    });

    it("when .save(KEY, '99', { .. data .. }) is called, then data is stored to output JSON file.",async () => {
        // given
        const data = { id: "99", my: { random: "data" }};

        // when
        await expect(storage.save("key", "99", data)).resolves.toBeUndefined();

        // then
        const dbFile = JSON.parse(
            fs.readFileSync(FILENAME)
        );

        expect(dbFile.key).toBeArray();
        expect(dbFile.key).toContainEqual(data);
    });
});
