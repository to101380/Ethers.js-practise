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


var address;

async function SHOW_CONTRACT() {  
    
      
    address = await signer.getAddress();
    $("#my_address").text(address);
 
    var balance = await signer.getBalance();
    $("#my_balance").text(ethers.utils.formatUnits(balance)+" ETH");

    var contract_balance = await web3.getBalance(nft_address);
    $("#contract_balance").text(ethers.utils.formatUnits(contract_balance)+" ETH");   

   
}



async function VIEW_CONTRACT() {  
    

    
    for(var i=1; i<5; i++){
        var ownerOf = await nft.ownerOf(i);
        if(address == ownerOf){           
            var a = await nft.tokenURI(i); 
            get_img(a);                   
        }
  
    }   


    function get_img(_url){

        $(document).ready(function(){
            $.ajax({
                method:"GET",
                url:_url       
              }).done(function(msg) {   
                    console.log(msg.image)
                
            });
        })

    }

    
   
}

SHOW_CONTRACT();
VIEW_CONTRACT();


var b = nft.queryFilter("Transfer",0,web3.blockNumber);
console.log(b); 

   
b.then((value) => {
    console.log(value);
})





    

