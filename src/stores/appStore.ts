import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import signedInUserReducer from './signedInUserSlice'

const store = configureStore({
    reducer: {
      signedInUser: signedInUserReducer
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector