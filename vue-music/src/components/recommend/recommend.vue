<template>
	<div class="recommend">
		<div class="loading-container" v-show="!discList.length"><loading></loading></div>
		<scroll ref="scroll" :data="discList" class="recommend-content">
			<div>
				<div v-if="recommends.length" class="slider-wrapper">
				  <slider class="slider-content">
				  	<div v-for="item in recommends">
				  		<a :href="item.linkUrl"><img :src="item.picUrl" class="slider-img"/></a>
				  	</div>
				  </slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌曲推荐</h1>
					<ul class="list-content">
						<li @click="selectItem(item)" v-for="item in discList " class="item">
							<div class="icon">
								<img v-lazy="item.imgurl" width="65" height="65"/>
							</div>
							<div class="text">
								<h4 v-html="item.creator.name" class="name"></h4>
								<p v-html="item.dissname" class="dsc"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script>
import {getRecommend,getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {mapMutations} from 'vuex'

	export default{
		name:'Recommend',
		components:{
			Slider,
			Scroll,
			Loading
		},
		data(){
			return{
				recommends:[],
				discList:[]
			}
		},
		created(){
			this._getRecommend(),
			setTimeout(()=>{
				this._getDiscList()
			},1000)
		
		},
		methods:{
                 selectItem(item){
                 
                 	this.$router.push({
                 		path:`/recommend/${item.dissid}`
                 	})
                 	this.setDisc(item)
                 },
			_getRecommend(){
				getRecommend().then((res)=>{
					if(res.code === ERR_OK){
						this.recommends=res.data.slider
					/*	console.log(res.data.slider);*/
					}
				})
			},
			_getDiscList(){
				getDiscList().then((res)=>{
					if(res.code === ERR_OK){
						this.discList=res.data.list
						/*console.log(res.data.list);*/
					}
				})
			},
			...mapMutations({
				setDisc:'SET_DISC'
			})
		}
	}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.recommend
 position:fixed
 top:75px
 width:100%
 bottom:0    /* //加上这个就可以滚动了*/
 .recommend-content
  height:100%
  overflow:hidden
  .slider-wrapper
   position:relative
   overflow:hidden
   width:100%
   height:0
   padding-top:40%
   .slider-content
    position:absolute
    top:0
    left:0
    width:100%
    height:100%
    .slider-img
     width:100%
     height:100%
.recommend-list
 .list-title
  height:65px
  line-height:65px
  text-align:center
  font-size:$font-size-large
  color:$color-theme
.list-content
 margin:0 8px
 font-size:$font-size-small

.item
 display:flex
 padding:0 10px 20px 10px 
.icon
 flex:0 0 60px
 padding-right:20px
.name
 font-size:$font-size-medium
 padding:10px 0
.dsc
 color:$color-text-d
.loading-container
 position:absolute
 left:40%
 width:100px
 top:70%
 transform:translateY(-60%)
 margin:0 auto
</style>