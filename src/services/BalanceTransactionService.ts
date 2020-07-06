import Balance from '../models/Balance';
import Transaction from '../models/Transaction';

class BalanceTransactionService {
  public static execute(transactions: Transaction[]): Balance {
    const { income, outcome } = transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    const balance = new Balance({
      income,
      outcome,
      total,
    });

    return balance;
  }
}

export default BalanceTransactionService;
