let income: number = 150000;
let expenses: number = 50000;
let savings: number = 50000;

let netIncome: number;
let remaining: number;

netIncome = income - expenses;
remaining = netIncome - savings;

console.log(`
    Вычесления для Вашего бюджета:
-------------------------------------------------
    Доход (income) ............ ${income}
    Расходы (expenses) ........ ${expenses}
    Сбережения (savings) ...... ${savings}
    Чистый доход (netIncome) .. ${netIncome}
    Остаток (remaining) ....... ${remaining}
-------------------------------------------------
`);