#!/usr/bin/env node
const chalk = require("chalk");

const boxen = require("boxen");
const {program} = require("commander");
const greeting = chalk.white.bold("Generate NUBAN");
const {Commands} = require("./commands");

const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
};
const msgBox = boxen( greeting, boxenOptions );
console.log(msgBox);

program.command("generate")
    .description("Generate NUBAN list ")
    .option('-b, --bankCode <bankCode>')
    //.option('-r, --random' ,"Generates the nuban randomly. If not specified, NUBAN generatio will start from 0000000000")  #todo random
    .option('-s, --startFrom [startFrom]','Where to start generating from')
    .option('-l, --limit [limit]', 'Limit of list. Default is 100,000')
    .option('-sv, --save',"Save to file. works with -o --outputDir")
    .option('-o, --outputDir <outputDir>', '.json output dir')
    .option('-p, --print',"Choose to print results or not")
    .action(Commands.generate);

program.command("list-bank-codes")
    .description("list all bank codes")
    .action(Commands.bankCodes.list);
program.parse();
//sterlingaccountapi.appsuport.p.azurewebsites.net/api/User/FioranoGetAccountFullInfo?accountNumber=0068957855
