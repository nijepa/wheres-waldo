import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scores: [],
    newScore: ''
  },
  mutations: {
    GET_SCORE(state, score){
        state.newScore =  score
    },
    ADD_SCORE(state){
        state.scores.push({
            body: state.newScore,
            completed: false
        })
    },
    EDIT_SCORE(state, score){
        var scores = state.scores
        scores.splice(scores.indexOf(score), 1)
        state.scores = scores
        state.newScore = score.body
    },
    REMOVE_SCORE(state, score){
        var scores = state.scores
        scores.splice(scores.indexOf(score), 1)
        
    },
    COMPLETE_SCORE(state, score){
        score.completed = !score.completed
    },
    CLEAR_SCORE(state){
        state.newScore = ''
    }
  },
  actions: {
    getScore({commit}, score){
        commit('GET_SCORE', score)
    },
    addScore({commit}){
        commit('ADD_SCORE')
    },
    editScore({commit}, score){
        commit('EDIT_SCORE', score)
    },
    removeScore({commit}, score){
        commit('REMOVE_SCORE', score)
    },
    completeScore({commit}, score){
        commit('COMPLETE_SCORE', score)
    },
    clearScore({commit}){
        commit('CLEAR_SCORE')
    }

  },
  getters: {
    newScore: state => state.newScore,
    scores: state => state.scores.filter((score) => {return !score.completed}),
    completedscores: state => state.scores.filter((score) => {return score.completed})
}

})
