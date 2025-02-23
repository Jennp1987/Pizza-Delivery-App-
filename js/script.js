/*eslint-env browser*/

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);

};

//GLOBAL VARIABLES
///////////////////////////////////////////////////////////
// Manage phase tools
///////////////////////////////////////////////////////////
var phase;
var phases = {
    initialSpan: 0,
    deliveryAddress: 1,
    crustType: 2,
    doughType_Prices_Size: 3,
    crustToppings: 4,
    billingInfo: 5

};
//UPDATE THE DISPLAY TO MATCH THE PHASE
//HIDE SPAN TAGS BASED ON CONDITION
function updateDisplay() {
    "use strict";
    var initialSpan = $('initialSpan'),
        deliverySpan = $('deliverySpan'),
        doughSpan = $('doughSpan'),
        pizzaSizePricesSpan = $('pizzaSizePricesSpan'),
        toppingsSpan = $('toppingsSpan'),
        orderAndBillingSpan = $('orderAndBillingSpan'),
        orderDetails = $('orderDetails'),
        doughSpanColumn = $("doughSpanColumn");


    if (phase === phases.initialSpan) { // INITIAL PHASE
        initialSpan.style.display = "block";
        deliverySpan.style.display = "none";
        doughSpan.style.display = "none";
        pizzaSizePricesSpan.style.display = "none";
        toppingsSpan.style.display = "none";
        orderAndBillingSpan.style.display = "none";
        orderDetails.style.display = "none";


    } else if (phase === phases.deliveryAddress) { // DELIVERY ADDRESS
        initialSpan.style.display = "none";
        deliverySpan.style.display = "block";
        doughSpan.style.display = "none";
        pizzaSizePricesSpan.style.display = "none";
        toppingsSpan.style.display = "none";
        orderAndBillingSpan.style.display = "none";
        orderDetails.style.display = "none";



    } else if (phase === phases.crustType) { //CRUST TYPE
        deliverySpan.style.display = "none";
        doughSpan.style.display = "block";
        pizzaSizePricesSpan.style.display = "none";
        toppingsSpan.style.display = "none";
        orderAndBillingSpan.style.display = "none";
        orderDetails.style.display = "block";
        orderDetails.style.border = "none";
        if (phase === phases.crustType) {
            //FOR STYLING 
            //phaseCrustType FOR ADDED MARGIN
            doughSpan.classList.toggle("phaseCrustType");
            //phaseDoughColumn FOR ADJUSTING WIDTH
            doughSpanColumn.classList.toggle("phaseDoughColumn");
            
        } else if (phase !== phases.crustType) {
            //REMOVING STYLES WHEN OUT OF PHASE
            doughSpan.style.marginLeft = "0em"; 
            doughSpan.classList.remove("phaseCrustType");
            doughSpanColumn.classList.remove("phaseDoughColumn");
            
        }
        

    } else if (phase === phases.doughType_Prices_Size) { //DOUGHTYPE AND SIZES/PRICES
        deliverySpan.style.display = "none";
        doughSpan.style.display = "block";
        pizzaSizePricesSpan.style.display = "block";
        toppingsSpan.style.display = "none";
        orderAndBillingSpan.style.display = "none";
        orderDetails.style.display = "block";
        orderDetails.style.border = "1px black solid";



    } else if (phase === phases.crustToppings) { //CRUST AND TOPPINGS
        deliverySpan.style.display = "none";
        doughSpan.style.display = "block";
        pizzaSizePricesSpan.style.display = "block";
        toppingsSpan.style.display = "block";
        orderAndBillingSpan.style.display = "none";
        orderDetails.style.display = "block";
        orderDetails.style.border = "1px black solid";
        if (phase === phases.crustToppings) {
            //TO CENTER TOPPINGS FOR TABLET
            doughSpan.classList.toggle("phaseCrustTypeInToppings");
           
            
        } else if (phase !== phases.crustToppings) {
            doughSpan.style.marginLeft = "0em"; 
            doughSpan.classList.remove("phaseCrustTypeInToppings");  
        }

    } else if (phase === phases.billingInfo) { //BILLING INFO
        deliverySpan.style.display = "none";
        doughSpan.style.display = "none";
        pizzaSizePricesSpan.style.display = "none";
        toppingsSpan.style.display = "none";
        orderAndBillingSpan.style.display = "block";
        orderDetails.style.display = "block";
        orderDetails.style.border = "1px black solid";


    }


}

