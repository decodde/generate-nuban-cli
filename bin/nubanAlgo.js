const nubanAlgo = {
    generate_nuban : async (serial_no,code) => {
        var snc = `${code}${serial_no}`;
        var [A,B,C,D,E,F,G,H,I,J,K,L] = snc;
        var final = (A*3) + (B*7) + (C*3) + (D*3) + (E*7) + (F*3) + (G*3 )+ (H*7) + (I*3) + (J*3) + (K*7) + (L*3);
        var mod = final % 10;
        final = 10 - mod;
        (final == 10) ? final = 0 : final;
        return `${serial_no}${final}`;
    },
    generate_nuban_starting_from : async (serial_no_start, direction,steps,bank_code,cb)=>{
        var generated_nuban = [];
        for(var i=0;i<steps;i++){
            var serial_no;
            direction == "up" ? serial_no = Number(serial_no_start) + i : serial_no = serial_no_start - i;
            var gen = await nubanAlgo.generate_nuban(serial_no,bank_code);
            cb ? cb(gen) : generated_nuban.push(gen);
        }
        return generated_nuban;
    },
    codes :  [
        {
            bank : "Access Bank",
            code : "044"
        },
        {
            bank : "Afribank",
            code : "014"
        },
        {
            bank : "Citibank",
            code : "023"
        },
        {
            bank : "Diamond Bank",
            code : "063"
        },    
        {
            bank : "Ecobank",
            code : "050"
        },
        {
            bank : "Equitorial Trust Bank",
            code : "040"
        },
        {
            bank : "First Bank",
            code : "011"
        },
        {
            bank : "FCMB",
            code : "214"
        },
        {
            bank : "Fidelity Bank",
            code : "070"
        },
        {
            bank : "Finbank",
            code : "085"
        },{
            bank : "Guaranty Trust Bank GTB",
            code : "058"
        },
        {
            bank : "Intercontinental Bank",
            code : "069"
        },
        {
            bank : "Jaiz Bank",
            code : "301"
        },
        
        {
            bank : 'HERITAGE BANK',
            code : '030'
        }, {
            bank : 'KEYSTONE BANK PLC',
            code : '082'
        }, {
            bank : 'MAINSTREET BANK',
            code : '014'
        },
        {
            bank : "Oceanic Bank",
            code : "056"
        },
        {
            bank : "Providus Bank",
            code : "101"
        },
        
        {
            bank : "BankPhb",
            code : "082"
        },
        {
            bank : "Skye Bank",
            code : "076"
        },
        {
            bank : "Spring Bank",
            code : "084"
        },
        {
            bank : "Stanbic IBTC",
            code : "221"
        },
        {
            bank : "Standard Chartered Bank",
            code : "068"
        },
        {
            bank : "Sterling Bank",
            code : "232"
        },
        {
            bank : "Suntrust Bank Nigeria",
            code : "100"
        },
        
        {
            bank : "United Bank for Africa UBA",
            code : "033"
        },
        {
            bank : "Union Bank",
            code : "032"
        },
        {
            bank : "Wema Bank",
            code : "035"
        },
        {
            bank : "Zenith Bank",
            code : "057"
        },
        {
            bank : "Unity Bank",
            code : "215"
        }
    ]
    
}

exports.nubanAlgo = nubanAlgo;