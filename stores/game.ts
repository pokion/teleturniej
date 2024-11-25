export const useMyGameStore = defineStore({
  id: 'myGameStore',
  state: () => ({ tournamentID: 0 }),
  presist: true,
  actions: {
    setTournamentID(id: string | number){
      this.tournamentID = id;
    }
  }
})

if(import.meta.hot){
  import.meta.hot.accept(acceptHMRUpdate(useMyGameStore, import.meta.hot))
}