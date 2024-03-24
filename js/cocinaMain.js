const url =
	"https://bypass-cors-beta.vercel.app/?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB";

/**
 *  @param {number} diviceWh
 * @param {number} startHour
 * @param {number} endHour
 * @returns {Promise<number,Map<string,number>>} {priceSum, pricesByHour}
 *
 */
async function getPriceDeviceByHourRange(diviceWh, startHour, endHour) {
	const endHourParsed = getEndHour(startHour, endHour);
	const priceSum = await getTotalPrice(startHour, endHourParsed, diviceWh);
	return priceSum;
}
const now = new Date();

function getPriceByHours() {
	return fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (!data?.data) {
				console.log("error, no data");
				return [];
			}
			return Object.values(data.data);
		})
		.catch((error) => console.log(error));
}

function parseHourToString(hour) {
	if (hour > 9) {
		return `${hour}`;
	}
	return `0${hour}`;
}

async function getPriceList() {
	const savedPrices = localStorage.getItem("prices");
	const storageDate = savedPrices ? savedPrices.date : null;

	const serverTimeResponse = await fetch("https://worldtimeapi.org/api/ip");
	const serverTimeData = await serverTimeResponse.json();
	const serverDateTime = new Date(serverTimeData.utc_datetime);
	const newDate = new Date(
		serverDateTime.getFullYear(),
		serverDateTime.getMonth(),
		serverDateTime.getDate()
	);

	const moreThan24Hours =
		!storageDate ||
		newDate.getTime() - new Date(storageDate).getTime() > 24 * 60 * 60 * 1000;

	if (moreThan24Hours) {
		const priceList = await getPriceByHours();
		localStorage.setItem(
			"prices",
			JSON.stringify({ date: newDate.getTime(), data: priceList })
		);
	}
	const precioHora = document.getElementById("precioHora");
	const precioTitulo = JSON.parse(localStorage.getItem("prices"));
	const datoActual = precioTitulo.data.filter((infoDia) => {
		return (
			infoDia.hour ==
			`${parseHourToString(getEndHour)}-${parseHourToString(getEndHour + 1)}`
		);
	});
	precioHora.innerHTML = datoActual[0].price;
	return JSON.parse(localStorage.getItem("prices")).data;
}
let getEndHour = now.getHours();
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
	// console.log(`startHour: ${startHour}, totalHours: ${endHour}`);
	for (let i = startHour; i < endHour; i++) {
		// console.log(`Hour: ${prices[i].hour}, price: ${prices[i].price}`);
		pricesByHour.push({ hour: prices[i].hour, price: prices[i].price });
		const priceWh = prices[i].price / 1000000;
		priceSum += priceWh * diviceWh;
	}
	return { priceSum, pricesByHour };
}

//definimos los consumos por hora de distintos electrodomesticos

//Cocina

let nevera = getTotalPrice(getEndHour, getEndHour + 1, 300).then((p) => {
	nevera = p.priceSum;
});

 micro = getTotalPrice(getEndHour, getEndHour + 1, 800).then((p) => {
	micro = p.priceSum;
});

let horno = getTotalPrice(getEndHour, getEndHour + 1, 1500).then((p) => {
	horno = p.priceSum;
});

let vitro = getTotalPrice(getEndHour, getEndHour + 1, 1500).then((p) => {
	vitro = p.priceSum;
});

let campanaExtractora = getTotalPrice(getEndHour, getEndHour + 1, 50).then((p) => {
	campanaExtractora = p.priceSum;
});

let lavavajillas = getTotalPrice(getEndHour, getEndHour + 1, 1200).then((p) => {
	lavavajillas = p.priceSum;
});

let cafetera = getTotalPrice(getEndHour, getEndHour + 1, 600).then((p) => {
	cafetera = p.priceSum;
});

let tostadora = getTotalPrice(getEndHour, getEndHour + 1, 36).then((p) => {
	tostadora = p.priceSum;
});

let robotCocina = getTotalPrice(getEndHour, getEndHour + 1, 500).then((p) => {
	robotCocina = p.priceSum;
});

let olla = getTotalPrice(getEndHour, getEndHour + 1, 200).then((p) => {
	olla = p.priceSum;
});

let batidora = getTotalPrice(getEndHour, getEndHour + 1, 350).then((p) => {
	batidora = p.priceSum;
});

let exprimidorZumo = getTotalPrice(getEndHour, getEndHour + 1, 300).then((p) => {
	exprimidorZumo = p.priceSum;
});

let freidora = getTotalPrice(getEndHour, getEndHour + 1, 1500).then((p) => {
	freidora = p.priceSum;
});

let osmosis = getTotalPrice(getEndHour, getEndHour + 1, 100).then((p) => {
	osmosis = p.priceSum;
});

let hervidorAgua = getTotalPrice(getEndHour, getEndHour + 1, 1500).then((p) => {
	hervidorAgua = p.priceSum;
});


function consumoTotal() {
	console.log(
		nevera +
		lavavajillas +
		micro +
		horno +
		vitro +
		campanaExtractora +
		cafetera +
		tostadora +
		robotCocina +
		olla +
		batidora +
		exprimidorZumo +
		freidora +
		osmosis +
		hervidorAgua 
	);

	let checkConsumo = 0;

	const arrayConsumo = [
		{ id: "nevera", consumo: nevera },
		{ id: "lavavajillas", consumo: lavavajillas },
		{ id: "micro", consumo: micro},
		{ id: "horno", consumo: horno},
		{ id: "vitro", consumo: vitro},
		{ id: "campanaExtractora", consumo: campanaExtractora},
		{ id: "cafetera", consumo: cafetera},
		{ id: "tostadora", consumo: tostadora},
		{ id: "robotCocina", consumo: robotCocina},
		{ id: "olla", consumo: olla},
		{ id: "batidora", consumo: batidora},
		{ id: "exprimidorZumo", consumo: exprimidorZumo},
		{ id: "freidora", consumo: freidora},
		{ id: "osmosis", consumo: osmosis},
		{ id: "hervidorAgua", consumo: hervidorAgua},
	];

	arrayConsumo.forEach((electrodomestico) => {
		const cheElectrodomestico = document.getElementById(electrodomestico.id);
		console.log(cheElectrodomestico.checked);
		if (cheElectrodomestico.checked) {
			checkConsumo += electrodomestico.consumo;
		}
	});
	const total = document.getElementById("mensajeTotal");
	total.innerHTML = checkConsumo;
}
