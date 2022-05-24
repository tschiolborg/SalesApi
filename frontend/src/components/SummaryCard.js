export default function SummaryCard({ transaction }) {
    return (
        <div className="list-group-item">
            <b>{transaction.name}</b> au {transaction.date}
            {transaction.products && transaction.products.map((product) => (
                <div className="offset-md-1">
                    {product.count} x {product.name}
                </div>
            ))}
            <div>
                <br />
                Prix total: <b>{transaction.total_price}</b> kr.
                <br />
                {transaction.pay_missing ? <>Payé: {transaction.amount_payed} kr.</> : ""}
                {transaction.pay_missing ? <br /> : ""}
                {transaction.pay_missing ? <>Disparue: <span style={{ color: "red" }}> {(transaction.total_price - transaction.amount_payed).toFixed(2)}</span> kr.</> : ""}
            </div>
        </div >
    )
}
