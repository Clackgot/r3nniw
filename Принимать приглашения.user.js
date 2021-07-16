// ==UserScript==
// @name         Принимать приглашения
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Ждёт и кликает по кнопке "Принять приглашение"
// @author       clackgot
// @match        https://discord.com/invite/*
// @icon         https://www.google.com/s2/favicons?domain=discord.com
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @run-at        document-start
// @grant        none
// ==/UserScript==

//Функция ожидания появления элемента
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

function waitSubmitButton(selector, callback, checkFrequencyInMs, timeoutInMs) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    if (document.querySelector(selector) != null && document.querySelector(selector).textContent == "Перейти в Discord") {
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


//Нажать на кнопку "Принять приглашение"
function clickToButton()
{
    if($("button[type=button]")[0].textContent == "Принять приглашение")//Если это кнопка "Принять приглашение"
    {
        $("button[type=button]").click();//Нажимаем
        waitSubmitButton("button[type=button] div",function(){$("button[type=button] div").click()},1000,9000);//Ждём пока кнопка появится на странице
    }
}

(function() {
    'use strict';
    waitForElementToDisplay("button[type=button]",function(){clickToButton()},1000,5000);//Ждём пока кнопка появится на странице
})();