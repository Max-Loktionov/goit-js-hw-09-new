import flatpickr from "flatpickr";
import { Report } from 'notiflix/build/notiflix-report-aio';;
import "flatpickr/dist/flatpickr.min.css";



const refs = {
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    mins: document.querySelector('[data-minutes]'),
    secs: document.querySelector('[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    timer.getValidDate(selectedDates[0]);
  },
    // minDate: "today",
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
};

flatpickr("input#datetime-picker", options);
// console.log(options);

class Timer {

  constructor({ onTick }) {
      this.timerId = null;
      this.isActive = false;
      this.selectedUserDate = Date.now();
      this.onTick = onTick;
      refs.btnStart.disabled = true; 
  } 
      
   getValidDate(date) {
        this.selectedUserDate = date.getTime();
       if (this.selectedUserDate < Date.now()) {
        console.log("Please choose a date in the future");
        
        Report.warning('Warning',"Please choose a date in the future");
        refs.btnStart.disabled = true;
      return
    }
    refs.btnStart.disabled = false;
  }

   start() {
       
        if (this.isActive) {
            return;
     }
      
      const finishTime = this.selectedUserDate;
        console.log(finishTime);
        this.isActive = true;
        refs.btnStart.disabled = true;
     
      this.timerId = setInterval(() => {
        const startTime = Date.now();
        const deltaTime = finishTime - startTime;
        
         if (deltaTime <= 1000) {  //==========change
            clearInterval(this.timerId)
        }  
        const timeComponents = this.convertMs(deltaTime);
        this.onTick(timeComponents);
      }, 1000);  
  }

   convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = this.addLeadingZero(Math.floor(ms / day));
      // Remaining hours
      const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

      return { days, hours, minutes, seconds };
  }

   addLeadingZero(value){
      return String(value).padStart(2,'0')
  }; 
    
}

const timer = new Timer({
  onTick: updateTimerface
});
    
function updateTimerface({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = minutes;
    refs.secs.textContent = seconds;
}

refs.btnStart.addEventListener('click', timer.start.bind(timer));
