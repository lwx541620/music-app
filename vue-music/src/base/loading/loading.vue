<template>
	<div class="loading">
		<img width="60" height="40px" src="../../common/img/loading.gif" />
		<p class="desc">{{title}}</p>
	</div>
</template>

<script>
	export default{
		name:'Loading',
		props:{
			title:{
				type:String,
				default:'小萌神正在加速赶来....'
			}
		}
	}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.loading
 width:80px
 height:100px
 margin:0 auto

.desc
 line-height:20px
 font-size:$font-size-small
 color:$color-theme
</style>