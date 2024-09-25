import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
	const [rates, setRates] = useState({})
	const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP']

	useEffect(() => {
		const fetchRates = async () => {
			try {
				const response = await axios.get(
					'https://api.currencyfreaks.com/latest?apikey=c5857f6caf51403c825388b03fa0b7ef&symbols=CAD,IDR,JPY,CHF,EUR,GBP'
				)
				setRates(response.data.rates)
			} catch (error) {
				console.error('Error fetching the currency rates:', error)
			}
		}

		fetchRates()
	}, [])

	const calculateWeBuy = (rate) => (rate * 1.02).toFixed(4)
	const calculateWeSell = (rate) => (rate * 0.98).toFixed(4)
	const usdToJpy = rates.JPY ? (1 / rates.JPY).toFixed(4) : 'Loading...'

	return (
		<div className="container">
			<h1>Currency Rates (Base: USD)</h1>
			<table className="table">
				<thead>
					<tr>
						<th>Currency</th>
						<th>Rate</th>
						<th>We Buy</th>
						<th>We Sell</th>
					</tr>
				</thead>
				<tbody>
					{currencies.map((currency) => (
						<tr key={currency}>
							<td>{currency}</td>
							<td>
								{rates[currency]
									? rates[currency]
									: 'Loading...'}
							</td>
							<td>
								{rates[currency]
									? calculateWeBuy(rates[currency])
									: 'Loading...'}
							</td>
							<td>
								{rates[currency]
									? calculateWeSell(rates[currency])
									: 'Loading...'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<h2>1 USD = {usdToJpy} JPY</h2>
		</div>
	)
}

export default App
