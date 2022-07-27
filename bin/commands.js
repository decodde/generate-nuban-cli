const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const conf = new (require('conf'))()
let defaults = {
    limit: 100000,
    startFrom: '000000000',
    outputDir : (bankCode) =>  path.join(process.cwd(),`${bankCode}_${Date.now()}.json`)
}

const { nubanAlgo } = require("./nubanAlgo");
const Commands = {
    generate: async (data) => {
        console.log(data);
        let { bankCode, limit, save, random, startFrom, print, outputDir } = await data;
        if (bankCode > 0) {
            limit > 0 ? limit : limit = defaults.limit;

            startFrom > 0 ? "" : startFrom = defaults.startFrom;
            console.log(startFrom);
            if (startFrom.length > 9) {
                console.log(chalk.red.bold("Invalid NUBAN startFrom. Should not be greater than 9 digits"))
                return;
            }
            console.log(chalk.yellow.bold(`Cooking up ${limit} NUBAN list for bank ${bankCode}....`));

            let nubans = await nubanAlgo.generate_nuban_starting_from(startFrom, 'up', limit, bankCode);
            let beautifiedResult = [];
        
            nubans.forEach((nuban, n) => {
                beautifiedResult.push({
                    sn : n,
                    nuban : nuban
                })
                if(print) console.log(chalk.green(n + "."), chalk.yellowBright(nuban));
            })
            if(save){
                console.log(outputDir);
                outputDir ? "" : outputDir = defaults.outputDir(bankCode);
                
                beautifiedResult = JSON.stringify(beautifiedResult, null ,'\t');

                fs.writeFile(outputDir,beautifiedResult,(err) => {
                    if(err){
                        return console.log(chalk.red(err))
                    }
                    return console.log(chalk.green(`File generated and stored at ${outputDir}`));
                });
            }
        }
        else {
            console.log("Invalid bankCode");
        }
    },
    bankCodes: {
        list: () => {
            console.log("===========================");
            console.log("Bank               Codes")
            console.log("===========================");
            nubanAlgo.codes.forEach(code => {
                console.log(chalk.green(code.bank), chalk.yellowBright(code.code));
            })
            console.log("===========================");

        }
    }

}


exports.Commands = Commands