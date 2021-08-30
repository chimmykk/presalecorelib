  var initialized = false;
  var from;
  async function getTokenBalance(web3, tokenAddress, from2) {
    await awaitInitialized();
    const { defaultAccount } = this;
    if (!web3) {
      return;
    }
    from = from2;
    const contract = new web3.eth.Contract(abi, tokenAddress, {
        from: from
    });
    //console.log(111);
    const balance = await contractCall(
      contract,
      'balanceOf',
      from2,
      from2
    );
    console.log(balance);
    console.log(balance.toString());
    return balance.toString();
  }
  function contractCall(contract, method, from3, ...args) {
    return contract.methods[method](...args).call({
      from: from3
    });
  }
  async function transferTokens(
    web3,
    tokenAddress,
    from2,
    recipient,
    amount,
    { onTransactionHash, onReceipt }
  ) {
    await awaitInitialized();
    //await this.initAccounts();
    console.log(web3);
    if (!web3) {
      return;
    }
    from = from2;
    //console.log(web3);
    //web3.eth.getGasPrice().then(console.log);
    web3.eth.getGasPrice().then(async function(price) {
        console.log(amount);//return;
        const contract = new web3.eth.Contract(abi, tokenAddress, {
          from: from,
          gasPrice: price,//10000:Gwei
          //gasPrice: '190000000000',//10000:Gwei
          gas: 60000
        });
        //console.log(contract);return;console.log(amount);
        //var num = new Number(amount)
        //amount2 = num.toString();console.log(amount2);console.log(typeof(amount2));
        //amount2 = amount2.toString();
        return await contractTransaction(
          contract,
          'transfer',
          recipient,
          amount,
          { onTransactionHash, onReceipt }
        );
    });
  }
  function contractTransaction(contract, method, ...args) {
    const { onTransactionHash, onReceipt } = args[args.length - 1];//将args[args.length - 1]，赋值到onTransactionHash, onReceipt
    args = args.slice(0, args.length - 1);
    return new Promise((resolve, reject) => {
      const tx = contract.methods[method](...args).send({
        from: from
      });
      let receiptReceieved;

      tx.on('error', e => reject(e.message || e));
      tx.once('receipt', r =>
        receiptReceieved ? null : (receiptReceieved = true && onReceipt(r))
      );
      tx.once('confirmation', (c, r) =>
        receiptReceieved ? null : (receiptReceieved = true && onReceipt(r))
      );
      tx.once('transactionHash', hash => {
        onTransactionHash(hash);
        resolve(hash);
      });
    });
  }
  async function awaitInitialized() {
    if (!initialized) {
      let Promises = new Promise(resolve => {
        setTimeout(async function() {
          resolve(await awaitInitialized());
        }, 2000);
      });
      initialized = true;
      return Promises;
    } else return true;
  }
  const parseTokenAmount = function(amount, decimals = 0, incoming = true) {
    const factor = new BigNumber(10 ** Number(decimals));
    if (incoming) {
      console.log(amount.toString());console.log(factor);
      return new BigNumber(amount.toString()).div(factor);
    } else {
      return new BigNumber(amount.toString()).times(factor);
    }
  };