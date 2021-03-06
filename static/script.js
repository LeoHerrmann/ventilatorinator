var FAN_STATE = "OFF";
var FAN_SPEED = 0;


window.onload = function() {
	//Fetch state and speed regularly
	setInterval(function() {
		get_state();
		get_speed();
	}, 1000);


	//Animation for blades
	setInterval(function() {
		if (FAN_STATE == "OFF") {
			return false;
		}

		var blades_angle = parseInt(
			document.getElementById("blades").getAttribute("transform").split("(")[1].split(")")[0]
		);

		blades_angle = (blades_angle + FAN_SPEED / 5) % 360;
		document.getElementById("blades").setAttribute("transform", "rotate(" + blades_angle + ")");
	}, 1000/60);
};


function get_state() {
    //Get value for fan state and set user input accordingly

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        var state = this.response;

        console.log("State: " + state);

        if (state == "ON") {
            document.getElementById("toggle_button").innerText = "Aus";
        }
        else if (state == "OFF") {
            document.getElementById("toggle_button").innerText = "An";
        }

		FAN_STATE = state;
    };

    xhttp.open("GET", "/get_state");
    xhttp.send();
}


function get_speed() {
    //Get value for fan speed and set user input accordingly

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        var speed = this.response;

        console.log("Speed: " + speed);
        document.getElementById("speed_input").value = speed;
		FAN_SPEED = speed;
    };

    xhttp.open("GET", "/get_speed");
    xhttp.send();
}


function toggle() {
    //Toggle fan state using an AJAX-Request

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        get_state();
    };

    xhttp.open("GET", "/toggle");
    xhttp.send();
}


function set_speed() {
    //Set fan speed using an AJAX-Request

    var speed = document.getElementById("speed_input").value;

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function()  {
        get_speed();
    };

    xhttp.open("GET", "/set_speed/" + speed);
    xhttp.send();
}
