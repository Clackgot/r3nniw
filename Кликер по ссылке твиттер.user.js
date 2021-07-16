// ==UserScript==
// @name         Кликер по ссылке твиттер
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Автосборщик бонусов
// @author       clackgot
// @match        https://twitter.com/NoahreyliCustom
// @icon         https://www.google.com/s2/favicons?domain=twitter.com
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @run-at        document-start
// ==/UserScript==




function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
        if (document.querySelector(selector) != null) {
            callback();
            return;
        }
        else {
            setTimeout(function () {
                if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
                    return;
                loopSearch();
            }, checkFrequencyInMs);
        }
    })();
}

//Клик по ссылке-бонусу
function clickToLink()
{
    var link = $("div[data-testid='tweet'] a[dir=ltr]")[0];
    var linkUrl = link.text;
    if(linkUrl.includes('discord.gg'))//Если это ссылка дискорд-приглашения
    {
        if(linkUrl !== localStorage.lastLink)//Если ещё не нажимали на ссылку
        {
            localStorage.setItem("lastLink", linkUrl);//Сохраняем последнию посещённую ссылку
            link.click();//Кликаем по этой ссылке
        }
    }

}
var timeout = 5000;//Время между попытками найти новую ссылку на странице(в миллисекундах)

function Loop()
{
    var selector = "div[data-testid='tweet'] a[dir=ltr]";//Это наша ссылка
    waitForElementToDisplay(selector,function(){clickToLink()},1000,9000);//Ждём пока она появится на странице
    setTimeout(function(){
        Loop();
    }, timeout);
}
(function() {
    // setTimeout(function(){
    //     console.log("Прив)");
    //     var selector = "div[data-testid='tweet'] a[dir=ltr]";//Это наша ссылка
    //     waitForElementToDisplay(selector,function(){clickToLink()},1000,9000);//Ждём пока она появится на странице
    // }, 5000);
    Loop();



})();