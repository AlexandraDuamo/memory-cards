<template>
  <div class="main-app container">

    <Filter @getCards="getCards" :cardsLength="cards.length"/>

    <div v-if="!gameEnded">
      <section class="flex cards-list__wr"
           v-if="cards.length && !loading">
        <Timers :cardsOpen="cardsOpen" :gameEnded="gameEnded"/>
        <div class="cards-list">
          <Card v-for="(card, index) in cards"
                @flipCard="flipCard"
                :cardsFlipped="cardsFlipped.length"
                :key="index" :card="card"/>
        </div>
      </section>
      <div v-if="loading"
           class="loading">
      </div>
    </div>
    <section v-else class="game-end">
      <p class="game-end__msg">
        <span class="game-end__msg-mark">Congratulations!</span><br>
        You've successfully matched all the pairs and completed the memory card game.<br>
        To start new game click "Get cards"!
      </p>
      <img alt="Rick and Morty gif"
          src="assets/img/rick-and-mortyj.gif" class="game-end__gif">
    </section>
  </div>
</template>

<script>
import Card from "../compontents/Card";
import Filter from "../compontents/Filter";
import Timers from "../compontents/Timers";

import axios from "axios";
import { ref, computed } from "vue";

export default {
  components: { Timers, Filter, Card },
  layout: ['default'],
  setup(context) {
    let charactersData = ref({});
    let cards = ref([]);
    let loading = ref(false);
    let cardsCopyArray = ref([]);

    let gameEnded = ref(false);

    let debounceTimeout;
    const DEBOUNCE_TIMEOUT = 800;

    const cardsFlipped = computed(() => {
      return cards.value.map(card => (card.flipped === true ? card : null)).filter(Boolean);
    })
    const cardsOpen = computed(() => {
      return cards.value.map(card => (card.open === true ? card : null)).filter(Boolean).length;
    })

    const shuffleCards = () => {
      cards.value.forEach(el => {
        el.flipped = false;
        el.open = false;
      })

      for (let i = cards.value.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards.value[i], cards.value[j]] = [cards.value[j], cards.value[i]];
      }
    }

    const flipCard = () => {
      if (cardsFlipped.value.length === 2) {
        let id1 = Number(cardsFlipped.value[0].id.split('.')[0]);
        let id2 = Number(cardsFlipped.value[1].id.split('.')[0]);
        if (id1 === id2) {
          cardsFlipped.value[0].open = true;
          cardsFlipped.value[1].open = true;
        }
      }

      // back flip

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      debounceTimeout = setTimeout(() => {
        cardsFlipped.value.forEach(el => el.flipped = false)
      }, DEBOUNCE_TIMEOUT);

      if (cardsOpen.value === cards.value.length) {
        gameEnded.value = true;
      }
    };

    const getCards = (params) => {
      console.log(context.$config.charactersRoute)
      let url = '/api/character';
      loading.value = true;

      if (params) {
        url+= params;
      }

      axios.get(url)
          .then(res => {
            gameEnded.value = false;

            cards.value = res.data.results.slice(0, 8);
            cards.value.forEach(el => {
              let elCopy = JSON.parse(JSON.stringify(el));
              elCopy.id += '.1'
              cardsCopyArray.value.push(elCopy)
            })
            cards.value = cards.value.concat(cardsCopyArray.value);
            cards.value.forEach(el => {
              el.flipped = false;
              el.open = false;
              el.id = String(el.id);
            });

            shuffleCards();
          })
          .catch(e => console.log(e))
          .finally(() => {
            loading.value = false;
            window.scrollTo({
              top: 150,
              behavior: 'smooth'
            });
          })
    }

    return {
      charactersData,
      cards,
      cardsFlipped,
      loading,
      cardsOpen,
      gameEnded,

      getCards,
      flipCard,
      shuffleCards,
    }
  },
};
</script>