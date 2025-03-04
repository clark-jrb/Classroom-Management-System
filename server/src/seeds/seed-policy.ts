import { AdminPolicyModel } from "../models/admin"
import { dbConnect, dbDisconnect } from "../utils/db"

const seedPolicies = async () => {
    try {
        dbConnect()

        await AdminPolicyModel.deleteMany({})
        console.log('✅ Deleted existing data')

        const policies = [
            { current_quarter: 'q1' }
        ]

        await AdminPolicyModel.insertMany(policies)
        console.log('✅ Policies seeded')

        dbDisconnect()
    } catch (error) {
        console.log('❌ Error seeding policies', error)
        dbDisconnect()
    }
}

seedPolicies()