
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


/* ****************************** drag and drop ****************************** */

var $ = jQuery.noConflict();

$(document).ready(function() {
    // В dataTransfer помещаются изображения которые перетащили в область div
    $.event.addProp('dataTransfer');

    // Максимальное количество загружаемых изображений за одни раз
    var maxFiles = 3;

    // Оповещение по умолчанию
    var errMessage = 0;

    // Кнопка выбора файлов
    var defaultUploadBtn = $('#it-uploadbtn');

    // Массив для всех изображений
    var dataArray = [];

    // Область информер о загруженных изображениях - скрыта
    $('#it-uploaded-files').hide();

    // Метод при падении файла в зону загрузки
    $('#it-drop-files').on('drop', function(e) {
        // Передаем в files все полученные изображения
        var files = e.dataTransfer.files;
        // Проверяем на максимальное количество файлов
        if (files.length <= maxFiles) {
            // Передаем массив с файлами в функцию загрузки на предпросмотр
            loadInView(files);
        } else {
            alert('Вы не можете загружать больше '+maxFiles+' изображений!');
            files.length = 0; return;
        }
    });

    // При нажатии на кнопку выбора файлов
    defaultUploadBtn.on('change', function() {
        // Заполняем массив выбранными изображениями
        var files = $(this)[0].files;
        // Проверяем на максимальное количество файлов
        if (files.length <= maxFiles) {
            // Передаем массив с файлами в функцию загрузки на предпросмотр
            loadInView(files);
            // Очищаем инпут файл путем сброса формы
            $('#it-frm').each(function(){
                this.reset();
            });
        } else {
            alert('Вы не можете загружать больше '+maxFiles+' изображений!');
            files.length = 0;
        }
    });

    // Функция загрузки изображений на предросмотр
    function loadInView(files) {
        // Показываем обасть предпросмотра
        $('#it-uploaded-holder').show();

        // Для каждого файла
        $.each(files, function(index, file) {

            // Несколько оповещений при попытке загрузить не изображение
            if (!files[index].type.match('image.*')) {

                if(errMessage == 0) {
                    $('#it-drop-files p').html('Только изображения!');
                    ++errMessage
                }
                else if(errMessage == 1) {
                    $('#it-drop-files p').html('Стоп! Загружаются только изображения!');
                    ++errMessage
                }
                else if(errMessage == 2) {
                    $('#it-drop-files p').html("Можно добавлять только изображения!");
                    ++errMessage
                }
                else if(errMessage == 3) {
                    $('#it-drop-files p').html("Только изображения!");
                    errMessage = 0;
                }
                return false;
            }

            // Проверяем количество загружаемых элементов
            if((dataArray.length+files.length) <= maxFiles) {
                // показываем область с кнопками
                $('#it-upload-button').css({'display' : 'block'});
            }
            else { alert('Вы не можете загружать больше '+maxFiles+' изображений!'); return; }

            // Создаем новый экземпляра FileReader
            var fileReader = new FileReader();
            // Инициируем функцию FileReader
            fileReader.onload = (function(file) {

                return function(e) {
                    // Помещаем URI изображения в массив
                    dataArray.push({name : file.name, value : this.result});
                    addImage((dataArray.length-1));
                };

            })(files[index]);
            // Производим чтение картинки по URI
            fileReader.readAsDataURL(file);
        });
        return false;
    }

    // Процедура добавления эскизов на страницу
    function addImage(ind) {
        // Если индекс отрицательный значит выводим весь массив изображений
        if (ind < 0 ) {
            start = 0; end = dataArray.length;
        } else {
            // иначе только определенное изображение
            start = ind; end = ind+1; }
        // Оповещения о загруженных файлах
        if(dataArray.length == 0) {
            // Если пустой массив скрываем кнопки и всю область
            $('#it-upload-button').hide();
            $('#it-uploaded-holder').hide();
        } else if (dataArray.length == 1) {
            $('#it-upload-button span').html("Был выбран 1 файл");
        } else {
            $('#it-upload-button span').html(dataArray.length+" файлов были выбраны");
        }
        // Цикл для каждого элемента массива
        for (i = start; i < end; i++) {
            // размещаем загруженные изображения
            if($('#it-dropped-files > .image').length <= maxFiles) {
                $('#it-dropped-files').append('<div id="img-'+i+'" class="image" style="background: url('+dataArray[i].value+'); background-size: cover;"> <a href="#it-" id="drop-'+i+'" class="it-drop-button">x</a></div>');
            }
        }
        return false;
    }

    // Функция удаления всех изображений
    function restartFiles() {

        // Установим бар загрузки в значение по умолчанию
        $('#it-loading-bar .it-loading-color').css({'width' : '0%'});
        $('#it-loading').css({'display' : 'none'});
        $('#it-loading-content').html(' ');

        // Удаляем все изображения на странице и скрываем кнопки
        $('#it-upload-button').hide();
        $('#it-dropped-files > .image').remove();
        $('#it-uploaded-holder').hide();

        // Очищаем массив
        dataArray.length = 0;

        return false;
    }

    // Удаление только выбранного изображения
    $("#it-dropped-files").on("click","a[id^='drop']", function() {
        // получаем название id
        var elid = $(this).attr('id');
        // создаем массив для разделенных строк
        var temp = new Array();
        // делим строку id на 2 части
        temp = elid.split('-');
        // получаем значение после тире тоесть индекс изображения в массиве
        dataArray.splice(temp[1],1);
        // Удаляем старые эскизы
        $('#it-dropped-files > .image').remove();
        // Обновляем эскизи в соответсвии с обновленным массивом
        addImage(-1);
    });

    // Удалить все изображения кнопка
    $('#it-dropped-files #it-upload-button .delete').click(restartFiles);

    // Загрузка изображений на сервер
    $('#it-upload-button .upload').click(function() {

        // Показываем прогресс бар
        $("#it-loading").show();
        // переменные для работы прогресс бара
        var totalPercent = 100 / dataArray.length;
        var x = 0;

        $('#it-loading-content').html('Загружен '+dataArray[0].name);
        // Для каждого файла
        $.each(dataArray, function(index, file) {
            // загружаем страницу и передаем значения, используя HTTP POST запрос
            $.post('upload.php', dataArray[index], function(data) {

                var fileName = dataArray[index].name;
                ++x;

                // Изменение бара загрузки
                $('#it-loading-bar .loading-color').css({'width' : totalPercent*(x)+'%'});
                // Если загрузка закончилась
                if(totalPercent*(x) == 100) {
                    // Загрузка завершена
                    $('#it-loading-content').html('Загрузка завершена!');

                    // Вызываем функцию удаления всех изображений после задержки 1 секунда
                    setTimeout(restartFiles, 1000);
                    // если еще продолжается загрузка
                } else if(totalPercent*(x) < 100) {
                    // Какой файл загружается
                    $('#it-loading-content').html('Загружается '+fileName);
                }

                // Формируем в виде списка все загруженные изображения
                // data формируется в upload.php
                var dataSplit = data.split(':');
                if(dataSplit[1] == 'загружен успешно') {
                    $('#it-uploaded-files').append('<li><a href="images/'+dataSplit[0]+'">'+fileName+'</a> загружен успешно</li>');

                } else {
                    $('#it-uploaded-files').append('<li><a href="images/'+data+'. Имя файла: '+dataArray[index].name+'</li>');
                }

            });
        });
        // Показываем список загруженных файлов
        $('#it-uploaded-files').show();
        return false;
    });

    // Простые стили для области перетаскивания
    $('#it-drop-files').on('dragenter', function() {
        $(this).css({'box-shadow' : 'inset 0px 0px 20px rgba(0, 0, 0, 0.1)', 'border' : '4px dashed #it-bb2b2b'});
        return false;
    });

    $('#it-drop-files').on('drop', function() {
        $(this).css({'box-shadow' : 'none', 'border' : '4px dashed rgba(0,0,0,0.2)'});
        return false;
    });
});

