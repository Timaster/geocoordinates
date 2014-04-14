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
			++i;
			result += i + ':\t ';
			if (!findPlace.getBounds())
				result += 'Error: Address not found.\n';
			else if (findPlace.getBounds().length != 2)
				result += 'Error: Length of array is ' + findPlace.getBounds().length + '.\n';
			else if (findPlace.getBounds()[0][0] != findPlace.getBounds()[1][0] || findPlace.getBounds()[0][1] != findPlace.getBounds()[1][1])
				result += "Error: Coordinates of array don't match.\n";
			else
				result += findPlace.getBounds()[0][0] + ',' + findPlace.getBounds()[0][1] + '\n';
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