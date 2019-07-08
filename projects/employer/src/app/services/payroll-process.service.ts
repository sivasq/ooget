import { Injectable } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { JsonToTextService } from './json-to-text.service';

@Injectable({
  providedIn: 'root'
})
export class PayrollProcessService {

  constructor(public datePipe: DatePipe, public toUpperCase: UpperCasePipe, public jsonToText: JsonToTextService) { }

  public payrollTextOptions = {
    fieldSeparator: ',',
    quoteStrings: '',
    decimalseparator: '.',
    showLabels: false,
    showTitle: false,
    title: 'PayRoll',
    useBom: true,
    noDownload: false,
  };

  processPayroll(HeaderData, BodyData) {
    let payrollHeaderData: any = HeaderData;
    let payrollBodyData: any = BodyData;

    let payrollJsonData: any[] = [];

    let orgAccHash;
    let AccountNumberHashTotal = 0;
    // console.log(payrollHeaderData);
    // console.log(payrollBodyData);
    // Process Header
    // if (payrollHeaderData.length > 0) {
    // 	for (let i = 0; i < payrollHeaderData.length; i++) {
    // 		// process Hash for Org Acc
    // 		let orgAcc = (payrollHeaderData[i].originatingaccountnumber).replace(/[^0-9]/g, "") + '0'.repeat(11 - (payrollHeaderData[i].originatingaccountnumber).replace(/[^0-9]/g, "").length);

    // 		// Split Org Acc into two parts (6 and 5)
    // 		let orgAcc1 = orgAcc.substr(0, 6);//6 chars
    // 		let orgAcc2 = orgAcc.substr(6);//5 chars
    // 		// Subtract two parts
    // 		orgAccHash = Number(orgAcc1) - Number(orgAcc2);

    // 		console.log(orgAcc1);
    // 		console.log(orgAcc2);
    // 		console.log(orgAccHash);

    // 		// Process Org acc Data Row '0'
    // 		let hearerRow = '';
    // 		if (this.datePipe.transform(payrollHeaderData[i].valuedate, 'yyMMdd')) {
    // 			hearerRow = this.datePipe.transform(payrollHeaderData[i].valuedate, 'yyMMdd');
    // 		}

    // 		hearerRow = hearerRow + ' '.repeat(45);

    // 		if (payrollHeaderData[i].originatingbanknumber) {
    // 			hearerRow = hearerRow.substr(0, 52) + (payrollHeaderData[i].originatingbanknumber).replace(/[^0-9]/g, "") + hearerRow.substr(52);
    // 		}

    // 		if (payrollHeaderData[i].originatingbranchnumber) {
    // 			hearerRow = hearerRow.substr(0, 56) + '0'.repeat(3 - (payrollHeaderData[i].originatingbranchnumber).replace(/[^0-9]/g, "").length) + (payrollHeaderData[i].originatingbranchnumber).replace(/[^0-9]/g, "") + hearerRow.substr(56);
    // 		}

    // 		if (payrollHeaderData[i].originatingaccountnumber) {
    // 			hearerRow = hearerRow.substr(0, 59) + (payrollHeaderData[i].originatingaccountnumber).replace(/[^0-9]/g, "") + ' '.repeat(11 - (payrollHeaderData[i].originatingaccountnumber).replace(/[^0-9]/g, "").length) + hearerRow.substr(59);
    // 		}

    // 		hearerRow = hearerRow + ' '.repeat(2);

    // 		if (payrollHeaderData[i].originatorsname) {
    // 			hearerRow = hearerRow.substr(0, 72) + this.toUpperCase.transform(payrollHeaderData[i].originatorsname) + ' '.repeat(20 - payrollHeaderData[i].originatorsname.length) + hearerRow.substr(72);
    // 		}

    // 		if (payrollHeaderData[i].messagesequencenumber) {
    // 			hearerRow = hearerRow.substr(0, 92) + '0'.repeat(5 - payrollHeaderData[i].messagesequencenumber.length) + payrollHeaderData[i].messagesequencenumber + hearerRow.substr(92);
    // 		}

    // 		if (payrollHeaderData[i].senderscompanyid) {
    // 			hearerRow = hearerRow.substr(0, 97) + this.toUpperCase.transform(payrollHeaderData[i].senderscompanyid) + ' '.repeat(8 - payrollHeaderData[i].senderscompanyid.length) + hearerRow.substr(97);
    // 		}

    // 		hearerRow = hearerRow + ' '.repeat(9);

    // 		if (payrollHeaderData[i].recordtype) {
    // 			hearerRow = hearerRow.substr(0, 114) + payrollHeaderData[i].recordtype + hearerRow.substr(114);
    // 		}
    // 		payrollJsonData.push({ dataRow: hearerRow });
    // 		console.log(hearerRow);
    // 	}
    // }

    // process Hash for Org Acc
    let orgAcc = (payrollHeaderData.originatingaccountnumber).replace(/[^0-9]/g, "") + '0'.repeat(11 - (payrollHeaderData.originatingaccountnumber).replace(/[^0-9]/g, "").length);

    // Split Org Acc into two parts (6 and 5)
    let orgAcc1 = orgAcc.substr(0, 6);//6 chars
    let orgAcc2 = orgAcc.substr(6);//5 chars
    // Subtract two parts
    orgAccHash = Number(orgAcc1) - Number(orgAcc2);

    // console.log(orgAcc1);
    // console.log(orgAcc2);
    // console.log(orgAccHash);

    // Process Org acc Data Row '0'
    let hearerRow = '';
    if (this.datePipe.transform(payrollHeaderData.valuedate, 'yyMMdd')) {
      hearerRow = this.datePipe.transform(payrollHeaderData.valuedate, 'yyMMdd');
    }

    hearerRow = hearerRow + ' '.repeat(45);

    if (payrollHeaderData.originatingbanknumber) {
      hearerRow = hearerRow.substr(0, 52) + (payrollHeaderData.originatingbanknumber).replace(/[^0-9]/g, "") + hearerRow.substr(52);
    }

    if (payrollHeaderData.originatingbranchnumber) {
      hearerRow = hearerRow.substr(0, 56) + '0'.repeat(3 - (payrollHeaderData.originatingbranchnumber).replace(/[^0-9]/g, "").length) + (payrollHeaderData.originatingbranchnumber).replace(/[^0-9]/g, "") + hearerRow.substr(56);
    }

    if (payrollHeaderData.originatingaccountnumber) {
      hearerRow = hearerRow.substr(0, 59) + (payrollHeaderData.originatingaccountnumber).replace(/[^0-9]/g, "") + ' '.repeat(11 - (payrollHeaderData.originatingaccountnumber).replace(/[^0-9]/g, "").length) + hearerRow.substr(59);
    }

    hearerRow = hearerRow + ' '.repeat(2);

    if (payrollHeaderData.originatorsname) {
      hearerRow = hearerRow.substr(0, 72) + this.toUpperCase.transform(payrollHeaderData.originatorsname) + ' '.repeat(20 - payrollHeaderData.originatorsname.length) + hearerRow.substr(72);
    }

    if (payrollHeaderData.messagesequencenumber) {
      hearerRow = hearerRow.substr(0, 92) + '0'.repeat(5 - payrollHeaderData.messagesequencenumber.length) + payrollHeaderData.messagesequencenumber + hearerRow.substr(92);
    }

    if (payrollHeaderData.senderscompanyid) {
      hearerRow = hearerRow.substr(0, 97) + this.toUpperCase.transform(payrollHeaderData.senderscompanyid) + ' '.repeat(8 - payrollHeaderData.senderscompanyid.length) + hearerRow.substr(97);
    }

    hearerRow = hearerRow + ' '.repeat(9);

    if (payrollHeaderData.recordtype) {
      hearerRow = hearerRow.substr(0, 114) + payrollHeaderData.recordtype + hearerRow.substr(114);
    }
    payrollJsonData.push({ dataRow: hearerRow });
    // console.log(hearerRow);

    // Process Body
    if (payrollBodyData.length > 0) {
      for (let i = 0; i < payrollBodyData.length; i++) {
        // process Hash for Org Acc
        if (payrollBodyData[i].receivingaccountnumber) {
          let recAcc = (payrollBodyData[i].receivingaccountnumber).replace(/[^0-9]/g, "") + '0'.repeat(11 - (payrollBodyData[i].receivingaccountnumber).replace(/[^0-9]/g, "").length);
          // Split Org Acc into two parts (6 and 5)
          let recAcc1 = recAcc.substr(0, 6);
          let recAcc2 = recAcc.substr(6);
          // Subtract two parts
          let recAccHash = Number(recAcc1) - Number(recAcc2);
          // Subtract RecAcchash - OrgAccHash
          let OrgRecAccHash = Math.abs(Number(recAccHash) - Number(orgAccHash));
          // Add All RecAccHash
          AccountNumberHashTotal = Number(AccountNumberHashTotal) + Number(OrgRecAccHash);

        //   console.log(recAcc1);
        //   console.log(recAcc2);
        //   console.log(recAccHash);
        //   console.log(OrgRecAccHash);
        //   console.log(AccountNumberHashTotal);
        }

        // Process Rec acc Data Row '1'
        let bodyRow = '';
        if (payrollBodyData[i].receivingbanknumber) {
          bodyRow = bodyRow.substr(0, 1) + (payrollBodyData[i].receivingbanknumber).replace(/[^0-9]/g, "") + bodyRow.substr(1);
          // bodyRow = bodyRow + payrollBodyData[i].receivingbanknumber;
        }

        if (payrollBodyData[i].receivingbranchnumber) {
          bodyRow = bodyRow.substr(0, 5) + '0'.repeat(3 - (payrollBodyData[i].receivingbranchnumber).replace(/[^0-9]/g, "").length) + (payrollBodyData[i].receivingbranchnumber).replace(/[^0-9]/g, "") + bodyRow.substr(5);
          // bodyRow = bodyRow + payrollBodyData[i].receivingbranchnumber;
        }

        if (payrollBodyData[i].receivingaccountnumber) {
          bodyRow = bodyRow.substr(0, 8) + (payrollBodyData[i].receivingaccountnumber).replace(/[^0-9]/g, "") + ' '.repeat(11 - (payrollBodyData[i].receivingaccountnumber).replace(/[^0-9]/g, "").length) + bodyRow.substr(8);
          // bodyRow = bodyRow + payrollBodyData[i].receivingaccountnumber;
        }

        if (payrollBodyData[i].receivingaccountname) {
          bodyRow = bodyRow.substr(0, 19) + this.toUpperCase.transform(payrollBodyData[i].receivingaccountname) + ' '.repeat(20 - payrollBodyData[i].receivingaccountname.length) + bodyRow.substr(19);
          // bodyRow = bodyRow + payrollBodyData[i].receivingaccountname;
        }

        if (payrollBodyData[i].transactioncode) {
          bodyRow = bodyRow.substr(0, 39) + '0'.repeat(2 - (payrollBodyData[i].transactioncode).replace(/[^0-9]/g, "").length) + (payrollBodyData[i].transactioncode).replace(/[^0-9]/g, "") + bodyRow.substr(39);
          // bodyRow = bodyRow + payrollBodyData[i].transactioncode;
        }

        if (payrollBodyData[i].amount) {
          bodyRow = bodyRow.substr(0, 41) + '0'.repeat(11 - ((payrollBodyData[i].amount * 100).toString()).length) + (payrollBodyData[i].amount * 100) + bodyRow.substr(41);
          // bodyRow = bodyRow + payrollBodyData[i].amount;
          // console.log((payrollBodyData[i].amount * 100).toString());
        }

        bodyRow = bodyRow + ' '.repeat(38);

        if (payrollBodyData[i].Particulars) {
          bodyRow = bodyRow.substr(0, 90) + ' '.repeat(12 - payrollBodyData[i].Particulars.length) + payrollBodyData[i].Particulars + bodyRow.substr(90);
          // bodyRow = bodyRow + payrollBodyData[i].Particulars;
        } else {
          bodyRow = bodyRow + ' '.repeat(12);
        }

        if (payrollBodyData[i].Reference) {
          bodyRow = bodyRow.substr(0, 102) + ' '.repeat(12 - payrollBodyData[i].Reference.length) + payrollBodyData[i].Reference + bodyRow.substr(102);
          // bodyRow = bodyRow + payrollBodyData[i].Reference;
        } else {
          bodyRow = bodyRow + ' '.repeat(12);
        }

        if (payrollBodyData[i].recordtype) {
          bodyRow = bodyRow.substr(0, 114) + payrollBodyData[i].recordtype + bodyRow.substr(114);
          // bodyRow = bodyRow + payrollBodyData[i].recordtype;
        }
        payrollJsonData.push({ dataRow: bodyRow });
        // console.log(bodyRow);
      }
    }

    let payrollFooterData: any[] = [];

    // Process Credit Transactions
    let creditTransactions = payrollBodyData.filter(data => {
      return data.transactioncode != '30'
    });
    let TotalNumberOfCreditTransactions = creditTransactions.length;
    // console.log(TotalNumberOfCreditTransactions);

    let TotalCreditamount = creditTransactions.map(data => data.amount * 100).reduce((previous, current) => {
      return Number(previous) + Number(current)
    }, 0);
    // console.log(TotalCreditamount);

    // Process Debit Transactions
    let debitTransactions = payrollBodyData.filter(data => {
      return data.transactioncode == '30'
    });
    let TotalNumberOfDebitTransactions = debitTransactions.length;

    let TotalDebitamount = debitTransactions.map(data => data.amount * 100).reduce((previous, current) => {
      return Number(previous) + Number(current)
    }, 0);
    // console.log(TotalDebitamount);

    payrollFooterData.push({
      'TotalNumberOfCreditTransactions': TotalNumberOfCreditTransactions.toString(),
      'TotalCreditamount': TotalCreditamount.toString(),
      'TotalNumberOfDebitTransactions': TotalNumberOfDebitTransactions.toString(),
      'TotalDebitamount': TotalDebitamount.toString(),
      'AccountNumberHashTotal': AccountNumberHashTotal.toString(),
      'recordtype': '9'
    });

    // Process Footer Row Data
    if (payrollFooterData.length > 0) {
      for (let i = 0; i < payrollFooterData.length; i++) {
        // Process Rec acc Data Row '1'
        let footerRow = '';
        if (payrollFooterData[i].TotalNumberOfCreditTransactions) {
          footerRow = footerRow.substr(0, 1) + '0'.repeat(8 - payrollFooterData[i].TotalNumberOfCreditTransactions.length) + payrollFooterData[i].TotalNumberOfCreditTransactions + footerRow.substr(1);
        }

        if (payrollFooterData[i].TotalCreditamount) {
          footerRow = footerRow.substr(0, 9) + '0'.repeat(11 - payrollFooterData[i].TotalCreditamount.length) + payrollFooterData[i].TotalCreditamount + footerRow.substr(9);
        }

        footerRow = footerRow + ' '.repeat(5);

        if (payrollFooterData[i].TotalNumberOfDebitTransactions) {
          footerRow = footerRow.substr(0, 25) + '0'.repeat(8 - payrollFooterData[i].TotalNumberOfDebitTransactions.length) + payrollFooterData[i].TotalNumberOfDebitTransactions + footerRow.substr(25);
        }

        if (payrollFooterData[i].TotalDebitamount) {
          footerRow = footerRow.substr(0, 33) + '0'.repeat(11 - payrollFooterData[i].TotalDebitamount.length) + payrollFooterData[i].TotalDebitamount + footerRow.substr(33);
        }

        footerRow = footerRow + ' '.repeat(26);

        if (payrollFooterData[i].AccountNumberHashTotal) {
          footerRow = footerRow.substr(0, 70) + '0'.repeat(11 - payrollFooterData[i].AccountNumberHashTotal.length) + payrollFooterData[i].AccountNumberHashTotal + footerRow.substr(70);
        }

        footerRow = footerRow + ' '.repeat(33);

        if (payrollFooterData[i].recordtype) {
          footerRow = footerRow.substr(0, 114) + payrollFooterData[i].recordtype + footerRow.substr(114);
        }
        payrollJsonData.push({ dataRow: footerRow });
        // console.log(footerRow);
      }
    }

    // console.log(payrollJsonData);
    // return payrollJsonData;
    this.generatePayrollGIROTextFile(payrollJsonData);
  }

  generatePayrollGIROTextFile(GenPayrollJsonData) {
    // console.log(GenPayrollJsonData);
    let today = new Date();
    this.jsonToText.textInit(GenPayrollJsonData, 'payroll ' + this.datePipe.transform(today, 'MMMd,y,HH:mm'), this.payrollTextOptions);
  }
}
