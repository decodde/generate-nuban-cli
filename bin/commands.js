const chalk = require("chalk");

const conf = new (require('conf'))()
let defaults = {
    limit : 200000,
    startFrom : '312730235',
}

const {nubanAlgo} = require("./nubanAlgo");
const Commands = {
    generate : async (data) => {
        console.log(data);
        let {bankCode,limit,random,startFrom} = await data;
        if(bankCode > 0){
            limit > 0 ? limit : limit = defaults.limit;
            startFrom > 0 ? "" : startFrom = defaults.startFrom;
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