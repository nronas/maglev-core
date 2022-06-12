export default (services) => ({
  fetchSite({ commit }, locally) {
    services.site.find(locally).then((site) => {
      const { style, ...rawSite } = site
      services.api.setSiteHandle(site.handle)
      commit('SET_SITE', rawSite)
      commit('SET_STYLE', style)
    })
  },
  loadPublishButtonState({ commit }) {
    services.site
      .getLastPublication()
      .then((data) => commit('SET_PUBLISH_BUTTON_STATE', data))
  },
  async publishSite({ commit }) {
    services.site
      .publish()
      .then((data) => commit('SET_PUBLISH_BUTTON_STATE', data))
  },
  pollLastPublication({ dispatch }) {
    dispatch('loadPublishButtonState')
    setInterval(() => dispatch('loadPublishButtonState'), 5000)
  },
  previewStyle({ getters, state: { previewDocument } }, newStyle) {
    services.inlineEditing.previewStyle(
      previewDocument,
      getters.content,
      newStyle,
    )
  },
  setStyle({ commit }, newStyle) {
    commit('SET_STYLE', newStyle)
  },
})
