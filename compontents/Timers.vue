<template>
  <aside class="timers">
    <p class="timers__elem flex">
      <svg class="timers__svg" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
        <path d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>{{ timer }}</span>
    </p>
    <p class="timers__elem flex">
      <svg class="timers__svg" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve" fill="#fff"><g><path d="M42.046,0H7.954C3.569,0,0,3.568,0,7.954v34.091C0,46.432,3.569,50,7.954,50h34.092C46.432,50,50,46.432,50,42.045V7.954 C50,3.568,46.432,0,42.046,0z M32.048,8.573c-1.735,0.497-3.015,2.078-3.015,3.974c0,1.895,1.277,3.477,3.015,3.973v8.658 c-1.735,0.497-3.015,2.078-3.015,3.975c0,1.896,1.277,3.477,3.015,3.974v0.354c-1.735,0.498-3.015,2.078-3.015,3.975 s1.277,3.477,3.015,3.973v4.027H17.952v-4.027c1.736-0.496,3.015-2.078,3.015-3.973c0-1.896-1.278-3.479-3.015-3.975v-0.354 c1.736-0.497,3.015-2.078,3.015-3.974c0-1.896-1.278-3.478-3.015-3.975v-0.354c1.736-0.497,3.015-2.078,3.015-3.973 c0-1.896-1.278-3.478-3.015-3.974V4.545h14.096V8.573z M4.546,42.045V7.954c0-1.88,1.528-3.409,3.408-3.409h7.726v12.33 c-1.737,0.497-3.016,2.078-3.016,3.974s1.278,3.477,3.016,3.973v0.354c-1.737,0.497-3.016,2.078-3.016,3.974 c0,1.896,1.278,3.478,3.016,3.975v0.355c-1.737,0.496-3.016,2.078-3.016,3.974s1.278,3.478,3.016,3.973v4.027H7.954 C6.074,45.454,4.546,43.925,4.546,42.045z M45.454,42.045c0,1.88-1.528,3.409-3.408,3.409H34.32v-4.027 c1.736-0.497,3.016-2.077,3.016-3.973s-1.277-3.478-3.016-3.974v-0.355c1.736-0.497,3.016-2.078,3.016-3.975 c0-1.896-1.277-3.477-3.016-3.974V16.52c1.736-0.497,3.016-2.078,3.016-3.973c0-1.896-1.277-3.478-3.016-3.974V4.545h7.726 c1.88,0,3.408,1.529,3.408,3.409V42.045z"/></g>
          </svg>
      <span>{{ cardsOpen/2 }}/8 pairs</span>
    </p>
    <button @click="toggleTimer"
            class="btn timers__btn btn--yellow">
      <span v-if="!timerStarted">
        Start timer
      </span>
      <span v-else>
        Stop timer
      </span>
    </button>
  </aside>
</template>
<script>

import { toRef, ref } from "vue";

export default {
  name: 'Timers',
  props: ['cardsOpen', 'gameEnded'],
  setup(props) {
    let timerStarted = ref(false);
    let timerSeconds = ref(0);
    let timer = ref('00:00:00');

    //props
    let cardsOpen = toRef(props, 'cardsOpen');
    let gameEnded = toRef(props, 'gameEnded');

    let timerUpdateInterval;

    const formatTime = () => {
      const hours = Math.floor(timerSeconds.value / 3600);
      const minutes = Math.floor((timerSeconds.value % 3600) / 60);
      const remainingSeconds = timerSeconds.value % 60;

      timer.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    const updateTimer = () => {
      timerSeconds.value++;
      formatTime();
    }

    const toggleTimer = () => {
      if (!timerStarted.value) {
        timerSeconds.value = 0;
        timerUpdateInterval = setInterval(updateTimer, 1000);
      } else {
        clearInterval(timerUpdateInterval);
      }
      timerStarted.value = !timerStarted.value;
    }

    watch(gameEnded.value, () => {
      clearInterval(timerUpdateInterval);
    })

    return {
      timerStarted,
      timerSeconds,
      timer,

      cardsOpen,
      gameEnded,

      toggleTimer,
    }
  }

}
</script>