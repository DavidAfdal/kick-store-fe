import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LikesModel } from '../../models/likerModels';

export interface LikeState {
  like: LikesModel[];
}

const likeSlice = createSlice({
  name: 'like',
  initialState: { like: [] } as LikeState,
  reducers: {
    addItem: (state, action: PayloadAction<LikesModel>) => {
      state.like.push({ ...action.payload, like: true });
    },
    toggleLike: (state, action: PayloadAction<number | undefined>) => {
      const itemId = action.payload;
      const item = state.like.find((item) => item.id === itemId);
      if (item) {
        item.like = !item.like;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.like.filter((item) => item.id !== action.payload);
      state.like = removeItem;
    },
  },
});

export const likeReducer = likeSlice.reducer;
export const { addItem, toggleLike, removeItem } = likeSlice.actions;
