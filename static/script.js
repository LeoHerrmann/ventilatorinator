var blades_angle = 0;
var fan_state = "OFF";
var fan_speed = 0;

window.onload = function() {
    get_state();
    get_speed();


	//Animation for blades
	setInterval(function() {
		if (fan_state == "OFF") {
			return false;
		}

		blades_angle = (blades_angle + fan_speed / 20) % 360;
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

		fan_state = state;
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
		fan_speed = speed;
    };

    xhttp.open("GET", "/get_speed");
    xhttp.send();
}


function toggle() {
    //toggle fan state using an AJAX-Request

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        get_state();
    };

    xhttp.open("GET", "/toggle");
    xhttp.send();
}



function set_speed() {
    //set fan speed using an AJAX-Request

    var speed = document.getElementById("speed_input").value;

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function()  {
        get_speed();
    };

    xhttp.open("GET", "/set_speed/" + speed);
    xhttp.send();
}
