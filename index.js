   
  window.Promise ||
    document.write(
      '<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"><\/script>'
    )
  window.Promise ||
    document.write(
      '<script src="https://cdn.jsdelivr.net/npm/eligrey-classlist-js-polyfill@1.2.20171210/classList.min.js"><\/script>'
    )
  window.Promise ||
    document.write(
      '<script src="https://cdn.jsdelivr.net/npm/findindex_polyfill_mdn"><\/script>'
    )


// // Replace Math.random() with a pseudo-random number generator to get reproducible results in e2e tests
// // Based on https://gist.github.com/blixt/f17b47c62508be59987b
// var _seed = 42;
// Math.random = function() {
//     _seed = _seed * 16807 % 2147483647;
//     return (_seed - 1) / 2147483646;
// };




// var ts2 = 1484418600000;  
// var dates = [];
// var spikes = [5, -5, 3, -3, 8, -8]
// for (var i = 0; i < 120; i++) {
//     ts2 = ts2 + 86400000;
//     var innerArr = [ts2, dataSeries[1][i].value];
//     dates.push(innerArr)
//     console.log(innerArr);
// }




// new Vue({
//         el: '#app2',
//         components: {
//           apexchart: VueApexCharts,
//         },
//         data: {
          
//           series: [{
//             name: 'XYZ MOTORS',
//             data: dates
//           }],
//           chartOptions: {
//             chart: {
//               type: 'area',
//               stacked: false,
//               height: 350,
//               zoom: {
//                 type: 'x',
//                 enabled: true,
//                 autoScaleYaxis: true
//               },
//               toolbar: {
//                 autoSelected: 'zoom'
//               }
//             },
//             dataLabels: {
//               enabled: false
//             },
//             markers: {
//               size: 0,
//             },
//             title: {
//               text: 'Stock Price Movement',
//               align: 'left'
//             },
//             fill: {
//               type: 'gradient',
//               gradient: {
//                 shadeIntensity: 1,
//                 inverseColors: false,
//                 opacityFrom: 0.5,
//                 opacityTo: 0,
//                 stops: [0, 90, 100]
//               },
//             },
//             yaxis: {
//               labels: {
//                 formatter: function (val) {
//                   return (val / 1000000).toFixed(0);
//                 },
//               },
//               title: {
//                 text: 'Price'
//               },
//             },
//             xaxis: {
//               type: 'datetime',
//             },
//             tooltip: {
//               shared: false,
//               y: {
//                 formatter: function (val) {
//                   return (val / 1000000).toFixed(0)
//                 }
//               }
//             }
//           },
          
          
//         },
            
// })






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
    web3 = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/23a922d4f335400fb3caa1466ab7c03e");
}

const signer = web3.getSigner();

// 調用智能合約
var dcoffer = new ethers.Contract(contract_address, contract_abi, signer);






async function SHOW_CONTRACT() {  
    
    // // 取得帳號    
    // const address = await signer.getAddress();
    // $("#my_address").text(address);

    // // 取得帳號餘額
    // var balance = await signer.getBalance();
    // $("#my_balance").text(ethers.utils.formatUnits(balance)+" ETH");

    var contract_balance = await web3.getBalance(contract_address);
    $("#contract_balance").text(ethers.utils.formatUnits(contract_balance)+" ETH");
   
   

    // 讀取合約的兩個封裝變數，totalSupply()、balanceOf()
    var token_amount = await dcoffer.token_amount();
    $("#total_supply").text(ethers.utils.formatUnits(token_amount));




   
 


   
}

SHOW_CONTRACT();


var comfirm_transfer = document.querySelector("#confirm_transfer");
confirm_transfer.addEventListener("click", async (e) => {
    e.preventDefault();

    var count = document.querySelector(".quantity").value;
    const options = {value: ethers.utils.parseEther(count)}  
    await dcoffer.get_price(options);
    location.reload();    
   
});



const setQuantityToModal = () => {
    var quantity = $("#ticket .quantity").val();
    $("#check_quantity").text(quantity);
};

// keyup 資訊給使用者確認明細
// 確認轉出對象及金額

setQuantityToModal();
$("#ticket").on("keyup", ".quantity", setQuantityToModal);






dcoffer.on("_price", (time,price) => {
        console.log(time,price); 
    });




web3.on("latest", (tx) => {
    console.log("hi")
  });





var clock = setInterval(printword , 2000);
function printword(){
  $("#blocknumber").text(web3.blockNumber);   
}




              





    var a = dcoffer.listeners( "_price" );
    // console.log(a);


    var b = dcoffer.queryFilter("_price" ,0,web3.blockNumber);
    // console.log(b); 

   
    b.then((value) => {
        var number = value;  
        // console.log(number);

        var dates = []; 
        for (var i = 0; i < number.length; i++) {   

            var time = parseInt(number[i].args[0]*1000);
            var price = parseInt(number[i].args[1]);            
            var innerArr = [time,price];
            dates.push(innerArr)
            // console.log(innerArr);      
            
        }

        new Vue({
                el: '#app2',
                components: {
                  apexchart: VueApexCharts,
                },
                data: {
                  
                  series: [{
                    name: 'XYZ MOTORS',
                    data: dates                   
                  }],
                  chartOptions: {
                    chart: {
                      type: 'area',
                      stacked: false,
                      height: 350,
                      zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                      },
                      toolbar: {
                        autoSelected: 'zoom'
                      }
                    },
                    dataLabels: {
                      enabled: false
                    },
                    markers: {
                      size: 0,
                    },
                    title: {
                      text: 'Stock Price Movement',
                      align: 'left'
                    },
                    fill: {
                      type: 'gradient',
                      gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                      },
                    },
                    yaxis: {
                      labels: {
                        formatter: function (val) {
                          return (val / 10000000000000000).toFixed(5);
                        },
                      },
                      title: {
                        text: 'Price'
                      },
                    },
                    xaxis: {
                      type: 'datetime',
                    },
                    tooltip: {
                      shared: false,
                      y: {
                        formatter: function (val) {
                          return (val / 10000000000000000).toFixed(5)
                        }
                      }
                    }
                  },
                  
                  
                },
                    
            })

        

    });





    

    

