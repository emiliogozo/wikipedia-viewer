$(document).ready(function () {
    $("#inputSearch").keypress(function (ev) {
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        var searchKey = $("#inputSearch").val();
        if (keycode == '13' && searchKey.length > 0) {
            var apiUrl = "https://en.wikipedia.org/w/api.php"
            var apiParam = {
                action: "query",
                format: "json",
                list: "search",
                utf8: 1,
                callback: "parseResult",
                srsearch: searchKey
            };
            $("#query-container").empty();
            $.ajax({
                url: apiUrl,
                jsonpCallback: "parseResult",
                dataType: "jsonp",
                data: apiParam
            })
                .then(function (data) {
                    $.each(data.query.search, function (i, item) {
                        if (item.title) {
                            var headerEl = $("<h3>").attr("class", "list-group-item-heading").text(item.title);
                            var contentEl = $("<div>").attr("class", "list-group-item-text").html(item.snippet);

                            var wikiUrl = "https://en.wikipedia.org/wiki/" + item.title.replace(" ", "_");

                            var el = $("<a>").attr("href", wikiUrl)
                                .attr("class", "list-group-item")
                                .attr("target", "_blank");
                            el.append(headerEl);
                            el.append(contentEl);
                            el.appendTo("#query-container");
                        }
                    });
                });
        }
    });
});