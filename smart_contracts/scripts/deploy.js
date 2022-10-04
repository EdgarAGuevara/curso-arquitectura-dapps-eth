// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const PlatziFood = await hre.ethers.getContractFactory("PlatziFood");
    const platziFood = await PlatziFood.deploy();

    await platziFood.deployed();

    console.log(
        `PlatziFood was deployed to: ${platziFood.address}`
    );

    let config = `export const abiPlatziFoodAddress ="${platziFood.address}"`;

    let data = JSON.stringify(config);
    fs.writeFileSync("../web/config.js", JSON.parse(data));

    fs.copyFile('./artifacts/contracts/PlatziFood.sol/PlatziFood.json', '../web/utils/abi/PlatziFood.js',
        (err) => {
            if (err) console.log('Error Ocurred: ', err);
        }
    )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
