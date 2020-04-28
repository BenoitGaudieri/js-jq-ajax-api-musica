// Descrizione:
// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo.
// In questo momento non è importante la parte grafica.
// Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.

$(document).ready(function () {
    // refs
    apiUrl = "https://flynn.boolean.careers/exercises/api/array/music";

    // Init handlebars
    var source = $("#disk-template").html();
    var template = Handlebars.compile(source);
    var list = {};
    var moustache = {};
    var allCd = "";

    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (data) {
            data = data.response;
            // list = data;
            // console.log(list); //list ok

            for (let i = 0; i < data.length; i++) {
                for (const key in data[i]) {
                    if (key === "poster") {
                        var poster = data[i][key];
                        moustache.poster = poster;
                    }
                    if (key === "title") {
                        var title = data[i][key];
                        moustache.title = title;
                    }
                    if (key === "author") {
                        var author = data[i][key];
                        moustache.author = author;
                    }
                    if (key === "genre") {
                        var genre = data[i][key];
                        moustache.genre = genre;
                    }
                    if (key === "year") {
                        var year = data[i][key];
                        moustache.year = year;

                        // handlebars output
                        var html = template(moustache);
                        $(".cds-container").append(html);
                        allCd = $(".cd");
                    }
                }
            }
        },
        error: function () {
            console.log("error");
        },
    });

    var selector = $("#gen-sel");

    selector.on("change", function () {
        var selected = $("#gen-sel option:selected");
        console.log(selected.text());

        // allCd.addClass("hidden");
        // for (let i = 0; i < allCd.length; i++) {
        //     var thisCd = allCd[i];
        //     console.log(thisCd);

        //     // if (thisCd.attr("data-genre") == selected.text()) {
        //     //     allCd[i].toggle();
        //     // }
        // }
        $(".cd").each(function () {
            var dataGenre = $(this).attr("data-genre");

            // verifica
            if (selected.text() === "Choose an option") {
                $(this).show();
            } else if (dataGenre === selected.text()) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    //
    //end Doc ready
});
