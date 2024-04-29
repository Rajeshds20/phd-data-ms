import React from 'react';
import './third.css'
import { dateFormat, indianCurrencyDisplay } from '../util';

function Third() {

    const [registrationNumber, setRegistrationNumber] = React.useState('');
    const [isAccountData, setIsAccountData] = React.useState(false);
    const [accountsData, setAccountsData] = React.useState(null);
    const [studentData, setStudentData] = React.useState(null);
    const [totalFeePaid, setTotalFeePaid] = React.useState(null);
    const [feeHistory, setFeeHistory] = React.useState(null);

    const getAccountData = (e) => {
        e.preventDefault();
        if (!registrationNumber) {
            setAccountsData(null);
            alert('Please enter registration number');
            return;
        }
        setIsAccountData(true);
        fetch(`http://localhost:5000/accounts/${registrationNumber}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setAccountsData(data.account_details);
                setTotalFeePaid(data.account_details.reduce((acc, curr) => acc + parseFloat(curr.AmountPaid), 0));
                setFeeHistory(data.feeHistory);
                getStudentData();
            })
            .catch(err => console.log(err));
    }

    const getStudentData = () => {
        console.log(registrationNumber)
        fetch(`http://localhost:5000/students/${registrationNumber}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setStudentData(data.student[0]);
            })
            .catch(err => console.log(err));
    }

    // "feeHistory": [
    //     {
    //         "term": 1,
    //         "fineAmount": 0,
    //         "deadline": "28/8/2019",
    //         "dayPaid": "29/7/2019",
    //         "daysLate": 0
    //     },
    //     {
    //         "term": 2,
    //         "fineAmount": 6666,
    //         "deadline": "28/2/2020",
    //         "dayPaid": "29/7/2020",
    //         "daysLate": 152,
    //         "fineToBePaid": 0
    //     },
    //     {
    //         "term": 3,
    //         "fineAmount": 6666,
    //         "deadline": "28/8/2020",
    //         "dayPaid": "14/7/2021",
    //         "daysLate": 320,
    //         "fineToBePaid": 0
    //     },
    //     {
    //         "term": 4,
    //         "fineAmount": 6666,
    //         "deadline": "28/2/2021",
    //         "dayPaid": "22/7/2022",
    //         "daysLate": 509,
    //         "fineToBePaid": 0
    //     },
    //     {
    //         "term": 5,
    //         "fineAmount": 6666,
    //         "deadline": "28/8/2021",
    //         "dayPaid": "4/8/2023",
    //         "daysLate": 706,
    //         "fineToBePaid": 0
    //     },
    //     {
    //         "term": 6,
    //         "fineAmount": 6666,
    //         "deadline": "28/2/2022",
    //         "dayPaid": "20/4/2024",
    //         "daysLate": 782,
    //         "fineToBePaid": 26666
    //     },
    //     {
    //         "term": 7,
    //         "fineAmount": 6666,
    //         "deadline": "28/8/2022",
    //         "dayPaid": "20/4/2024",
    //         "daysLate": 601,
    //         "fineToBePaid": 26666
    //     },
    //     {
    //         "term": 8,
    //         "fineAmount": 6666,
    //         "deadline": "28/2/2023",
    //         "dayPaid": "20/4/2024",
    //         "daysLate": 417,
    //         "fineToBePaid": 26666
    //     },
    //     {
    //         "term": 9,
    //         "fineAmount": 6666,
    //         "deadline": "28/8/2023",
    //         "dayPaid": "20/4/2024",
    //         "daysLate": 236,
    //         "fineToBePaid": 26666
    //     },
    //     {
    //         "term": 10,
    //         "fineAmount": 6666,
    //         "deadline": "28/2/2024",
    //         "dayPaid": "20/4/2024",
    //         "daysLate": 52,
    //         "fineToBePaid": 26666
    //     }
    // ]

    return (
        <div className="container">
            <div className="form-container">
                <form onSubmit={getAccountData}>
                    <label htmlFor="registrationNumber">Registration Number:</label>
                    <br />
                    <input
                        type="text"
                        id="registrationNumber"
                        placeholder="Enter registration number"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>

                <br />
                <br />
                <br />

                {
                    isAccountData && accountsData &&
                    (<center>
                        {/* Student Data */}
                        <h1>Admission Data</h1>

                        <div className="student-data" style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '70%',
                            margin: 'auto',
                            fontWeight: '700',
                            fontSize: '1.2rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                textAlign: 'left',
                            }}>
                                <label>Admission Number:</label>
                                <label>Name:</label>
                                <label>PT/FT:</label>
                                <label>Branch:</label>
                                <label>Admission Year:</label>
                                <label>Date of Admission:</label>
                                <label>Total Fee Paid:</label>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                textAlign: 'left',
                            }}>
                                <label>{studentData?.admn_no}</label>
                                <label>{studentData?.name}</label>
                                <label>{studentData?.mode}</label>
                                <label>{studentData?.branch}</label>
                                <label>{studentData?.year}</label>
                                <label>{dateFormat(studentData?.doa)}</label>
                                <label>{indianCurrencyDisplay(totalFeePaid)}</label>
                            </div>
                        </div>

                        <br />
                        {/* Account Data */}
                        <h1>Paid Fee Details</h1>

                        {
                            accountsData ?
                                <>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>DD/Challan No.</th>
                                                <th>Fee Paid</th>
                                                <th>Date Paid</th>
                                                <th>Payment Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                accountsData && accountsData.map((account, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{account.DDNumber}</td>
                                                            <td>{account.AmountPaid}</td>
                                                            <td>{dateFormat(account.DatePaid)}</td>
                                                            <td>{account.PaymentType == 'N/A' ? 'Challan' : account.PaymentType || 'Challan'}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <br />

                                    <h1>Details of Fine</h1>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Term</th>
                                                <th>Deadline</th>
                                                <th>Day Paid</th>
                                                <th>Days Late</th>
                                                <th>Fine Amount</th>
                                                <th>Fine To Be Paid</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                feeHistory && feeHistory.map((history, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{history.term}</td>
                                                            <td>{history.deadline}</td>
                                                            <td>{history.dayPaid}</td>
                                                            <td>{history.daysLate}</td>
                                                            <td>{history.fineAmount}</td>
                                                            <td>{history.fineToBePaid}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </>
                                : <p>No accounts found for the given registration number</p>
                        }
                    </center>)
                }
            </div>
        </div>
    );
}
export default Third;