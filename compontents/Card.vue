<template>
  <article class="card" @click="flipCard"
           :class="{'flipped': cardFlipped, 'open': cardOpen}">
    <div class="card__inner">
      <img :src="card.image"
           class="card-face card-face--front"
           alt="Character image"/>
      <div class="card-face card-face--back">
        ?
      </div>
    </div>
  </article>
</template>
<script>

import { toRef } from "vue";

export default {
  name: 'Card',
  props: ['card', 'cardFlipped', 'cardOpen'],
  setup(props, context) {
    let card = toRef(props, 'card');
    let cardFlipped = toRef(props, 'cardFlipped');
    let cardOpen = toRef(props, 'cardOpen');

    const flipCard = () => {
      context.emit('flipCard', card.value.id);
    }

    return {
      card,

      cardFlipped,
      cardOpen,

      flipCard
    }
  }
}
</script>