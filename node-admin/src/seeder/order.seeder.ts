import {faker} from '@faker-js/faker'
import {randomInt} from "crypto"
import {Order} from "../entity/order.entity"
import {OrderItem} from "../entity/order-item.entity"
import {AppDataSource} from "../../data-source"

AppDataSource.initialize().then(async _ => {
    const orderRepository = AppDataSource.getRepository(Order)
    const orderItemRepository = AppDataSource.getRepository(OrderItem)

    for (let i = 0; i < 30; i++) {
        const entity = {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            created_at: faker.date.past(2)
        };
        const order = await orderRepository.save(entity)
        for (let j = 0; j < randomInt(1, 5); j++) {
            await orderItemRepository.save({
                order,
                product_title: faker.lorem.words(2),
                price: randomInt(10, 100),
                quantity: randomInt(1, 5)
            })
        }
    }

    process.exit(0)
})