<template>
  <form class="filter">
    <div class="filter__wr">
      <select v-model="nameSelected" class="select">
        <option v-for="name in names" :key="name">
          {{ name }}
        </option>
      </select>
      <select v-model="genderSelected" class="select">
        <option v-for="gender in genders" :key="gender">
          {{ gender }}
        </option>
      </select>
      <select v-model="statusSelected" class="select">
        <option v-for="status in statuses" :key="status">
          {{ status }}
        </option>
      </select>
      <select v-model="speciesSelected" class="select">
        <option v-for="species in species" :key="species">
          {{ species }}
        </option>
      </select>
    </div>
    <button @click.prevent="getCards"
            class="btn btn--purple filter__btn">
      <span v-if="cardsLength">New game</span>
      <span v-else>Get cards</span>
    </button>
  </form>
</template>
<script>

import { toRef, ref } from "vue";

export default {
  name: 'Filter',
  props: ['data', 'cardsLength'],
  setup(props, context) {
    let data = toRef(props.data);
    let cardsLength = toRef(props.cardsLength)

    let species = ref([
          'Species', 'human', 'alien'
        ]),
        genders = ref([
          'Gender', 'female', 'male', 'unknown', 'genderless'
        ]),
        statuses = ref([
          'Status', 'alive', 'dead', 'unknown'
        ]),
        names = ref([
          'Name', 'Rick', 'Morty', 'Jerry',
        ]),

        statusSelected = ref('Status'),
        speciesSelected = ref('Species'),
        genderSelected = ref('Gender'),
        nameSelected = ref('Name');

    const getCards = () => {
      let params = '?page=1';

      if (statusSelected.value !== 'Status') {
        params += '&status=' + statusSelected.value
      }
      if (nameSelected.value !== 'Name') {
        params += '&name=' + nameSelected.value
      }
      if (genderSelected.value !== 'Gender') {
        params += '&gender=' + genderSelected.value
      }
      if (speciesSelected.value !== 'Species') {
        params += '&species=' + speciesSelected.value
      }

      context.emit('getCards', params);
    }

    return {
      getCards,

      data,
      cardsLength,

      names,
      statuses,
      species,
      genders,

      statusSelected,
      speciesSelected,
      genderSelected,
      nameSelected
    }
  }
}
</script>