const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("PlatziFood", function () {

    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployPlatziFoodFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, addr1] = await ethers.getSigners();

        const PlatziFood = await ethers.getContractFactory("PlatziFood");
        const platziFood = await PlatziFood.deploy();

        return { platziFood, owner, addr1 };
    }

    it("Add a news dish", async function () {
        const { platziFood, addr1 } = await loadFixture(deployPlatziFoodFixture);

        let addFood = await platziFood.addPlatziFood(
            "https://eatyourworld.com/images/content_images/images/gallo-pointo.jpg",
            "Gallo Pinto",
            "Costa Rica");
        await addFood.wait();

        let foods = await platziFood.getAllPlatziFoods();
        expect(foods.length).to.equal(1);

        let foodsByOwner = await platziFood.getPlatziFoodsByOwner();
        expect(foodsByOwner.length).to.equal(1);

    });

    it("Add 2 new dishes", async function () {
        const { platziFood, addr1 } = await loadFixture(deployPlatziFoodFixture);

        let addFood = await platziFood.addPlatziFood(
            "https://eatyourworld.com/images/content_images/images/gallo-pointo.jpg",
            "Gallo Pinto",
            "Costa Rica");
        await addFood.wait();

        let addFood2 = await platziFood.connect(addr1).addPlatziFood(
            "https://eatyourworld.com/images/content_images/images/gallo-pointo2.jpg",
            "Gallo Pinto2",
            "Costa Rica2");
        await addFood2.wait();

        let foods = await platziFood.getAllPlatziFoods();
        expect(foods.length).to.equal(2);

        let foodsByOwner = await platziFood.getPlatziFoodsByOwner();
        expect(foodsByOwner.length).to.equal(1);

    });

});
