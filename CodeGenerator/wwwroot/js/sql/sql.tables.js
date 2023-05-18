var ldoc = document;
var lmodal;

var ltxtimportfile = $("#txtImportFile");

var lmdlsettingslabel = $("#mdlSettingsLabel");
var lcboversionxml = $("#cboVersionXml");
var ltxtauthor = $("#txtAuthor");
var ltxtaliasprocedure = $("#txtAliasProcedure");
var lchkqueryschemas = $("#chkQuerySchemas");
var lchkquerytables = $("#chkQueryTables");
var lchkqueryprocedures = $("#chkQueryProcedures");
var lchkauditstate = $("#chkAuditState");
var ltxtauditfieldname = $("#txtAuditFieldName");
var ltxtauditfieldactived = $("#txtAuditFieldActived");
var ltxtauditfielddeleted = $("#txtAuditFieldDeleted");
var lchkqueryentity = $("#chkQueryEntity");
var ltxtaliasentity = $("#txtAliasEntity");
var lchkqueryinterface = $("#chkQueryInterface");
var ltxtaliasinterface = $("#txtAliasInterface");
var lchkqueryservice = $("#chkQueryService");
var ltxtaliasservice = $("#txtAliasService");
var lchkquerybusiness = $("#chkQueryBusiness");
var ltxtaliasbusiness = $("#txtAliasBusiness");
var lchkquerydata = $("#chkQueryData");
var ltxtaliasdata = $("#txtAliasData");
var lchkqueryhost = $("#chkQueryHost");
var ltxtaliashost = $("#txtAliasHost");

var lmdltablelabel = $("#mdlTableLabel");
var ltxtschemaname = $("#txtSchemaName");
var ltxttablename = $("#txtTableName");
var ltxtcontrollername = $("#txtControllerName");

var lmdlfieldslabel = $("#mdlFieldsLabel");
var ltxtfieldname = $("#txtFieldName");
var lcbofieldtype = $("#cboFieldType");
var ltxtfieldsize = $("#txtFieldSize");
var lchkfieldnull = $("#chkFieldNull");
var lchkincrement = $("#chkIncrement");
var ltxtdefault = $("#txtDefault");

var lmdlkeyslabel = $("#mdlKeysLabel");
var lcbokeytype = $("#cboKeyType");
var ltxtkeyname = $("#txtKeyName");
var llstfieldskey = $("#lstFieldsKey");
var llstfields = $("#lstFields");

$(document).ready(function () {
    $("body").on("click", ".sql-table thead", function (e) {
        removeTableActive();

        $(this).closest(".sql-table-group").addClass("active").find("tfoot").removeClass("disabled");
    });

    $("body").on("click", ".sql-table tbody tr", function (e) {
        removeTableActive();

        $(this).addClass("active");
        $(this).closest(".sql-table-group").addClass("active").find("tfoot").removeClass("disabled");
        $(this).closest(".sql-table-group").find(".isActiveField").removeClass("disabled");
    });

    $("body").on("dblclick", ".sql-table thead", function (e) {
        var lid = $(this).closest(".sql-table thead").attr("data-id");
        var ltable = $.map(ldatajson, function (val, key) {
            if (val.id == lid)
                return val;
        });

        if (ltable.length > 0) {
            lmodal = new bootstrap.Modal(document.getElementById("mdlTable"));
            lmdltablelabel.html("Editar tabla").attr("data-modo", "U").attr("data-codigo", ltable[0].id);
            ltxtschemaname.val(ltable[0].schemaname);
            ltxttablename.val(ltable[0].tablename);
            ltxtcontrollername.val(ltable[0].controllername);
            lmodal.show();
        }
    });

    $("body").on("dblclick", ".sql-table tbody tr", function (e) {
        var lid = $(this).closest(".sql-table").find("thead").attr("data-id");
        var ltable = $.map(ldatajson, function (val, key) {
            if (val.id == lid)
                return val;
        });

        if (ltable.length > 0) {
            if (ltable[0].fields.length > 0) {
                var lidfield = $(this).closest(".sql-table tbody tr").attr("data-id");
                var lfield = $.map(ltable[0].fields, function (val, key) {
                    if (val.id == lidfield)
                        return val;
                });

                if (lfield.length > 0) {
                    lmodal = new bootstrap.Modal(document.getElementById("mdlFields"));
                    lmdlfieldslabel.html("Editar campo en " + ltable[0].tablename).attr("data-modo", "U").attr("data-codigo", lfield[0].id);
                    ltxtfieldname.val(lfield[0].fieldname);
                    lcbofieldtype.val(lfield[0].fieldtype);
                    ltxtfieldsize.val(lfield[0].fieldsize);
                    lchkfieldnull.prop("checked", lfield[0].nullvalue);
                    lchkincrement.prop("checked", lfield[0].isidentity);
                    ltxtdefault.val(lfield[0].defaultvalue);
                    lmodal.show();
                }
            }
        }
    });

    $("body").on("dblclick", "#lstFields option:selected", function (e) {
        llstfieldskey.append($("<option>", {
            value: $(this).val(),
            text: $(this).text()
        }));

        $(this).remove();
    });

    $("body").on("dblclick", "#lstFieldsKey option:selected", function (e) {
        llstfields.append($("<option>", {
            value: $(this).val(),
            text: $(this).text()
        }));

        $(this).remove();
    });

    $("body").on("click", ".btnModal", function (e) {
        var lnombre = $(this).attr("data-ventana");
        lmodal = new bootstrap.Modal(document.getElementById(lnombre));

        switch (lnombre) {
            case "mdlSettings":
                lcboversionxml.find("option").remove().end();

                $.each(lsettingsjson.filesxml, function (i, t) {
                    if (lsettingsjson.defaultxml == t.version)
                        lcboversionxml.append("<option value='" + t.version + "' selected>" + t.version + "</option>");
                    else
                        lcboversionxml.append("<option value='" + t.version + "'>" + t.version + "</option>");
                });

                ltxtauthor.val(lsettingsjson.author);
                ltxtaliasprocedure.val(lsettingsjson.aliassp);
                lchkqueryschemas.prop("checked", lsettingsjson.createschema);
                lchkquerytables.prop("checked", lsettingsjson.createtable);
                lchkqueryprocedures.prop("checked", lsettingsjson.createprocedures);
                lchkauditstate.prop("checked", lsettingsjson.applystatus);
                ltxtauditfieldname.val(lsettingsjson.statusfieldname).prop("disabled", !lsettingsjson.applystatus);
                ltxtauditfieldactived.val(lsettingsjson.statusfieldactived).prop("disabled", !lsettingsjson.applystatus);
                ltxtauditfielddeleted.val(lsettingsjson.statusfielddeleted).prop("disabled", !lsettingsjson.applystatus);
                lchkqueryentity.prop("checked", lsettingsjson.createentities);
                ltxtaliasentity.val(lsettingsjson.namespaceentities).prop("disabled", !lsettingsjson.createentities);
                lchkqueryinterface.prop("checked", lsettingsjson.createinterfaces);
                ltxtaliasinterface.val(lsettingsjson.namespaceinterfaces).prop("disabled", !lsettingsjson.createinterfaces);
                lchkqueryservice.prop("checked", lsettingsjson.createservices);
                ltxtaliasservice.val(lsettingsjson.namespaceservices).prop("disabled", !lsettingsjson.createservices);
                lchkquerybusiness.prop("checked", lsettingsjson.createbusiness);
                ltxtaliasbusiness.val(lsettingsjson.namespacebusiness).prop("disabled", !lsettingsjson.createbusiness);
                lchkquerydata.prop("checked", lsettingsjson.createdata);
                ltxtaliasdata.val(lsettingsjson.namespacedata).prop("disabled", !lsettingsjson.createdata);
                lchkqueryhost.prop("checked", lsettingsjson.createserviceshost);
                ltxtaliashost.val(lsettingsjson.namespaceserviceshost).prop("disabled", !lsettingsjson.createserviceshost);
                break;

            case "mdlTable":
                lmdltablelabel.html("Nueva tabla").attr("data-modo", "N");
                ltxtschemaname.val("");
                ltxttablename.val("");
                ltxtcontrollername.val("");
                break;

            case "mdlFields":
                lmdlfieldslabel.html("Nuevo campo").attr("data-modo", "N");
                ltxtfieldname.val("");
                lcbofieldtype.val("");
                ltxtfieldsize.val("");
                lchkfieldnull.prop("checked", true);
                lchkincrement.prop("checked", false);
                ltxtdefault.val("");
                break;

            case "mdlKeys":
                lmdlkeyslabel.html("Establecer llave(s)");
                lcbokeytype.val("PrimaryKey");

                var lid = $(this).closest(".sql-table").find("thead").attr("data-id");
                var ltable = $.map(ldatajson, function (val, key) {
                    if (val.id == lid)
                        return val;
                });

                if (ltable.length > 0) {
                    ltxtkeyname.val(ltable[0].primarykeyname);
                    llstfieldskey.empty();
                    llstfields.empty();

                    var lkeys = ltable[0].fields.filter(function (elem) {
                        return elem.isprimarykey;
                    });

                    $.each(lkeys, function (i, val) {
                        llstfieldskey.append($("<option>", {
                            value: val.id,
                            text: val.fieldname
                        }));
                    });

                    var lnotkeys = ltable[0].fields.filter(function (elem) {
                        return elem.isprimarykey != true;
                    });

                    $.each(lnotkeys, function (i, val) {
                        llstfields.append($("<option>", {
                            value: val.id,
                            text: val.fieldname
                        }));
                    });
                }
                break;
        };

        lmodal.show();
    });

    $("body").on("click", ".btnDelete", function (e) {
        var lnombre = $(this).attr("data-ventana");

        switch (lnombre) {
            case "optTable":
                var lid = $(this).closest(".sql-table").find("thead").attr("data-id");
                var ltable = $.map(ldatajson, function (val, key) {
                    if (val.id == lid)
                        return val;
                });

                if (ltable.length > 0) {
                    $.confirm({
                        title: "Confirmar",
                        icon: "fas fa-question",
                        type: "blue",
                        content: "¿Desea eliminar la tabla '" + ltable[0].tablename + "'?",
                        buttons: {
                            Si: function () {
                                ldatajson = ldatajson.filter(function (elem) {
                                    return elem.id != ltable[0].id;
                                });

                                if (ltable[0].id != (ldatajson.length + 1)) {
                                    for (var i = 0; i < ldatajson.length; i++) {
                                        ldatajson[i].id = i + 1;
                                    }
                                }

                                setLocalData(keydatabase, ldatajson);

                                drawTables();
                            },
                            No: function () {
                                console.log("Operacion cancelada!");
                            }
                        }
                    });
                }
                break;

            case "optFields":
                var lid = $(this).closest(".sql-table").find("thead").attr("data-id");
                var ltable = $.map(ldatajson, function (val, key) {
                    if (val.id == lid)
                        return val;
                });

                if (ltable.length > 0) {
                    if (ltable[0].fields.length > 0) {
                        var lidfield = $(this).closest(".sql-table").find("tbody tr.active").attr("data-id");
                        var lfield = $.map(ltable[0].fields, function (val, key) {
                            if (val.id == lidfield)
                                return val;
                        });

                        if (lfield.length > 0) {
                            $.confirm({
                                title: "Confirmar",
                                icon: "fas fa-question",
                                type: "blue",
                                content: "¿Desea eliminar el campo '" + lfield[0].fieldname + "' de la tabla '" + ltable[0].tablename + "'?",
                                buttons: {
                                    Si: function () {
                                        ltable[0].fields = ltable[0].fields.filter(function (elem) {
                                            return elem.id != lfield[0].id;
                                        });
                                        
                                        if (lfield[0].id != (ltable[0].fields.length + 1)) {
                                            for (var i = 0; i < ltable[0].fields.length; i++) {
                                                ltable[0].fields[i].id = i + 1;
                                            }
                                        }

                                        setLocalData(keydatabase, ldatajson);

                                        drawTables();
                                    },
                                    No: function () {
                                        console.log("Operacion cancelada!");
                                    }
                                }
                            });
                        }
                    }
                }
                break;
        };
    });

    $("body").on("click", ".btnPosition", function (e) {
        var lincremento = parseInt($(this).attr("data-position"));
        var lid = $(this).closest(".sql-table").find("thead").attr("data-id");
        var ltable = $.map(ldatajson, function (val, key) {
            if (val.id == lid)
                return val;
        });

        if (ltable.length > 0) {
            if (ltable[0].fields.length > 0) {
                var lidfield = parseInt($(this).closest(".sql-table").find("tbody tr.active").attr("data-id"));

                if (!((lidfield == 1 && lincremento == -1) || (lidfield == ltable[0].fields.length && lincremento == 1))) {
                    var lactual = $.map(ltable[0].fields, function (val, key) {
                        if (val.id == lidfield.toString())
                            return val;
                    });

                    var lmover = $.map(ltable[0].fields, function (val, key) {
                        if (val.id == (lidfield + lincremento).toString())
                            return val;
                    });

                    if (lactual.length > 0 && lmover.length > 0) {
                        lactual[0].id = (lidfield + lincremento).toString();
                        lmover[0].id = lidfield.toString();

                        setLocalData(keydatabase, ldatajson);

                        drawTables();
                    }
                }
            }
        }
    });

    $("body").on("click", ".btnImportJson", function (e) {
        ltxtimportfile.click();
    });

    $("body").on("click", ".btnExportJson", function (e) {
        var lrespuesta = JSON.stringify(ldatajson);

        saveAs(new Blob([lrespuesta], { type: "application/octet-stream" }), "data-model.json");
    });

    $("body").on("change", "#txtImportFile", function (e) {
        var input = document.getElementById("txtImportFile");

        if (input.files[0]) {
            var file = input.files[0];
            var fr = new FileReader();
            fr.onload = function (event) {
                var lcontent = event.target.result

                if (lcontent != null) {
                    ldatajson = JSON.parse(event.target.result);

                    setLocalData(keydatabase, ldatajson);

                    drawTables();
                }
            };
            fr.readAsText(file);
        }
    });

    $("body").on("change", ".form-check-input", function (e) {
        var lreferencia = $(this).attr("data-ref");
        var lmarcado = $(this).prop("checked");

        if (lreferencia != null && lreferencia.length > 0)
            $("." + lreferencia).prop("disabled", !lmarcado);
    });

    $("body").on("click", ".btnExport", function (e) {
        $.confirm({
            title: "Confirmar",
            icon: "fas fa-question",
            type: "blue",
            content: "¿Desea exportar los archivos?",
            buttons: {
                Si: function () {
                    if (lsettingsjson.createschema) {
                        var lschemajson = [];
                        var lfiltered = [...new Set(ldatajson.map(item => item.schemaname))];

                        $.each(lfiltered, function (i, t) {
                            var obj = {};
                            obj["schemaname"] = t;
                            lschemajson.push(obj);
                        });

                        generateCode("create-schema.xml", lschemajson, "sql-schemas.sql", "sql");
                    }

                    if (lsettingsjson.createtable)
                        generateCode("create-table.xml", ldatajson, "sql-tables.sql", "sql");

                    if (lsettingsjson.createprocedures)
                        generateCode("create-procedure.xml", ldatajson, "sql-procedures.sql", "sql");

                    if (lsettingsjson.createentities)
                        generateCode("create-entity.xml", ldatajson, lsettingsjson.namespaceentities, "library");

                    if (lsettingsjson.createservices)
                        generateCode("create-service.xml", ldatajson, lsettingsjson.namespaceservices, "library");

                    if (lsettingsjson.createinterfaces)
                        generateCode("create-interface.xml", ldatajson, lsettingsjson.namespaceinterfaces, "library");

                    if (lsettingsjson.createbusiness)
                        generateCode("create-business.xml", ldatajson, lsettingsjson.namespacebusiness, "library");

                    if (lsettingsjson.createdata)
                        generateCode("create-data.xml", ldatajson, lsettingsjson.namespacedata, "library");

                    if (lsettingsjson.createserviceshost) {
                        generateCode("create-host-controller.xml", ldatajson, lsettingsjson.namespaceserviceshost, "library");
                        generateCode("create-host-interfaces.xml", ldatajson, "Startup.cs", "api");
                    }
                },
                No: function () {
                    console.log("Operacion cancelada!");
                }
            }
        });
    });

    $("body").on("click", "#btnSaveTable", function (e) {
        if (ltxttablename.val() == "") {
            MessageError("Ingresar el nombre de la tabla");
            return;
        }

        if (ltxtcontrollername.val() == "") {
            MessageError("Ingresar el nombre controller (webapi)");
            return;
        }

        if (lmdltablelabel.attr("data-modo") == "N") {
            var ltable = {};

            ltable.id = (ldatajson.length + 1).toString();
            ltable.schemaname = ltxtschemaname.val();
            ltable.tablename = ltxttablename.val();
            ltable.controllername = ltxtcontrollername.val();
            ltable.fields = [];
            ltable.primarykeyname = "";
            ltable.style = "";

            ldatajson.push(ltable);
        }
        else {
            var lid = lmdltablelabel.attr("data-codigo");
            var ltable = $.map(ldatajson, function (val, key) {
                if (val.id == lid)
                    return val;
            });

            if (ltable.length > 0) {
                ltable[0].schemaname = ltxtschemaname.val();
                ltable[0].tablename = ltxttablename.val();
                ltable[0].controllername = ltxtcontrollername.val();
            }
        }

        setLocalData(keydatabase, ldatajson);

        drawTables();
        lmodal.hide();
    });

    $("body").on("click", "#btnSaveFields", function (e) {
        if (ltxtfieldname.val() == "") {
            MessageError("Ingresar el nombre de la columna");
            return;
        }

        if (lcbofieldtype.val() == "" || lcbofieldtype.val() == null || typeof lcbofieldtype.val() === "undefined") {
            MessageError("Seleccionar el tipo de columna");
            return;
        }

        var lidtable = $(".sql-table-group.active").find(".sql-table thead").attr("data-id");
        var ltable = $.map(ldatajson, function (val, key) {
            if (val.id == lidtable)
                return val;
        });

        if (ltable.length > 0) {
            if (lmdlfieldslabel.attr("data-modo") == "N") {
                var lfield = {};

                lfield.id = (ltable[0].fields.length + 1).toString();
                lfield.fieldname = ltxtfieldname.val();
                lfield.fieldtype = lcbofieldtype.val();
                lfield.fieldsize = ltxtfieldsize.val().toString();
                lfield.defaultvalue = ltxtdefault.val();
                lfield.nullvalue = lchkfieldnull.prop("checked");
                lfield.isidentity = lchkincrement.prop("checked");
                lfield.isprimarykey = ltable[0].fields.length > 0 ? false : true;

                ltable[0].primarykeyname = ltable[0].fields.length == 0 ? "Pk_" + ltxtfieldname.val().toLowerCase() : ltable[0].primarykeyname;
                ltable[0].fields.push(lfield);
            }
            else {
                var lid = lmdlfieldslabel.attr("data-codigo");
                var lfield = $.map(ltable[0].fields, function (val, key) {
                    if (val.id == lid)
                        return val;
                });

                if (lfield.length > 0) {
                    lfield[0].fieldname = ltxtfieldname.val();
                    lfield[0].fieldtype = lcbofieldtype.val();
                    lfield[0].fieldsize = ltxtfieldsize.val().toString();
                    lfield[0].defaultvalue = ltxtdefault.val();
                    lfield[0].nullvalue = lchkfieldnull.prop("checked");
                    lfield[0].isidentity = lchkincrement.prop("checked");
                }
            }
        }

        setLocalData(keydatabase, ldatajson);

        drawTables();
        lmodal.hide();
    });

    $("body").on("click", "#btnSaveKeys", function (e) {
        if (ltxtkeyname.val() == "") {
            MessageError("Ingresar el nombre de la llave primaria");
            return;
        }

        if (llstfieldskey.find("option").length == 0) {
            MessageError("Asignar como mínimo una columna como llave primaria");
            return;
        }

        var lidtable = $(".sql-table-group.active").find(".sql-table thead").attr("data-id");
        var ltable = $.map(ldatajson, function (val, key) {
            if (val.id == lidtable)
                return val;
        });

        if (ltable.length > 0) {
            ltable[0].primarykeyname = ltxtkeyname.val();

            $.each(ltable[0].fields, function (i, f) {
                f.isprimarykey = false;
            });

            llstfieldskey.find("option").each(function () {
                var lid = this.value;

                var lfield = $.map(ltable[0].fields, function (val, key) {
                    if (val.id == lid)
                        return val;
                });

                if (lfield.length > 0)
                    lfield[0].isprimarykey = true;
            });
        }

        setLocalData(keydatabase, ldatajson);

        drawTables();
        lmodal.hide();
    });

    $("body").on("click", "#btnSaveForeing", function (e) {
        lmodal.hide();
    });

    $("body").on("click", "#btnSaveSettings", function (e) {
        lsettingsjson.defaultxml = lcboversionxml.val();
        lsettingsjson.author = ltxtauthor.val();
        lsettingsjson.aliassp = ltxtaliasprocedure.val();
        lsettingsjson.createschema = lchkqueryschemas.prop("checked");
        lsettingsjson.createtable = lchkquerytables.prop("checked");
        lsettingsjson.createprocedures = lchkqueryprocedures.prop("checked");
        lsettingsjson.applystatus = lchkauditstate.prop("checked");
        lsettingsjson.statusfieldname = ltxtauditfieldname.val();
        lsettingsjson.statusfieldactived = ltxtauditfieldactived.val();
        lsettingsjson.statusfielddeleted = ltxtauditfielddeleted.val();
        lsettingsjson.createentities = lchkqueryentity.prop("checked");
        lsettingsjson.namespaceentities = ltxtaliasentity.val();
        lsettingsjson.createinterfaces = lchkqueryinterface.prop("checked");
        lsettingsjson.namespaceinterfaces = ltxtaliasinterface.val();
        lsettingsjson.createservices = lchkqueryservice.prop("checked");
        lsettingsjson.namespaceservices = ltxtaliasservice.val();
        lsettingsjson.createbusiness = lchkquerybusiness.prop("checked");
        lsettingsjson.namespacebusiness = ltxtaliasbusiness.val();
        lsettingsjson.createdata = lchkquerydata.prop("checked");
        lsettingsjson.namespacedata = ltxtaliasdata.val();
        lsettingsjson.createserviceshost = lchkqueryhost.prop("checked");
        lsettingsjson.namespaceserviceshost = ltxtaliashost.val();

        setLocalData(keysettings, lsettingsjson);

        lmodal.hide();
    });
});

