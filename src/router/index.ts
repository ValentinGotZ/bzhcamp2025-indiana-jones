import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/player-info',
      name: 'player-info',
      component: () => import('../pages/PlayerInfoPage.vue'),
    },
    {
      path: '/game/:playerId',
      name: 'game',
      component: () => import('../pages/GamePage.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'leaderboard',
      component: () => import('../pages/LeaderboardPage.vue'),
    },
  ],
})

export default router
