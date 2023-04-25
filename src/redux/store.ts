import {configureStore} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import dataSlice from './reducer'

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const store = configureStore({
    reducer: dataSlice
  });
  