function drawTables() {
    ldoc.getElementById("dvlienzo").innerHTML = "";

    $.each(ldatajson.sort(SortById), function (i, t) {
        var lid = t.id;
        var lschema = t.schemaname;
        var ltable = t.tablename;
        var lfields = t.fields;
        var lstyle = t.style;

        addTable(lid, (lschema.length > 0 ? lschema + "." : "") + ltable, lstyle);

        $.each(lfields.sort(SortById), function (i, f) {
            var lidfield = f.id;
            var lname = f.fieldname;
            var ltype = f.fieldtype;
            var lsize = f.fieldsize;
            var lkey = f.isprimarykey;

            addField(lidfield, lname, ltype + (lsize.length > 0 ? "(" + lsize + ")" : ""), lkey);
        });
    });

    removeTableActive();
}

function addTable(id, name, style) {
    removeTableActive();

    var fragment = ldoc.createDocumentFragment();

    var group = ldoc.createElement("div");
    var table = ldoc.createElement("table");
    var thead = ldoc.createElement("thead");
    var tr = ldoc.createElement("tr");
    var th = ldoc.createElement("th");
    var tbody = ldoc.createElement("tbody");
    var tfoot = ldoc.createElement("tfoot");
    var lbtn1 = "<a data-ventana='mdlFields' class='btnModal' href='#'><i class='fas fa-plus' title='Agregar campo'></i></a>";
    var lbtn2 = "<a data-ventana='optFields' class='btnDelete disabled isActiveField' href='#'><i class='fas fa-minus' title='Quitar campo'></i></a>";
    var lbtn3 = "<a data-position='-1' class='btnPosition disabled isActiveField' href='#'><i class='fas fa-angle-up' title='Subir posición'></i></a>";
    var lbtn4 = "<a data-position='1' class='btnPosition disabled isActiveField' href='#'><i class='fas fa-angle-down' title='Bajar posición'></i></a>";
    var lbtn5 = "<a data-ventana='mdlKeys' class='btnModal' href='#'><i class='fas fa-key' title='Establecer llave(s) primaria(s)'></i></a>";
    //var lbtn6 = "<a data-ventana='mdlForeing' class='btnModal' href='#'><i class='fas fa-link' title='Establecer llave(s) foranea(s)'></i></a>";
    var lbtn6 = "<a data-ventana='optTable' class='btnDelete' href='#'><i class='fas fa-trash' title='Borrar tabla'></i></a>";

    th.innerHTML = name;
    th.setAttribute("colspan", "3");
    tr.appendChild(th);

    thead.appendChild(tr);
    thead.setAttribute("data-id", id);

    tr = ldoc.createElement("tr");
    th = ldoc.createElement("th");
    th.innerHTML = lbtn1 + lbtn2 + lbtn3 + lbtn4 + lbtn5 + lbtn6;
    th.setAttribute("colspan", "3");
    tr.appendChild(th);

    tfoot.appendChild(tr);
    tfoot.setAttribute("class", "disabled");

    fragment.appendChild(thead);
    fragment.appendChild(tbody);
    fragment.appendChild(tfoot);

    table.appendChild(fragment);
    table.setAttribute("class", "sql-table");

    group.appendChild(table);
    group.setAttribute("class", "sql-table-group active");

    if (style != "")
        group.setAttribute("style", style);

    ldoc.getElementById("dvlienzo").appendChild(group);
}

