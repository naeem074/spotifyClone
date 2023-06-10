import { reducerCases } from "./Constants";

// initial state
export const initialState = {
  token: null,
  userInfo: null,
  playlists: [],
  currentPlaying: null,
  playerState: false,
  selectedPlaylist: null,
  selectedPlaylistId: "0qMhd4mIaKCk9PEkqPHpBE",
  deviceId: '24530AC6-3FC7-41BF-BA79-2EDA15A0C532',
  headerBackground: false,
  navBackground: false,
  searchSongs: null,
  downloadSong: null,
};

// reducers cases
const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case reducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };
    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case reducerCases.SET_HEADER_BACKGROUND:
      return {
        ...state,
        headerBackground: action.headerBackground,
      };
    case reducerCases.SET_NAV_BACKGROUND:
      return {
        ...state,
        navBackground: action.navBackground,
      };
    case reducerCases.SEARCH_SONGS:
      return {
        ...state,
        searchSongs: action.searchSongs,
      };
    case reducerCases.DOWNLOAD_SONG:
      return {
        ...state,
        downloadSong: action.downloadSong,
      };
    default:
      return state;
  }
};

export default reducer;
