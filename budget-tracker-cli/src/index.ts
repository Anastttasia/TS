import { IAccountManager, IAccount, ISummary, ITransaction } from "./types";

const message: string = '🚀 Budget Tracker CLI';
console.log(message);

class Account implements IAccount {
  private transactions: ITransaction[] = [];
  constructor(
    public id: number,
    public name: string
  ) { }

  public addTransaction(transaction: ITransaction): void {
    this.transactions.push(transaction);
  }

  public removeTransactionById(transactionId: number): void {
    this.transactions = this.transactions.filter((transaction) => {
      return transaction.id !== transactionId;
    });
  }

  public getTransactions(): ITransaction[] {
    return this.transactions;
  }
}

class AccountManager implements IAccountManager {
  private accounts: IAccount[] = [];

  public addAccount(account: IAccount): void {
    this.accounts.push(account);
  };

  public removeAccountById(accountId: number): void {
    this.accounts = this.accounts.filter((account) => {
      return account.id !== accountId;
    });
  };

  public getAccounts(): IAccount[] {
    return this.accounts;
  }

  public getAccountById(accountId: number): IAccount | undefined {
    for (const account of this.accounts) {
      if (account.id === accountId) {
        return account;
      }
    }
  }

  public getSummary(accountId: number): ISummary {
    const account = this.getAccountById(accountId);

    let summary: ISummary = {
      balance: 0,
      income: 0,
      expenses: 0
    };

    if (account !== undefined) {
      for (const transaction of account.getTransactions()) {
        if (transaction.type === 'income') {
          summary.income += transaction.amount;
        } else {
          summary.expenses += transaction.amount;
        }
      }
      summary.balance = summary.income - summary.expenses;
    }

    return summary;
  };

}

function main() {
  const accountManager = new AccountManager();

  const account1 = new Account(1, "Account 1");
  account1.addTransaction({
    id: 1,
    amount: 1010,
    type: "income",
    date: new Date().toISOString(),
    description: "Подписка"
  });
  account1.addTransaction({
    id: 2,
    amount: 2020,
    type: "expense",
    date: new Date().toISOString(),
    description: "Комунальные услуги"
  });
  account1.addTransaction({
    id: 3,
    amount: 200,
    type: "expense",
    date: new Date().toISOString(),
    description: "Доставка еды"
  });
  account1.addTransaction({
    id: 4,
    amount: 20000,
    type: "expense",
    date: new Date().toISOString(),
    description: "Зарплата"
  });

  accountManager.addAccount(account1);

  console.log('Транзакции до удаления:');
  console.log(accountManager.getAccountById(1)!.getTransactions(), '\n');

  accountManager.getAccountById(1)!.removeTransactionById(3);

  console.log('Транзакции после удаления:');
  console.log(accountManager.getAccountById(1)!.getTransactions(), '\n');

  console.log('Текущее состояние счета:');
  console.log(accountManager.getSummary(1));
}

main();