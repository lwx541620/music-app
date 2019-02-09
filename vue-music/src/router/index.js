import Vue from 'vue'
import Router from 'vue-router'
/*import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Single from 'components/single/single'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'
import TopList from 'components/top-list/top-list'
import UserCenter from 'components/user-center/user-center'*/

Vue.use(Router)

const Recommend = () => import('components/recommend/recommend')
const Single = () => import('components/single/single')
const Rank = () => import('components/rank/rank')
const Search = () => import('components/search/search')
const SingerDetail = () => import('components/singer-detail/singer-detail')
const Disc = () => import('components/disc/disc')
const TopList = () => import('components/top-list/top-list')
const UserCenter = () => import('components/user-center/user-center')

/*export const routes=[

{
  name: 'rank',
  path: '/rank',
  component: () => import('components/rank/rank')
},
{
  name: 'recommend',
  path: '/recommend',
  component: () => import('components/recommend/recommend')
},
{
  name: 'search',
  path: '/search',
  component: () => import('components/search/search')
},
{
  name: 'single',
  path: '/single',
  component: () => import('components/single/single')
}
]*/


export default new Router({

    routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
     path: '/recommend',
     component: Recommend,
      children:[{
      	path:':id',
      	component:Disc
      }]
    },
    {
     path: '/rank',
     component: Rank,
     children:[{
     	 path:':id',
     	 component:TopList
     }]
    },
    {
     	path:'/single',
     	component:Single,
     	children:[{
     		path:':id',
     		component:SingerDetail
     	}]
     },
    {
     path: '/search',
     component: Search,
     children:[{
     	 	path:':id',
     		component:SingerDetail
     }]
    },
    {
    	path:'/user',
    	component:UserCenter
    }
    ]
})
