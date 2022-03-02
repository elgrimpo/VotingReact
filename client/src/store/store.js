import { configureStore } from "@reduxjs/toolkit";
import initiativesReducer from './initiatives/initiativesSlice'
import groupsReducer from './groups/groupsSlice'
import usersReducer from './users/usersSlice'
import communitiesReducer from './communities/communitiesSlice'
import channelsReducer from './channels/channelsSlice'
import {fetchInitiatives} from './initiatives/initiativesSlice'


export const store = configureStore({
  reducer: {
    initiatives: initiativesReducer,
    groups: groupsReducer,
    users: usersReducer,
    communities: communitiesReducer,
    channels: channelsReducer,
  }
});

store.dispatch(fetchInitiatives());