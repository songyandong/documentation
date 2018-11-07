<template>
  <div class="page">
    <slot name="top"/>

    <Content :custom="false"/>

    <div class="page-edit">
      <div
        class="edit-link"
        v-if="editLink"
      >
        <a
          :href="editLink"
          target="_blank"
          rel="noopener noreferrer"
        >{{ editLinkText }}</a>
        <OutboundLink/>
      </div>

      <div
        class="last-updated"
        v-if="lastUpdated"
      >
        <span class="prefix">{{ lastUpdatedText }}: </span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </div>

    <div class="page-nav" v-if="prev || next">
      <p class="inner">
        <span
          v-if="prev"
          class="prev"
        >
          ←
          <router-link
            v-if="prev"
            class="prev"
            :to="prev.path"
          >
            {{ prev.title || prev.path }}
          </router-link>
        </span>

        <span
          v-if="next"
          class="next"
        >
          <router-link
            v-if="next"
            :to="next.path"
          >
            {{ next.title || next.path }}
          </router-link>
          →
        </span>
      </p>
    </div>

    <footer class="page-footer">
        <div class="page-footer-content">
            <section class="copyright">
              <img src="/logo_gray.png" class="page-footer-logo" alt="logo">
              <div class="line-sep"></div>
              <span class="page-footer-copyright">Copyright &copy; {{ new Date().getFullYear() }} PPIO Inc.  All Rights Reserved.</span>
            </section>
            <nav class="page-footer-nav">
              <!-- <a class="social-link-fb" href="https://www.facebook.com/PPIO-178595523020994/" target="_blank" rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"/>
                </svg>
              </a> -->
              <a class="social-link-tw" href="https://twitter.com/PPLabs_PPIO" target="_blank" rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z" />
                </svg>
              </a>
              <a href="https://medium.com/@ppio" class="social-link-medium" target="_blank" rel="noopener">
                <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path d="M512 1024C229.21216 1024 0 794.78784 0 512S229.21216 0 512 0 1024 229.21216 1024 512 794.78784 1024 512 1024z m274.432-353.15712h-21.42208c-4.01408 0-8.192-2.048-12.53376-6.144-4.3008-4.13696-6.47168-8.11008-6.47168-11.91936V372.81792c0-3.76832 2.21184-8.02816 6.63552-12.6976 4.42368-4.66944 8.56064-6.9632 12.36992-6.9632h21.42208V286.72h-202.1376l-67.25632 260.87424h-1.8432L448.512 286.72H245.76v66.43712h20.80768c4.21888 0 8.6016 2.33472 12.98432 6.9632 4.42368 4.66944 6.63552 8.88832 6.63552 12.6976v279.9616c0 3.80928-2.21184 7.7824-6.63552 11.8784-4.42368 4.13696-8.76544 6.18496-12.98432 6.18496H245.76V737.28h162.32448v-66.43712h-40.7552V376.66816h2.37568L463.2576 737.28h73.3184l94.74048-360.61184h1.80224v294.17472h-40.42752V737.28h193.7408v-66.43712z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UCFRyuBY-PxoSaFmj5Evs5kQ" class="social-link-youtube" target="_blank" rel="noopener">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path d="M624.99264 710.848l0 120.576q0 38.272-22.272 38.272-13.152 0-25.728-12.576l0-172q12.576-12.576 25.728-12.576 22.272 0 22.272 38.272zM818.14464 711.424l0 26.272-51.424 0 0-26.272q0-38.848 25.728-38.848t25.728 38.848zM266.14464 586.848l61.152 0 0-53.728-178.272 0 0 53.728 60 0 0 325.152 57.152 0 0-325.152zM430.72064 912l50.848 0 0-282.272-50.848 0 0 216q-17.152 24-32.576 24-10.272 0-12-12-0.576-1.728-0.576-20l0-208-50.848 0 0 223.424q0 28 4.576 41.728 6.848 21.152 33.152 21.152 27.424 0 58.272-34.848l0 30.848zM675.87264 827.424l0-112.576q0-41.728-5.152-56.576-9.728-32-40.576-32-28.576 0-53.152 30.848l0-124-50.848 0 0 378.848 50.848 0 0-27.424q25.728 31.424 53.152 31.424 30.848 0 40.576-31.424 5.152-15.424 5.152-57.152zM868.99264 821.728l0-7.424-52 0q0 29.152-1.152 34.848-4 20.576-22.848 20.576-26.272 0-26.272-39.424l0-49.728 102.272 0 0-58.848q0-45.152-15.424-66.272-22.272-29.152-60.576-29.152-38.848 0-61.152 29.152-16 21.152-16 66.272l0 98.848q0 45.152 16.576 66.272 22.272 29.152 61.728 29.152 41.152 0 61.728-30.272 10.272-15.424 12-30.848 1.152-5.152 1.152-33.152zM521.56864 300l0-120q0-39.424-24.576-39.424t-24.576 39.424l0 120q0 40 24.576 40t24.576-40zM932.41664 729.152q0 133.728-14.848 200-8 33.728-33.152 56.576t-58.272 26.272q-105.152 12-317.152 12t-317.152-12q-33.152-3.424-58.56-26.272t-32.864-56.576q-14.848-64-14.848-200 0-133.728 14.848-200 8-33.728 33.152-56.576t58.848-26.848q104.576-11.424 316.576-11.424t317.152 11.424q33.152 4 58.56 26.848t32.864 56.576q14.848 64 14.848 200zM362.14464 0l58.272 0-69.152 228 0 154.848-57.152 0 0-154.848q-8-42.272-34.848-121.152-21.152-58.848-37.152-106.848l60.576 0 40.576 150.272zM573.56864 190.272l0 100q0 46.272-16 67.424-21.152 29.152-60.576 29.152-38.272 0-60-29.152-16-21.728-16-67.424l0-100q0-45.728 16-66.848 21.728-29.152 60-29.152 39.424 0 60.576 29.152 16 21.152 16 66.848zM764.99264 97.728l0 285.152-52 0 0-31.424q-30.272 35.424-58.848 35.424-26.272 0-33.728-21.152-4.576-13.728-4.576-42.848l0-225.152 52 0 0 209.728q0 18.848 0.576 20 1.728 12.576 12 12.576 15.424 0 32.576-24.576l0-217.728 52 0z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/ppio/" class="social-link-linkedin" target="_blank" rel="noopener">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path d="M896 64H127.8C92.6 64 64 93 64 128.6v766.8C64 931 92.6 960 127.8 960H896c35.2 0 64-29 64-64.6V128.6c0-35.6-28.8-64.6-64-64.6zM334.8 832H202V404.4h133V832z m-66.4-486c-42.6 0-77-34.6-77-77S225.8 192 268.4 192c42.4 0 77 34.6 77 77 0 42.6-34.4 77-77 77z m564.2 486h-132.8V624c0-49.6-1-113.4-69-113.4-69.2 0-79.8 54-79.8 109.8V832h-132.8V404.4h127.4v58.4h1.8c17.8-33.6 61.2-69 125.8-69 134.4 0 159.4 88.6 159.4 203.8V832z"/>
                </svg>
              </a>
              <a href="https://github.com/ppio" class="social-link-github" target="_blank" rel="noopener">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path d="M338.048 349.248"/>
                  <path d="M521.024 82.112c-244.224 0-442.176 197.952-442.176 442.176 0 202.304 135.872 372.864 321.344 425.472 7.424-7.424 19.328-9.152 25.344-21.952 11.392-24.192 0.064-59.072 4.16-94.848-59.584 11.904-105.92-1.728-128.512-39.168-10.112-16.768-12.608-36.608-24.896-51.52-12.16-14.912-31.616-16.896-37.312-37.056 73.856-17.792 76.608 75.968 142.976 78.272 20.288 0.768 30.848-5.888 49.728-10.304 5.248-23.36 16.256-40.832 32.576-53.184l-0.896 0 0.576-0.576c-125.632-22.4-178.112-99.2-178.112-190.464 0-44.16 14.592-84.928 43.2-117.952-18.176-54.208 1.728-100.48 4.416-107.328 51.968-4.672 105.92 37.12 110.144 40.448 29.568-7.936 63.296-12.224 100.992-12.224 37.952 0 71.808 4.416 101.504 12.416 10.112-7.616 60.224-43.584 108.48-39.168 2.56 6.976 22.016 52.096 4.928 105.6 28.992 32.96 43.712 73.984 43.712 118.4 0 91.456-52.736 168.384-178.816 190.464l0.384 0.384-1.088 0c6.912 13.312 17.536 21.376 24.32 36.736 3.328 7.552 4.544 14.592 5.568 20.608 7.424 44.352-7.04 101.952 0.32 152.384 0.64 4.544 1.6 9.792 3.008 15.552 177.792-57.28 306.432-224.128 306.432-420.928C963.264 280.128 765.248 82.112 521.024 82.112z"/>
                </svg>
              </a>
            </nav>
        </div>
    </footer>

    <slot name="bottom"/>
  </div>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'

