
async function  onMax() {

	$('input[name="ethAmount"]').val(bnbbalance);

}


async function simu() {
  var pay_amount = $('input[name="ethAmount"]').val();
  if (pay_amount <= 0) {
    return;
  }

  await web3js.eth.getBalance(defaultaccount, (err, res) => {
    var ethAmount = web3js.utils.fromWei(res, 'ether');
    if (ethAmount < pay_amount) {
      alert("Insufficient balance");
    } else {
      if (pay_amount !== null && pay_amount.length > 0) {
        hdxCI.swap().send({
          from: defaultaccount,
          value: web3js.utils.toWei(pay_amount, 'ether'),
        }, function (error, r) {
          if (error) {
            // window.location.reload(false);
          }
          // window.location.reload(false);
          console.log("swap", error, r);
          if (!error) {
            window.alert("Transaction successful!");
          }
        });
      } else {
        alert("Please enter the correct quantity");
      }
    }
  });
}

function updateAvaxAmount() {
	var ethAmount = $('input[name="ethAmount"]').val();


	if(Number(ethAmount) < 0) {
		$('.getAvaxAmount').html(Number(0).toFixed(2));
		return;
	}

	$('.ethAmountTip').html(ethAmount);

	$('.getAvaxAmount').html(parseFloat(ethAmount*bili).toFixed(2));
}
