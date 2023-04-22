"use strict";

async function convertImageToBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

async function embedImagesInSVG(svg) {
    const images = svg.querySelectorAll("image[*|href$='.png']");
    for (const image of images) {
        const imageUrl = image.getAttribute("href");
        const dataUrl = await convertImageToBase64(imageUrl);
        image.setAttribute("href", dataUrl);
    }
}

async function downloadSVG() {
    const svg = document.querySelector("#diagram svg");
    await embedImagesInSVG(svg);
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "netbox-network-diagram.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

document.getElementById("download-svg-button").addEventListener("click", downloadSVG);