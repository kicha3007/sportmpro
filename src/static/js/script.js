
document.onload = function () {

    var modelChoiceItems = document.querySelectorAll("[data-modal-item]");
    console.log(modelChoiceItems.length);
    console.log(1);

    for (var g = 0; g < modelChoiceItems.length; g++) {

        var modelChoiceItem = modelChoiceItems[g];
        modelChoiceItem.onclick = function () {
            console.log(1);
        };
    }





};



// var modalChoiceImg = this.querySelector("[data-modal-img]");