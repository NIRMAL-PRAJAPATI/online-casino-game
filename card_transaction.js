let addedamount = document.querySelector('#addedamount');

$('#chclose').click(() => {
        transactionboxmain.style.width = "0vw";
        transactionboxmain.style.height = "0vh";
        transactionboxmain.style.left = "-100%";
        location.reload();
    })

    loader.innerHTML = `<img src="img/load.gif" height="75">`;

    setTimeout(() => {
        loader.style.display = "none";
    }, 2000);

    $('#submit').click(() => {
        transbox.innerHTML = `Your Transaction Successfully Completed ! ! !`;
        
        let n = Number.parseFloat(addedamount.value);
        if(n >= 1.00) {
        localStorage.setItem("addedmoney", n);
        console.log(n);
        }

        setTimeout(() => {
            transactionboxmain.style.width = "0vw";
        transactionboxmain.style.height = "0vh";
        transactionboxmain.style.left = "-100%";
        location.reload();
        }, 3000);
    })