function nextPhase(currentPhase) {
    "use strict";
    phase = currentPhase + 1;
    updateDisplay();

}

function setPhase(newPhase) {
    "use strict";
    phase = newPhase;
    updateDisplay();
}


////////////////////////////////////////////////////////////////////
//  Verify phases of order process
////////////////////////////////////////////////////////////////////

//FIRST PHASE
function proceedToOrder() {
    "use strict";
    nextPhase(phases.initialSpan);
}

function otherAddressShowHide() {
    "use strict";
    var addressType;
    //GETTING ID OF OTHER IN ADDRESS TYPE 
    addressType = $('deliveryAddressType');
    if (addressType.value === "other") {
        $('deliveryOtherAddress').style.display = "block";

    } else {
        $('deliveryOtherAddress').style.display = "none";
    }

}

//VARIFIES NAME, ADDRESS TYPE, STREET ADDRESS, CITY STATE, ZIP, PHONE NUMBER, EMAIL FOR DELIVERY INFO
function verifyDeliveryAddress() {
    "use strict";
    var problem = false,
        deliveryName = $('deliveryName').value,
        nameNotNumbRegex = /^(?![\s.]+$)[a-zA-Z\s.]*$/,
        deliveryAddressType = $('deliveryAddressType'),
        selectedValue = deliveryAddressType.options[deliveryAddressType.selectedIndex].value,
        deliveryStreetAddress = $('deliveryStreetAddress').value,
        deliveryStreetAddressRegex = /^[a-zA-Z0-9\s,'-]*$/,
        deliveryCity = $('deliveryCity').value,
        deliveryCityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
        deliveryState = $('deliveryState').value,
        stateAbbreviations = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/,
        deliveryZip = $('deliveryZip').value,
        deliveryZipValid = /^\d{5}$|^\d{5}-\d{4}$/,
        deliveryPhoneNumber = $('deliveryPhoneNumber').value,
        deliveryPhoneNumValid = /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        deliveryEmail = $('deliveryEmail').value,
        deliveryEmailValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //DELIVERY NAME
    if (deliveryName.length === 0) {
        $('deliveryNameError').innerHTML = "*";
        problem = true;
    } else if (nameNotNumbRegex.test(deliveryName) === false) {
        $('deliveryNameError').innerHTML = "Name must only contain letters";
        problem = true;
    } else {
        $('deliveryNameError').innerHTML = "";
    }

    //DELIVERY ADDRESS TYPE
    if (selectedValue === "selectAddress") {
        $('deliveryAddressTypeError').innerHTML = "*";
        problem = true;

    } else {
        $('deliveryAddressTypeError').innerHTML = "";
    }

    //DELIVERY ADDRESS
    if (deliveryStreetAddress.length === 0) {
        $('deliveryStreetAddressError').innerHTML = "*";
        problem = true;
    } else if (deliveryStreetAddressRegex.test(deliveryStreetAddress) === false) {
        $('deliveryStreetAddressError').innerHTML = "*";
        problem = true;
    } else {
        $('deliveryStreetAddress').innerHTML = "*";

    }

    //DELIVERY CITY
    if (deliveryCity.length === 0) {
        $('deliveryCityError').innerHTML = "*";
        problem = true;
    } else if (deliveryCityRegex.test(deliveryCity) === false) {
        $('deliveryCityError').innerHTML = "Invalid city";
        problem = true;
    } else {
        $('deliveryCityError').innerHTML = "";
    }

    //DELIVERY STATE
    if (deliveryState.length === 0) {
        $('deliveryStateError').innerHTML = "*";
        problem = true;
    } else if (stateAbbreviations.test(deliveryState) === false) {
        $('deliveryStateError').innerHTML = "State requires two digits only";
        problem = true;

    } else {
        $('deliveryStateError').innerHTML = "";
    }

    //DELIVERY ZIP
    if (deliveryZip.length === 0) {
        $('deliveryZipError').innerHTML = "*";
        problem = true;
    } else if (deliveryZipValid.test(deliveryZip) === false) {
        $('deliveryZipError').innerHTML = "Zip code must be 5 digits or 5 digits followed by a hyphan and ends in four digits.";
        problem = true;

    } else {
        $('deliveryZipError').innerHTML = "";
    }

    //DELIVERY PHONE #
    if (deliveryPhoneNumber.length === 0) {
        $('deliveryPhoneNumberError').innerHTML = "*";
        problem = true;

    } else if (deliveryPhoneNumValid.test(deliveryPhoneNumber) === false) {
        $('deliveryPhoneNumberError').innerHTML = "Phone number not valid";
        problem = true;

    } else {
        $('deliveryPhoneNumberError').innerHTML = "";
    }

    //DELIVERY EMAIL
    if (deliveryEmail.length === 0) {
        $('deliveryEmailError').innerHTML = "*";
        problem = true;

    } else if (deliveryEmailValid.test(deliveryEmail) === false) {
        $('deliveryEmailError').innerHTML = "Email is not valid";
        problem = true;

    } else {
        $('deliveryEmailError').innerHTML = "";
    }
    //REMOVE - JUST FOR TESTING AND TO BYPASS DELIVERY VALIDATION
    //nextPhase(phases.deliveryAddress);

    if (problem) {
        return;
    }

    nextPhase(phases.deliveryAddress);

}
//CONFIRMATION AFTER FINISH BUILDING PIZZA
function finishPizzaConfirmation() {
    "use strict";
    if (window.confirm("Are you sure you are done building your pizza?")) {
        nextPhase(phases.crustToppings);
        updateDisplay();
    }
}

//VARIFIES FINAL ORDER
function placeOrder() {
    "use strict";
    console.log('Submitted Order');
    //KEEPS FORM SUBMITTING
    return true;

}

var pizzaSizePrices = {

    "handTossed": [
        {
            size: "Small",
            price: 9.99
        },
        {
            size: "Medium",
            price: 12.99
        },
        {
            size: "Large",
            price: 14.99
        }
    ],
    "thinCrust": [
        {
            size: "Medium",
            price: 11.99
        },
        {
            size: "Large",
            price: 13.99
        }
    ],
    "nyStyle": [
        {
            size: "Medium",
            price: 16.99
        },
        {
            size: "Extra Large",
            price: 19.99
        }
    ],
    "glutenFree": [
        {
            size: "Small",
            price: 10.99
        }
    ]
};
//SETTING PRICES TO 0
var currentPizzaPrices = [0, 0, 0, 0];

//VERIFY SELECTED VALUE OF ITEM IN RADIO BUTTON FOR DOUGH OPTIONS
//PROGRAMMATICALLY ADDING TO A DROP DOWN LIST
function verifyDoughOption() {
    "use strict";

    var i, doughType, s, selection = $('pizzaSizePrices'),
        sizePrice, option;
    if ($('handTossed').checked) {
        doughType = "handTossed";

    } else if ($('thinCrust').checked) {
        doughType = "thinCrust";


    } else if ($('nYStyle').checked) {
        doughType = "nyStyle";


    } else if ($('glutenFree').checked) {
        doughType = "glutenFree";


    } else {
        doughType = "none";
        setPhase(phases.crustType);
        updateOrder();
        return;
    }
    //  GETS THE DOUGH TYPE, SIZE AND PRICES
    sizePrice = pizzaSizePrices[doughType];
    console.log(sizePrice);

    //CLEAR SELECTION
    for (i = 0; i < selection.options.length; i += 1) {
        selection.options.length = 0;
    }
    //SETTING PRICES TO EMPTY ARRAY
    currentPizzaPrices = [];
    // LOOP OVER sizePrice
    for (i = 0; i < sizePrice.length; i += 1) {
        // BUILD STRING
        s = sizePrice[i].size + " ($" + sizePrice[i].price + ")";
        //PUSHING PRICE ONTO CurrentPizzaPrices EMPTY ARRAY. 
        currentPizzaPrices.push(sizePrice[i].price);
        option = document.createElement('option');
        option.text = s;
        //ADDING OPTIONS TO THE SELECT BOX
        selection.add(option);
    }
    // ADD TO SELECTION 
    nextPhase(phases.crustType);
    //updateOrder();
    verifyPizzaSizePrice();

}
//GETS VALUE OF CHECKED doughOptions
function getDoughChoiceCheckedValue() {
    "use strict";
    var inputs = document.getElementsByName('doughOptions'),
        i;
    for (i = 0; i < inputs.length; i += 1) {
        if (inputs[i].checked) {
            return inputs[i].value;
        }
    }
}
//GETS VALUE OF pizzaSizePrices
function getDoughChoiceCheckedCost() {
    "use strict";
    console.log(currentPizzaPrices[$('pizzaSizePrices').selectedIndex]);
    return currentPizzaPrices[$('pizzaSizePrices').selectedIndex];

}
//GETS VALUE OF CHECKED doughOptions AND DISPLAYS IN ORDER DETAILS DIV
function doughChoiceDisplayOrderDiv() {
    "use strict";
    var doughChoiceIdSpan = getDoughChoiceCheckedValue();
    $('doughOptionsOrderDetails').innerHTML = doughChoiceIdSpan;
}
//GETTING VALUE OF pizzaSizePrices AND DISPLAYING IN ORDER DETAILS DIV
function pizzaPriceDisplayOrderDiv() {
    "use strict";
    var pizzaSizePrices = $('pizzaSizePrices'),
        selection = pizzaSizePrices.options[pizzaSizePrices.selectedIndex].text;
    $('pizzaSizePricesOrderDetails').innerHTML = "<br>" + selection;

}
//GETTING VALUE/TEXT OF CHEESEOPTIONS AND DISPLAYING IT IN ORDER DETAILS DIV
function cheeseOptionValue() {
    "use strict";
    var costs = [0, 0, 2.99, 3.99],
        cost = costs[$('cheeseOptions').selectedIndex],
        cheeseOptions = $('cheeseOptions').options[$('cheeseOptions').selectedIndex].value;
    $('cheeseOptionsOrderDetails').innerHTML = "<br>" + cheeseOptions;
    return cost;
}
//GETTING VALUE/TEXT OF SAUCE OPTIONS AND DISPLAYING IT IN ORDER DETAILS DIV
function sauceOptionValue() {
    "use strict";
    var costs = [0, .99, 1.99],
        cost = costs[$('sauceOptions').selectedIndex],
        sauceOptions = $('sauceOptions').options[$('sauceOptions').selectedIndex].value;
    $('sauceOptionsOrderDetails').innerHTML = "<br>" + sauceOptions;
    return cost;
}

//GETTING TOPPINGS FROM ORDER AND DISPLAYING OR DELETING IN ORDER DETAILS DIV
function getToppingsValue() {
    "use strict";
    var total = 0,
        costPerTopping = .99;
    if ($('pepperoni').checked) {
        $('toppingOneOrderDetails').style.display = "block";
        total += costPerTopping;
    } else {
        $('toppingOneOrderDetails').style.display = "none";

    }
    if ($('sausage').checked) {
        $('toppingTwoOrderDetails').style.display = "block";
        total += costPerTopping;
    } else {
        $('toppingTwoOrderDetails').style.display = "none";

    }
    if ($('ham').checked) {
        $('toppingThreeOrderDetails').style.display = "block";
        total += costPerTopping;
    } else {
        $('toppingThreeOrderDetails').style.display = "none";

    }
    if ($('bacon').checked) {
        $('toppingFourOrderDetails').style.display = "block";
        total += costPerTopping;
    } else {
        $('toppingFourOrderDetails').style.display = "none";

    }
    if ($('salami').checked) {
        $('toppingFiveOrderDetails').style.display = "block";
        total += costPerTopping;
    } else {
        $('toppingFiveOrderDetails').style.display = "none";

    }
    if ($('peppers').checked) {
        $('toppingSixOrderDetails').style.display = "block";
        total += costPerTopping;
    } else {
        $('toppingSixOrderDetails').style.display = "none";

    }
    if ($('olives').checked) {
        $('toppingSevenOrderDetails').style.display = "block";
        total += costPerTopping;
    } else {
        $('toppingSevenOrderDetails').style.display = "none";

    }
    if ($('jalapenos').checked) {
        $('toppingEightOrderDetails').style.display = "block";
        total += costPerTopping;
    } else {
        $('toppingEightOrderDetails').style.display = "none";

    }
    if ($('mushrooms').checked) {
        $('toppingNineOrderDetails').style.display = "block";
        total += costPerTopping;
    } else {
        $('toppingNineOrderDetails').style.display = "none";

    }
    if ($('pineapple').checked) {
        $('toppingTenOrderDetails').style.display = "block";
        total += costPerTopping;
    } else {
        $('toppingTenOrderDetails').style.display = "none";

    }
    if ($('onion').checked) {
        $('toppingElevenOrderDetails').style.display = "block";
        total += costPerTopping;
    } else {
        $('toppingElevenOrderDetails').style.display = "none";
    }
    return total;
}

//VERIFY THAT SOMETHING IN SIZE/PRICE WAS SELECTED 
function verifyPizzaSizePrice() {
    "use strict";
    nextPhase(phases.doughType_Prices_Size);
    pizzaPriceDisplayOrderDiv();
    updateOrder();
}
//CALL FROM EVERYWHERE THAT CAN AFFECT THE TOTAL
var updateOrder = function () {
    "use strict";
    var toppingCost = getToppingsValue(),
        doughCost = getDoughChoiceCheckedCost(),
        cheeseCost = cheeseOptionValue(),
        sauceCost = sauceOptionValue(),
        totalCost = doughCost + toppingCost + cheeseCost + sauceCost,
        displayCost = $('displayCost');

    doughChoiceDisplayOrderDiv();

    displayCost.innerHTML = "<h3>Total Price: $" + parseFloat(totalCost).toFixed(2) + "</h3>";

};
//COPIES DELIVERY INFO TO BILLING INFO
function fillInBillingInfo() {
    "use strict";
    var billingAddressType = $('billingAddressType'),
        deliveryAddressType = $('deliveryAddressType');
    if ($('sameAs').checked === true) {
        $('billingName').value = $('deliveryName').value;
        billingAddressType.options[billingAddressType.selectedIndex].text = deliveryAddressType.options[deliveryAddressType.selectedIndex].text;
        $('billingStreetAddress').value = $('deliveryStreetAddress').value;
        $('billingApartmentNumber').value = $('deliveryApartmentNumber').value;
        $('billingSuiteRoomNum').value = $('deliverySuiteRoomNum').value;
        $('billingCity').value = $('deliveryCity').value;
        $('billingState').value = $('deliveryState').value;
        $('billingZip').value = $('deliveryZip').value;

    }
    if ($('sameAs').checked === false) {
        $('billingName').value = "";
        billingAddressType.options[billingAddressType.selectedIndex].text = "";
        $('billingStreetAddress').value = "";
        $('billingApartmentNumber').value = "";
        $('billingSuiteRoomNum').value = "";
        $('billingCity').value = "";
        $('billingState').value = "";
        $('billingZip').value = "";

    }
}

//SHOW/HIDE BILLING ADDRESS TYPE OTHER
function otherBillingAddressShowHide() {
    "use strict";
    var billingaddressType;
    //GETTING ID OF OTHER IN ADDRESS TYPE 
    billingaddressType = $('billingAddressType');
    if (billingaddressType.value === "other") {
        $('billingOtherAddress').style.display = "block";

    } else {
        $('billingOtherAddress').style.display = "none";
    }

}
//VALIDATES BILLING INFO
//VARIFIES NAME, ADDRESS TYPE, STREET ADDRESS, CITY STATE, ZIP, PHONE NUMBER, EMAIL FOR DELIVERY INFO
function verifyBillingInfo() {
    "use strict";
    // verify everything, and return if there is a problem
    var problem = false,
        billingName = $('billingName').value,
        nameNotNumbRegex = /^(?![\s.]+$)[a-zA-Z\s.]*$/,
        billingAddressType = $('billingAddressType'),
        billingSelectedValue = billingAddressType.options[billingAddressType.selectedIndex].value,
        billingStreetAddress = $('billingStreetAddress').value,
        billingStreetAddressRegex = /^[a-zA-Z0-9\s,'-]*$/,
        billingCity = $('billingCity').value,
        billingCityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
        billingState = $('billingState').value,
        stateAbbreviations = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/,
        billingZip = $('billingZip').value,
        billingZipRegex = /^\d{5}$|^\d{5}-\d{4}$/,
        creditCardNumber = $('creditCardNumber').value,
        creditCardNumberRegex = /^[0-9]+$/,
        cvcCode = $('cvcCode').value;

    //BILLING NAME
    if (billingName.length === 0) {
        $('billingNameError').innerHTML = "*";
        problem = true;
    } else if (nameNotNumbRegex.test(billingName) === false) {
        $('billingNameError').innerHTML = "Name must only contain letters";
        problem = true;
    } else {
        $('billingNameError').innerHTML = "";
    }

    //BILLING ADDRESS TYPE
    if (billingSelectedValue === "selectAddress") {
        $('billingAddressTypeError').innerHTML = "*";
        problem = true;

    } else {
        $('billingAddressTypeError').innerHTML = "";
    }

    //BILLING ADDRESS
    if (billingStreetAddress.length === 0) {
        $('billingStreetAddressError').innerHTML = "*";
        problem = true;
    } else if (billingStreetAddressRegex.test(billingStreetAddress) === false) {
        $('billingStreetAddressError').innerHTML = "*";
        problem = true;
    } else {
        $('billingStreetAddressError').innerHTML = "";

    }
    //BILLING CITY
    if (billingCity.length === 0) {
        $('billingCityError').innerHTML = "*";
        problem = true;
    } else if (billingCityRegex.test(billingCity) === false) {
        $('billingCityError').innerHTML = "Invalid city";
        problem = true;
    } else {
        $('billingCityError').innerHTML = "";
    }
    //BILLING STATE
    if (billingState.length === 0) {
        $('billingStateError').innerHTML = "*";
        problem = true;
    } else if (stateAbbreviations.test(billingState) === false) {
        $('billingStateError').innerHTML = "State requires two digits only";
        problem = true;
    } else {
        $('billingStateError').innerHTML = "";
    }
    //BILLING ZIP
    if (billingZip.length === 0) {
        $('billingZipError').innerHTML = "*";
        problem = true;
    } else if (billingZipRegex.test(billingZip) === false) {
        $('billingZipError').innerHTML = "Zip code must be 5 digits or 5 digits followed by a hyphan and ends in four digits.";
        problem = true;
    } else {
        $('billingZipError').innerHTML = "";
    }
    if (creditCardNumber.length === 0) {
        $('creditCardNumberError').innerHTML = "*";
        problem = true;
    } else if (creditCardNumberRegex.test(creditCardNumber) === false) {
        $('creditCardNumberError').innerHTML = "Must contain only numbers";
        problem = true;
    } else if (!luhnTest(creditCardNumber)) {
        $('creditCardNumberError').innerHTML = "Credit card is invalid";
        problem = true;
    } else {
        $('creditCardNumberError').innerHTML = "";
    }
    if (cvcCode.length !== 3) {
        console.log(cvcCode.length);
        $('billingCvcError').innerHTML = "CVC is invalid";
        problem = true; 
        
    } else if (!creditCardNumberRegex.test(cvcCode)) {
        $('billingCvcError').innerHTML = "Must contain only numbers";
        problem = true;
    } else {
        $('billingCvcError').innerHTML = "";    
    }

    if (problem) {
        console.log('problem at verify billing info');
        return;
    }

}
// visa 4123456789012 invalid
// 4512113014643252 valid
function luhnTest(number) {
    "use strict";
    if (number.length < 13) {
        return false;
    }
    if (number.charAt(0) === "4") { //VISA
        if ((number.length !== 13) && (number.length !== 16)) {
            return false;
        }

    } else if (number.charAt(0) === "5") { //MC
        var c1 = number.charAt(1);
        if ((c1 !== "1") && (c1 !== "2") && (c1 !== "3") && (c1 !== "4") && (c1 !== "5")) {
            return false;
        }
        if (number.length !== 16) {
            return false;
        }

    } else if (number.charAt(0) === "3") { //AMEX
        if (number.length !== 15) {
            return false;
        }

    } else {
        //NOT RECOGNIZED CARD TYPE
        return false;

    }
    var reversed = number.split('').reverse().join(''),
        result = "",
        i, sum = 0,
        n;
    for (i = 0; i < reversed.length; i += 1) {
        if (i % 2 === 0) {
            result = result + reversed.charAt(i);
        } else {
            n = Number(reversed.charAt(i));
            n = n * 2;
            var nStr = n.toString();
            result = result + nStr;
        }
    }

    for (i = 0; i < result.length; i += 1) {
        n = parseInt(result.charAt(i), 10);
        sum = sum + n;
    }
    window.console.log(sum);
    if (sum % 10 === 0) {
        return true;
    } else {
        return false;
    }
}

//////////////////////////////////////////////////////////////////
// Initialize web page
//////////////////////////////////////////////////////////////////
//HANDLES ALL EVENT LISTENERS
function init() {
    "use strict";
    //SETS PHASE FOR INITIAL SPAN
    setPhase(phases.initialSpan);
    //EVENT FOR INITIAL PHASE
    $('initialSpan').addEventListener('click', proceedToOrder);
    //EVENT LISTENER FOR OTHER TYPE OF ADDRESS
    $('deliveryAddressType').addEventListener("change", otherAddressShowHide);
    //EVENT LISTENER FOR DELIVERY SUBMIT BUTTON 1st PHASE
    $('verifyDeliveryAddress').addEventListener("click", verifyDeliveryAddress);
    //EVENT LISTENER FOR DOUGH OPTIONS VALUE 
    $('doughOptionsSpan').addEventListener("click", verifyDoughOption);
    //EVENT LISTENER FOR VERIFY PIZZA SIZE PRICE EXCEPT FOR GLUTEN FREE
    $('pizzaSizePrices').addEventListener("change", verifyPizzaSizePrice);
    //EVENT LISTENER FOR VERIFY PizzaSizePrice GLUTEN FREE ONLY
    $('glutenFree').addEventListener('click', verifyPizzaSizePrice);
    //GETTING VALUE/HTML OF CHEESE AND UPDATES ORDER
    $('cheeseOptions').addEventListener('change', updateOrder);
    //EVENT LISTENER FOR SAUCE OPTIONS AND UPDATES ORDER
    $('sauceOptions').addEventListener('click', updateOrder);
    //EVENT LISTENER FOR TOPPINGS AND UPDATES ORDER
    $('toppingsSpan').addEventListener("click", updateOrder);
    //EVENT LISTENER FOR FINISH BUILDING PIZZA BUTTON FOR CONFIRMATION TO APPEAR.
    $('finishBuildingPizza').addEventListener("click", finishPizzaConfirmation);
    //EVENT LISTENER FOR SAME AS DELIVERY INFORMATION CHECKBOX
    $('sameAs').addEventListener("click", fillInBillingInfo);
    //EVENT LISTENER FOR BILLING OTHER TYPE OF ADDRESS
    $('billingAddressType').addEventListener("click", otherBillingAddressShowHide);
    //EVENT LISTENER FOR SUBMIT ORDER BILLING INFO
    $('submitOrder').addEventListener("click", verifyBillingInfo);
    //SUBMITS PLACE ORDER
    $('orderPizzaForm').onsubmit = placeOrder();

}

window.addEventListener("load", init);
