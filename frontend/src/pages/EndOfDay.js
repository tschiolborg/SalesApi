// import { useState, useEffect } from 'react'
import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import Navbar from '../components/Navbar'


const TransactionState = rj({
    effect: () => ajax.getJSON("/transactions")
})

export default function EndOfDay() {
    const [{ data: transactions }] = useRunRj(TransactionState, [], false)

    const total_price = () => {
        if (transactions) {
            return transactions.reduce(
                (total, currentValue) =>
                    total = total
                    + parseFloat(currentValue.total_price),
                0).toFixed(2)
        }
    }
    const total_not_payed = () => {
        if (transactions) {
            return (total_price() - transactions.reduce(
                (total, currentValue) =>
                    total = total
                    + parseFloat(currentValue.amount_payed),
                0)).toFixed(2)
        }
    }

    return (
        <div>
            <Navbar />

            <div className='col-md-6 p-4'>
                <div>
                    <h3>End of day</h3>
                    <br />
                    <p>Total for today <b>{total_price()}</b> kr.</p>
                    <p>Amount not payed: <span style={{ color: "red" }}>{total_not_payed()} kr.</span></p>
                    <b>Time</b> <span>&emsp;&nbsp;&nbsp;</span> <b>Amount</b> (missing):
                </div>
                <div className="row p-2">
                    <div>
                        {transactions && transactions.map((transaction) => (
                            <div key={transaction.id} className="mt-2">
                                <span style={{ position: "fixed" }}>
                                    {transaction.date.slice(11)}
                                </span>
                                <span>&emsp;&emsp;&emsp;&emsp;</span>
                                + {transaction.total_price} kr.
                                <> </>
                                {transaction.pay_missing ?
                                    <span style={{ color: "red" }}>
                                        ({(transaction.total_price - transaction.amount_payed).toFixed(2)} kr.)
                                    </span>
                                    : ""}
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </div >

    )
}


