const chalk = require("chalk");

const conf = new (require('conf'))()
let defaults = {
    limit : 100000,
    startFrom : '000000000',
}

const {nubanAlgo} = require("./nubanAlgo");
const Commands = {
    generate : async (data) => {
        console.log(data);
        let {bankCode,limit,random,startFrom} = await data;
        if(bankCode > 0){
            limit > 0 ? limit : limit = defaults.limit;
            
            startFrom > 0 ? "" : startFrom = defaults.startFrom;
            console.log(startFrom);
            if (startFrom.length > 9){
                console.log(chalk.red.bold("Invalid NUBAN startFrom. Should not be greater than 9 digits"))
                return;
            }
            console.log(chalk.yellow.bold(`Cooking up ${limit} NUBAN list for bank ${bankCode}....`));

            let nubans = await nubanAlgo.generate_nuban_starting_from(startFrom,'up',limit,bankCode);
            nubans.forEach((nuban, n) => {
                console.log(chalk.green(n+"."), chalk.yellowBright(nuban));
            })
        }
        else {
            console.log("Invalid bankCode");
        }
    },
    bankCodes : {
        list : () => {
            console.log("===========================");
            console.log("Bank               Codes")
            console.log("===========================");
            nubanAlgo.codes.forEach(code => {
                console.log(chalk.green(code.bank),chalk.yellowBright(code.code));
            })
            console.log("===========================");
            
        }
    }

}


exports.Commands = Commands