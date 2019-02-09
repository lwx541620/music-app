<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(item,index) of dots" :class="{active:currentPageIndex===index}">
			</span>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'

	export default{
		name:'Slider',
		data (){
			return{
				dots:[],
				currentPageIndex:0
			}
		},

		props:{
			loop:{
				type:Boolean,
				default:true
			},
			autoPlay:{
				type:Boolean,
				default:true

			},
			interval:{
				typa:Number,
				default:4000
			}
		},
		mounted(){
			setTimeout(()=>{
				this._setSliderWidth(),
				this._initDots(),
				this._initSlider()
                  
                  if(this.autoPlay){
                  	this._play()
                  }
			}, 20)
		},
		methods:{
			_setSliderWidth(){
				this.children=this.$refs.sliderGroup.children  /*获取所有子元素*/
				/*console.log(this.children.length);*/
				let width=0
				let sliderWidth=this.$refs.slider.clientWidth
				for(let i=0;i<this.children.length;i++){
					let child=this.children[i]  /*获取到每个子元素*/
					addClass(child,'slider-item')
					
					child.style.width=sliderWidth+ 'px'
					width+=sliderWidth
				}
				if(this.loop){
					width+=2*sliderWidth
				}
				this.$refs.sliderGroup.style.width=width+'px'
			},
			_initDots(){
				this.dots=new Array(this.children.length)
			},
			_initSlider(){
				this.slider=new BScroll(this.$refs.slider,{
					scrollX:true,
					scrollY:false,
					momentum:false,
					snap:{
						loop:this.loop,
						threshold:0.3,
						speed:400,
						click:true
					},
					click:true
				})
				this.slider.on('scrollEnd',()=>{
					let pageIndex = this.slider.getCurrentPage().pageX
					
					this.currentPageIndex=pageIndex
					 if(this.autoPlay){
					 	clearTimeout(this.timer)
                  	this._play();
                  }
				})
			},
			_play(){
				let pageIndex = this.currentPageIndex+1
			
				this.timer=setTimeout(()=>{
					this.slider.next(pageIndex,0,400)
				},this.interval)

			}
		},
		destroyed(){
			clearTimeout(this.timer)
		}
		
	}
</script>

<style lang="stylus" scoped>
.slider
 min-height:1px
 .slider-group
  position:relative
  overflow:hidden
  white-space:nowrap
  .slider-item
   float:left
   overflow:hidden
   box-sizing:border-box
   text-align:center
   .a
    display:block
    overflow:hidden
    width:100%
    text-decoration:none
    .img
     display:block
     width:100%
     height:100%
.dots
 position:absolute
 right:0
 left:0
 bottom:10px
 text-align:center
 transform: translateZ(1px)

 .dot
  display: inline-block
  margin: 0 4px
  width: 8px
  height: 8px
  border-radius: 50%
  background:white
	 &.active
	  width:20px
	  border-radius:30%
	  background: red
</style>