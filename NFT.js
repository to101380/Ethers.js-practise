// 將數值計算至小數點後四位
function toPoint(point) {
    var str = Number(point).toFixed(4);
    return str;
}



// 確認是否有window.ethereum
if (window.ethereum) {
    // 啟用metamask        
    window.ethereum.enable();
    web3 = new ethers.providers.Web3Provider(window.ethereum);
} else {
    // will default to localhost:8545
    web3 = new ethers.providers.JsonRpcProvider();
}

const signer = web3.getSigner();
var nft = new ethers.Contract(nft_address, nft_abi, signer);






async function SHOW_CONTRACT() {  
    
    // 取得帳號    
    const address = await signer.getAddress();
    $("#my_address").text(address);

    // 取得帳號餘額
    var balance = await signer.getBalance();
    $("#my_balance").text(ethers.utils.formatUnits(balance)+" ETH");

    var contract_balance = await web3.getBalance(nft_address);
    $("#contract_balance").text(ethers.utils.formatUnits(contract_balance)+" ETH");      

   
}

SHOW_CONTRACT();


var b = nft.queryFilter("Transfer",0,web3.blockNumber);
console.log(b); 

   
b.then((value) => {
    console.log(value);
})





    

