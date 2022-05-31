import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import Navbar from '../components/Navbar'


const TransactionState = rj({
    effect: () => ajax.getJSON("/api/transactions/")
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
            return transactions.reduce(
                (total, currentValue) =>
                    total = total
                    + Math.max(0, parseFloat(currentValue.total_price) - parseFloat(currentValue.amount_payed)),
                0).toFixed(2)
        }
    }

    return (
        <div>
            <Navbar />

            <div className='col-md-6 p-4'>
                <div>
                    <h3>Fin de la journée</h3>
                    <br />
                    <p>Total pour aujourd'hui <b>{total_price()}</b> Fc</p>
                    <p>Montant non payé: <span style={{ color: "red" }}>{total_not_payed()} Fc</span></p>
                    <b>Temps</b> <span>&emsp;&nbsp;</span> <b>Montante</b> (disparue):
                </div>
                <div className="row p-2">
                    <div>
                        {transactions && transactions.map((transaction) => (
                            <div key={transaction.id} className="mt-2">
                                <span style={{ position: "fixed" }}>
                                    {transaction.date.slice(11)}
                                </span>
                                <span>&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;</span>
                                + {transaction.total_price} Fc
                                <> </>
                                {transaction.pay_missing ?
                                    <span style={{ color: "red" }}>
                                        ({(transaction.total_price - transaction.amount_payed).toFixed(2)} Fc)
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


