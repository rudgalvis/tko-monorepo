$( document ).ready(function() {

  function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
  
  var countDownLength = $('.countdown').length;

  var ff;
  var gg;
  
  var hh;
  var ll;
  
  var mm = "";
  var dd = "";
  var yy = "";
  var hh = "";
  var mmm = "";
  var ss = "";
  var tottalDate;
  var countDownDate;
  
  var totalDateCtach = [];
  
  var now = 0;
  
  var timeleft = 0;
  
  var days = 0;
  var hours = 0;
  var minutes = 0;
  var seconds = 0;
  
  var highlightedItems = "";
  
  console.log(countDownLength);
  
  for (let jjj = 0; jjj < countDownLength; jjj++) {
    mm = $('.countdown').eq(jjj).attr('data-mm');
    dd = $('.countdown').eq(jjj).attr('data-dd');
    yy = $('.countdown').eq(jjj).attr('data-yy');
    hh = $('.countdown').eq(jjj).attr('data-hh');
    mmm = $('.countdown').eq(jjj).attr('data-mmm');
    ss = $('.countdown').eq(jjj).attr('data-ss');
  
    tottalDate = mm+" "+dd+","+" "+yy+" "+hh+":"+mmm+":"+ss;
    //console.log(tottalDate);
    totalDateCtach.push(tottalDate);
     
    
  }
  
  
  console.log(totalDateCtach);
  
  
  
  
  
  
  
  
  
      var myfunc = setInterval(function() {
      for (let iiii = 0; iiii < totalDateCtach.length; iiii++) {
      countDownDate = new Date(totalDateCtach[iiii]).getTime();

        
      now = new Date();
      hh = convertTZ(now,"Europe/Vilnius");
      ll = hh.getTime();  

      timeleft = countDownDate - ll;  

      console.log(countDownDate);  
          
      days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

   
        
      highlightedItems = $(".countdown").eq(iiii);
  
      if(highlightedItems.hasClass("isfinish")){
        highlightedItems.css('visibility','hidden');
      }
  
          if(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0){
              clearInterval();
              highlightedItems.html("<div class='dateMe me'>0<span>D</span></div><div class='dateMe me'>0<span>H</span></div><div class='dateMe me'>0<span>M</span></div><div class='dateMe me'>0<span>S</span></div>");
         }else{    
          highlightedItems.html("<div class='dateMe me'>"+parseInt(days)+"<span>D</span></div><div class='dateMe me'>"+parseInt(hours)+"<span>H</span></div><div class='dateMe me'>"+parseInt(minutes)+"<span>M</span></div><div class='dateMe me'>"+parseInt(seconds)+"<span>S</span></div>");
      }
    }
  
      }, 1000);
      
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  });
  
  
  /*final count down*/
  