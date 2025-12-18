import { Account } from "./classes/Account";
import { AccountManager } from "./classes/AccountManager";

const message: string = '🚀 Budget Tracker CLI';
console.log(message);
function main() {
  const accountManager = new AccountManager();

  const account1 = new Account("Account 1");
  account1.addTransaction({
    id: 1,
    amount: 10010,
    type: "income",
    date: new Date().toISOString(),
    description: "Зарплата"
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
    amount: 2000,
    type: "expense",
    date: new Date().toISOString(),
    description: "Ресторан"
  });

  accountManager.addAccount(account1);

  console.log('Транзакции до удаления:');
  console.log(accountManager.getAccountById(1)!.getTransactions(), '\n');

  accountManager.getAccountById(1)!.removeTransactionById(3);

  console.log('Транзакции после удаления:');
  console.log(accountManager.getAccountById(1)!.getTransactions(), '\n');

  console.log('Текущее состояние счета:');
  console.log(accountManager.getSummaryString());
}

main();