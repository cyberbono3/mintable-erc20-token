import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import EthTx from 'ethereumjs-tx';



var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/Pjp8Nk3vCMyM33pyqQjB"))

var decypherCoinContractABI =[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amountToMint","type":"uint256"}],"name":"mintToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"initialAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

var decypherCoinContractAddress = '0x8a7EFfb64Edcf037573904F222fc379258dE0DBD'
var decypherCoinContract = ETHEREUM_CLIENT.eth.contract(decypherCoinContractABI).at(decypherCoinContractAddress)

class App extends Component {
  constructor() {
  super()
    this.state = {
      contractName: '',
      totalSupply: ''
    }

    this.numTokens = 0
  }


  componentWillMount() { 
    this.totalSupply  =  decypherCoinContract.totalSupply.call()
    this.contractName = decypherCoinContract.name.call()    

    this.setState({
      contractName: String(this.contractName),
      totalSupply:String(this.totalSupply),
    })
  }
  render() {


   var TableRows = []
      
      TableRows.push(
        <tr>
       
        
       <td>{this.state.contractName}</td>

        <td>{this.state.totalSupply}</td>
        </tr>
      )

	TableRows.push(
		<tr><input onChange={(ev) => this.numTokens = ev.target.value}></input></tr> 
	)

	TableRows.push(
	<tr><button onClick={this.incrementToken}>Add Tokens</button></tr>
	)
   
    

     

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to dApp</h2>
        </div>
        <div className="App-Content">
          <table>
            <thead>
              <tr>
                <th>Contract name</th>
                <th>Total supply</th>
               
              </tr>
     
     
            </thead>
            <tbody>
              {TableRows}
            </tbody>
          </table>
       
 </div>

      </div>
    );
  }

  incrementToken = () => {
var key = new Buffer('private_key', 'hex')
var payloadData = decypherCoinContract.mintToken.getData(this.numTokens)

var rawTx = {
nonce: ETHEREUM_CLIENT.toHex(ETHEREUM_CLIENT.eth.getTransactionCount('0xaC24aB7Be05a8d42Ce958B6310990c95E1e69793')),
gasPrice: ETHEREUM_CLIENT.toHex(20000000000),
gasLimit: ETHEREUM_CLIENT.toHex(60000),
to: decypherCoinContractAddress,
from: '0xaC24aB7Be05a8d42Ce958B6310990c95E1e69793',
value: '0x00',
data: payloadData
}
var tx = new EthTx(rawTx)
tx.sign(key)
var stx = tx.serialize()
ETHEREUM_CLIENT.eth.sendRawTransaction('0x' + stx.toString('hex'), (err, hash) => {
    if (err) { console.log(err); return; }
    console.log('contract creation tx: ' + hash)
})

	alert("You added " + String(this.numTokens) + " tokens")
  }
}

export default App;
