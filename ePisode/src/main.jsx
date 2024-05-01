import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import NotFound from './pages/NotFound/NotFound'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import RequireAuth from './components/RequireAuth/RequireAuth'
import MapPage from './pages/MapPage/MapPage'
import MyPage from './pages/MyPage/MyPage'
import AddEpisode from './pages/AddEpisode/AddEpisode'
import Search from './pages/Search/Search'
import Recommend from './pages/Recommend/Recommend'
import Analysis from './pages/Analysis/Analysis'
import { SelectedPlaceProvider } from './contexts/SelectedPlaceContext'
import Like from './pages/Like/Like'
import Bookmark from './pages/Bookmark/Bookmark'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SelectedPlaceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/map"
              element={
                <RequireAuth>
                  <MapPage />
                </RequireAuth>
              }
            >
              <Route path="new" element={<AddEpisode />} />
              <Route path="mypage" element={<MyPage />} />
              <Route path="search" element={<Search />} />
              <Route path="recommend" element={<Recommend />} />
              <Route path="likes" element={<Like />} />
              <Route path="Bookmark" element={<Bookmark />} />
              <Route path="analysis" element={<Analysis />} />
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SelectedPlaceProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
