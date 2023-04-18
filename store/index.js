
export const state = () => ({
  bondedTokens: 0
})

export const getters = {
  getBondedTokens(state){
    return state.bondedTokens
  },
}

export const mutations = {
  setBondedTokens(state, payload){
    state.bondedTokens = payload
  } 
}

export const actions = {
  async setBondedTokens(context, payload){
    context.commit('setBondedTokens', payload)
  }
}