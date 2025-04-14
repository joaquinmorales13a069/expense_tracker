import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

function RecentIncome({ transactions, onSeeMore }) {
  return (
    <div className=' card'>
        <div className=' flex items-center justify-between'>
            <h5 className=' text-lg'>Income</h5>

            <button className=' card-btn' onClick={onSeeMore}>
                See all 
                <LuArrowRight className=' text-base'/>
            </button>
        </div>

        <div className=' mt-6'>
            {transactions?.slice(0,5)?.map((transaction) => (
                <TransactionInfoCard key={transaction._id} title={transaction.source} icon={transaction.icon} date={moment(transaction.date).format("Do MMM YYYY")} amount={transaction.amount} type={"income"} hideDeleteBtn/>
            ))}
        </div>
    </div>
  )
}

export default RecentIncome