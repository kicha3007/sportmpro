
/* ------------------- fancybox ------------------- */

$("[data-modal]").fancybox({
    padding: 0,
    helpers: {
        overlay: {
            locked: false
        }
    }

});




/* ****************************** accordion ****************************** */


$(function () {
    var $accordWrap = $("[data-it-accord-wrap]");
    var $accordItem = $("[data-it-accord-item]");
    var $accordToggle = $("[data-it-accord-toggle]");

    $accordItem.hide();
    $accordToggle.on("click", function () {
        var x = this;
        if ($(this).next($accordItem).css("display") === "none") {
            $(this).closest("[data-it-accord-wrap]").find("[data-it-accord-item]").fadeOut(500);

            $(this).closest("[data-it-accord-wrap]").find("[data-it-sign]").removeClass("active");

        }

        $(this).next($accordItem).slideToggle(200, function () {
            //window.scrollTo(0,this.offsetTop - 200);
        });
        $(this).parent().find("[data-it-sign]").toggleClass("active");

        /* $(this).parent().find("[]").toggle();
         $(this).parent().find("[]").toggle();*/
    });


    /* ------------------- carousel ------------------- */




        $('.box-carousel').each(function () {
            var $this = $(this);
            var itemsCount = $this.data("items");
            var itemsCountPad = $this.data("itemsPad");

            $this.owlCarousel({

                items: (itemsCount ? itemsCount : 1),
                margin: 20,
                nav: true,
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: false,
                dots: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: itemsCountPad ? itemsCountPad : (itemsCount ? itemsCount : 1)
                    },
                    1000: {
                        items: itemsCount ? itemsCount : 1
                    }
                }
            });
        });



    /* ------------------- ajax ------------------- */

    $(document).on("submit", "[data-it-form]", function (e) {
        e.preventDefault();
        var $form = $(this);
        var $data = new FormData($form[0]);
        console.log($form.attr("action"));
        $.post(
            {
                url: $form.attr("action"),
                data: $data,
                dataType: "json",
                timeout: 30000,
                processData: false,
                contentType: false,
                success: function (data) {
                    $form.addClass("success");
                    $form.find($(".it-form__success")).html(data.message);
                },

                error: function() {
                    $form.addClass("success");
                    $form.find($(".it-form__success")).html("Извините, временные проблемы на сервере, попробуйте ещё раз!");

                }
            }
        )
    });


    /* ------------------- switcher ------------------- */

    (function () {

        var tabButton = $("[data-switch]");

        tabButton.on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            $(this).closest("[data-switch-wrap]").find(".active").removeClass("active");
            $(this).parent().addClass("active");

            var target = $(this).data("switch");

            var dataTabValue = ("[data-tab='" + target + "']");

            $(dataTabValue).closest("[data-tabs-wrap]").find(".active").removeClass("active");

            var dataValue = $(dataTabValue).addClass("active");

            var pos = $(dataValue).position();
//                    window.scrollTo(pos);

//                $('html, body').animate({ scrollTop: croll_el.offset().top }, 500);

        });

    }());

    /* ------------------- показываем выпадающее меню в табах ------------------- */


    $("[data-min-nav]").on("click", function () {
        $("[data-min-nav-dropdown]").toggle();
    });

    $("[data-min-nav-item]").on("click", function () {
        var minNavItemVal = $(this).text();
        console.log(minNavItemVal);
        $("[data-min-nav-title]").text(minNavItemVal);
        $("[data-min-nav-dropdown]").hide();

    })




});

/* ------------------- mask ------------------- */

$("[data-phone]").mask("+7 (999) 99-99-999");


/* ------------------- calculation ----------------------- */

var stepCounter = 1;

var lineInner = $("[data-it-line-inner]");
var btnPrev = $("[data-it-btn='prev']");
var btnNext = $("[data-it-btn='next']");
var btnSend = $("[data-it-btn='send']");
var calcTitle = $("[data-calculation-title]");
var calcSubTitle = $("[data-it-calculation-text]");

function calculation() {

    $("[data-it-calculation-counter]").text(stepCounter);

    $("[data-it-calculation-item]").hide();
    $("[data-it-calculation-item='" + stepCounter + "']").show();


    switch (stepCounter) {
        case 1:
            calcSubTitle.text("Выберите материал для строительства");
            lineInner.css("width", "25%");
            btnPrev.removeClass("active");
            break;
        case 2:
            calcSubTitle.text("Расскажите, какая степень постройки вас интересует");
            lineInner.css("width", "50%");
            btnPrev.addClass("active");
            break;

        case 3:
            calcSubTitle.text("Что бы вы хотели добавить к проекту?");
            calcTitle.text("Уточните комплектацию для расчета стоимости дома:");
            lineInner.css("width", "75%");
            btnPrev.addClass("active");
            btnNext.addClass("active");
            btnSend.removeClass("active");
            break;

        case 4:
            calcSubTitle.text("После отправки заявки менеждер рассчитает, перезвонит и предложит варианты");
            calcTitle.text("Укажите данные для отправки");
            lineInner.css("width", "100%");
            btnNext.removeClass("active");
            btnSend.addClass("active");
            break;
    }
}


btnNext.on("click", function (e) {
    $(".it-validate-color").removeClass("it-validate-color");
    $(".it-validate-error").removeClass("active");

    $("[data-it-calculation-item='" + stepCounter + "'] [required]").each(function () {
        var calcValidate = $(this).val();

        if (calcValidate == null || calcValidate == "") {
            $(this).addClass("it-validate-color");
            $(".it-validate-error").addClass("active");

        }
    });

    if (!$(".it-validate-error").hasClass("active")) {

        stepCounter++;
        calculation();
    }
});


btnPrev.on("click", function (e) {
    stepCounter--;
    calculation();
});


var calcSelectWrap = $(".it-steps__inner-half:has(.it-steps__checkbox +.it-steps__select-wrap)");

calcSelectWrap.find(".it-checkbox__default").on("click", function () {

    var thisCalcSelectWrap = $(this).closest(calcSelectWrap);
    var thisCalcSelect = thisCalcSelectWrap.find(".it-steps__select");

    if (thisCalcSelect.attr("disabled")) {
        thisCalcSelect.removeAttr("disabled");
    } else {
        thisCalcSelect.attr("disabled", "1");
    }
});


/* ****************************** add-file ****************************** */

$(".it-callback__file-drop").change(function () {
    var f_name = [];

    for (var i = 0; i < $(this).get(0).files.length; ++i) {
        f_name.push(' ' + $(this).get(0).files[i].name);
    }

    $(this).parent().find(".it-callback__file-drop-name").text(f_name.join(', '));
});

