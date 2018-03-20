/* ------------------- show-preview-to-bit-img ------------------- */

    var modelChoiceItems = document.querySelectorAll(".it-card__model-checkbox-pseudo");
    var modelBigImg = document.querySelector("[data-model-big-img]");

    for (var i = 0; i < modelChoiceItems.length; i++) {

        var modelChoiceItem = modelChoiceItems[i];
             modelChoiceItem.onclick = function(e) {

            var modelChoiceImg = this.querySelector("[data-model-img]");
            var modelChoiceImgValue = modelChoiceImg.getAttribute("src");

            modelBigImg.setAttribute("src", modelChoiceImgValue);

        };
    }

/* ------------------- counter-number ------------------- */

var signMinus = document.querySelector("[data-sign-minus]");
var signPlus =  document.querySelector("[data-sign-plus]");
var signNumber = document.querySelector("[data-sign-value]");


signNumber.oninput = function () {
    this.value = this.value.replace(/\D/g, '');
};

// var signValue = signNumber.value;

signMinus.onclick = function () {

    if(signNumber.value != 0) {
        var signValueCheange = --signNumber.value;
        signNumber.setAttribute("value", signValueCheange);
    }
};

signPlus.onclick = function () {
        var signValueCheange = ++signNumber.value;
        signNumber.setAttribute("value", signValueCheange);
};
