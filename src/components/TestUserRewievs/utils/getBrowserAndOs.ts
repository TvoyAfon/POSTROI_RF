

// Функция для определения операционной системы и браузера
export const getOSAndBrowser = () => {
    const userAgent = navigator.userAgent;
    let os = "Unknown OS";
    let browser = "Unknown Browser";

    // Определение операционной системы
    if (userAgent.indexOf("Win") != -1) os = "Windows";
    else if (userAgent.indexOf("Mac") != -1) os = "MacOS";
    else if (userAgent.indexOf("X11") != -1 || userAgent.indexOf("Linux") != -1) os = "Linux";
    else if (userAgent.indexOf("Android") != -1) os = "Android";
    else if (userAgent.indexOf("like Mac") != -1) os = "iOS";

    // Определение браузера
    if (userAgent.indexOf("Chrome") != -1) browser = "Chrome";
    else if (userAgent.indexOf("Firefox") != -1) browser = "Firefox";
    else if (userAgent.indexOf("Safari") != -1) browser = "Safari";
    else if (userAgent.indexOf("Edge") != -1) browser = "Edge";
    else if (userAgent.indexOf("MSIE") != -1 || userAgent.indexOf("Trident") != -1) browser = "Internet Explorer";

    return { os, browser };
};
