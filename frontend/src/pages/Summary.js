import { rj, useRunRj } from 'react-rocketjump'
import { ajax } from 'rxjs/ajax'
import Navbar from '../components/Navbar'
import SummaryCard from "../components/SummaryCard"

const TransactionState = rj({
    effect: () => ajax.getJSON("/api/transactions/")
})

export default function Summary() {
    const [{ data: transactions }] = useRunRj(TransactionState, [], false)

    const getTransactions = () => {
        if (transactions.length > 6) {
            return transactions.slice(0, 6)
        } else {
            return transactions
        }

    }

    return (
        <div>
            <Navbar />

            <div className='col-md-6 p-4'>
                <div>
                    <h3>Summary of most recent sales</h3>
                </div>
                <div className="row mt-2 p-2">
                    <div className='list-item mt-2'>
                        {transactions && getTransactions().map((transaction) => (
                            <div key={transaction.id} className="mt-2">
                                <SummaryCard key={transaction} transaction={transaction} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >

    )
}


