'use strict';
const url = 'https://bypass-cors-beta.vercel.app/?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB'

/**
 *  @param {number} diviceWh
 * @param {number} startHour
 * @param {number} endHour
 * @returns {Promise<number,Map<string,number>>} {priceSum, pricesByHour}
 * 
 */
export async function getPriceDeviceByHourRange(diviceWh, startHour, endHour) {
    const endHourParsed = getEndHour(startHour, endHour);
    const priceSum = await getTotalPrice(startHour, endHourParsed, diviceWh);
    return priceSum;
}

function getPriceByHours() {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data?.data) {
                console.log('error, no data')
                return [];
            }
            return Object.values(data.data)
        })
        .catch(error => console.log(error))
}

async function getPriceList() {
    const savedPrices = localStorage.getItem('prices');
    const storageDate = savedPrices ? savedPrices.date : null;

    const newDate = (new Date()).setHours(0, 0, 0, 0);
    const moreThan24Hours = newDate.getDate() - new Date(storageDate).getDate() > 1;

    if (moreThan24Hours) {
        const priceList = await getPriceByHours();
        localStorage.setItem('prices', JSON.stringify({ date: newDate, data: priceList }));
    }
    return JSON.parse(localStorage.getItem('prices').data);
}

/**
 * Description
 * @param {any} startHour
 * @param {any} endHour
 * @param {any} diviceWh
 * @returns {any}
 */
async function getTotalPrice(startHour, endHour, diviceWh) {
    const prices = await getPriceList();
    let priceSum = 0;
    const pricesByHour = [];
    // console.log(startHour: ${startHour}, totalHours: ${endHour});
    for (let i = startHour; i < endHour; i++) {
        // console.log(Hour: ${prices[i].hour}, price: ${prices[i].price});
        pricesByHour.push({ hour: prices[i].hour, price: prices[i].price });
        const priceWh = prices[i].price / 1000000;
        priceSum += priceWh * diviceWh;
    }
    return { priceSum, pricesByHour };
}

function getEndHour(startHour, endHour) {
    if (!Number(startHour) && (startHour < 0 || startHour > 23)) {
        console.log('startHour is invalid');
        throw new Error('startHour is invalid');
    }

    const endHourParsed = (endHour ?? 0) <= startHour
        ? startHour + 1
        : endHour;
    return endHourParsed;
}