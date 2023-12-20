import { defineStore } from 'pinia';
import {configDev} from "../config";
import axios from "axios";

export const useStore = defineStore('requests', {
    state: () => {
        return {
            signInShown: true,
        }
    },
    actions: {
        closeModal() {
            state.signInShown = false;
        }
    }
})