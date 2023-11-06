import React from 'react'
import Navbar from '@/components/Navbar';
import axios from "axios";


const Invoice = () => {
    const storedValue = localStorage.getItem('invoiceData');
    var customer_id = ''
    var order_id = ''
    if (storedValue) {
        const values = JSON.parse(storedValue);
        console.log('Values:', values);
        customer_id = values.customer_id
        order_id = values.order_id
    } else {
        console.log('Values not found in localStorage');
    }

    const testUrl = 'http://127.0.0.1:8000'
    const liveUrl = 'https://ecom-back.thehive-services.com'

    const showInvoice = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${testUrl}/api/order/showInvoice/`, {
                customer_id,
                order_id
            })
            console.log('the res', res)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
        <Navbar />
            <h1>You found the invoice page</h1>
            <form onSubmit={showInvoice}>
            <div className="flex justify-end">
                                <button type='submit' className="bg-black hover:bg-[#7EB7EE] text-white py-2 px-4 rounded">
                                    Show Invoice
                                </button>
                            </div>
            </form>
        </>
    )
}

export default Invoice