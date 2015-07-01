ymaps.ready(init);
var result;
var findPlace;
var addresses;
var interval;
var i, prev, max;

function getResults()
{
	if (i == max)
	{
		alert("done!");
		clearInterval(interval);
		return;
	}
	if (i != prev)
	{
		prev = i;
		findPlace = ymaps.geoQuery(ymaps.geocode(addresses[i]));
	}
	else if (findPlace.isReady())
	{
		bounds = findPlace.getBounds();
		++i;
		console.log(bounds);

		result += i + ':\t ';
		if (!bounds)
			result += 'Error: Address not found.\n';
		else if (bounds.length != 2)
			result += 'Error: Length of array is ' + bounds.length + '.\n';
		else
			result += ((bounds[0][0] + bounds[1][0]) / 2) + ',' + ((bounds[0][1] + bounds[1][1]) / 2) + '\n';

		document.getElementById("output").value = result;
	}
}

function init () {
	document.getElementById("container").style.display = "block";
	ymaps.run = function()
	{
		addresses = document.getElementById("input").value.split('\n');
		max = addresses.length;
		i = 0;
		prev = -1;
		result = '';
		interval = setInterval(getResults, 100);
	}
}