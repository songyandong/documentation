<template>
  <div class="home">
    <div class="banner">
      <h2 class="title">Documentation</h2>
    </div>
    <div class="guide-wrap">
      <a href="./guide/">
        <div class="guide-item">
          <h4 class="title">Get Started</h4>
          <p>PPIO is a decentralized programmable storage and delivery network. This guide introduces you to PPIO, walks you through a simple example to use PPIO for the first time.</p>
          <span class="more">detail ➡</span>
        </div>
      </a>

      <a href="./concept/">
        <div class="guide-item">
          <h4 class="title">Some Concepts in PPIO</h4>
          <p>Provides a conceptual overview of PPIO and includes detailed instructions for using the various features..</p>
          <span class="more">detail ➡</span>
        </div>
      </a>

      <a href="./wallet/">
        <div class="guide-item">
          <h4 class="title">PPIO Wallet</h4>
          <p>PPIO wallet is a decentralized blockchain-based wallet. And PPIO wallet account is your user credentials for using PPIO services.</p>
          <span class="more">detail ➡</span>
        </div>
      </a>

      <a href="./cli/">
        <div class="guide-item">
          <h4 class="title">PPIO Command Line Interface Reference</h4>
          <p>Provides information to help you use PPIO CLI - the command line interface of PPIO.</p>
          <span class="more">detail ➡</span>
        </div>
      </a>

      <a href="./api/">
        <div class="guide-item">
          <h4 class="title">PPIO JSON-RPC APi Reference</h4>
          <p>Describes all the PPIO API operations in detail. Also provides sample requests, responses, and errors for the supported web services protocols.</p>
          <span class="more">detail ➡</span>
        </div>
      </a>

      <a href="./sdk/">
        <div class="guide-item">
          <h4 class="title">PPIO SDK Guide</h4>
          <p>Here are the installation and usage guides for all of our SDKs. Currently we only have nodeJS and Android SDK.</p>
          <span class="more">detail ➡</span>
        </div>
      </a>

      <a href="./tutorial/">
        <div class="guide-item">
          <h4 class="title">Tutorial <Badge text="todo" type="warn" vertical=""/> </h4>
          <p>This is a tutorial that teaches you how to program a decentralized personal cloud storage app from 0 to 1 using Electron and PPIO.</p>
          <span class="more">detail ➡</span>
        </div>
      </a>
      <div class="guide-item" style="height:0;padding:0;border:none;margin:0;"></div>
      <div class="guide-item" style="height:0;padding:0;border:none;margin:0;"></div>
    </div>

    <FooterComponnent />
  </div>
</template>

<script>
import NavLink from './NavLink.vue'
import FooterComponnent from './Footer.vue'

export default {
  components: { NavLink, FooterComponnent },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.home
  padding $navbarHeight 2rem 0
  margin 0 auto
  .banner
    padding 1.5rem
    text-align: center
    .title
      font-size 2rem
      border-bottom none
  .guide-wrap
    font-size 0
    text-align justify
    .guide-item
      transition all ease 0.2s
      display inline-block
      box-sizing border-box
      position relative
      vertical-align top
      width 340px
      max-width 100%
      text-align left
      height 210px
      padding 20px 20px 30px 20px
      border 1px solid #eee
      margin-bottom 1.5rem
      border-radius 4px
      border: 1px solid rgba($accentColor, 0.2)
      box-shadow: 1px 1px 6px rgba($accentColor, 0.2)
      transition all ease 0.3s
      cursor pointer
      &:hover
        transform translate3d(0, -5px, 0)
        .title
          text-decoration underline
      .title
        font-weight normal
        font-size 1.2rem
        margin-top 0
        margin-bottom 0.5rem
      p
       margin 0
       line-height 1.5
       color #333
       font-size 15px
      .more
        font-size 14px
        color $accentColor
        position absolute
        height 20px
        line-height 20px
        bottom 20px
        right 20px


@media (max-width: 1120px)
  .home
    .guide-wrap
      .guide-item
        width 48%
        height 180px

@media (max-width: 710px)
  .home
    .guide-wrap
      text-align center
      .guide-item
        width 500px
        height 200px

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .guide-wrap
      text-align center
</style>