export default {
  props: ['sidebarItems'],

  computed: {
    lastUpdated () {
      if (this.$page.lastUpdated) {
        return new Date(this.$page.lastUpdated).toLocaleString(this.$lang)
      }
    },

    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

    prev () {
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },

    next () {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },

    editLink () {
      if (this.$page.frontmatter.editLink === false) {
        return
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }
      if (docsRepo && editLinks) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, path)
      }
    },

    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      )
    }
  },

  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : repo
        return (
          base.replace(endingSlashRE, '') +
           `/${docsBranch}` +
           (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
           path +
           `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`

      return (
        base.replace(endingSlashRE, '') +
        `/edit/${docsBranch}` +
        (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
        path
      )
    }
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items, offset) {
  const res = []
  items.forEach(item => {
    if (item.type === 'group') {
      res.push(...item.children || [])
    } else {
      res.push(item)
    }
  })
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === page.path) {
      return res[i + offset]
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'
@require './styles/wrapper.styl'

.page
  padding-bottom 1.5rem

.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto
  .edit-link
    display inline-block
    a
      color lighten($textColor, 25%)
      margin-right 0.25rem
  .last-updated
    float right
    font-size 0.9em
    .prefix
      font-weight 500
      color lighten($textColor, 25%)
    .time
      font-weight 400
      color #aaa

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0
  .inner
    min-height 2rem
    margin-top 0
    border-top 1px solid $borderColor
    padding-top 1rem
    overflow auto // clear float
  .next
    float right

.page-footer
  max-width: 740px
  margin: 0 auto
  padding-top 1.5rem
  padding-bottom 0px
  border-top 1px solid #eee
  .page-footer-content
    color #666
    display flex
    flex-wrap wrap
    justify-content space-between
    align-items center
  .copyright
    vertical-align middle
  a
    color inherit
  .page-footer-logo
    height 20px
    vertical-align middle
    margin-right 20px
  .line-sep
    display: inline-block;
    width: 1.5px;
    background-color: #ddd;
    vertical-align: middle;
    height: 20px;
  .page-footer-copyright
    display inline-block
    margin-left 20px
    font-size 14px
  .page-footer-nav
    display flex
    a
      margin-left 16px;
      &:hover svg
        fill #666
    svg
      height 1.4rem
      fill #999
    .social-link-fb svg
      height 1.2rem

@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom .5rem
    .last-updated
      font-size .8em
      float none
      text-align left
@media (max-width: $MQNarrow)
  .page-footer
    text-align center
    .line-sep
      display none
    .page-footer-copyright
      display block
      margin-top 15px;
      margin-bottom 15px;
    .page-footer-content
      display block
    .page-footer-nav
      display block

</style>
