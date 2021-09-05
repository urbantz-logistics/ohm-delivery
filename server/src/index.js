const {OhmRepository} = require("./infrastructure/OhmRepository.js");
const {LowdbStorage} = require("./infrastructure/storage/LowdbStorage.js");
const path = require("path");
const ohmDefaults = require("../db.config.json");
const {serve} = require("./infrastructure/rest");

const OHM_REPOSITORY_FILENAME = path.join(process.cwd(), "data", "ohm-db.json");

(async () => {
    const ohmRepository = new OhmRepository(
        await LowdbStorage.create(OHM_REPOSITORY_FILENAME, ohmDefaults)
    );

    serve(ohmRepository);
})();