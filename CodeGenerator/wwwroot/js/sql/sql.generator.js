function generateCode(filenamexml, data, destination, fileformat) {
    var url = "xml/" + lsettingsjson.defaultxml + "/" + filenamexml;

    try {
        $.ajax({
            type: "get",
            url: url,
            dataType: "xml",
            success: function (xml) {
                var lrespuesta = "";
                var $lmainxml = $(xml).find("Main");
                var lzip;
                var lfolder;

                switch (fileformat) {
                    case "library":
                        lzip = new JSZip();
                        lfolder = lzip.folder(destination);
                        break;
                }

                $lmainxml.each(function () {
                    var lsection = this;

                    $.each(data.sort(SortById), function (i, t) {
                        var $lstructurexml = $(lsection).find("Structure");
                        var lfile = $lstructurexml.attr("file") ?? "";
                        var lnamebefore = $lstructurexml.attr("before") ?? "";
                        var lnameafter = $lstructurexml.attr("after") ?? "";
                        var lfilename = lfile.length > 0 ? (lnamebefore + t[lfile] + lnameafter) : "";

                        $lstructurexml.each(function () {
                            var $llinexml = $(this).find("Line");

                            $llinexml.each(function () {
                                var $lloopxml = $(this).find("Loop");

                                if ($lloopxml.length == 0)
                                    lrespuesta += contructorLine(this, t, i + 1, data.length);
                                else {
                                    $lloopxml.each(function () {
                                        var $litem = $(this).find("Item");
                                        var lvalue = $(this).attr("value") ?? "";
                                        var lfilter = $(this).attr("filter") ?? "";
                                        var lcontaint = $(this).attr("containt") ?? "";
                                        var lonlyactived = ($(this).attr("onlyactived") ?? "false") == "true";
                                        var ldatagroup = t[lvalue];

                                        if (lfilter != "")
                                            ldatagroup = t[lvalue].filter(function (elem) {
                                                return String(elem[lfilter]) == lcontaint;
                                            });

                                        if (lonlyactived && lsettingsjson.applystatus)
                                            ldatagroup = ldatagroup.filter(function (elem) {
                                                return elem.fieldname != lsettingsjson.statusfieldname;
                                            });

                                        $.each(ldatagroup.sort(SortById), function (j, f) {
                                            $litem.each(function () {
                                                lrespuesta += contructorLine(this, f, j + 1, ldatagroup.length);
                                            });
                                        });
                                    });
                                }
                            });
                        });

                        if (fileformat == "library") {
                            lfolder.file(lfilename + ".cs", lrespuesta);
                            lrespuesta = "";
                        }
                    });
                });

                if (fileformat == "sql" || fileformat == "api")
                    saveAs(new Blob([lrespuesta], { type: "application/octet-stream" }), destination);
                else
                    lzip.generateAsync({ type: "blob" }).then(function (content) {
                        saveAs(content, destination + ".zip");
                    });
            },
            error: function () {
                MessageError("Hubo un problema al generar los archivos");
            }
        });
    }
    catch {
        MessageError("Hubo un problema al generar los archivos");
    }
}

function contructorLine(line, data, row, count) {
    var lrespuesta = "";
    var lvalue = $(line).attr("value") ?? "";
    var lbase = $(line).attr("base") ?? "";
    var lisoptional = ($(line).attr("optional") ?? "false") == "true";
    var lboolean = ($(line).attr("boolean") ?? "false") == "true";
    var lnotlast = ($(line).attr("notlast") ?? "false") == "true";
    var lnotfirst = ($(line).attr("notfirst") ?? "false") == "true";
    var ltextboolean = $(line).attr("text") ?? "";
    var ltextbefore = $(line).attr("before") ?? "";
    var lspaces = constructorSpaces(parseInt($(line).attr("spaces") ?? "0"));
    var lget = $(line).attr("get") ?? "";
    var ltextafter = $(line).text();

    switch (lvalue) {
        case "@newline":
            lrespuesta += "\n";
            break;

        case "@today":
            var d = new Date();
            var dd = d.getDate() >= 10 ? d.getDate().toString() : "0" + d.getDate().toString();
            var mm = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString();
            var yy = d.getFullYear().toString();
            var hh = d.getHours() >= 10 ? d.getHours().toString() : "0" + d.getHours().toString();
            var mi = d.getMinutes() >= 10 ? d.getMinutes().toString() : "0" + d.getMinutes().toString();
            var ss = d.getSeconds() >= 10 ? d.getSeconds().toString() : "0" + d.getSeconds().toString();

            lrespuesta += dd + "/" + mm + "/" + yy + " " + hh + ":" + mi + ":" + ss;
            break;

        case "@setting":
            lrespuesta += lsettingsjson[lget];
            break;

        default:
            var ltext = "";

            if (lvalue == "@homologate") {
                var lorigen = lbase.length > 0 ? data[lbase] : "";
                var ldestino = lsettingsjson.typefields.filter(function (elem) {
                    return elem.typesql == lorigen;
                });

                if (ldestino.length > 0)
                    ltext = ldestino[0].typecsharp;
            }
            else
                ltext = lvalue.length > 0 ? data[lvalue] : "";

            if (lboolean)
                ltext = data[lvalue] ? ltextboolean.split('|')[0] : ltextboolean.split('|')[1];

            if ((lnotfirst && row == 1) || (lnotlast && row == count))
                ltextafter = "";

            if (!lisoptional || (lisoptional && ltext != ""))
                lrespuesta += lspaces + ltextbefore + ltext + ltextafter;

            break;
    }

    return lrespuesta;
}

function constructorSpaces(spaces) {
    var lrespuesta = "";

    for (var i = 0; i < spaces; i++) {
        lrespuesta += "\t";
    }

    return lrespuesta;
}