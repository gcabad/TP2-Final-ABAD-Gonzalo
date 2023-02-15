import { faker } from '@faker-js/faker';

const get = () => ({
    titulo: faker.company.catchPhraseAdjective(),
    autor: faker.name.firstName()
})

export default {
    get
}