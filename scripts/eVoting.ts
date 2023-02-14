import { ethers }  from "hardhat";

//import hre from "hardhat";

const VotingToken = {
    name: "Voting Token",
    symbol: "VT",
    decimal: 2,
    totalSupply: 6_000_000
}

const voteInfo = {
    name: "E-vote",
    contenders: ["APC", "PDP", "LP"],
    period: 1000000000,
    tokenPerVote: 6,
    //voteTokenAddrr: `${deployedVoteToken.address}`,
}


async function main() {
    const [owner, acct1, acct2] = await ethers.getSigners()
    const voteToken = await ethers.getContractFactory("SureToken")
    const deployedVoteToken_ = await voteToken.deploy(
        VotingToken.name, 
        VotingToken.symbol, 
        VotingToken.decimal, 
        VotingToken.totalSupply
        
        )
        

    await deployedVoteToken_.deployed();
    const VotingTokenAddress = deployedVoteToken_.address;
    console.log(VotingTokenAddress);
    console.log(await deployedVoteToken_)

    console.log(`voting token has been deployed to  ${deployedVoteToken_.address}`)

   


    const vcontract = await ethers.getContractFactory("Vcontract");
    const evotedeploy = await vcontract.deploy(voteInfo.name, voteInfo.contenders, voteInfo.period, voteInfo.tokenPerVote, (VotingTokenAddress));
    await evotedeploy.deployed();

    console.log(`voting contract has been deployed to ${evotedeploy.address}`)
    
}

//voting token has been deployed to  0xDDBD714575b3F7C89b7B02609Bd2853b4bf212F8
//voting contract has been deployed to 0xF0072390ed40f7706058268f7a4ba8f31Ce487df


main().catch((e) => {
    console.log(e);
    process.exitCode = 1;
})