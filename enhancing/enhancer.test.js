const enhancer = require('./enhancer.js');

// test away!

let sword = {
    name: 'Sword',
    durability: 50,
    enhancement: 1
}

describe('enhancer.js', () => {

    // repair an item
    describe('repair() function', () => {
        it("should return an item's durability to 100", () => {
            expect(enhancer.repair(sword)).toStrictEqual({
                name: 'Sword',
                durability: 100,
                enhancement: 1
            })
        })
    })

    // succeed item enhancement
    describe('succeed() function', () => {
        it("should return an item's enhancement + 1", () => {
            expect(enhancer.succeed(sword)).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 2
            })
            expect(enhancer.succeed({
                ...sword,
                enhancement: 10
            })).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 11
            })
            expect(enhancer.succeed({
                ...sword,
                enhancement: 19
            })).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 20
            })
        })

        it("should return an item's enhancement to be 20 if already 20", () => {
            expect(enhancer.succeed({
                ...sword,
                enhancement: 20
            })).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 20
            })
        })
    })

    // fail item enhancement
    describe('fail() function', () => {
        it("should return an item's enhancement - 5 if under 15", () => {
            expect(enhancer.fail(sword)).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 0
            })
            expect(enhancer.fail({
                ...sword,
                enhancement: 10
            })).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 5
            })
            expect(enhancer.fail({
                ...sword,
                enhancement: 13
            })).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 8
            })
        })

        it("should return an item's enhancement - 10 if 15 or 16", () => {
            expect(enhancer.fail({
                ...sword,
                enhancement: 15
            })).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 5
            })
            expect(enhancer.fail({
                ...sword,
                enhancement: 16
            })).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 6
            })
        })

        it("should return an item's enhancement - 1 if 17 to 20", () => {
            expect(enhancer.fail({
                ...sword,
                enhancement: 17
            })).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 16
            })
            expect(enhancer.fail({
                ...sword,
                enhancement: 18
            })).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 17
            })
            expect(enhancer.fail({
                ...sword,
                enhancement: 19
            })).toStrictEqual({
                name: 'Sword',
                durability: 50,
                enhancement: 18
            })
            expect(enhancer.fail({
                ...sword,
                enhancement: 20,
                durability: 5
            })).toStrictEqual({
                name: 'Sword',
                durability: 5,
                enhancement: 19
            })
        })
    })

    describe('get() function', () => {
        it("should return the item's name with '[+ (the item's enhancement level)]' in front of it", () => {
            expect(enhancer.get(sword)).toStrictEqual({
                name: '[+1] Sword',
                durability: 50,
                enhancement: 1
            })
            expect(enhancer.get({
                ...sword,
                enhancement: 20
            })).toStrictEqual({
                name: '[+20] Sword',
                durability: 50,
                enhancement: 20
            })
        })
    })
})
