import {faker} from '@faker-js/faker'
import {randomInt} from "crypto"
import {AppDataSource} from "../../data-source"
import {User} from "../entity/user.entity"
import {Role} from "../entity/role.entity"
import bcyptjs from "bcryptjs";

AppDataSource.initialize().then(async _ => {
    const userRepository = AppDataSource.getRepository(User)
    const roleRepository = AppDataSource.getRepository(Role)

    const roles = await roleRepository.find();

    for (let i = 0; i < 30; i++) {
        const entity: User = {
            first_name: faker.name.firstName(),
            middle_name: faker.name.middleName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: await bcyptjs.hash(faker.name.lastName(), 10),
            role: roles[randomInt(roles.length)],
            id: 0
        }
        const user = await userRepository.save(entity)
    }

    process.exit(0)
})