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
import MyPageEdit from './pages/MyPage/MyPageEdit'
import AddEpisode from './pages/AddEpisode/AddEpisode'
import Search from './pages/Search/Search'
import Recommend from './pages/Recommend/Recommend'
import Analysis from './pages/Analysis/Analysis'
import Like from './pages/Like/Like'
import Bookmark from './pages/Bookmark/Bookmark'
import { SelectedPlaceProvider } from './contexts/SelectedPlaceContext'
import { DiaryCoordinatesProvider } from './contexts/DiaryCoordinatesContext'
import EpisodeDetail from './pages/EpisodeDetail/EpisodeDetail'
import AnalysisAll from './pages/Analysis/AnalysisAll'
import EditEpisode from './pages/EditEpisode/EditEpisode'
import PastAnalysis from './pages/Analysis/PastAnalysis'
import MyDiaries from './pages/MyPage/MyDiaries'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DiaryCoordinatesProvider>
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
                <Route path="episode/edit" element={<EditEpisode />} />
                <Route path="episode/:episodeId" element={<EpisodeDetail />} />
                <Route path="mypage" element={<MyPage />} />
                <Route path="profileedit" element={<MyPageEdit />} />
                <Route path="mine" element={<MyDiaries />} />
                <Route path="search" element={<Search />} />
                <Route path="recommend" element={<Recommend />} />
                <Route path="likes" element={<Like />} />
                <Route path="Bookmark" element={<Bookmark />} />
                <Route path="analysis" element={<Analysis />} />
                <Route path="allanalysis" element={<AnalysisAll />} />
                <Route path="analysis/:id" element={<PastAnalysis />} />
              </Route>

              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SelectedPlaceProvider>
      </DiaryCoordinatesProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
