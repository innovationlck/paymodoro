
var pomoTime,
    timer_id,
    pomoType;
	
var counter = 0,
	maxcount = 16; //example: 4 hrs total time = 16 max count
//note: max count MUST BE: ((Global_Time_in_Minutes/30min)*2)


// Function to pause the timer
function timerPause(){
  clearInterval(timer_id);
  log('Quitters never Win!');
  $('#info').slideDown(); 
  /*LOSS LOGIC GOES HERE -- Redirect to a new page maybe??
  Just send the person back to the timer set up screen URL!!! 
  RUN THIS FUNCTION WHEN PERSON LEAVES APP/Behavior violation!!*/
  
}

// Stop the timer
function timerStop (){
  clearInterval(timer_id);
  log('Pomodoro of ' +pomoType + ' minutes ended');
  $('#info').slideDown(); 
  playSound();
  log('Pomodoro Ended! YOU WIN!');
  /* WIN LOGIC GOES HERE!
   if globalTime == 0
   		paypalwinner(person email) */
  
}





function log(str){
  var currentTime = new Date()
  var hours = currentTime.getHours()
  var minutes = currentTime.getMinutes()

  if (minutes < 10)
    minutes = "0" + minutes;

  $('#log').slideDown();
  $('div#log ul').append('<li><b>' + hours + ':' + minutes +':</b> ' + str + '</li>');
}


// Play a sound
function playSound() {
  $('embed').remove();
  $('body').append('<embed src="audio/whip.mp3" autostart="true" hidden="true" loop="false">');
}






// Sets a new pomodoro
function setPomodoro(minTime){
  pomoType = minTime;
  pomoTime = minTime * 60 * 1000;
  timerRun();
  counter = counter + 1;
  log('Pomodoro Work Cycle of ' +pomoType + ' minutes started'); 
}

// Sets a new pomodoro
function setPomodoro5(){
  pomoType = 5;
  pomoTime = 5 * 60 * 1000;
  timerRun();
  counter = counter + 1;
  log('Break Cycle of ' +pomoType + ' minutes started');
  log(((maxcount - counter)/2) + ' cycles remaining');
}

// Start the timer
function timerRun(){
  clearInterval(timer_id);
  timer_id = setInterval('pomo()', 100);
  $('#info').slideUp();
}











function pomo(){

  if(pomoTime>0)
    pomoTime-= 100;
  else{ 
  	if (counter < maxcount){
		if (counter % 2 != 0){
			setPomodoro5();
		}
		else if (counter % 2 == 0)
			setPomodoro(25);
	}
    else
		timerStop();
  }
    
  // To convert the time
  var myTime = pomoTime;

  var minutes = Math.floor(myTime/(60*1000));
      myTime  = myTime - minutes*60*1000;

  var seconds = Math.floor(myTime/1000);
      myTime  = myTime - seconds*1000;

  // To format the output
  var str = '';
  if (minutes<10)
    str = '0';
  $('#m').text(str + minutes);

  var str = '';
  if (seconds<10)
    str = '0';
  $('#s').text(str + seconds);

  var str = '';
  if (myTime<10)
    str = '00';
  else if (myTime<100)
    str = '0';
  $('#ms').text(str + myTime);

}







$(document).ready(function() {
  
  // 25 minutes timer  
  $('#pomodoro25').click(function() { 
    setPomodoro(25);
  });
  
  // 15 minutes timer
  $('#pomodoro15').click(function() { 
    setPomodoro(15); 
  });
  
  // 5 minutes timer
  $('#pomodoro5').click(function()  { 
    setPomodoro(5);  
  });


  // to stop the timer
  $('#stop').click(function() {
    timerPause();
  });



  $('#start').click(function() {
    log('The adventure must go on!');
    timerRun();
  });



  // o


  $('#text').on('click', function(){
    // $('#log').show();
    // log('on');
    // playSound();
    setPomodoro(0.02);  
  })






  $('#info').hide(); 
  $('#info').slideDown(); 
  $('#log').hide();

});

































