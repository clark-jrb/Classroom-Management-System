"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../models/admin");
const db_1 = require("../utils/db");
const seedPolicies = async () => {
    try {
        (0, db_1.dbConnect)();
        await admin_1.AdminPolicyModel.deleteMany({});
        console.log('✅ Deleted existing data');
        const policies = [
            { current_quarter: 'q1' }
        ];
        await admin_1.AdminPolicyModel.insertMany(policies);
        console.log('✅ Policies seeded');
        (0, db_1.dbDisconnect)();
    }
    catch (error) {
        console.log('❌ Error seeding policies', error);
        (0, db_1.dbDisconnect)();
    }
};
seedPolicies();
//# sourceMappingURL=seed-policy.js.map