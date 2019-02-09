<template>
<transition>
	<div class="user-center">
		<router-link to="/recommend" tag="div" class="back">
			<i class="icon-back"></i>
		</router-link>
		<div class="swithes-wrapper">
			<switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
		</div>
		<div class="play-btn" @click="random">
		  <i class="icon-play"></i>
		  <span class="text">随机播放</span>
		</div>
		<div class="list-wrapper" ref="listwrapper">
		<scroll ref="favoriteList" v-if="currentIndex===0" class="list-scroll" :data="favoriteList">
            <div class="list-inner">
              <song-list :songs="favoriteList" @select="selectSong">
              </song-list>
            </div>
          </scroll>
          <scroll ref="playList" v-if="currentIndex===1" class="list-scroll" :data="playHistory">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong">
              </song-list>
            </div>
          </scroll>

		</div>
                  <div class="no-result-wrapper" v-show="noResult">
			<no-result :title="noResultDesc"></no-result>
		</div>
	</div>
</transition>
</template>

<script>
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import Song from 'common/js/song'
import NoResult from 'base/no-result/no-result'
import {mapGetters,mapActions} from 'vuex'
import {playlistMixin} from 'common/js/mixin'
	export default{
		name:'UserCenter',
		mixins:[playlistMixin],
		data(){
			return{
				currentIndex:0,
				switches:[
					{name:'我喜欢的'},
					{name:'最近听的'},
				]
			}
		},
		computed:{
			noResult(){
				if(this.currentIndex ===0){
					return !this.favoriteList.length
				}
				else{
					return !this.playHistory.length
				}
			},
			noResultDesc(){
				if(this.currentIndex ===0){
					return '暂无收藏歌曲'
				}
				else{
					return '你还没听过歌曲，快去听听吧'
				}
			},
			...mapGetters([
				'favoriteList',
				'playHistory'
			])
		},
		methods:{
			handlePlaylist(playlist){
				const bottom = playlist.length>0? '60px':''
				this.$refs.listwrapper.style.bottom=bottom
				this.$refs.favoriteList && this.$refs.favoriteList.refresh()
				this.$refs.PlayList && this.$refs.playList.refresh()
			},
			switchItem(index){
				this.currentIndex=index
			},
			selectSong(song){
			this.insertSong(new Song(song))
		},
		random(){
			let list=this.currentIndex === 0? this.favoriteList : this.playHistory
			if(list.length ===0){
				return
			}
			list = list.map((song)=>{
				return new Song(song)
			})
			this.randomPlay({
				list
			})
		},
		...mapActions([
			'insertSong',
			'randomPlay'
		])
		},
		components:{
			Switches,
			Scroll,
			SongList,
			NoResult
		}
		
	}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.user-center
 position:fixed
 top:0
 bottom:0
 z-index:100
 width:100%
 background:$color-background
.back
 position:absolute
 top:0
 left:6px
 z-index:50
.icon-back
 display:block
 padding:10px
 font-size:$font-size-large
 color:$color-theme
.swithes-wrapper
 margin:10px 0 30px 0
.play-btn
 box-sizing:border-box
 width:135px
 padding:7px 0
 margin:0 auto
 border:1px solid $color-text-l
 text-align:center
 border-radius:100px
.icon-play,
.text
 color:#ccc
 font-size:$font-size-small
</style>