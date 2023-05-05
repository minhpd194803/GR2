
export const state = () => ({
  chainName: 'Cosmos',
  bondedTokens: 0,
})

export const getters = {
  getBondedTokens(state){
    return state.bondedTokens
  },
  getChainName(state){
    return state.chainName
  },
}

export const mutations = {
  setBondedTokens(state, payload){
    state.bondedTokens = payload
  },
  setChainName(state, payload){
    state.chainName = payload
  } 
}

export const actions = {
  async setBondedTokens(context, payload){
    context.commit('setBondedTokens', payload)
  },
  async setChainName(context, payload){
    context.commit('setChainName', payload)
  }
}