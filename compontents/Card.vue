<template>
  <article class="card" @click="flipCard"
           :class="{'flipped': card.flipped, 'open': card.open}">
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
  props: ['card', 'cardsFlipped'],
  setup(props, context) {
    let card = toRef(props.card);

    const flipCard = () => {
      if (!card.value.open && !card.value.flipped && (props.cardsFlipped < 2)) {
        card.value.flipped = true;
        context.emit('flipCard', card)
      }
    }

    return {
      card,

      flipCard
    }
  }
}
</script>