function addField(id, name, type = "", iskey = false) {
    removeFieldActive();

    var group = $(".sql-table-group.active");
    var table = group.children("table");
    var tbody = table.children("tbody");
    var tr = ldoc.createElement("tr");
    var tdid = ldoc.createElement("td");
    var tdname = ldoc.createElement("td");
    var tdtype = ldoc.createElement("td");

    tdid.innerHTML = id;
    tr.appendChild(tdid);
    tdname.innerHTML = name;
    tr.appendChild(tdname);
    tdtype.innerHTML = type;
    tr.appendChild(tdtype);
    tr.setAttribute("class", iskey ? "key" : "");
    tr.setAttribute("data-id", id);
    tbody.append(tr);
}

function removeTableActive() {
    $("#dvlienzo .sql-table-group.active").each(function () {
        $(this).removeClass("active");
        $(this).find("tfoot").addClass("disabled");
    });

    removeFieldActive();
}

function removeFieldActive() {
    $("#dvlienzo .sql-table tbody tr.active").each(function () {
        $(this).removeClass("active");
        $(this).closest(".sql-table-group").find(".isActiveField").addClass("disabled");
    });
}

function SortById(a, b) {
    var posA = Number(a.id);
    var posB = Number(b.id);
    return ((posA < posB) ? -1 : ((posA > posB) ? 1 : 0));
}