$(function () {
    $("body").on("mousedown", ".sql-table-group", function (e) {
        var obj = $(this);
        var table = obj.find(".sql-table thead");
        var dr = obj.addClass("drag");
        var height = dr.outerHeight();
        var width = dr.outerWidth();
        var ypos = dr.offset().top + height - e.pageY;
        var xpos = dr.offset().left + width - e.pageX;

        $(document.body).on("mousemove", function (e) {
            var itop = e.pageY + ypos - height;
            var ileft = e.pageX + xpos - width;

            if (dr.hasClass("drag"))
                dr.offset({ top: itop, left: ileft });
        }).on("mouseup", function (e) {
            dr.removeClass("drag");
            updPositionTable(table, obj.css("top"), obj.css("left"));
        });
    });
});

function updPositionTable(table, top, left) {
    var lid = table.attr("data-id");
    var ltable = $.map(ldatajson, function (val, key) {
        if (val.id == lid)
            return val;
    });

    if (ltable.length > 0) {
        ltable[0].style = "position: relative; top: " + top + "; left: " + left + ";";

        setLocalData(keydatabase, ldatajson);
    }
}