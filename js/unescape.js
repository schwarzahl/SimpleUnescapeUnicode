﻿$(function() {
    $("body").append("<div id='simple_unescape_unicode_result'></div>");
    var result_element = $("#simple_unescape_unicode_result");
    result_element.css("display", "none");
    result_element.css("position", "fixed");
    result_element.css("background", "#000000");
    result_element.css("color", "#FFFFFF");

    var prevText = "";
    $(window).mousemove(function(event) {
        var text = getHoverText();
        if (text != prevText) {
            changeDivStatus(result_element, text, event.clientX, event.clientY);
            prevText = text;
        }
    });
    function changeDivStatus(element, text, x, y) {
        if (text != "") {
            var encodeText = unescapeUnicode(text);
            if (encodeText != text) {
                element.text(trimEncodeText(encodeText, text));
                element.css("left", x);
                element.css("top", y);
                element.css("display", "block");
            } else {
                element.css("display", "none");
            }
        } else {
            element.css("display", "none");
        }
    }
    function getHoverText() {
        var elements = $(":hover");
        if (elements != null) {
            var element = elements[elements.size() - 1];
            if (element != null) {
                var html = element.innerHTML;
                if (html != "" && html.length < 1000) {
                    return html;
                }
            }
        }
        return "";
    };
    function unescapeUnicode(str) {
      return str.replace(/\\u([a-fA-F0-9]{4})/g, function(m0, m1) {
        return String.fromCharCode(parseInt(m1, 16));
      });
    };
    function trimEncodeText(encodeText, originText) {
        var beginIndex = 1;
        var endIndex = -1;
        while (originText.indexOf(encodeText.substring(0, beginIndex)) == 0) {
            beginIndex = beginIndex + 1;
        }
        while (encodeText.slice(endIndex) == originText.slice(endIndex)) {
            endIndex = endIndex - 1;
        }
        if (endIndex + 1 < 0) {
            return encodeText.slice(beginIndex - 1, endIndex + 1);
        } else {
            return encodeText.substring(beginIndex - 1);
        }
    }
});