let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let [milliseconds_2, seconds_2, minutes_2, hours_2] = [0, 0, 0, 0];
let timeRef = document.querySelector('.timer-display');
let sub_timeRef = document.querySelector('.sub-timer-display');
let int = null;
let int_2 = null;

let paused = true;



// BUTTONS
let btn_reset = document.getElementById('reset-timer');
btn_reset.setAttribute('disabled', 'disabled'); // Disabling the RESET Button
let btn_lap = document.getElementById('lap-timer');
btn_lap.setAttribute('disabled', 'disabled'); // Disabling the LAP Button


document.getElementById('start_pause-timer').addEventListener("click", () => {
    if(paused == true) {
        if(int !== null) {
            clearInterval(int);
        }
        int = setInterval(displayTimer, 10);
        
        start_sub_timer();

        document.getElementById('start_pause-timer').textContent = "Pause";

        btn_reset.setAttribute('disabled', 'disabled'); // Disabling the RESET Button
        btn_lap.removeAttribute('disabled'); // Enabling the LAP Button

        paused = false
    }
    else if(paused == false) {
        clearInterval(int);
        clearInterval(int_2);
        document.getElementById('start_pause-timer').textContent = "Start";

        btn_reset.removeAttribute('disabled'); // Enabling the RESET Button
        // btn_lap.setAttribute('disabled', 'disabled'); // Disabling the LAP Button

        paused = true
    }
});



document.getElementById('reset-timer').addEventListener("click", () => {
    reset_lap();
    reset_sub_timer();

    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 , 00";
    

    btn_reset.setAttribute('disabled', 'disabled'); // Disabling the RESET Button
    btn_lap.setAttribute('disabled', 'disabled'); // Disabling the LAP Button
});
document.getElementById('lap-timer').addEventListener("click", () => {
    
    if(paused == true) {
        lap();
        reset_sub_timer();
        btn_lap.setAttribute('disabled', 'disabled'); // Disabling the LAP Button
    }
    else {
        lap();
        reset_sub_timer();
        start_sub_timer();
    }



    // if(paused == true) {
    //     if(int_2 !== null) {
    //         clearInterval(int_2);
    //     }
    //     int_2 = setInterval(displayTimer, 10);
    // }
    // else if(paused == false) {
    //     clearInterval(int_2);
    // }
});



let laps = document.querySelector('.laps');


let lst_lap_number = 0;
let lst_lap_difference = '';
// let lst_lap_times = [];
// let ind = 0;

function lap() {
    let newP = document.createElement('p');

    // lst_lap_times.push(timeRef.innerHTML);

    // ind = lst_lap_times.length - 1;
    lst_lap_number++;

    newP.textContent = lst_lap_number.toString().padStart(2, '0') + ' ----- + ' + sub_timeRef.innerHTML + ' ----- ' + timeRef.innerHTML;
    // newP.textContent = lst_lap_times[ind];
    laps.appendChild(newP);


    // for (let i = 1; i < lst_lap_times.length; i++){
    //     // newP.textContent = timeRef.innerHTML;
    //     newP.textContent = lst_lap_times[0 - i];
    //     laps.appendChild(newP);
    // }
}

function reset_lap() {
    lst_lap_number = 0;
    while (laps.firstChild) {
        laps.removeChild(laps.firstChild);
    }
}



function start_sub_timer() {
    if(int_2 !== null) {
        clearInterval(int_2);
    }
    int_2 = setInterval(displayTimer_2, 10);
}

function reset_sub_timer() {
    clearInterval(int_2);
    [milliseconds_2, seconds_2, minutes_2, hours_2] = [0, 0, 0, 0];
    sub_timeRef.innerHTML = "00 : 00 : 00 , 00";
}




function displayTimer() {
    milliseconds += 10;

    if(milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if(seconds == 60) {
            seconds = 0;
            minutes++;
            if(minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = 
        milliseconds < 10 
        ? "00" + milliseconds
        : milliseconds < 100
        ? "0" + milliseconds
        : milliseconds;

    timeRef.innerHTML = `${h} : ${m} : ${s} , ${ms.toString().substring(0,2)}`;
}






function displayTimer_2() {
    milliseconds_2 += 10;

    if(milliseconds_2 == 1000) {
        milliseconds_2 = 0;
        seconds_2++;
        if(seconds_2 == 60) {
            seconds_2 = 0;
            minutes_2++;
            if(minutes_2 == 60) {
                minutes_2 = 0;
                hours_2++;
            }
        }
    }

    let h_2 = hours_2 < 10 ? "0" + hours_2 : hours_2;
    let m_2 = minutes_2 < 10 ? "0" + minutes_2 : minutes_2;
    let s_2 = seconds_2 < 10 ? "0" + seconds_2 : seconds_2;
    let ms_2 = 
        milliseconds_2 < 10 
        ? "00" + milliseconds_2
        : milliseconds_2 < 100
        ? "0" + milliseconds_2
        : milliseconds_2;

    sub_timeRef.innerHTML = `${h_2} : ${m_2} : ${s_2} , ${ms_2.toString().substring(0,2)}`;
}