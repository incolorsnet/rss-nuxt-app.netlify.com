<template lang="pug">
section.p_note_mu(v-if="$store.state.jsonData[0]")
  .c_inner
    .p_github
      ul.p_github-list.c_col.u_col-jc-r
        li.p_github-item
          a(href="https://github.com/incolorsnet/rss-nuxt-app.netlify.com", target="_blank", rel="noopener noreferrer") ソースコードはこちら (GitHub)
        li.p_github-item
          a(href="", target="_blank", rel="noopener noreferrer") コードの詳細を書いた記事はこちら (note)
    .p_note_mu-header._fade.fade_in.scale
      h1.p_note_mu-heading
        span.-text note
        span.-small のくらさんの記事一覧
    .p_note_mu-body
      .p_note_mu-list.c_col.u_col-wrap
        a.p_nt._fade.fade_in.scale(v-for="post, index in $store.state.jsonData[0].note.items",
          :href="post.link[0]",
          target="_blank",
          v-touch:tap)
          article.p_nt-inner
            .p_nt-mv
              img(:src="post.thumb[0]", :alt="post.title[0]", v-if="post.thumb")
              .no-image.c_col-c(v-else)
                .no-image-text NO IMAGE
            .p_nt-body
              .p_nt-body-header
                .p_nt-body-date
                  p(v-html="getTheDate(post.pubDate[0])")
                .p_nt-body-heading.c_col.u_col-ai-c
                  h3.p_nt-body-heading-text(v-html="post.title[0]")
              .p_nt-body-button.c_basic_button.c_basic_button-tiny.c_basic_button-reverse(v-touch:tap)
                p.p_nt-body-button-text.c_basic_button-text 続きを読む
    .p_note_mu-footer._fade.fade_in.scale
      .p_note_mu-footer-more
        a.c_basic_button.c_basic_button-fit(:href="$store.state.jsonData[0].note.url", target="_blank", ref="noreferrer noopener", v-touch:tap)
          span.c_basic_button-text もっと読む
          i.c_basic_button-arrow-r
            span.-arr.c_arrow_base.u_rotate-45-r
</template>

<script>
import moment from 'moment'
export default {
  methods: {
    getTheDate(date) {
      return moment(date).format('YYYY.MM.DD (ddd)')
    }
  }
}
</script>

<style lang="scss">
.p_github {
  padding: rem(10) 0 rem(50);

  &-list {
  }

  &-item {
    text-align: right;

    a {
      font-size: rem(12);
      text-decoration: underline;
      line-height: 2;
      display: block;
      padding: rem(10) rem(8);
    }
  }
}
.p_note_mu {
  padding: 0 0 rem(80);

  &-header {
  }
  &-heading {
    text-align: center;

    .-text {
      @include fo_google();
      font-weight: 600;
      font-size: rem(32);
      letter-spacing: $ltsp;
    }
    .-small {
      font-size: rem(15);
      letter-spacing: $ltsp;
      display: block;
      margin: rem(10) 0 0;
    }
  }
  &-body {
    margin: rem(40) 0 0;
  }
  &-list {
  }
  &-item {
  }

  .p_nt {
    @include pc {
      width: cal(300, 950);
      min-width: cal(300, 950);
      margin: 0 0 cal(25, 950) cal(25, 950);

      &:nth-child(3n + 1) {
        margin: 0 0 cal(25, 950) 0;
      }
    }
    @include sp {
      width: cal(50, 105);
      min-width: cal(50, 105);
      margin: 0 0 cal(5, 105) cal(5, 105);

      &:nth-child(2n + 1) {
        margin: 0 0 cal(5, 105) 0;
      }
    }
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    padding: 0 0 40px;
    background: $palet1;
    display: block;

    &-inner {
      display: block;
    }

    &-mv {
      width: 100%;
      height: 0;
      padding: 0 0 cal(185, 300);
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        object-fit: cover;
        position: 50%;
        transition: filter $transition_sec linear,
          transform $hover_scale_transition ease;
      }

      .no-image {
        width: 100%;
        height: 100%;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #fff;
        transition: all 0.2s linear;

        &-text {
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 0.3em;
        }
      }
    }

    &.tap .p_nt-mv {
      img {
        transform: scale(1.02);
        filter: grayscale(100%);
        backface-visibility: hidden;
      }

      .no-image {
        filter: blur(3px);
      }
    }

    &-body {
      @include sp {
        padding: 0 10px;
      }
      @include pc {
        padding: 0 20px;
      }

      &-header {
        margin: 0 0 15px;
        padding: 0 5px;
      }

      &-date {
        color: $color;
        font-size: 13px;
        display: block;
        margin: 15px 0 0;
      }

      &-heading {
        min-height: 3em;

        &-text {
          color: $color;
          font-size: 14px;
          font-weight: bold;
          line-height: 1.6;
        }
      }

      &-button {
        @include sp {
          width: calc(100% - 25px);
        }
        @include pc {
          width: calc(100% - 40px);
        }
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        bottom: 15px;

        &-text {
          font-size: 12px;
        }
      }
    }
  }

  &-footer {
    margin: rem(15) 0 0;

    &-more {
      width: 100%;
      max-width: rem(620);
      margin: 0 auto;
    }
  }
}
</style>
