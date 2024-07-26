$(document).ready(function () {

    let transactionboxmain = document.querySelector('#transactionboxmain');
    var boxopen = document.getElementById("boxopen");
    var coin = document.getElementById("coin");
    var gameover = document.getElementById("gameover");
    let select = document.querySelector('select');
    let close = document.querySelector('#close');
    let body = document.querySelector('#body');
    let nav = document.querySelector('#navigation');
    let betbutton = document.querySelector('#betbutton');
    let gridcontainer = document.querySelector('.grid-container');
    let popup = document.querySelector('#popuper');
    let amountinput = document.querySelector('#amountinput');
    let halfamount = document.querySelector('#halfamount');
    let doubleamount = document.querySelector('#doubleamount');
    let betedamount = document.querySelector('#betedamount');
    let openedbox = document.querySelector('#openedbox');
    let totalamount = document.querySelector('#totalamount');
    let profitamount = document.querySelector('#profitamount');
    let errormsg = document.querySelector('#errormsg');
    let addedamount = document.querySelector('#addedamount');
    let percenter = 0;
    let mines = 0;
    let returnpercent = 0;
    let clickcounter = 0;
    let profitamountjs = 0;
    let openedboxcounter = 0;
    let totalamountjs = 5000.33;

    $('#cardbtn').click(() => {
        $('#transactionbox').load("card_transaction.html", () => {
        })

        transactionboxmain.style.left = "0";
        transactionboxmain.style.height = "100vh";
        transactionboxmain.style.width = "100vw";
    })

    $('#upibtn').click(() => {
        $('#transactionbox').load("upi_transaction.html", () => {
        })

        transactionboxmain.style.left = "0";
        transactionboxmain.style.height = "100vh";
        transactionboxmain.style.width = "100vw";
    })

    if(localStorage.getItem("totalamountforcoint25box")) {
        let a = Number.parseFloat(localStorage.getItem("totalamountforcoint25box"));
        a = a + Number.parseFloat(localStorage.getItem("addedmoney"));
        totalamountjs = a;

        localStorage.setItem("addedmoney", 0);
    }

    else {
        // localStorage.removeItem("totalamountforcoint25box");
        localStorage.setItem("totalamountforcoint25box", totalamountjs);
        localStorage.setItem("addedmoney", 0);
    }

    setInterval(() => {
        localStorage.setItem("totalamountforcoint25box", totalamountjs);
    }, 100);

    setInterval(() => {
        totalamount.innerHTML = Number.parseFloat(totalamountjs).toFixed(2);
    }, 500);

    gridcontainer.style.pointerEvents = 'none';

    for (let i = 0; i <= 24; i++) {
        select.innerHTML += `<option value="${i}">${i}</option>`;
    }

    $('#menu').click(function () {
        nav.style.position = "absolute";
        nav.style.left = "0vw";
        nav.style.width = "97%";
        nav.style.transition = "0.5s";
    })

    $(close).click(function () {
        nav.style.left = "-100%";
        nav.style.width = "0px";
    })

    // mine selector
    let mineselector = async () => {

        console.log(mines);
        let randomnumarr = [];

        mines = mines - 1;

        for (let i = 0; i <= mines; i++) {
            let randomnumber = Math.floor((Math.random() * 25) + 1);
            let a = 1;
            let checker = randomnumarr.length;

            randomnumarr[i] = randomnumber;

            while (checker > 1) {
                checker--;

                while (randomnumarr[i] == randomnumarr[i - a]) {
                    i--;
                }
                a++;
            }
        }
        return randomnumarr;
    }

    // code for creating boxes
    let boxgenerator = async () => {

        let arr = await mineselector();

        for (let i = 1; i <= 25; i++) {
            gridcontainer.innerHTML += `<div class="grid-item" id="${i}"></div>`;
        }

        $('.grid-item').click((e) => {

            openedboxcounter++;
            boxopen.play();
            e.target.innerHTML = `<img id="griditem" src="img/diamond.png">`;
            e.target.style.background = "rgb(29, 31, 46)";
            e.target.border = "none";

            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == Number(e.target.id)) {
                    e.target.innerHTML = `<img id="griditem" src="img/bomb.png">`;
                }
            }

            console.log((Number(e.target.id)));

            if (e.target.innerHTML == `<img id="griditem" src="img/bomb.png">`) {

                gameover.play();
                popup.innerHTML = `<div id="gameover">
            <div id="gocontantdiv">
                <div style="display: flex; justify-content: center;"><img id="goimg" src="img/gameover.png"></div>
                <table>
                <h5 id="gomessage"><img style="margin-bottom: -10px;" src="img/bomb.png" height="30"> You loss the round, mine appears on your click . . .</h5>
                    <tr>
                      <td>Beted Amount : </td>
                      <td>${amountinput.value}</td>
                    </tr>
                    <tr>
                      <td>Return Percentage : </td>
                      <td>${percenter.toFixed(2)}%</td>
                    </tr>
                    <tr>
                      <td>Profit Amount : </td>
                      <td>${profitamountjs.toFixed(2)}</td>
                    </tr>
                  </table>
                  <div id="skipbox">
                    <p id="skipmsg">Skip the appear mine with </p>
                    <button id="skipbtn">Spend $50</button>
                  </div>
                  <button type="submit" id="gobtn1" class="betbtn">Play Another Round</button>
                  <button type="submit" id="gobtn2" class="betbtn">Go To Profile</button>
            </div>
        </div>`;

                let skipbox = document.querySelector('#skipbox');

                if (totalamountjs < 50) {
                    skipbox.style.display = "none";
                }

                $('#gobtn1').click(() => {
                    totalamountjs += profitamountjs;

                    setTimeout(() => {
                        location.reload();
                    }, 300);
                })

                if (clickcounter >= mines) {
                    skipbox.style.display = 'none';
                }
                clickcounter++;
            }

            else {
                profitamountjs += returnpercent;
                profitamount.innerHTML = profitamountjs;
            }

            e.target.style.pointerEvents = 'none';

            $('#skipbtn').click(() => {
                popup.innerHTML = "";

                if (totalamountjs > 50) {
                    totalamountjs -= 50;
                }
            })
        })
    }

    let amountinputfunc = async () => {

        $(betbutton).click(async () => {
            if (amountinput.value && Number.parseInt(select.value) > 0) {
                mines = Number.parseInt(select.value);

                if (amountinput.value >= 0.9999) {
                    let betedamountjs = amountinput.value;

                    totalamountjs -= amountinput.value;

                    gridcontainer.style.pointerEvents = 'auto';
                    amountinput.style.pointerEvents = 'none';
                    select.style.pointerEvents = 'none';
                    halfamount.style.pointerEvents = 'none';
                    doubleamount.style.pointerEvents = 'none';
                    amountinput.style.opacity = "0.9";
                    betbutton.style.pointerEvents = 'none';
                    nav.style.left = "-100%";
                    nav.style.width = "0px";
                    body.width = "100%";
                    coin.play();

                    let a = await boxgenerator();
                    let b = await returnpercentage();

                    betedamount.innerHTML = betedamountjs;

                    setInterval(() => {
                        openedbox.innerHTML = openedboxcounter;
                    }, 100);
                }
                else {
                    errormsg.style.visibility = 'inherit';
                    errormsg.innerHTML = "You don't have suficient balance in your account";
                    setTimeout(() => {
                        errormsg.style.visibility = 'hidden';
                    }, 5000);
                }
            }
            else {
                errormsg.style.visibility = 'inherit';
                errormsg.innerHTML = "Please enter the amount and select the mine to bet";
                setTimeout(() => {
                    errormsg.style.visibility = 'hidden';
                }, 5000);
            }
        })

        $(halfamount).click(() => {
            if (amountinput.value) {
                amountinput.value = amountinput.value / 2;
            }
        })

        $(doubleamount).click(() => {
            if (amountinput.value) {
                amountinput.value = amountinput.value * 2;
            }
        })
    }

    let returnpercentage = async () => {
        let percent = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 30, 35, 40, 50, 60, 65, 70, 75, 80, 85, 90, 95, 100];

        for (let i = 0; i <= percent.length; i++) {
            if (i == mines) {

                percenter = percent[i];
                returnpercent = (percent[i] / 100) * amountinput.value;
            }
        }
    }

    amountinputfunc();

    $(".bottomlink").click(() => {
        localStorage.removeItem("totalamountforcoint25box");
        localStorage.removeItem("addedmoney");
        location.reload();
    })
});
