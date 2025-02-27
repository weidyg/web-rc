(self.webpackChunkweb_rc=self.webpackChunkweb_rc||[]).push([[860],{69061:function(k,a,l){"use strict";l.r(a),l.d(a,{default:function(){return Ya}});var f=l(55921),m=l(41424),N=function(e){return e.compat!==!0&&(e.compat=!0),function(o){for(var t=new RegExp(e.key+"-([a-zA-Z0-9-_]+)","gm"),c={html:o,ids:[],css:""},i,s={};(i=t.exec(o))!==null;)s[i[1]]===void 0&&(s[i[1]]=!0);return c.ids=Object.keys(e.inserted).filter(function(u){return(s[u]!==void 0||e.registered[e.key+"-"+u]===void 0)&&e.inserted[u]!==!0?(c.css+=e.inserted[u],!0):!1}),c}},r=l(52676),W=function(e){return{ids:Object.keys(e.inserted),css:Object.values(e.inserted).filter(function(o){return typeof o=="string"}).join("")}},U=(0,f.Df)(),R=function(e,o){var t,c=typeof(o==null?void 0:o.includeAntd)!="undefined"?o.includeAntd:!0,i=(t=o==null?void 0:o.antdCache)!==null&&t!==void 0?t:U,s=(0,f.EN)(i),u=s.replace(/<style\s[^>]*>/g,"").replace(/<\/style>/g,""),g={style:(0,r.jsx)("style",{"data-antd-version":m.Z,"data-rc-order":"prepend","data-rc-priority":"-9999",dangerouslySetInnerHTML:{__html:u}},"antd"),ids:Array.from(i.cache.keys()),key:"antd",css:u,tag:'<style data-rc-order="prepend" data-rc-priority="-9999" data-antd-version="'.concat(m.Z,'">').concat(u,"</style>")},p=l.g.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__.getCacheList().map(function(b){var x=N(b),h=e?x(e):W(b);if(!h.css)return null;var M=h.css,w=h.ids;return{key:b.key,style:(0,r.jsx)("style",{"data-emotion":"".concat(b.key," ").concat(w.join(" ")),dangerouslySetInnerHTML:{__html:M}},b.key),css:M,ids:w,tag:'<style data-emotion="'.concat(b.key," ").concat(h.ids.join(" "),'">').concat(h.css,"</style>")}});return u&&c&&p.unshift(g),p.filter(Boolean)};R.cache=U;var v=l(73474),P=l(3341),j=l.n(P),d=l(75271),E=l(24731),G=l(9987),_=l(93170),Z=l(48459),Q=["children"];function J(n,e){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter(function(c){return Object.getOwnPropertyDescriptor(n,c).enumerable})),o.push.apply(o,t)}return o}function ue(n){for(var e=1;e<arguments.length;e++){var o=arguments[e]!=null?arguments[e]:{};e%2?J(Object(o),!0).forEach(function(t){(0,E.Z)(n,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):J(Object(o)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(o,t))})}return n}var ee=function(n){var e=n.children,o=(0,G.Z)(n,Q);return(0,r.jsx)(Z.f,ue(ue({},o),{},{children:(0,r.jsx)(_.Z,{children:e})}))},le=l(87839),oe=l(15767),xe=l(66292),we=l.n(xe);function fe(n){var e=(0,d.useRef)(n);return e.current=n,e}var ne=fe,Se=function(n){return n!==null&&typeof n=="object"},me=function(n){return typeof n=="function"},je=function(n){return typeof n=="string"},he=function(n){return typeof n=="boolean"},D=function(n){return typeof n=="number"},X=function(n){return typeof n=="undefined"},te=!1,ge=te,We=function(n){ge&&(me(n)||console.error("useUnmount expected parameter is a function, got ".concat(typeof n)));var e=ne(n);(0,d.useEffect)(function(){return function(){e.current()}},[])},Ee=We;function Le(n,e){var o;ge&&(me(n)||console.error("useDebounceFn expected parameter is a function, got ".concat(typeof n)));var t=ne(n),c=(o=e==null?void 0:e.wait)!==null&&o!==void 0?o:1e3,i=(0,d.useMemo)(function(){return we()(function(){for(var s=[],u=0;u<arguments.length;u++)s[u]=arguments[u];return t.current.apply(t,(0,oe.ev)([],(0,oe.CR)(s),!1))},c,e)},[]);return Ee(function(){i.cancel()}),{run:i,cancel:i.cancel,flush:i.flush}}var Ne=Le,Re=function(n){return function(e,o){var t=(0,d.useRef)(!1);n(function(){return function(){t.current=!1}},[]),n(function(){if(!t.current)t.current=!0;else return e()},o)}},Je=null,Pe=Re(d.useEffect);function Ze(n,e,o){var t=(0,oe.CR)((0,d.useState)({}),2),c=t[0],i=t[1],s=Ne(function(){i({})},o).run;(0,d.useEffect)(function(){return s()},e),Pe(n,[c])}var Ie=Ze,C=l(3525),Ue=l(29835),He={frontmatter:{},toc:[],texts:[]},Ve=function(){var e=(0,C.AC)(),o=(0,v.MZ)(),t=function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:He;return o.meta&&Object.keys(o.meta).forEach(function(s){var u,g;(g=(u=i)[s])!==null&&g!==void 0||(u[s]=o.meta[s])}),i};(0,Ue.ZP)(o.id,v.lZ,{fallback:He,onSuccess:function(i){e.setState({routeMeta:t(i)})}})},z=["setLoading"],nt=["setLoading"],tt=typeof window!="undefined",$e={},rt=function(e,o){(0,d.useEffect)(function(){d.startTransition(function(){e()})},o)},at=function(e,o){Ie(function(){e()},o,{wait:32,maxWait:96})},lt=typeof d.startTransition=="function"?rt:at,ke=function(e,o,t){var c=(0,C.AC)(),i=t||function(s,u){return c.setState((0,E.Z)({},s,u))};!tt&&!$e[e]&&(i(e,o),$e[e]=!0),lt(function(){i(e,o)},[o])},ct={"zh-CN":"\u9996\u9875","en-US":"Home"},it=function(e){return{title:ct[e],link:"/",activePath:"/"}},st=(0,d.memo)(function(){var n=(0,v.WF)(),e=(0,v.tx)(),o=(0,v.zh)(),t=(0,v.OK)(),c=(0,v.TH)(),i=(0,v.bU)(),s=(0,C.AC)();return Ve(),ke("siteData",n,function(){var u=n.setLoading,g=(0,G.Z)(n,z),p=s.getState(),b=p.siteData,x=b.setLoading,h=(0,G.Z)(b,nt);j()(g,h)||s.setState({siteData:n})}),ke("sidebar",e),ke("location",c),ke("tabMeta",o),ke("locale",i),ke("navData",t,function(){var u=n.themeConfig.hideHomeNav?t:[it(i.id)].concat((0,le.Z)(t));s.setState({navData:u})}),null}),dt=l(34271),ut=l(71058),ce=function(){var e=ut.ZP.useBreakpoint();return(0,d.useMemo)(function(){return(0,dt.f)(e)},[e])},O=l(17586),ie=l(40863),gt=l(26362);function qe(n,e){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter(function(c){return Object.getOwnPropertyDescriptor(n,c).enumerable})),o.push.apply(o,t)}return o}function eo(n){for(var e=1;e<arguments.length;e++){var o=arguments[e]!=null?arguments[e]:{};e%2?qe(Object(o),!0).forEach(function(t){(0,E.Z)(n,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):qe(Object(o)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(o,t))})}return n}var oo=function(e){if(e.location.pathname==="/")return"/";var o=e.navData.filter(function(t){return t.link!=="/"}).find(function(t){return e.location.pathname.startsWith(t.activePath||t.link)});return(o==null?void 0:o.activePath)||(o==null?void 0:o.link)||""},no=function(e){var o,t,c=e.routeMeta,i=c.toc,s=c.frontmatter;return(o=e.tabMeta)!==null&&o!==void 0&&o.toc&&(i=e.tabMeta.toc),(t=e.tabMeta)!==null&&t!==void 0&&t.frontmatter&&(s=e.tabMeta.frontmatter),i.reduce(function(u,g){var p=function(h){if(!s.tocDepth||typeof s.tocDepth=="number"&&s.tocDepth>h-1)return!0};if(g.depth===2&&p(2))u.push(eo({},g));else if(g.depth===3&&p(3)){var b=u[u.length-1];b&&(b.children=b.children||[],b.children.push(eo({},g)))}return u},[])},to=function(e){var o;return((o=e.sidebar)===null||o===void 0?void 0:o.map(function(t){return t.children}).flat())||[]},pt=function(e){var o=to(e),t=e.location.pathname,c=o.findIndex(function(i){return i.link===t});return{prev:o[c-1],currentIndex:c,next:o[c+1]}},bt=l(97395),ro=l(90057),y=l(79697),F=l(98369),ao,lo,co,io,ft=(0,F.kc)(function(n){var e=n.token,o=n.css;return{container:o(ao||(ao=(0,y.Z)([`
    background: `,`;
    padding: 16px 24px;
    border-radius: 8px;
    cursor: pointer;

    min-width: 250px;
    &:hover {
      background: `,`;
    }
  `])),e.colorBgContainer,e.colorFillTertiary),nav:o(lo||(lo=(0,y.Z)([`
    color: `,`;
    font-size: 12px;
  `])),e.colorTextTertiary),title:o(co||(co=(0,y.Z)([`
    font-size: 16px;
  `]))),alignmentEnd:o(io||(io=(0,y.Z)([`
    justify-content: flex-end;
  `])))}}),mt=function(e){var o=e.title,t=e.link,c=e.type,i=ft(),s=i.styles,u=i.cx,g=(0,v.YB)(),p=(0,d.useMemo)(function(){switch(c){case"prev":return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(bt.Z,{})," ",g.formatMessage({id:"content.footer.actions.previous"})]});case"next":return(0,r.jsxs)(r.Fragment,{children:[g.formatMessage({id:"content.footer.actions.next"})," ",(0,r.jsx)(ro.Z,{})]})}},[c]);return(0,r.jsx)(v.rU,{to:t,children:(0,r.jsxs)(O.D,{className:s.container,gap:8,children:[(0,r.jsx)(O.D,{horizontal:!0,gap:4,className:u(s.nav,c==="next"&&s.alignmentEnd),children:p}),(0,r.jsx)(O.D,{horizontal:!0,className:u(s.title,c==="next"&&s.alignmentEnd),children:o})]})})},so=(0,d.memo)(mt);function uo(n,e){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter(function(c){return Object.getOwnPropertyDescriptor(n,c).enumerable})),o.push.apply(o,t)}return o}function go(n){for(var e=1;e<arguments.length;e++){var o=arguments[e]!=null?arguments[e]:{};e%2?uo(Object(o),!0).forEach(function(t){(0,E.Z)(n,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):uo(Object(o)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(o,t))})}return n}var ht=function(){var e=(0,C.HX)(pt,j()),o=e.prev,t=e.next,c=ce(),i=c.mobile;return(0,r.jsxs)(O.D,{horizontal:!i,gap:i?12:0,distribution:"space-between",style:{margin:i?12:0},children:[o?(0,r.jsx)(so,go({type:"prev"},o)):(0,r.jsx)("div",{}),t?(0,r.jsx)(so,go({type:"next"},t)):(0,r.jsx)("div",{})]})},kt=(0,d.memo)(ht),po,yt=(0,F.kc)(function(n){var e=n.token,o=n.responsive,t=n.isDarkMode,c=n.css;return{content:c(po||(po=(0,y.Z)([`
    min-height: 400px;
    flex: 1;
    width: 100%;
    box-sizing: border-box;

    padding: 24px 48px;
    border-radius: 10px;
    background-color: `,`;
    box-shadow: `,`;

    &:has([data-page-tabs='true']) {
      padding-top: 8px;
    }

    `,` {
      padding: 8px 16px;
      border-radius: 0;
    }

    .markdown {
      color: `,`;

      h1,
      h2,
      h3 {
        color: `,`;
      }
      p {
        line-height: 1.8;
      }

      // hyperlink
      a {
        color: `,`;

        &:hover {
          color: `,`;
        }

        &:active {
          color: `,`;
        }
      }

      img {
        max-width: 100%;

        opacity: `,`;
      }

      > [data-code-type='highlighter'] {
        pre {
          margin: 8px 0 !important;
        }
      }
      // inline code
      > :not([data-code-type='highlighter']) code {
        padding: 2px 6px;

        //FIXME: \u7B49\u4E0B\u4E00\u7248 token \u4F18\u5316\u5347\u7EA7
        color: `,`;
        background: `,`;
        border-radius: 4px;
      }

      // pre tag
      pre {
        font-size: 14px;
        padding-left: 24px;
        padding-right: 24px;
      }

      // table
      table {
        width: 100%;
        border-spacing: 1px;
      }

      th {
        background: `,`;
      }

      tr {
      }
      th,
      td {
        padding-block-start: 10px;
        padding-block-end: 10px;
        padding-inline-start: 16px;
        padding-inline-end: 16px;
        border-bottom: 1px solid `,`;
      }

      // blockquote
      blockquote {
        font-style: italic;

        margin: 16px 0;
        padding: 0 12px;
        color: `,`;
        border-left: 3px solid `,`;
      }

      // list
      ul li {
        line-height: 1.8;
      }

      // anchor of headings
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        > a[aria-hidden]:first-child {
          float: left;
          width: 20px;
          padding-inline-end: 4px;
          margin-inline-start: -24px;
          color: `,`;
          // hide phantom blank node
          font-size: 0;
          text-align: right;
          line-height: inherit;

          &:hover {
            border: 0;
          }

          > .icon-link::before {
            content: '#';
            color: `,`;
            font-size: 20px;
          }
        }

        &:not(:hover) > a[aria-hidden]:first-child > .icon-link {
          visibility: hidden;
        }
      }
    }
  `])),e.colorBgContainer,e.boxShadowTertiary,o.mobile,t?e.colorTextSecondary:e.colorText,e.colorText,e.colorLink,e.colorLinkHover,e.colorLinkActive,t?.8:1,t?e["cyan-7"]:e.colorPrimaryText,t?e["cyan-1"]:e.colorPrimaryBg,e.colorFillTertiary,e.colorBorderSecondary,e.colorTextDescription,e.colorBorder,e.colorText,e.colorTextTertiary)}}),vt=function(e){var o=e.children,t=(0,C.HX)(function(p){return p.siteData.loading}),c=yt(),i=c.styles,s=c.cx,u=ce(),g=u.mobile;return(0,r.jsxs)(O.D,{width:"100%",gap:g?0:24,children:[(0,r.jsxs)("div",{className:s("dumi-antd-style-content",i.content),children:[(0,r.jsx)(gt.Z,{active:!0,paragraph:!0,loading:t}),(0,r.jsx)("div",{style:{display:t?"none":void 0},children:o})]}),(0,r.jsx)(kt,{})]})},xt=(0,d.memo)(vt),Oe=l(67567),ze=l(88071),wt=l(82187),Ke=l.n(wt),St=function(e){var o=e.prefixCls,t=e.icon,c=e.title,i=e.items,s=i===void 0?[]:i,u=e.style,g=e.className;return d.createElement("div",{className:Ke()("".concat(o,"-column"),g),style:u},(c||t)&&d.createElement("h2",null,t&&d.createElement("span",{className:"".concat(o,"-column-icon")},t),c),s.map(function(p,b){var x=p.LinkComponent||"a";return d.createElement("div",{className:Ke()("".concat(o,"-item"),p.className),style:p.style,key:b},d.createElement(x,{href:p.url,to:typeof x!="string"?p.url:void 0,target:p.openExternal?"_blank":void 0,rel:p.openExternal?"noopener noreferrer":void 0},p.icon&&d.createElement("span",{className:"".concat(o,"-item-icon")},p.icon),p.title),p.description&&d.createElement(d.Fragment,null,d.createElement("span",{className:"".concat(o,"-item-separator")},"-"),d.createElement("span",{className:"".concat(o,"-item-description")},p.description)))}))},zt=St,Mt=["prefixCls","className","style","bottom","columns","maxColumnsPerRow","backgroundColor","columnLayout","theme"],At=function(e){var o=e.prefixCls,t=o===void 0?"rc-footer":o,c=e.className,i=e.style,s=e.bottom,u=e.columns,g=e.maxColumnsPerRow,p=e.backgroundColor,b=e.columnLayout,x=e.theme,h=x===void 0?"dark":x,M=(0,G.Z)(e,Mt),w=Ke()("".concat(t),c,(0,E.Z)({},"".concat(t,"-").concat(h),!!h)),A=typeof g=="number"&&g>0;return d.createElement("footer",(0,ze.Z)((0,ze.Z)({},M),{},{className:w,style:(0,ze.Z)((0,ze.Z)({},i),{},{backgroundColor:p})}),d.createElement("section",{className:"".concat(t,"-container")},u&&u.length>0&&d.createElement("section",{className:"".concat(t,"-columns"),style:{justifyContent:b,flexWrap:A?"wrap":void 0}},u.map(function(S,H){var L=S.title,$=S.icon,V=S.style,I=S.className,T=S.items,K=T===void 0?[]:T,B=(0,ze.Z)({},V);return A&&(B.flex="0 0 ".concat(100/(g+1)+.1,"%")),d.createElement(zt,{key:H,prefixCls:t,title:L,icon:$,items:K,style:B,className:I})}))),s&&d.createElement("section",{className:"".concat(t,"-bottom")},d.createElement("div",{className:"".concat(t,"-bottom-container")},s)))},Ct=At,bo,fo,jt=(0,F.kc)(function(n,e){var o=n.css,t=n.responsive,c=n.token,i="rc-footer";return{container:o(bo||(bo=(0,y.Z)([`
      grid-area: footer;
      border-top: 1px solid `,`;
      color: `,`;
      text-align: center;
      align-self: stretch;

      `,` {
        border: none;
        flex-direction: column;
      }
    `])),c.colorSplit,c.colorTextDescription,t.mobile),footer:o(fo||(fo=(0,y.Z)([`
      color: `,`;
      font-size: 14px;
      line-height: 1.5;
      background-color: `,`;

      &.`,` {
        a {
          color: `,`;
          text-decoration: none;
          transition: all 0.3s;

          &:hover {
            color: `,`;
          }
        }
      }

      .`,` {
        &-container {
          width: 100%;
          max-width: `,`px;
          margin: auto;
          padding: `,`;
        }

        &-columns {
          display: flex;
          justify-content: space-around;
        }

        &-column {
          h2 {
            position: relative;
            margin: 0 auto;
            color: `,`;
            font-weight: 500;
            font-size: 16px;
          }

          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 22px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.5em;

            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }
        }

        &-item {
          margin: 12px 0;

          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 16px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.4em;

            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }

          &-separator {
            margin: 0 0.3em;
          }
        }

        &-bottom {
          &-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px 0;
            font-size: 16px;
            line-height: 32px;
            text-align: center;
            border-top: 1px solid `,`;
          }
        }

        &-light {
          color: rgba(0, 0, 0, 0.85);
          background-color: transparent;

          h2,
          a {
            color: rgba(0, 0, 0, 0.85);
          }
        }

        &-light &-bottom-container {
          border-top-color: #e8e8e8;
        }

        &-light &-item-separator,
        &-light &-item-description {
          color: rgba(0, 0, 0, 0.45);
        }
      }

      `,` {
        .`,` {
          text-align: center;

          &-container {
            padding: 40px 0;
          }

          &-columns {
            display: block;
          }

          &-column {
            display: block;
            margin-bottom: 40px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    `])),c.colorTextSecondary,c.colorBgLayout,i,c.colorTextTertiary,c.colorLinkHover,i,c.contentMaxWidth,e?"0":"60px 0 20px",c.colorText,e?"transparent":c.colorBorderSecondary,t.mobile,i)}}),Ht=function(e){var o=e.columns,t=e.bottom,c=e.theme,i=!o||(o==null?void 0:o.length)===0,s=jt(i),u=s.styles;return(0,r.jsx)("div",{className:u.container,children:(0,r.jsx)(Ct,{theme:c,className:u.footer,columns:o,bottom:t})})},Ot=Ht,mo=function(e){return e.siteData.themeConfig.name},Ge=function(e){var o,t;return((o=e.siteData.themeConfig)===null||o===void 0||(o=o.socialLinks)===null||o===void 0?void 0:o.github)||((t=e.siteData.themeConfig)===null||t===void 0?void 0:t.github)},Tt=function(e){var o=e.siteData.themeConfig.logo;return o?(o.startsWith("http"),o):o||""},Dt=l(77925),Ft=l(56661),ho=l(14706),Bt=l(94581),Wt=l(64297),Et=l(97331),Lt=function(e){var o=e.github,t={title:"\u76F8\u5173\u8D44\u6E90",items:[{title:"Ant Design",url:"https://ant.design",openExternal:!0},{title:"Ant Design Pro",url:"https://pro.ant.design",openExternal:!0},{title:"Ant Design Pro Components",url:"https://procomponents.ant.design",openExternal:!0},{title:"Umi",description:"React \u5E94\u7528\u5F00\u53D1\u6846\u67B6",url:"https://umijs.org",openExternal:!0},{title:"Dumi",description:"\u7EC4\u4EF6/\u6587\u6863\u7814\u53D1\u5DE5\u5177",url:"https://d.umijs.org",openExternal:!0},{title:"qiankun",description:"\u5FAE\u524D\u7AEF\u6846\u67B6",url:"https://qiankun.umijs.org",openExternal:!0}]},c={title:"\u793E\u533A",items:[{icon:(0,r.jsx)(Dt.Z,{}),title:"Medium",url:"http://medium.com/ant-design/",openExternal:!0},{icon:(0,r.jsx)(Ft.Z,{style:{color:"#1DA1F2"}}),title:"Twitter",url:"http://twitter.com/antdesignui",openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",alt:"yuque"}),title:"Ant Design \u8BED\u96C0\u4E13\u680F",url:"https://yuque.com/ant-design/ant-design",openExternal:!0},{icon:(0,r.jsx)(ho.Z,{style:{color:"#056de8"}}),title:"Ant Design \u77E5\u4E4E\u4E13\u680F",url:"https://www.zhihu.com/column/c_1564262000561106944",openExternal:!0},{icon:(0,r.jsx)(ho.Z,{style:{color:"#056de8"}}),title:"\u4F53\u9A8C\u79D1\u6280\u4E13\u680F",url:"http://zhuanlan.zhihu.com/xtech",openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png",alt:"seeconf"}),title:"SEE Conf",description:"SEE Conf-\u8682\u8681\u4F53\u9A8C\u79D1\u6280\u5927\u4F1A",url:"https://seeconf.antfin.com/",openExternal:!0}]},i={icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",alt:"more products"}),title:"\u66F4\u591A\u4EA7\u54C1",items:[{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",alt:"yuque"}),title:"\u8BED\u96C0",url:"https://yuque.com",description:"\u77E5\u8BC6\u521B\u4F5C\u4E0E\u5206\u4EAB\u5DE5\u5177",openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png",alt:"AntV"}),title:"AntV",url:"https://antv.vision",description:"\u6570\u636E\u53EF\u89C6\u5316\u89E3\u51B3\u65B9\u6848",openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://www.eggjs.org/logo.svg",alt:"Egg"}),title:"Egg",url:"https://eggjs.org",description:"\u4F01\u4E1A\u7EA7 Node.js \u6846\u67B6",openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico",alt:"kitchen"}),title:"Kitchen",description:"Sketch \u5DE5\u5177\u96C6",url:"https://kitchen.alipay.com",openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",alt:"xtech"}),title:"\u8682\u8681\u4F53\u9A8C\u79D1\u6280",url:"https://xtech.antfin.com/",openExternal:!0}]},s={title:"\u5E2E\u52A9",items:[o?{icon:(0,r.jsx)(Bt.Z,{}),title:"GitHub",url:o,openExternal:!0}:void 0,{icon:(0,r.jsx)(Wt.Z,{}),title:"\u66F4\u65B0\u65E5\u5FD7",url:"/changelog",LinkComponent:v.rU},o?{icon:(0,r.jsx)(Et.Z,{}),title:"\u8BA8\u8BBA",url:"".concat(o,"/issues"),openExternal:!0}:void 0].filter(Boolean)};return[t,c,s,i]},ko,yo,Nt=(0,F.kc)(function(n){var e=n.css,o=n.responsive,t=n.token,c="rc-footer";return{container:e(ko||(ko=(0,y.Z)([`
      grid-area: footer;
      border-top: 1px solid `,`;
      color: `,`;
      text-align: center;
      align-self: stretch;

      `,` {
        border: none;
        flex-direction: column;
      }
    `])),t.colorSplit,t.colorTextDescription,o.mobile),footer:e(yo||(yo=(0,y.Z)([`
      color: `,`;
      font-size: 14px;
      line-height: 1.5;
      background-color: `,`;

      &.`,` {
        a {
          color: `,`;
          text-decoration: none;
          transition: all 0.3s;

          &:hover {
            color: `,`;
          }
        }
      }

      .`,` {
        &-container {
          width: 100%;
          max-width: `,`px;
          margin: auto;
          padding: 60px 0 20px;
        }

        &-columns {
          display: flex;
          justify-content: space-around;
        }

        &-column {
          //margin-bottom: 60px;

          h2 {
            position: relative;
            margin: 0 auto;
            color: `,`;
            font-weight: 500;
            font-size: 16px;
          }

          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 22px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.5em;

            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }
        }

        &-item {
          margin: 12px 0;

          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 16px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.4em;

            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }

          &-separator {
            margin: 0 0.3em;
          }
        }

        &-bottom {
          &-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px 0;
            font-size: 16px;
            line-height: 32px;
            text-align: center;
            border-top: 1px solid `,`;
          }
        }

        &-light {
          color: rgba(0, 0, 0, 0.85);
          background-color: transparent;

          h2,
          a {
            color: rgba(0, 0, 0, 0.85);
          }
        }

        &-light &-bottom-container {
          border-top-color: #e8e8e8;
        }

        &-light &-item-separator,
        &-light &-item-description {
          color: rgba(0, 0, 0, 0.45);
        }
      }

      `,` {
        .`,` {
          text-align: center;

          &-container {
            padding: 40px 0;
          }

          &-columns {
            display: block;
          }

          &-column {
            display: block;
            margin-bottom: 40px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    `])),t.colorTextSecondary,t.colorBgLayout,c,t.colorTextTertiary,t.colorLinkHover,c,t.contentMaxWidth,t.colorText,t.colorBorderSecondary,o.mobile,c)}}),Rt=function(){var e=(0,C.HX)(function(w){return w.siteData}),o=e.themeConfig,t=e.pkg,c=(0,C.HX)(Ge),i=Nt(),s=i.styles,u=i.theme,g=ce(),p=g.mobile;if(!o.footer)return null;var b=o.footerConfig,x=b!=null&&b.columns?b.columns:Lt({github:c||t.homepage}),h=(b==null?void 0:b.bottom)||o.footer,M=(b==null?void 0:b.copyright)||"Copyright \xA9 2022-".concat(new Date().getFullYear());return(0,r.jsx)(Ot,{theme:(b==null?void 0:b.theme)||u.appearance,columns:x,bottom:p?(0,r.jsxs)(ie.Z,{className:s.container,children:[M,(0,r.jsx)(O.D,{align:"center",horizontal:!0,dangerouslySetInnerHTML:{__html:h}})]}):(0,r.jsxs)(ie.Z,{horizontal:!0,children:[M,(0,r.jsx)(Oe.Z,{type:"vertical"}),(0,r.jsx)("span",{dangerouslySetInnerHTML:{__html:h}})]})})},vo=Rt,pe=l(25414),Te=l(11869),Pt=l(33343);function De(n){var e=n.pathname,o=n.current,t=n.target,c="base"in o?e.replace(o.base.replace(/\/$/,""),"")||"/":e.replace(new RegExp("".concat(o.suffix,"$")),"");return"base"in t?"".concat(t.base.replace(/\/$/,"")).concat(c).replace(/([^/])\/$/,"$1"):"".concat(c).concat(t.suffix)}var Zt={"zh-CN":"\u{1F1E8}\u{1F1F3}","en-US":"\u{1F1FA}\u{1F1F8}","jp-JP":"\u{1F1EF}\u{1F1F5}","ko-KR":"\u{1F1F0}\u{1F1F7}","ru-RU":"\u{1F1F7}\u{1F1FA}","es-ES":"\u{1F1EA}\u{1F1F8}","fr-FR":"\u{1F1EB}\u{1F1F7}","de-DE":"\u{1F1E9}\u{1F1EA}","pt-BR":"\u{1F1E7}\u{1F1F7}","it-IT":"\u{1F1EE}\u{1F1F9}","tr-TR":"\u{1F1F9}\u{1F1F7}","vi-VN":"\u{1F1FB}\u{1F1F3}"},xo={"zh-CN":"\u4E2D","en-US":"EN"},It=function(e){var o=e.locale,t=e.current,c=(0,v.TH)(),i=c.pathname,s=(0,d.useState)(function(){return De({pathname:i,current:t,target:o})}),u=(0,pe.Z)(s,2),g=u[0],p=u[1];return(0,d.useEffect)(function(){p(De({pathname:i,current:t,target:o}))},[i,t.id,o.id]),(0,r.jsx)(v.rU,{to:g,children:(0,r.jsx)(Te.ZP,{style:{minWidth:34,padding:0,display:"flex",alignItems:"center",justifyContent:"center"},children:xo[o.id]})})},Ut=function(){var e=(0,C.HX)(function(t){return t.siteData.locales}),o=(0,C.HX)(function(t){return t.locale});return e.length<=1?null:e.length>2?(0,r.jsx)(Pt.Z,{value:e.findIndex(function(t){return t.id===o.id}),onChange:function(c){console.log(De({pathname:location.pathname,current:o,target:e[c]})),v.m8.push(De({pathname:location.pathname,current:o,target:e[c]}))},options:e.map(function(t){return{value:t.id,label:xo[t.id]}}),renderItem:function(c,i){return"".concat(Zt[e[i].id]," ").concat(e[i].name)},style:{height:32,minWidth:32,padding:0,display:"flex",alignItems:"center",justifyContent:"center"}}):(0,r.jsx)(It,{locale:e.find(function(t){var c=t.id;return c!==o.id}),current:o})},Vt=(0,d.memo)(Ut);function Fe(n,e){if(Object.is(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;if(n instanceof Map&&e instanceof Map){if(n.size!==e.size)return!1;for(const[t,c]of n)if(!Object.is(c,e.get(t)))return!1;return!0}if(n instanceof Set&&e instanceof Set){if(n.size!==e.size)return!1;for(const t of n)if(!e.has(t))return!1;return!0}const o=Object.keys(n);if(o.length!==Object.keys(e).length)return!1;for(const t of o)if(!Object.prototype.hasOwnProperty.call(e,t)||!Object.is(n[t],e[t]))return!1;return!0}var _a=(n,e)=>(console.warn("[DEPRECATED] Default export is deprecated. Instead use `import { shallow } from 'zustand/shallow'`."),Fe(n,e)),be=l(32699),Kt=function(e){var o,t=e.routeMeta.frontmatter;if(e.siteData.themeConfig.apiHeader===!1||t.apiHeader===!1)return!1;if(t.apiHeader)return!0;var c=["/api","/components"].concat((0,le.Z)(((o=e.siteData.themeConfig.apiHeader)===null||o===void 0?void 0:o.match)||[]));return c.some(function(i){return e.location.pathname.startsWith(i)})};function Gt(n,e){var o={camel:function(){return(0,be.camelCase)(n)},pascal:function(){return(0,be.upperFirst)((0,be.camelCase)(n))},kebab:function(){return(0,be.kebabCase)(n)},snake:function(){return(0,be.snakeCase)(n)},default:function(){return n}};return(o[e]||o.default)()}var wo=function(e){var o,t,c,i,s,u,g,p,b=Ge(e),x=((o=e.routeMeta)===null||o===void 0?void 0:o.frontmatter)||{},h=(t=e.locale)===null||t===void 0?void 0:t.id,M=function(ae){if(b)return ae.replace("{github}",b).replace("{atomId}",x.atomId||"").replace(/\{atomId\.([^}]+)}/g,function(Ae,ve){return Gt(x.atomId||"",ve)}).replace("{title}",x.title).replace("{locale}",h)},w=function(ae){return ae===!1?!1:typeof ae=="string"},A=((c=e.siteData)===null||c===void 0||(c=c.themeConfig)===null||c===void 0?void 0:c.apiHeader)||{},S=A.pkg,H=S===void 0?(i=e.siteData)===null||i===void 0||(i=i.pkg)===null||i===void 0?void 0:i.name:S,L=A.sourceUrl,$=A.docUrl,V=((s=x.apiHeader)===null||s===void 0?void 0:s.pkg)||H,I=x.atomId||x.title,T=((u=x.apiHeader)===null||u===void 0?void 0:u.defaultImport)||!1,K=((g=x.apiHeader)===null||g===void 0?void 0:g.sourceUrl)||L,B=w(K)?M(K):void 0,q=((p=x.apiHeader)===null||p===void 0?void 0:p.docUrl)||$,Me=w(q)?M(q):void 0;return{title:x.title,description:x.description,pkg:V,defaultImport:T,componentName:I,sourceUrl:B,docUrl:Me}},So=function(e){var o=e.routeMeta.frontmatter;return(0,be.merge)({},o.token,e.siteData.themeConfig.siteToken)},Qt={apiHeader:wo,flattenSidebar:to,token:So,logo:Tt},zo,Xt=(0,F.kc)(function(n){var e=n.css,o=n.responsive,t=n.token;return e(zo||(zo=(0,y.Z)([`
    display: inline-flex;
    align-items: center;
    font-family: AliPuHui, `,`;
    color: `,`;
    font-size: 22px;
    line-height: 1;
    font-weight: 500;
    text-decoration: none;
    gap: 10px;

    `,` {
      font-size: 18px;
    }
  `])),t.fontFamily,t.colorText,o.mobile)}),Yt=function(){var e=(0,C.HX)(function(b){return b.siteData.themeConfig},j()),o=(0,C.HX)(function(b){return b.locale},j()),t=(0,C.HX)(Qt.logo,Fe),c=Xt(),i=c.styles,s=c.cx,u=e.name,g=e.hideNameOnHeader,p=g===void 0?!1:g;return e&&(0,r.jsxs)(v.rU,{className:s(i),to:"base"in o?o.base:"/",children:[!!t&&(0,r.jsx)("img",{src:t,alt:e.name,height:32}),!p&&u]})},Mo=(0,d.memo)(Yt),_t=l(35901),Jt=function(){return d.createElement(d.Fragment,null)},$t=Jt,Ao,Co,qt=(0,F.kc)(function(n){var e=n.css,o=n.responsive,t=n.token,c=n.stylish,i=n.prefixCls,s=".".concat(i,"-tabs"),u=16,g=6;return{tabs:e(Ao||(Ao=(0,y.Z)([`
      `,"-tab + ",`-tab {
        margin: `,`px 4px !important;
        padding: 0 12px !important;
      }

      `,`-tab {
        color: `,`;
        transition: background-color 100ms ease-out;

        &:first-child {
          margin: `,"px 4px ",`px 0;
          padding: `,`px 12px !important;
        }

        &:hover {
          color: `,` !important;
          background: `,`;
          border-radius: `,`px;
        }
      }

      `,`-nav {
        margin-bottom: 0;
      }

      `,` {
        display: none;
      }
    `])),s,s,u,s,t.colorTextSecondary,u,u,g,t.colorText,t.colorFillTertiary,t.borderRadius,s,o.mobile),link:e(Co||(Co=(0,y.Z)([`
      `,`
    `])),c.resetLinkColor)}}),er=function(){var e=qt(),o=e.styles,t=/^(\w+:)\/\/|^(mailto|tel):/,c=(0,C.HX)(function(s){return s.navData},Fe),i=(0,C.HX)(oo);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(_t.Z,{onChange:function(u){var g,p=(g=c.find(function(b){return b.activePath===u||b.link===u}))===null||g===void 0?void 0:g.link;!p||t.test(p)||v.m8.push(p)},activeKey:i,className:o.tabs,items:c.map(function(s){return{label:t.test(s.link||"")?(0,r.jsx)("a",{href:s.link,className:o.link,target:"_blank",rel:"noreferrer",children:s.title}):(0,r.jsx)(v.rU,{className:o.link,to:s.link,children:s.title}),key:s.activePath||s.link}})}),(0,r.jsx)($t,{})]})},or=(0,d.memo)(er),jo=l(17023),nr=Object.defineProperty,Ho=Object.getOwnPropertySymbols,tr=Object.prototype.hasOwnProperty,rr=Object.prototype.propertyIsEnumerable,Oo=(n,e,o)=>e in n?nr(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o,ar=(n,e)=>{for(var o in e||(e={}))tr.call(e,o)&&Oo(n,o,e[o]);if(Ho)for(var o of Ho(e))rr.call(e,o)&&Oo(n,o,e[o]);return n};const To=n=>d.createElement("svg",ar({viewBox:"0 0 1024 1024"},n),d.createElement("path",{d:"m885.2 446.3-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0 0 60.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z"}));var Ja="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0Ij48cGF0aCBkPSJtODg1LjIgNDQ2LjMtLjItLjgtMTEyLjItMjg1LjFjLTUtMTYuMS0xOS45LTI3LjItMzYuOC0yNy4ySDI4MS4yYy0xNyAwLTMyLjEgMTEuMy0zNi45IDI3LjZMMTM5LjQgNDQzbC0uMy43LS4yLjhjLTEuMyA0LjktMS43IDkuOS0xIDE0LjgtLjEgMS42LS4yIDMuMi0uMiA0LjhWODMwYTYwLjkgNjAuOSAwIDAgMCA2MC44IDYwLjhoNjI3LjJjMzMuNSAwIDYwLjgtMjcuMyA2MC45LTYwLjhWNDY0LjFjMC0xLjMgMC0yLjYtLjEtMy43LjQtNC45IDAtOS42LTEuMy0xNC4xem0tMjk1LjgtNDMtLjMgMTUuN2MtLjggNDQuOS0zMS44IDc1LjEtNzcuMSA3NS4xLTIyLjEgMC00MS4xLTcuMS01NC44LTIwLjZTNDM2IDQ0MS4yIDQzNS42IDQxOWwtLjMtMTUuN0gyMjkuNUwzMDkgMjEwaDM5OS4ybDgxLjcgMTkzLjNINTg5LjR6bS0zNzUgNzYuOGgxNTcuM2MyNC4zIDU3LjEgNzYgOTAuOCAxNDAuNCA5MC44IDMzLjcgMCA2NS05LjQgOTAuMy0yNy4yIDIyLjItMTUuNiAzOS41LTM3LjQgNTAuNy02My42aDE1Ni41VjgxNEgyMTQuNFY0ODAuMXoiLz48L3N2Zz4=",lr=function(n,e,o,t){function c(i){return i instanceof o?i:new o(function(s){s(i)})}return new(o||(o=Promise))(function(i,s){function u(b){try{p(t.next(b))}catch(x){s(x)}}function g(b){try{p(t.throw(b))}catch(x){s(x)}}function p(b){b.done?i(b.value):c(b.value).then(u,g)}p((t=t.apply(n,e||[])).next())})};function Be(n){let e=0,o=0,t=n;do e+=t.offsetTop||0,o+=t.offsetLeft||0,t=t.offsetParent;while(t);return{top:e,left:o}}class cr{constructor(e){this.element=e}getHorizontalScroll(){return this.element.scrollLeft}getVerticalScroll(){return this.element.scrollTop}getMaxHorizontalScroll(){return this.element.scrollWidth-this.element.clientWidth}getMaxVerticalScroll(){return this.element.scrollHeight-this.element.clientHeight}getHorizontalElementScrollOffset(e,o){return Be(e).left-Be(o).left}getVerticalElementScrollOffset(e,o){return Be(e).top-Be(o).top}scrollTo(e,o){this.element.scrollLeft=e,this.element.scrollTop=o}}class ir{constructor(){this.element=window}getHorizontalScroll(){return window.scrollX||document.documentElement.scrollLeft}getVerticalScroll(){return window.scrollY||document.documentElement.scrollTop}getMaxHorizontalScroll(){return Math.max(document.body.scrollWidth,document.documentElement.scrollWidth,document.body.offsetWidth,document.documentElement.offsetWidth,document.body.clientWidth,document.documentElement.clientWidth)-window.innerWidth}getMaxVerticalScroll(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)-window.innerHeight}getHorizontalElementScrollOffset(e){return(window.scrollX||document.documentElement.scrollLeft)+e.getBoundingClientRect().left}getVerticalElementScrollOffset(e){return(window.scrollY||document.documentElement.scrollTop)+e.getBoundingClientRect().top}scrollTo(e,o){window.scrollTo(e,o)}}const re={elements:[],cancelMethods:[],add:(n,e)=>{re.elements.push(n),re.cancelMethods.push(e)},remove:(n,e)=>{const o=re.elements.indexOf(n);o>-1&&(e&&re.cancelMethods[o](),re.elements.splice(o,1),re.cancelMethods.splice(o,1))}},Do=typeof window!="undefined",sr={cancelOnUserAction:!0,easing:n=>--n*n*n+1,elementToScroll:Do?window:null,horizontalOffset:0,maxDuration:3e3,minDuration:250,speed:500,verticalOffset:0};function dr(n){return lr(this,arguments,void 0,function*(e,o={}){if(Do){if(!window.Promise)throw"Browser doesn't support Promises, and animated-scroll-to depends on it, please provide a polyfill."}else return new Promise(T=>{T(!1)});let t,c,i,s=Object.assign(Object.assign({},sr),o);const u=s.elementToScroll===window,g=!!s.elementToScroll.nodeName;if(!u&&!g)throw"Element to scroll needs to be either window or DOM element.";const p=[{property:"scroll-behavior",value:"smooth"},{property:"scroll-snap-type",value:"mandatory"}],b=u?document.documentElement:s.elementToScroll,x=getComputedStyle(b);p.forEach(({property:T,value:K})=>{const B=x.getPropertyValue(T);B.includes(K)&&console.warn(`${b.tagName} has "${T}: ${B}" which can break animated-scroll-to's animations`)});const h=u?new ir:new cr(s.elementToScroll);if(e instanceof Element){if(i=e,g&&(!s.elementToScroll.contains(i)||s.elementToScroll.isSameNode(i)))throw"options.elementToScroll has to be a parent of scrollToElement";t=h.getHorizontalElementScrollOffset(i,s.elementToScroll),c=h.getVerticalElementScrollOffset(i,s.elementToScroll)}else if(typeof e=="number")t=h.getHorizontalScroll(),c=e;else if(Array.isArray(e)&&e.length===2)t=e[0]===null?h.getHorizontalScroll():e[0],c=e[1]===null?h.getVerticalScroll():e[1];else throw`Wrong function signature. Check documentation.
Available method signatures are:
  animateScrollTo(y:number, options)
  animateScrollTo([x:number | null, y:number | null], options)
  animateScrollTo(scrollToElement:Element, options)`;t+=s.horizontalOffset,c+=s.verticalOffset;const M=h.getMaxHorizontalScroll(),w=h.getHorizontalScroll();t>M&&(t=M);const A=t-w,S=h.getMaxVerticalScroll(),H=h.getVerticalScroll();c>S&&(c=S);const L=c-H,$=Math.abs(Math.round(A/1e3*s.speed)),V=Math.abs(Math.round(L/1e3*s.speed));let I=$>V?$:V;return I<s.minDuration?I=s.minDuration:I>s.maxDuration&&(I=s.maxDuration),new Promise((T,K)=>{A===0&&L===0&&T(!0),re.remove(h.element,!0);let B;const q=()=>{ve(),cancelAnimationFrame(B),T(!1)};re.add(h.element,q);const Me=de=>de.preventDefault(),ye=s.cancelOnUserAction?q:Me,ae=s.cancelOnUserAction?{passive:!0}:{passive:!1},Ae=["wheel","touchstart","keydown","mousedown"],ve=()=>{Ae.forEach(de=>{h.element.removeEventListener(de,ye,ae)})};Ae.forEach(de=>{h.element.addEventListener(de,ye,ae)});const Ce=Date.now(),$n=()=>{var de=Date.now()-Ce,qn=de/I;const et=Math.round(w+A*s.easing(qn)),ot=Math.round(H+L*s.easing(qn));de<I&&(et!==t||ot!==c)?(h.scrollTo(et,ot),B=requestAnimationFrame($n)):(h.scrollTo(t,c),cancelAnimationFrame(B),ve(),re.remove(h.element,!1),T(!0))};B=requestAnimationFrame($n)})})}var ur=dr;function Qe(n,e){return fr(n)||br(n,e)||pr(n,e)||gr()}function gr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function pr(n,e){if(n){if(typeof n=="string")return Fo(n,e);var o=Object.prototype.toString.call(n).slice(8,-1);if(o==="Object"&&n.constructor&&(o=n.constructor.name),o==="Map"||o==="Set")return Array.from(n);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return Fo(n,e)}}function Fo(n,e){(e==null||e>n.length)&&(e=n.length);for(var o=0,t=new Array(e);o<e;o++)t[o]=n[o];return t}function br(n,e){var o=n==null?null:typeof Symbol!="undefined"&&n[Symbol.iterator]||n["@@iterator"];if(o!=null){var t,c,i,s,u=[],g=!0,p=!1;try{if(i=(o=o.call(n)).next,e===0){if(Object(o)!==o)return;g=!1}else for(;!(g=(t=i.call(o)).done)&&(u.push(t.value),u.length!==e);g=!0);}catch(b){p=!0,c=b}finally{try{if(!g&&o.return!=null&&(s=o.return(),Object(s)!==s))return}finally{if(p)throw c}}return u}}function fr(n){if(Array.isArray(n))return n}var mr=function(){return d.createElement("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"},d.createElement("path",{d:"M5.333 10.667h21.334c.889 0 1.333.444 1.333 1.333s-.444 1.333-1.333 1.333H5.333C4.444 13.333 4 12.89 4 12s.444-1.333 1.333-1.333Z"}),d.createElement("path",{d:"M13.207 2.667h.126a1.206 1.206 0 0 1 1.2 1.326l-2.413 24.14a1.333 1.333 0 0 1-1.327 1.2h-.126a1.206 1.206 0 0 1-1.2-1.326l2.413-24.14c.068-.682.642-1.2 1.327-1.2Zm8 0h.126a1.206 1.206 0 0 1 1.2 1.326l-2.413 24.14a1.333 1.333 0 0 1-1.327 1.2h-.126a1.206 1.206 0 0 1-1.2-1.326l2.413-24.14c.068-.682.642-1.2 1.327-1.2Z"}),d.createElement("path",{d:"M5.333 18.667h21.334c.889 0 1.333.444 1.333 1.333s-.444 1.333-1.333 1.333H5.333C4.444 21.333 4 20.89 4 20s.444-1.333 1.333-1.333Z"}))},hr=function(){return d.createElement("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"},d.createElement("path",{d:"M9.402 0h14.78L30 6.16V24.5c0 1.933-1.71 3.5-3.589 3.5H9.401C7.524 28 6 26.433 6 24.5v-21C6 1.567 7.523 0 9.402 0ZM23 2v4.183c0 .451.366.817.817.817H28l-5-5Zm3.333 24c.92 0 1.667-.768 1.667-1.714V8.857h-5c-.92 0-1.667-.767-1.667-1.714V2H9.667C8.747 2 8 2.768 8 3.714v20.572C8 25.232 8.746 26 9.667 26h16.666Z"}))},kr=function(){return d.createElement("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"},d.createElement("path",{d:"M6.12 14.589h6.628l1.52 4.004h2.485l-5.938-15.19H8.053L2.115 18.732H4.6l1.52-4.143ZM8.88 6.855c.139-.414.277-.828.415-1.38h.138c0 .138.138.414.414 1.104 0 .138.138.276.138.276 0 .138.829 2.072 2.21 5.938H6.672c1.519-3.866 2.21-5.8 2.21-5.938Zm8.148 2.348h12.705v1.933H17.029V9.203ZM2.115 20.665h27.619v1.933H2.114v-1.933Zm14.914-5.662h12.705v1.933H17.029v-1.933ZM2.115 26.327h27.619v1.933H2.114v-1.933ZM17.029 3.54h12.705v1.934H17.029V3.54Z"}))},yr=function(){return d.createElement("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"},d.createElement("path",{d:"M28 6h-5a5 5 0 0 0-10 0H8a2 2 0 0 0-2 2v5a5 5 0 0 0 0 10v5a2 2 0 0 0 2 2h7v-2a3 3 0 0 1 6 0v2h7a2 2 0 0 0 2-2v-7h-2a3 3 0 0 1 0-6h2V8a2 2 0 0 0-2-2Zm-5 12a5 5 0 0 0 5 5v5h-5a5 5 0 0 0-10 0H8v-7H6a3 3 0 0 1 0-6h2V8h7V6a3 3 0 0 1 6 0v2h7v5a5 5 0 0 0-5 5Z"}))},vr={title:mr,page:hr,content:kr,demo:yr},Bo=function(e){return d.createElement(d.Fragment,null,e.texts.map(function(o,t){return d.createElement(d.Fragment,{key:t},o.highlighted?d.createElement("mark",null,o.text):o.text)}))},xr=function(e){var o=(0,d.useCallback)(function(){var u=0,g=[];return e.forEach(function(p){p.title&&g.push({type:"title",value:{title:p.title}}),p.hints.forEach(function(b){g.push({type:"hint",activeIndex:u++,value:b})})}),[g,u]},[e]),t=(0,d.useState)(o),c=Qe(t,2),i=c[0],s=c[1];return(0,d.useEffect)(function(){s(o)},[e]),i},wr=function(e){var o=xr(e.data),t=Qe(o,2),c=t[0],i=t[1],s=(0,d.useState)(-1),u=Qe(s,2),g=u[0],p=u[1],b=(0,v.TH)(),x=b.pathname,h=function(A){var S;(S=e.onItemSelect)===null||S===void 0||S.call(e,A);var H=new URL(A==null?void 0:A.link,location.origin);(H==null?void 0:H.pathname)===x&&!H.hash&&setTimeout(function(){ur(0,{maxDuration:300})},1)};(0,d.useEffect)(function(){var w=function(S){if(S.key==="ArrowDown")p((g+1)%i);else if(S.key==="ArrowUp")p((g+i-1)%i);else if(S.key==="Enter"&&g>=0){var H=c.find(function(L){return L.type==="hint"&&L.activeIndex===g}).value;v.m8.push(H.link),h==null||h(H),document.activeElement.blur()}["Escape","Enter"].includes(S.key)&&p(-1)};return document.addEventListener("keydown",w),function(){return document.removeEventListener("keydown",w)}});var M=null;return e.loading?M=d.createElement("div",{className:"dumi-default-search-empty"},d.createElement(To,null),d.createElement(v._H,{id:"search.loading"})):e.data.length?M=d.createElement("dl",null,c.map(function(w,A){return w.type==="title"?d.createElement("dt",{key:String(A)},w.value.title):d.createElement("dd",{key:String(A)},d.createElement(v.rU,{to:w.value.link,"data-active":g===w.activeIndex||void 0,onClick:function(){return h==null?void 0:h(w.value)}},d.createElement(vr[w.value.type]),d.createElement("h4",null,d.createElement(Bo,{texts:w.value.highlightTitleTexts})),d.createElement("p",null,d.createElement(Bo,{texts:w.value.highlightTexts}))))})):M=d.createElement("div",{className:"dumi-default-search-empty"},d.createElement(To,null),d.createElement(v._H,{id:"search.not.found"})),d.createElement("div",{className:"dumi-default-search-result",onMouseEnter:function(){return p(-1)},onMouseDownCapture:function(A){return A.preventDefault()},onMouseUpCapture:function(){document.activeElement.blur()}},M)},Wo=wr,Eo=(0,d.forwardRef)(function(n,e){var o=(0,v.YB)(),t=(0,d.useRef)(!1),c=(0,d.useRef)(null);return(0,d.useImperativeHandle)(e,function(){return c.current}),(0,r.jsx)("input",{className:n.className,onCompositionStart:function(){return t.current=!0},onCompositionEnd:function(s){t.current=!1,n.onChange(s.currentTarget.value)},onFocus:n.onFocus,onBlur:n.onBlur,onKeyDown:function(s){["ArrowDown","ArrowUp"].includes(s.key)&&s.preventDefault(),s.key==="Escape"&&!t.current&&s.currentTarget.blur()},onChange:function(s){setTimeout(function(){t.current||n.onChange(s.target.value)},1)},placeholder:o.formatMessage({id:"header.search.placeholder"}),ref:c})}),Lo,No,Ro,Sr=(0,F.kc)(function(n){var e=n.token,o=n.css;return{modal:o(Lo||(Lo=(0,y.Z)([`
      position: fixed;
      top: 0;
      inset-inline-start: 0;
      z-index: 1000;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
    `]))),mask:o(No||(No=(0,y.Z)([`
      background-color: `,`;
      width: 100%;
      height: 100%;
    `])),e.colorBgMask),content:o(Ro||(Ro=(0,y.Z)([`
      position: absolute;
      top: 60px;
      background-color: `,`;
      width: 500px;
      padding: 12px;
      box-sizing: border-box;
      box-shadow: inset 1px 1px 0 0 hsla(0deg, 0%, 100%, 50%), 0 3px 8px 0 #555a64;
      border-radius: 8px;
      max-height: calc(100% - 120px);
      display: flex;
      flex-direction: column;
    `])),e.colorBgElevated)}}),zr=function(e){var o=Sr(),t=o.styles;return(0,d.useEffect)(function(){if(e.visible)document.body.style.overflow="hidden";else{var c;document.body.style.overflow="",(c=e.onClose)===null||c===void 0||c.call(e)}},[e.visible]),e.visible?(0,r.jsxs)("div",{className:t.modal,children:[(0,r.jsx)("div",{className:t.mask,onClick:e.onMaskClick}),(0,r.jsx)("div",{className:t.content,children:e.children})]}):null},Po,Zo,Io,Uo,Vo,Mr=(0,F.kc)(function(n){var e=n.token,o=n.responsive,t=n.css,c=n.cx;return{container:t(Po||(Po=(0,y.Z)([`
      position: relative;

      // TODO: support search for mobile devices
      `,` {
        display: none;
      }
    `])),o.mobile),shortcut:c("site-header-shortcut",t(Zo||(Zo=(0,y.Z)([`
        position: absolute;
        top: 50%;
        inset-inline-end: 11px;
        display: inline-block;
        padding: 4px 8px;
        color: `,`;
        font-size: 12px;
        line-height: 1;
        white-space: nowrap;
        background-color: `,`;
        border-radius: 11px;
        border: 1px solid `,`;
        transform: translateY(-50%);
        transition: all 0.3s;
        pointer-events: none;

        `,` {
          display: none;
        }
      `])),e.colorTextDescription,e.colorFillSecondary,e.colorBorderSecondary,o.mobile)),popover:t(Io||(Io=(0,y.Z)([`
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      display: flex;
      flex-direction: column;
      width: 540px;
      max-height: 460px;
      margin-top: 18px;
      background-color: `,`;
      border-radius: 8px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 20%);

      &::before {
        content: '';
        position: absolute;
        bottom: 100%;
        inset-inline-end: 100px;
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-bottom-color: #fff;
      }

      > section {
        flex: 1;
        min-height: 60px;
        overflow: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        border-radius: inherit;
      }
    `])),e.colorBgElevated),svg:c(t(Uo||(Uo=(0,y.Z)([`
        position: absolute;
        top: 50%;
        margin-top: 1px;
        inset-inline-start: 16px;
        width: 16px;
        color: `,`;
        transform: translateY(-50%);
      `])),e.colorTextPlaceholder)),input:t(Vo||(Vo=(0,y.Z)([`
      width: 280px;
      height: `,`px;
      padding: 0;
      padding-inline-start: 40px;
      padding-inline-end: 12px;
      color: `,`;
      font-size: 14px;
      border: 1px solid `,`;
      border-radius: 20px;
      box-sizing: border-box;
      outline: none;
      transition: all 0.3s;
      background-color: transparent;

      &:focus {
        border-color: `,`;
        background: `,`;

        ~ .site-header-shortcut {
          opacity: 0;
        }
      }

      &::-webkit-input-placeholder {
        color: `,`;
      }
    `])),e.controlHeightLG,e.colorTextSecondary,e.colorBorder,e.colorBorderSecondary,e.colorBgElevated,e.colorTextPlaceholder)}}),Xe,Ko=/(mac|iphone|ipod|ipad)/i.test(typeof navigator!="undefined"?(Xe=navigator)===null||Xe===void 0?void 0:Xe.platform:""),Ar=function(e){return["TEXTAREA","INPUT"].includes(e.tagName)||e.contentEditable==="true"},Cr=function(){var e=Mr(),o=e.styles,t=(0,d.useState)(!1),c=(0,pe.Z)(t,2),i=c[0],s=c[1],u=(0,d.useRef)(null),g=(0,d.useRef)(null),p=(0,d.useState)("\u2318"),b=(0,pe.Z)(p,2),x=b[0],h=b[1],M=(0,v.OO)(),w=M.keywords,A=M.setKeywords,S=M.result,H=M.loading,L=(0,d.useState)(!1),$=(0,pe.Z)(L,2),V=$[0],I=$[1];return(0,d.useEffect)(function(){Ko||h("Ctrl");var T=function(B){if(((Ko?B.metaKey:B.ctrlKey)&&B.key==="k"||B.key==="/"&&!Ar(B.target))&&(B.preventDefault(),u.current)){var q=u.current.getBoundingClientRect(),Me=q.top,ye=q.bottom,ae=q.left,Ae=q.right,ve=Me>=0&&ae>=0&&ye<=window.innerHeight&&Ae<=window.innerWidth;ve?u.current.focus():(A(""),I(!0),setTimeout(function(){var Ce;(Ce=g.current)===null||Ce===void 0||Ce.focus()}))}B.key==="Escape"&&(B.preventDefault(),I(!1))};return document.addEventListener("keydown",T),function(){return document.removeEventListener("keydown",T)}},[]),(0,r.jsxs)("div",{className:o.container,children:[(0,r.jsx)(jo.Z,{className:o.svg}),(0,r.jsx)(Eo,{onFocus:function(){return s(!0)},onBlur:function(){setTimeout(function(){s(!1)},1)},onChange:function(K){return A(K)},ref:u,className:o.input}),(0,r.jsxs)("span",{className:o.shortcut,children:[x," K"]}),w.trim()&&i&&(S.length||!H)&&!V&&(0,r.jsx)("div",{className:o.popover,children:(0,r.jsx)("section",{children:(0,r.jsx)(Wo,{data:S,loading:H})})}),(0,r.jsxs)(zr,{visible:V,onMaskClick:function(){I(!1)},onClose:function(){return A("")},children:[(0,r.jsxs)("div",{style:{position:"relative"},children:[(0,r.jsx)(jo.Z,{className:o.svg}),(0,r.jsx)(Eo,{className:o.input,onFocus:function(){return s(!0)},onBlur:function(){setTimeout(function(){s(!1)},1)},onChange:function(K){return A(K)},ref:g})]}),(0,r.jsx)(Wo,{data:S,loading:H,onItemSelect:function(){I(!1)}})]})]})},jr=Cr,Hr=l(29861),Or=l(19070),Y=l(76625),Go,Qo,Xo,Yo,_o,Jo,$o,Tr=(0,F.kc)(function(n){var e=n.token,o=n.prefixCls,t=n.cx,c=n.css,i=6;return{rect:c(Go||(Go=(0,y.Z)([`
      background: `,`;

      width: 100%;
    `])),(0,Y.m4)(e.colorBgContainer,.8)),icon:t("site-burger-icon",c(Qo||(Qo=(0,y.Z)([`
        position: relative;

        &,
        &::before,
        &::after {
          display: inline-block;
          height: 2px;
          background: `,`;

          width: 16px;

          transition: all 150ms ease;
        }

        &::before,
        &::after {
          position: absolute;
          left: 0;

          content: '';
        }

        &::before {
          top: `,`px;
        }

        &::after {
          top: -`,`px;
        }
      `])),e.colorTextSecondary,i,i)),active:c(Xo||(Xo=(0,y.Z)([`
      &::before,
      &::after {
        background: `,`;
      }
      & {
        background: transparent;
      }

      &::before {
        top: 0;
        transform: rotate(-135deg);
      }

      &::after {
        top: 0;
        transform: rotate(135deg);
      }
    `])),e.colorText),container:c(Yo||(Yo=(0,y.Z)([`
      width: `,`px;
      height: `,`px;
      border-radius: `,`px;
      cursor: pointer;
    `])),e.controlHeight,e.controlHeight,e.borderRadius),drawerRoot:c(_o||(_o=(0,y.Z)([`
      top: `,`px;

      :focus-visible {
        outline: none;
      }

      .`,`-drawer {
        &-mask {
          background: transparent;
          backdrop-filter: blur(7px);
          background: `,`;
        }

        &-content-wrapper {
          box-shadow: none;
        }
      }
    `])),e.headerHeight+1,o,(0,Y.m4)(e.colorBgBase,.5)),drawer:c(Jo||(Jo=(0,y.Z)([`
      &.`,`-drawer-content {
        background: transparent;
      }

      .`,`-drawer-body {
        display: flex;
        flex-direction: column;
      }
    `])),o,o),menu:c($o||($o=(0,y.Z)([`
      background: transparent;
      border-inline-end: transparent !important;

      > .`,"-menu-item-only-child,.",`-menu-submenu-title {
        background: `,`;
        border-radius: 0;
        margin: 0;
        width: 100%;
        &:active {
          margin-inline: 4px;
          border-radius: `,`px;
        }
      }

      .`,"-menu-sub.",`-menu-inline {
        //background: transparent !important;
        background: `,` !important;
      }
    `])),o,o,(0,Y.m4)(e.colorBgContainer,.8),e.borderRadius,o,o,(0,Y.m4)(e.colorBgContainer,.2))}}),Dr=function(){var e=(0,d.useState)(!1),o=(0,pe.Z)(e,2),t=o[0],c=o[1],i=Tr(),s=i.styles,u=i.cx,g=(0,C.HX)(function(h){return h.navData},j()),p=(0,C.HX)(function(h){return h.sidebar},j()),b=(0,C.HX)(oo),x=(0,C.HX)(function(h){return h.location.pathname});return(0,r.jsxs)(ie.Z,{className:s.container,onClick:function(){c(!t)},children:[(0,r.jsx)("div",{className:u(s.icon,t?s.active:"")}),(0,r.jsxs)(Hr.Z,{open:t,placement:"left",closeIcon:null,rootClassName:s.drawerRoot,className:s.drawer,width:"100vw",headerStyle:{display:"none"},bodyStyle:{padding:0},children:[(0,r.jsx)("div",{style:{height:24},className:s.rect}),(0,r.jsx)(Or.Z,{mode:"inline",selectedKeys:(0,be.uniq)([b,"s-".concat(x)]),openKeys:[b],className:s.menu,items:g.map(function(h){return{label:(0,r.jsx)(v.rU,{to:h.link,children:h.title}),key:h.activePath||h.link,children:(h.activePath||h.link)===b&&(p==null?void 0:p.map(function(M){return!M.link&&{label:M.title,type:"group",children:M.children.map(function(w){return{label:(0,r.jsx)(v.rU,{to:w.link,onClick:function(){c(!1)},children:w.title}),key:"s-".concat(w.link)}})}}))}})}),(0,r.jsx)("div",{style:{flex:1},className:s.rect})]})]})},Fr=Dr,qo=l(65231),en=l(17855),Br=function(){var e=(0,C.HX)(Ge);return e?(0,r.jsx)(en.Z,{arrow:!1,title:"Github",children:(0,r.jsx)("a",{href:e,target:"_blank",rel:"noreferrer",children:(0,r.jsx)(Te.ZP,{icon:(0,r.jsx)(qo.Z,{})})})}):null},Wr=(0,d.memo)(Br),Er=l(21383),on=l(19016),nn,tn,rn,an,Lr=(0,F.kc)(function(n){var e=n.css,o=n.responsive,t=n.token;return{header:e(nn||(nn=(0,y.Z)([`
    top: 0;
    position: sticky;
    background-color: transparent;
    backdrop-filter: blur(6px);
    z-index: `,`;
    border-bottom: 1px solid `,`;

    grid-area: head;
    align-self: stretch;

    `,` {
      background: `,`;
    }
  `])),t.zIndexPopupBase-50,t.colorSplit,o.mobile,t.colorBgContainer),content:e(tn||(tn=(0,y.Z)([`
    padding: 0 24px;
    height: 64px;

    `,` {
      padding: 0 12px;
    }
  `])),o.mobile),left:e(rn||(rn=(0,y.Z)([""]))),right:e(an||(an=(0,y.Z)([`
    flex: 1;
    display: flex;
    justify-content: space-between;

    &-aside {
      display: flex;
      align-items: center;

      `,` {
        margin: 8px 16px;
        padding-top: 24px;
        justify-content: center;
        border-top: 1px solid `,`;
      }
    }
  `])),o.mobile,t.colorBorder)}}),ln=function(){var e=(0,C.HX)(function(s){return s.siteData.themeConfig.prefersColor.switch}),o=(0,on.f)(function(s){return s.themeMode}),t=(0,v.OI)(),c=(0,pe.Z)(t,3),i=c[2];return(0,d.useEffect)(function(){return i(o)},[o]),e?(0,r.jsx)(Er.Z,{value:o,onChange:function(u){on.f.setState({themeMode:u})}}):null},Nr=function(){var e=(0,C.HX)(function(s){return!!s.routeMeta.frontmatter}),o=ce(),t=o.mobile,c=Lr(),i=c.styles;return e?(0,r.jsx)("div",{className:i.header,children:(0,r.jsx)(O.D,{horizontal:!0,distribution:"space-between",align:"center",width:"auto",className:i.content,children:t?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(O.D,{children:(0,r.jsx)(Fr,{})}),(0,r.jsx)(O.D,{horizontal:!0,className:i.left,children:(0,r.jsx)(Mo,{})}),(0,r.jsx)(O.D,{children:(0,r.jsx)(ln,{})})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(O.D,{horizontal:!0,className:i.left,children:(0,r.jsx)(Mo,{})}),(0,r.jsx)(O.D,{style:{marginLeft:48,alignSelf:"end"},children:(0,r.jsx)(or,{})}),(0,r.jsxs)("section",{className:i.right,children:[(0,r.jsx)("div",{}),(0,r.jsxs)(O.D,{gap:16,horizontal:!0,align:"center",className:"dumi-default-header-right-aside",children:[(0,r.jsx)(jr,{}),(0,r.jsx)(Vt,{}),(0,r.jsx)(Wr,{}),(0,r.jsx)(ln,{})]})]})]})})}):null},cn=(0,d.memo)(Nr),sn,Rr=(0,F.kc)(function(n){var e=n.css,o=n.token;return{sidebar:e(sn||(sn=(0,y.Z)([`
    grid-area: sidebar;
    overflow: auto;
    position: sticky;
    top: `,`px;
    max-height: calc(100vh - `,`px);
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 24px;
    padding-inline: 16px;
    border-right: 1px solid `,`;

    > dl {
      margin: 0;
      padding: 0;
      line-height: 1;

      > dt {
        margin: 8px 0;
        color: `,`;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: uppercase;
      }

      > dd {
        margin: 0;
        padding: 2px 0;

        > a {
          padding: 6px 12px;
          border-radius: 6px;
          display: block;
          font-size: `,`px;
          line-height: `,`;
          text-decoration: none;
          transition: all 0.1s;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          color: `,`;

          &:hover {
            color: `,`;
            background: `,`;
          }

          &.active {
            color: `,`;
            background: `,`;

            &:hover {
              color: `,`;
              background: `,`;
            }
          }
        }
      }

      // divider line & gap
      + dl {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px dashed `,`;
      }
    }
  `])),o.headerHeight,o.headerHeight,o.colorSplit,o.colorText,o.fontSize,o.lineHeight,o.colorTextSecondary,o.colorText,o.colorFillTertiary,o.colorPrimaryText,o.colorPrimaryBg,o.colorPrimaryTextHover,o.colorPrimaryBgHover,o.colorBorder)}}),Pr=function(){var e=(0,C.HX)(function(i){return i.sidebar},j()),o=Rr(),t=o.styles,c=!e||e.length===0;return c?null:(0,r.jsx)("div",{className:t.sidebar,children:e.map(function(i,s){return(0,r.jsxs)("dl",{children:[i.title&&(0,r.jsx)("dt",{children:i.title}),i.children.map(function(u){return(0,r.jsx)("dd",{children:(0,r.jsx)(v.OL,{to:u.link,title:u.title,end:!0,children:u.title})},u.link)})]},String(s))})})},Zr=(0,d.memo)(Pr),Ir=l(25617),Ur=l(66271),Ye=l(62639),dn=l(62023),un=l(12004),Vr=l(65720),gn,pn,bn,fn,Kr=(0,F.kc)(function(n){var e=n.token,o=n.stylish,t=n.prefixCls,c=n.responsive,i=n.css,s=36;return{container:i(gn||(gn=(0,y.Z)([`
      grid-area: toc;
      position: sticky;
      top: 100px;
      width: `,`px;
      margin-inline-end: 24px;
      max-height: 80vh;
      overflow: auto;
      margin-top: 48px;
      z-index: 10;

      `,` {
        z-index: 300;
        top: `,`px;
        margin-top: 0;
        width: 100%;
      }

      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;

      > h4 {
        margin: 0 0 8px;
        color: `,`;
        font-size: 12px;
        line-height: 1;
      }
    `])),e.tocWidth,c.mobile,e.headerHeight+1,e.colorTextDescription),mobileCtn:i(pn||(pn=(0,y.Z)([`
      position: sticky;
      top: `,`px;

      height: `,`px;
      width: 100%;
      z-index: 200;
      background: transparent;
      background: `,`;
    `])),e.headerHeight+1,s,(0,Y.m4)(e.colorBgContainer,.8)),expand:i(bn||(bn=(0,y.Z)([`
      backdrop-filter: blur(6px);
      border-radius: 0;
      border-bottom: 1px solid `,`;

      box-shadow: `,`;
      width: 100%;
      z-index: 201;
      background: `,`;

      .`,`-collapse-header {
        padding: 8px 16px !important;
      }
    `])),e.colorSplit,e.boxShadowSecondary,(0,Y.m4)(e.colorBgContainer,.8),t),anchor:i(fn||(fn=(0,y.Z)([`
      `,`
    `])),o.blur)}}),Gr=(0,d.memo)(function(n){var e=n.items,o=n.activeKey,t=n.onChange,c=(0,Vr.Z)("",{value:o,onChange:t}),i=(0,pe.Z)(c,2),s=i[0],u=i[1],g=Kr(),p=g.styles,b=ce(),x=b.mobile,h=(0,F.Fg)(),M=e.find(function(A){return A.id===s}),w=(0,d.useMemo)(function(){return e.map(function(A){var S;return{href:"#".concat(A.id),title:A.title,key:A.id,children:(S=A.children)===null||S===void 0?void 0:S.map(function(H){return{href:"#".concat(H.id),title:H==null?void 0:H.title,key:H.id}})}})},[e]);return((e==null?void 0:e.length)===0?null:x?(0,r.jsx)(Ye.ZP,{theme:{token:{fontSize:12,sizeStep:3}},children:(0,r.jsx)("div",{className:p.mobileCtn,children:(0,r.jsx)(dn.Z,{bordered:!1,ghost:!0,expandIconPosition:"end",expandIcon:function(S){var H=S.isActive;return H?(0,r.jsx)(Ir.Z,{}):(0,r.jsx)(Ur.Z,{})},className:p.expand,children:(0,r.jsx)(dn.Z.Panel,{forceRender:!0,header:M?M.title:"\u76EE\u5F55",children:(0,r.jsx)(Ye.ZP,{theme:{token:{fontSize:14,sizeStep:4}},children:(0,r.jsx)(un.Z,{onChange:function(S){u(S.replace("#",""))},targetOffset:h.headerHeight+12,items:w})})},"toc")})})}):(0,r.jsxs)("div",{className:p.container,children:[(0,r.jsx)("h4",{children:"Table of Contents"}),(0,r.jsx)(un.Z,{items:w,className:p.anchor,targetOffset:h.headerHeight+12})]}))||null}),Qr=Gr,Xr=(0,d.memo)(function(){var n=(0,C.HX)(no,j());return(0,r.jsx)(Qr,{items:n})}),Yr=Xr,_r=l(23299),_e=l(65271),mn=l(90429),Jr=l(3642),$r=l(874),qr=l.n($r),ea=l(64913),hn=l(56676),oa=l(23722),kn,na=(0,F.kc)(function(n){var e=n.css,o=n.token;return e(kn||(kn=(0,y.Z)([`
      cursor: pointer;
      &:hover {
        background: `,`;
        border-radius: 4px;
      }
      pre {
        background: none !important;
        padding: 2px 8px !important;
        margin: 0;
      }
      code[class*='language-'] {
        background: none !important;
      }
    `])),o.colorFillSecondary)}),ta=function(e){var o=e.children,t=na(),c=t.styles,i=t.theme,s=ce(),u=s.mobile,g=(0,oa.M)(),p=g.copied,b=g.setCopied;return(0,r.jsx)(en.Z,{placement:u?void 0:"right",title:p?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(Jr.Z,{style:{color:i.colorSuccess}})," \u590D\u5236\u6210\u529F"]}):"\u590D\u5236",children:(0,r.jsx)("div",{className:c,onClick:function(){qr()(o),b()},children:(0,r.jsx)(ea.oP,{background:!1,type:"prism",copyable:!1,syntaxThemes:{prism:{dark:hn.YC,light:hn.vs}},language:"js",children:o})})})},ra=ta,yn,vn,xn,wn,Sn,aa=(0,F.kc)(function(n){var e=n.css,o=n.token,t=n.responsive,c=n.stylish;return{title:e(yn||(yn=(0,y.Z)([`
    font-family: monospace;
    `,` {
      margin-block: 0;
      font-size: 32px !important;
    }
  `])),t.mobile),label:e(vn||(vn=(0,y.Z)([`
    width: 80px;
  `]))),desc:e(xn||(xn=(0,y.Z)([`
    font-size: `,`px;
    line-height: `,`px;
  `])),o.fontSizeLG,o.lineHeightLG),text:e(wn||(wn=(0,y.Z)([`
    `,`
  `])),c.clickableText),meta:e(Sn||(Sn=(0,y.Z)([""])))}}),la=(0,d.memo)(function(n){var e=n.title,o=n.componentName,t=n.description,c=n.defaultImport,i=n.pkg,s=n.sourceUrl,u=n.docUrl,g=n.serviceList,p=g===void 0?[]:g,b=aa(),x=b.styles,h=ce(),M=h.mobile,w=[s&&{icon:(0,r.jsx)(qo.Z,{}),children:"\u67E5\u770B\u6E90\u7801",url:s},u&&{icon:(0,r.jsx)(_r.Z,{}),children:"\u7F16\u8F91\u6587\u6863",url:u}].filter(function(S){return S}),A=c?"import ".concat(o," from '").concat(i,"';"):"import { ".concat(o," } from '").concat(i,"';");return(0,r.jsxs)(O.D,{children:[(0,r.jsx)(_e.Z.Title,{className:x.title,children:e}),t&&(0,r.jsx)("div",{children:(0,r.jsx)(_e.Z.Text,{type:"secondary",className:x.desc,children:t})}),(0,r.jsxs)(O.D,{style:{marginTop:16},gap:M?16:24,children:[(0,r.jsxs)(O.D,{horizontal:!M,gap:M?12:0,children:[(0,r.jsx)(_e.Z.Text,{className:x.label,type:"secondary",style:{display:"flex",alignItems:"center"},children:"\u5F15\u5165\u65B9\u6CD5"}),(0,r.jsx)(ra,{children:A})]}),(0,r.jsx)(Oe.Z,{dashed:!0,style:{margin:"2px 0"}}),(0,r.jsxs)(O.D,{horizontal:!M,gap:M?24:0,distribution:"space-between",children:[(0,r.jsx)(mn.Z,{split:(0,r.jsx)(Oe.Z,{type:"vertical"}),wrap:!0,children:p.map(function(S){return(0,r.jsx)("a",{href:S.url,target:"_blank",rel:"noreferrer",title:S.label,children:(0,r.jsxs)(O.D,{horizontal:!0,align:"center",gap:8,className:x.text,children:[(0,r.jsx)(r.Fragment,{children:S.icon}),(0,r.jsx)(r.Fragment,{children:S.children})]})},S.label)})}),(0,r.jsx)(mn.Z,{split:(0,r.jsx)(Oe.Z,{type:"vertical"}),className:x.meta,children:w.map(function(S){return(0,r.jsx)("a",{href:S.url,target:"_blank",rel:"noreferrer",children:(0,r.jsxs)(O.D,{horizontal:!0,align:"center",gap:8,className:x.text,children:[(0,r.jsx)(r.Fragment,{children:S.icon}),(0,r.jsx)(r.Fragment,{children:S.children})]})},S.url)})})]})]})]})}),ca=(0,d.memo)(function(){return(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"64 64 896 896",fill:"currentColor",children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M503.783 64 960 263.576V761.46L521.625 955.734V473.5h-17.5v486.351l-.342.149L64 761.46V263.576L503.783 64Zm.13 19.158L84.37 273.548 512 466.131 939.386 273.66l-435.473-190.5Z"})})}),ia=(0,d.memo)(function(){return(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"currentColor",children:(0,r.jsx)("path",{d:"M14.051 2.751l4.935 2.85a2.144 2.144 0 013.409.4 2.146 2.146 0 01-1.354 3.151v5.699a2.132 2.132 0 011.348 3.15 2.143 2.143 0 01-3.453.353l-4.905 2.832a2.14 2.14 0 11-4.171.678c0-.205.029-.41.088-.609l-4.936-2.847a2.14 2.14 0 11-2.052-3.559l.001-5.699A2.141 2.141 0 011.604 6a2.143 2.143 0 013.407-.405l4.938-2.85A2.138 2.138 0 0112 0a2.137 2.137 0 012.051 2.751zm-.515.877a.793.793 0 01-.058.058l6.461 11.19c.026-.009.056-.016.082-.023V9.146a2.135 2.135 0 01-1.558-2.588l.019-.072-4.946-2.858zm-3.015.059l-.06-.06-4.946 2.852a2.136 2.136 0 01-1.461 2.645l-.076.021v5.708l.084.023 6.461-11.19-.002.001zm2.076.507c-.39.112-.803.112-1.192 0l-6.46 11.189c.294.283.502.645.6 1.041h12.911c.097-.398.307-.761.603-1.044L12.597 4.194zm.986 16.227l4.913-2.838a1.748 1.748 0 01-.038-.142H5.542l-.021.083 4.939 2.852a2.126 2.126 0 011.54-.653c.627 0 1.19.269 1.583.698z"})})}),sa=(0,d.memo)(function(){return(0,r.jsx)("svg",{width:"14px",height:"14px",viewBox:"0 0 14 14",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",children:(0,r.jsx)("path",{d:"M13,0 C13.5522847,-1.01453063e-16 14,0.44771525 14,1 L14,13 C14,13.5522847 13.5522847,14 13,14 L1,14 C0.44771525,14 -4.87476137e-16,13.5522847 0,13 L0,1 C-6.76353751e-17,0.44771525 0.44771525,-4.5365845e-16 1,0 L13,0 Z M11.375,2.625 L2.625,2.625 L2.625,11.375 L7,11.375 L7,4.375 L9.625,4.375 L9.625,11.375 L11.375,11.375 L11.375,2.625 Z",fill:"#C12127"})})}),da=(0,d.memo)(function(){return(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 108 108",children:[(0,r.jsx)("defs",{children:(0,r.jsxs)("linearGradient",{id:"main",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#006838"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#32de85"})]})}),(0,r.jsx)("path",{fill:"url(#main)",d:"M21.667 73.809V33.867l28.33-16.188 28.337 16.188V66.13L49.997 82.321 35 73.75V41.604l14.997-8.57L65 41.604v16.788l-15.003 8.571-1.663-.95v-16.67l8.382-4.792-6.719-3.838-8.33 4.763V69.88l8.33 4.762 21.67-12.383V37.737l-21.67-12.379-21.663 12.379v39.88L49.997 90 85 70V30L49.997 10 15 30v40z",transform:"matrix(1.25 0 0 1.25 -8.75 -7.5)"})]})}),ua=(0,d.memo)(function(){return(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"currentColor",children:(0,r.jsx)("path",{d:"M16.509 16.845c.148-.507.091-.97-.155-1.315-.225-.317-.605-.5-1.062-.521l-8.659-.113a.155.155 0 01-.134-.071.194.194 0 01-.02-.155.239.239 0 01.203-.156l8.736-.113c1.034-.048 2.16-.886 2.554-1.913l.5-1.301a.28.28 0 00.013-.168 5.69 5.69 0 00-10.938-.584 2.585 2.585 0 00-1.793-.5 2.561 2.561 0 00-2.223 3.18 3.634 3.634 0 00-3.53 3.636c0 .176.013.352.034.528a.174.174 0 00.169.148h15.981a.22.22 0 00.204-.155zm2.757-5.564c-.077 0-.162 0-.24.011-.055 0-.105.042-.126.098l-.337 1.175c-.148.506-.092.97.154 1.315.226.317.605.5 1.063.52l1.843.114c.056 0 .105.026.133.07a.2.2 0 01.021.156.238.238 0 01-.204.155l-1.92.113c-1.041.049-2.16.887-2.553 1.914l-.141.358c-.028.071.02.141.098.141h6.598a.173.173 0 00.17-.125 4.81 4.81 0 00.175-1.28 4.739 4.739 0 00-4.734-4.727"})})});function zn(n,e){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter(function(c){return Object.getOwnPropertyDescriptor(n,c).enumerable})),o.push.apply(o,t)}return o}function ga(n){for(var e=1;e<arguments.length;e++){var o=arguments[e]!=null?arguments[e]:{};e%2?zn(Object(o),!0).forEach(function(t){(0,E.Z)(n,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):zn(Object(o)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(o,t))})}return n}var pa=(0,d.memo)(function(){var n=(0,C.HX)(wo),e=n.pkg,o=(0,d.useMemo)(function(){return[{label:"NPM",icon:(0,r.jsx)(sa,{}),children:"NPM",url:"https://www.npmjs.com/package/".concat(e)},{label:"\u9884\u89C8\u4EA7\u7269",icon:(0,r.jsx)(ua,{}),children:"UNPKG",url:"https://unpkg.com/browse/".concat(e,"/")},{label:"\u67E5\u9605\u4EA7\u7269\u4F53\u79EF",icon:(0,r.jsx)(ca,{}),children:"BundlePhobia",url:"https://bundlephobia.com/package/".concat(e)},{label:"\u67E5\u9605\u5B89\u88C5\u5305\u4F53\u79EF",icon:(0,r.jsx)(da,{}),children:"PackagePhobia",url:"https://packagephobia.com/result?p=".concat(e)},{label:"\u5206\u6790\u4F9D\u8D56\u56FE",icon:(0,r.jsx)(ia,{}),children:"Anvaka Graph",url:"https://npm.anvaka.com/#/view/2d/".concat(e)}]},[e]);return(0,r.jsx)(la,ga({serviceList:o},n))}),ba=pa,Mn,An,Cn,fa=(0,F.kc)(function(n,e){var o=n.css,t=n.cx,c=n.responsive,i=n.token,s=e.hideToc,u=e.hideSidebar;return{layout:o(Mn||(Mn=(0,y.Z)([`
      background-color: `,`;
      background-image: linear-gradient(
        180deg,
        `,` 0%,
        rgba(255, 255, 255, 0) 10%
      );
      display: grid;
      grid-template-columns: `,"px 1fr ",`;
      grid-template-rows: `,`px auto 1fr auto;
      grid-template-areas:
        'head head head'
        '`," title ",`'
        '`," main ",`'
        '`,` footer footer';
      min-height: 100vh;

      `,` {
        display: flex;
        flex-direction: column;
      }
    `])),i.colorBgLayout,i.colorBgContainer,i.sidebarWidth,s?"":"".concat(i.tocWidth+24,"px"),i.headerHeight,u?"title":"sidebar",s?"title":".",u?"main":"sidebar",s?"main":"toc",u?"footer":"sidebar",c.mobile),toc:o(An||(An=(0,y.Z)([`
      position: sticky;
      top: 100px;
      width: `,`px;
      margin-inline-end: 24px;
      max-height: 80vh;
      overflow: auto;
      margin-top: 48px;

      `,` {
        z-index: 300;
        top: `,`px;
        margin-top: 0;
        width: 100%;
      }

      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;

      > h4 {
        margin: 0 0 8px;
        color: `,`;
        font-size: 12px;
        line-height: 1;
      }
    `])),i.tocWidth,c.mobile,i.headerHeight+1,i.colorTextDescription),content:t(o(Cn||(Cn=(0,y.Z)([`
        max-width: 960px;
        width: 100%;
        margin: 0 24px;
      `]))),o(c({desktop:{maxWidth:i.contentMaxWidth},mobile:{margin:0}})))}}),ma=(0,d.memo)(function(){var n=(0,v.pC)(),e=ce(),o=e.mobile,t=(0,C.HX)(function(h){return h.routeMeta.frontmatter},j()),c=(0,C.HX)(Kt),i=(0,C.HX)(mo),s=(0,C.HX)(function(h){return no(h).length===0}),u=t.sidebar===!1,g=t.toc===!1||s,p=fa({hideToc:g,hideSidebar:u}),b=p.styles,x=p.theme;return(0,r.jsxs)("div",{className:b.layout,children:[(0,r.jsx)(v.ql,{children:t.title&&(0,r.jsxs)("title",{children:[t.title," - ",i]})}),(0,r.jsx)(cn,{}),g?null:(0,r.jsx)(Yr,{}),o||u?null:(0,r.jsx)(Zr,{}),c?(0,r.jsx)(O.D,{style:{gridArea:"title",paddingBlock:o?24:void 0},children:(0,r.jsx)(ie.Z,{children:(0,r.jsx)(O.D,{style:{maxWidth:x.contentMaxWidth,width:"100%"},children:(0,r.jsx)(O.D,{style:{paddingBlock:0,paddingInline:o?16:48},children:(0,r.jsx)(ba,{})})})})}):null,(0,r.jsx)(O.D,{style:{zIndex:10,gridArea:"main",margin:o?0:24,marginBottom:o?0:48},children:(0,r.jsx)(ie.Z,{width:"100%",children:(0,r.jsx)(O.D,{className:b.content,children:(0,r.jsx)(O.D,{horizontal:!0,children:(0,r.jsx)(xt,{children:n})})})})}),(0,r.jsx)(vo,{})]})}),ha=ma,ka=l(10881),jn,Hn,On,Tn,Dn,Fn,Bn,Wn,En,Ln,ya=(0,F.kc)(function(n,e){var o=n.token,t=n.prefixCls,c=n.responsive,i=n.css,s=n.stylish,u=n.isDarkMode,g=n.cx,p=e.rowNum,b=e.hasLink,x="".concat(t,"-features"),h="".concat(x,"-cover"),M="".concat(x,"-description"),w="".concat(x,"-title"),A="".concat(x,"-img"),S=20,H=function(V){return i(jn||(jn=(0,y.Z)([`
      width: `,`px;
      height: `,`px;
      font-size: `,`px;
    `])),V,V,V*(22/24))},L=i(Hn||(Hn=(0,y.Z)([`
      transition: all `," ",`;
    `])),o.motionDurationSlow,o.motionEaseInOutCirc);return{cell:i(On||(On=(0,y.Z)([`
        overflow: hidden;
      `]))),container:i(Tn||(Tn=(0,y.Z)([`
        `,`;

        z-index: 1;
        padding: 24px;
        border-radius: 24px;

        background: linear-gradient(
          135deg,
          `,`,
          `,`
        );

        position: relative;

        &:hover {
          scale: 1.03;

          background: linear-gradient(
            135deg,
            `,`,
            `,`
          );

          box-shadow: inset 0 0 0 1px `,", ",`;

          .`,` {
            height: `,`px;
            width: 100%;
            padding: 0;
          }

          .`,` {
            `,`;
          }

          .`,` {
            position: absolute;
            visibility: hidden;
            opacity: 0;
          }

          .`,` {
            font-size: `,`px;
          }
        }
      `])),L,o.colorFillContent,o.colorFillQuaternary,(0,Y.$n)(.5,o.colorFillContent),(0,Y.$n)(.5,o.colorFillQuaternary),o.colorBorder,o.boxShadowSecondary,h,S*p,A,H(100),M,w,b?14:20),title:g(w,L,i(Dn||(Dn=(0,y.Z)([`
          pointer-events: none;
          font-size: 20px;
          line-height: `,`;
          margin: 16px 0;
          color: `,`;
        `])),o.lineHeightHeading3,o.colorText)),desc:g(M,L,i(Fn||(Fn=(0,y.Z)([`
          color: `,`;

          pointer-events: none;
          quotient {
            color: `,`;
            display: block;
            margin: 12px 0;
            padding-left: 12px;
            position: relative;
            &:before {
              position: absolute;
              content: '';
              left: 0;
              display: block;
              border-radius: 2px;
              width: 4px;
              height: 100%;
              background: `,`;
            }
          }
        `])),o.colorTextSecondary,o.colorTextDescription,u?o.colorPrimary:o.colorPrimaryBgHover)),imgContainer:g(h,L,i(Bn||(Bn=(0,y.Z)([`
          background: `,`;
          border-radius: 8px;
          opacity: 0.8;

          `,`;
          padding: 4px;

          &[image-style='primary'] {
            background: linear-gradient(135deg, `,", ",`);
          }

          &[image-style='light'] {
            background: `,`;
          }

          &[image-style='soon'] {
            opacity: 0.5;
            background: linear-gradient(
              135deg,
              `,`,
              `,` 50%,
              `,`
            );
          }
        `])),o.colorFillContent,H(24),o.gradientColor1,o.gradientColor2,o.colorBgContainer,(0,Y.m4)(o.gradientColor2,.3),(0,Y.m4)(o.gradientColor2,.3),(0,Y.m4)(o.gradientColor1,.3))),img:g(A,L,i(Wn||(Wn=(0,y.Z)([`
          `,`;
          color: `,`;
        `])),H(20),o.colorWhite)),link:i(En||(En=(0,y.Z)([`
        `,`;

        margin-top: 24px;

        a {
          `,`;

          color: `,`;
          &:hover {
            color: `,`;
          }
        }
      `])),L,s.resetLinkColor,o.colorTextDescription,o.colorPrimaryHover),blur:i(Ln||(Ln=(0,y.Z)([`
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        `,`;
        scale: 2;
        opacity: `,`;
        `,` {
          display: none;
        }
      `])),s.heroBlurBall,u?.05:.08,c.mobile)}}),va=function(e){var o=e.image,t=e.className,c=e.title,i=/(\.png|\.jpg|\.jpeg|\.gif|\.svg|\.webp)$/;return o.startsWith("http")||i.test(o)?(0,r.jsx)("img",{className:t,src:o,alt:c}):(0,r.jsx)(ie.Z,{className:t,children:o})},xa=function(e){var o=e.imageType,t=e.row,c=e.column,i=e.hero,s=e.description,u=e.image,g=e.title,p=e.link,b=e.imageStyle,x=e.openExternal,h=t||7,M=ya({rowNum:h,hasLink:!!p}),w=M.styles,A=M.theme;return(0,r.jsxs)("div",{className:w.container,style:{gridRow:"span ".concat(h),gridColumn:"span ".concat(c||1),cursor:p?"pointer":"default"},onClick:function(){p&&(x?window.open(p):v.m8.push(p))},children:[(0,r.jsxs)("div",{className:w.cell,children:[u&&(0,r.jsx)(ie.Z,{"image-style":o,className:w.imgContainer,style:b,children:(0,r.jsx)(va,{className:w.img,image:u,title:g})}),g&&(0,r.jsxs)(O.D,{as:"h3",horizontal:!0,gap:8,align:"center",className:w.title,children:[g,o==="soon"?(0,r.jsx)(ka.Z,{color:A.isDarkMode?"pink-inverse":"cyan-inverse",children:"SOON"}):null]}),s&&(0,r.jsx)("p",{dangerouslySetInnerHTML:{__html:s},className:w.desc}),p&&(0,r.jsx)("div",{className:w.link,children:(0,r.jsxs)(v.rU,{to:p,children:["\u7ACB\u5373\u4E86\u89E3 ",(0,r.jsx)(ro.Z,{})]})})]}),i&&(0,r.jsx)("div",{className:w.blur})]})},wa=xa,Nn,Rn,Sa=(0,F.kc)(function(n){var e=n.token,o=n.prefixCls,t=n.responsive,c=n.css,i=n.cx,s="".concat(o,"-features");return{container:i(s,c(Nn||(Nn=(0,y.Z)([`
        max-width: `,`px;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: row dense;
        grid-auto-rows: 24px;
        gap: 16px;

        `,`
      `])),e.contentMaxWidth,t({mobile:c(Rn||(Rn=(0,y.Z)([`
            flex-direction: column;
            display: flex;
          `]))),laptop:{gridTemplateColumns:"repeat(2, 1fr)"}})))}});function Pn(n,e){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter(function(c){return Object.getOwnPropertyDescriptor(n,c).enumerable})),o.push.apply(o,t)}return o}function za(n){for(var e=1;e<arguments.length;e++){var o=arguments[e]!=null?arguments[e]:{};e%2?Pn(Object(o),!0).forEach(function(t){(0,E.Z)(n,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):Pn(Object(o)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(o,t))})}return n}var Ma=function(e){var o=e.items,t=e.style,c=Sa(),i=c.styles;return o!=null&&o.length?(0,r.jsx)("div",{className:i.container,style:t,children:o.map(function(s){return(0,r.jsx)(wa,za({},s),s.title)})}):null},Aa=Ma,Zn=function(e){return!!e.routeMeta.frontmatter.hero},Ca=function(e){var o,t;return!!((o=e.routeMeta.frontmatter.hero)!==null&&o!==void 0&&o.showCustomContent)||!!((t=e.siteData.themeConfig.hero)!==null&&t!==void 0&&t.showCustomContent)},se=function(e,o){if(o)return o[e.locale.id]?o[e.locale.id]:o},ja=function(e){var o,t;return((o=e.routeMeta.frontmatter.hero)===null||o===void 0?void 0:o.title)||((t=se(e,e.siteData.themeConfig.hero))===null||t===void 0?void 0:t.title)||se(e,e.siteData.themeConfig.title)||e.siteData.themeConfig.name},Ha=function(e){var o,t;return((o=e.routeMeta.frontmatter.hero)===null||o===void 0?void 0:o.description)||((t=se(e,e.siteData.themeConfig.hero))===null||t===void 0?void 0:t.description)||se(e,e.siteData.themeConfig.description)},Oa=function(e){var o,t;return((o=e.routeMeta.frontmatter.hero)===null||o===void 0?void 0:o.actions)||((t=se(e,e.siteData.themeConfig.hero))===null||t===void 0?void 0:t.actions)||se(e,e.siteData.themeConfig.actions)},Ta=function(e){var o;return Zn(e)?((o=se(e,e.siteData.themeConfig.hero))===null||o===void 0?void 0:o.features)||se(e,e.siteData.themeConfig.features)||e.routeMeta.frontmatter.features||[]:[]},Da=function(){var e=(0,C.HX)(Ta,Fe);return e!=null&&e.length?(0,r.jsx)(Aa,{items:e,style:{margin:"0 16px"}}):null},Fa=Da,In,Ba=(0,F.kc)(function(n){var e=n.css,o=n.stylish;return{button:e(In||(In=(0,y.Z)([`
      border: none;

      `,`
      `,`

      background-size: 200% 100%;

      &:hover {
        animation: none;
      }
    `])),o.heroButtonGradient,o.heroGradientFlow)}}),Wa=function(e){var o=e.children,t=Ba(),c=t.styles;return(0,r.jsx)(Te.ZP,{size:"large",shape:"round",type:"primary",className:c.button,children:o})},Ea=Wa,Un,Vn,Kn,Gn,Qn,Xn,Yn,La=(0,F.kc)(function(n){var e=n.css,o=n.responsive,t=n.token,c=n.stylish,i=n.isDarkMode;return{container:e(Un||(Un=(0,y.Z)([`
    position: relative;
    text-align: center;
    box-sizing: border-box;

    + * {
      position: relative;
    }

    > p {
      margin: 32px;
      color: `,`;
      font-size: 20px;
      line-height: 1.6;

      `,`
    }
  `])),t.colorTextSecondary,o({mobile:{fontSize:16}})),titleContainer:e(Vn||(Vn=(0,y.Z)([`
    position: relative;
  `]))),title:e(Kn||(Kn=(0,y.Z)([`
    font-size: 68px;
    z-index: 10;
    color: transparent;
    margin: 0;
    font-family: AliPuHui, `,`;

    `,`

    b {
      position: relative;
      z-index: 5;
      `,`;
      `,`

      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `])),t.fontFamily,o({mobile:{fontSize:40}}),c.heroGradient,c.heroGradientFlow),titleShadow:e(Gn||(Gn=(0,y.Z)([`
    position: absolute;
    z-index: 0;
    color: `,`;

    top: 0;
    left: 0;
    font-size: 68px;
    font-family: AliPuHui, `,`;
    font-weight: bold;
    `,`

    `,`

    b {
      color: transparent;
    }
  `])),i?t.colorWhite:t.colorTextBase,t.fontFamily,o({mobile:{fontSize:40}}),c.heroTextShadow),desc:e(Qn||(Qn=(0,y.Z)([`
    font-size: `,`px;
    color: `,`;

    `,` {
      font-size: `,`px;
      margin: 24px 16px;
    }
  `])),t.fontSizeHeading3,t.colorTextSecondary,o.mobile,t.fontSizeHeading5),actions:e(Xn||(Xn=(0,y.Z)([`
    margin-top: 48px;
    display: flex;
    justify-content: center;

    `,`
  `])),o({mobile:{marginTop:24}})),canvas:e(Yn||(Yn=(0,y.Z)([`
    z-index: 10;
    pointer-events: none;
    position: absolute;
    top: -250px;
    left: 50%;
    transform: translateX(-50%) scale(1.5);
    width: 600px;
    height: 400px;
    opacity: 0.2;
    `,`

    `,` {
      width: 200px;
      height: 300px;
    }
  `])),c.heroBlurBall,o.mobile)}}),Na=function(e){var o=e.title,t=e.description,c=e.actions,i=La(),s=i.styles,u=i.cx;return(0,r.jsxs)(O.D,{horizontal:!0,distribution:"center",className:s.container,children:[(0,r.jsx)("div",{className:s.canvas}),(0,r.jsxs)(ie.Z,{children:[o&&(0,r.jsxs)("div",{className:s.titleContainer,children:[(0,r.jsx)("h1",{className:s.title,dangerouslySetInnerHTML:{__html:o}}),(0,r.jsx)("div",{className:u(s.titleShadow),dangerouslySetInnerHTML:{__html:o}})]}),t&&(0,r.jsx)("p",{className:s.desc,dangerouslySetInnerHTML:{__html:t}}),!!(c!=null&&c.length)&&(0,r.jsx)(Ye.ZP,{theme:{token:{fontSize:16,controlHeight:40}},children:(0,r.jsx)(O.D,{horizontal:!0,gap:24,className:s.actions,children:c.map(function(g,p){var b=g.text,x=g.link,h=g.openExternal,M=/^(https?:)?\/\//i.test(x),w=p===0?(0,r.jsx)(Ea,{children:b}):(0,r.jsx)(Te.ZP,{size:"large",shape:"round",type:"default",children:b});return M?(0,r.jsx)("a",{href:x,target:"_blank",rel:"noopener noreferrer",children:w},"".concat(b,"-").concat(p)):(0,r.jsx)(v.rU,{to:x,target:h?"_blank":void 0,rel:"noreferrer",children:w},b)})})})]})]})},Ra=Na,Pa=function(){var e=(0,C.HX)(ja),o=(0,C.HX)(Ha),t=(0,C.HX)(Oa);return(0,r.jsx)(Ra,{title:e,actions:t,description:o})},Za=Pa,_n,Ia=(0,F.kc)(function(n){var e=n.token,o=n.prefixCls,t=n.css,c=n.cx,i="".concat(o,"-home-contents");return{container:c(i,t(_n||(_n=(0,y.Z)([`
        width: 100%;
        max-width: `,`px;
        padding: 0 16px;
        box-sizing: border-box;
      `])),e.contentMaxWidth))}}),Ua=(0,d.memo)(function(){var n=(0,C.HX)(mo),e=(0,v.pC)(),o=(0,C.HX)(Ca),t=Ia(),c=t.styles;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(v.ql,{children:(0,r.jsx)("title",{children:n})}),(0,r.jsxs)(O.D,{align:"center",gap:80,children:[(0,r.jsx)(cn,{}),(0,r.jsx)(Za,{}),(0,r.jsx)(Fa,{}),o&&(0,r.jsx)("div",{className:c.container,children:e}),(0,r.jsx)(vo,{})]})]})}),Va=Ua,Jn,Ka=(0,F.vJ)(Jn||(Jn=(0,y.Z)([`
  body {
    margin: 0;
    padding: 0;
    background-color: `,`;
  }

  @font-face {
    font-family: AliPuHui;
    font-weight: normal;
    src: url('//at.alicdn.com/t/webfont_exesdog9toj.woff2') format('woff2'),
    url('//at.alicdn.com/t/webfont_exesdog9toj.woff') format('woff'),
    url('//at.alicdn.com/t/webfont_exesdog9toj.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: AliPuHui;
    font-weight: bold;
    src: url('https://at.alicdn.com/wf/webfont/exMpJIukiCms/Gsw2PSKrftc1yNWMNlXgw.woff2') format('woff2'),
    url('https://at.alicdn.com/wf/webfont/exMpJIukiCms/vtu73by4O2gEBcvBuLgeu.woff') format('woff');
    font-display: swap;
  }

  /* \u5B9A\u4E49\u6EDA\u52A8\u69FD\u7684\u6837\u5F0F */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    margin-right: 4px;
    background-color: transparent; // \u5B9A\u4E49\u6EDA\u52A8\u69FD\u7684\u80CC\u666F\u8272

    &-thumb {
      background-color: `,`; // \u5B9A\u4E49\u6EDA\u52A8\u5757\u7684\u80CC\u666F\u8272
      border-radius: 4px; // \u5B9A\u4E49\u6EDA\u52A8\u5757\u7684\u5706\u89D2\u534A\u5F84
    }

    &-corner {
      display: none;
    }
  }
`])),function(n){return n.theme.colorBgLayout},function(n){var e=n.theme;return e.colorFill}),Ga=(0,d.memo)(function(){var n=(0,v.YB)(),e=(0,v.TH)(),o=e.hash,t=(0,C.HX)(function(s){return s.routeMeta.frontmatter}),c=(0,C.HX)(Zn),i=(0,C.HX)(function(s){return s.siteData.loading});return(0,d.useEffect)(function(){var s=o.replace("#","");s&&setTimeout(function(){var u=document.getElementById(decodeURIComponent(s));u&&(u.scrollIntoView(),window.scrollBy({top:-80}))},1)},[i,o]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(v.ql,{children:[(0,r.jsx)("html",{lang:n.locale.replace(/-.+$/,"")}),t.title&&(0,r.jsx)("meta",{property:"og:title",content:t.title}),t.description&&(0,r.jsx)("meta",{name:"description",content:t.description}),t.description&&(0,r.jsx)("meta",{property:"og:description",content:t.description}),t.keywords&&(0,r.jsx)("meta",{name:"keywords",content:t.keywords.join(",")}),t.keywords&&(0,r.jsx)("meta",{property:"og:keywords",content:t.keywords.join(",")})]}),c?(0,r.jsx)(Va,{}):(0,r.jsx)(ha,{})]})});l.g.__ANTD_CACHE__=R.cache;var Qa=function(e){var o=e.children,t=(0,C.HX)(So,j());return(0,r.jsx)(ee,{cache:R.cache,token:t,children:o})},Xa=(0,d.memo)(function(n){var e=n.initState;return(0,r.jsxs)(C.zt,{createStore:function(){return(0,C.MT)(e)},children:[(0,r.jsx)(st,{}),(0,r.jsxs)(Qa,{children:[(0,r.jsx)(Ka,{}),(0,r.jsx)(Ga,{})]})]})}),Ya=function(){var n=(0,v.WF)(),e=(0,v.tx)(),o=(0,v.eL)(),t=(0,v.zh)(),c=(0,v.OK)(),i=(0,v.TH)(),s=(0,v.bU)(),u=(0,d.useMemo)(function(){return{siteData:n,navData:c,locale:s,location:i,routeMeta:o,tabMeta:t,sidebar:e}},[]);return(0,r.jsx)(Xa,{initState:u})}},74396:function(k,a,l){var f=l(29165),m=f.Symbol;k.exports=m},80732:function(k,a,l){var f=l(74396),m=l(31239),N=l(57058),r="[object Null]",W="[object Undefined]",U=f?f.toStringTag:void 0;function R(v){return v==null?v===void 0?W:r:U&&U in Object(v)?m(v):N(v)}k.exports=R},33124:function(k,a,l){var f=l(82996),m=/^\s+/;function N(r){return r&&r.slice(0,f(r)+1).replace(m,"")}k.exports=N},96476:function(k,a,l){var f=typeof l.g=="object"&&l.g&&l.g.Object===Object&&l.g;k.exports=f},31239:function(k,a,l){var f=l(74396),m=Object.prototype,N=m.hasOwnProperty,r=m.toString,W=f?f.toStringTag:void 0;function U(R){var v=N.call(R,W),P=R[W];try{R[W]=void 0;var j=!0}catch(E){}var d=r.call(R);return j&&(v?R[W]=P:delete R[W]),d}k.exports=U},57058:function(k){var a=Object.prototype,l=a.toString;function f(m){return l.call(m)}k.exports=f},29165:function(k,a,l){var f=l(96476),m=typeof self=="object"&&self&&self.Object===Object&&self,N=f||m||Function("return this")();k.exports=N},82996:function(k){var a=/\s/;function l(f){for(var m=f.length;m--&&a.test(f.charAt(m)););return m}k.exports=l},66292:function(k,a,l){var f=l(36838),m=l(76668),N=l(12448),r="Expected a function",W=Math.max,U=Math.min;function R(v,P,j){var d,E,G,_,Z,Q,J=0,ue=!1,ee=!1,le=!0;if(typeof v!="function")throw new TypeError(r);P=N(P)||0,f(j)&&(ue=!!j.leading,ee="maxWait"in j,G=ee?W(N(j.maxWait)||0,P):G,le="trailing"in j?!!j.trailing:le);function oe(D){var X=d,te=E;return d=E=void 0,J=D,_=v.apply(te,X),_}function xe(D){return J=D,Z=setTimeout(ne,P),ue?oe(D):_}function we(D){var X=D-Q,te=D-J,ge=P-X;return ee?U(ge,G-te):ge}function fe(D){var X=D-Q,te=D-J;return Q===void 0||X>=P||X<0||ee&&te>=G}function ne(){var D=m();if(fe(D))return Se(D);Z=setTimeout(ne,we(D))}function Se(D){return Z=void 0,le&&d?oe(D):(d=E=void 0,_)}function me(){Z!==void 0&&clearTimeout(Z),J=0,d=Q=E=Z=void 0}function je(){return Z===void 0?_:Se(m())}function he(){var D=m(),X=fe(D);if(d=arguments,E=this,Q=D,X){if(Z===void 0)return xe(Q);if(ee)return clearTimeout(Z),Z=setTimeout(ne,P),oe(Q)}return Z===void 0&&(Z=setTimeout(ne,P)),_}return he.cancel=me,he.flush=je,he}k.exports=R},36838:function(k){function a(l){var f=typeof l;return l!=null&&(f=="object"||f=="function")}k.exports=a},55073:function(k){function a(l){return l!=null&&typeof l=="object"}k.exports=a},16764:function(k,a,l){var f=l(80732),m=l(55073),N="[object Symbol]";function r(W){return typeof W=="symbol"||m(W)&&f(W)==N}k.exports=r},76668:function(k,a,l){var f=l(29165),m=function(){return f.Date.now()};k.exports=m},12448:function(k,a,l){var f=l(33124),m=l(36838),N=l(16764),r=NaN,W=/^[-+]0x[0-9a-f]+$/i,U=/^0b[01]+$/i,R=/^0o[0-7]+$/i,v=parseInt;function P(j){if(typeof j=="number")return j;if(N(j))return r;if(m(j)){var d=typeof j.valueOf=="function"?j.valueOf():j;j=m(d)?d+"":d}if(typeof j!="string")return j===0?j:+j;j=f(j);var E=U.test(j);return E||R.test(j)?v(j.slice(2),E?2:8):W.test(j)?r:+j}k.exports=P},98600:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#f8f8f2",background:"none",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#f8f8f2",background:"#2b2b2b",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:"0.5em 0",overflow:"auto",borderRadius:"0.3em"},':not(pre) > code[class*="language-"]':{background:"#2b2b2b",padding:"0.1em",borderRadius:"0.3em",whiteSpace:"normal"},comment:{color:"#d4d0ab"},prolog:{color:"#d4d0ab"},doctype:{color:"#d4d0ab"},cdata:{color:"#d4d0ab"},punctuation:{color:"#fefefe"},property:{color:"#ffa07a"},tag:{color:"#ffa07a"},constant:{color:"#ffa07a"},symbol:{color:"#ffa07a"},deleted:{color:"#ffa07a"},boolean:{color:"#00e0e0"},number:{color:"#00e0e0"},selector:{color:"#abe338"},"attr-name":{color:"#abe338"},string:{color:"#abe338"},char:{color:"#abe338"},builtin:{color:"#abe338"},inserted:{color:"#abe338"},operator:{color:"#00e0e0"},entity:{color:"#00e0e0",cursor:"help"},url:{color:"#00e0e0"},".language-css .token.string":{color:"#00e0e0"},".style .token.string":{color:"#00e0e0"},variable:{color:"#00e0e0"},atrule:{color:"#ffd700"},"attr-value":{color:"#ffd700"},function:{color:"#ffd700"},keyword:{color:"#00e0e0"},regex:{color:"#ffd700"},important:{color:"#ffd700",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},55373:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#c5c8c6",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#c5c8c6",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em",background:"#1d1f21"},':not(pre) > code[class*="language-"]':{background:"#1d1f21",padding:".1em",borderRadius:".3em"},comment:{color:"#7C7C7C"},prolog:{color:"#7C7C7C"},doctype:{color:"#7C7C7C"},cdata:{color:"#7C7C7C"},punctuation:{color:"#c5c8c6"},".namespace":{Opacity:".7"},property:{color:"#96CBFE"},keyword:{color:"#96CBFE"},tag:{color:"#96CBFE"},"class-name":{color:"#FFFFB6",textDecoration:"underline"},boolean:{color:"#99CC99"},constant:{color:"#99CC99"},symbol:{color:"#f92672"},deleted:{color:"#f92672"},number:{color:"#FF73FD"},selector:{color:"#A8FF60"},"attr-name":{color:"#A8FF60"},string:{color:"#A8FF60"},char:{color:"#A8FF60"},builtin:{color:"#A8FF60"},inserted:{color:"#A8FF60"},variable:{color:"#C6C5FE"},operator:{color:"#EDEDED"},entity:{color:"#FFFFB6",cursor:"help"},url:{color:"#96CBFE"},".language-css .token.string":{color:"#87C38A"},".style .token.string":{color:"#87C38A"},atrule:{color:"#F9EE98"},"attr-value":{color:"#F9EE98"},function:{color:"#DAD085"},regex:{color:"#E9C062"},important:{color:"#fd971f",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},4247:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#f5f7ff",color:"#5e6687"},'pre[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#f5f7ff",color:"#5e6687",padding:"1em",margin:".5em 0",overflow:"auto"},'pre > code[class*="language-"]':{fontSize:"1em"},'pre[class*="language-"]::-moz-selection':{textShadow:"none",background:"#dfe2f1"},'pre[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#dfe2f1"},'code[class*="language-"]::-moz-selection':{textShadow:"none",background:"#dfe2f1"},'code[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#dfe2f1"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#dfe2f1"},'pre[class*="language-"] ::selection':{textShadow:"none",background:"#dfe2f1"},'code[class*="language-"]::selection':{textShadow:"none",background:"#dfe2f1"},'code[class*="language-"] ::selection':{textShadow:"none",background:"#dfe2f1"},':not(pre) > code[class*="language-"]':{padding:".1em",borderRadius:".3em"},comment:{color:"#898ea4"},prolog:{color:"#898ea4"},doctype:{color:"#898ea4"},cdata:{color:"#898ea4"},punctuation:{color:"#5e6687"},namespace:{Opacity:".7"},operator:{color:"#c76b29"},boolean:{color:"#c76b29"},number:{color:"#c76b29"},property:{color:"#c08b30"},tag:{color:"#3d8fd1"},string:{color:"#22a2c9"},selector:{color:"#6679cc"},"attr-name":{color:"#c76b29"},entity:{color:"#22a2c9",cursor:"help"},url:{color:"#22a2c9"},".language-css .token.string":{color:"#22a2c9"},".style .token.string":{color:"#22a2c9"},"attr-value":{color:"#ac9739"},keyword:{color:"#ac9739"},control:{color:"#ac9739"},directive:{color:"#ac9739"},unit:{color:"#ac9739"},statement:{color:"#22a2c9"},regex:{color:"#22a2c9"},atrule:{color:"#22a2c9"},placeholder:{color:"#3d8fd1"},variable:{color:"#3d8fd1"},deleted:{textDecoration:"line-through"},inserted:{borderBottom:"1px dotted #202746",textDecoration:"none"},italic:{fontStyle:"italic"},important:{fontWeight:"bold",color:"#c94922"},bold:{fontWeight:"bold"},"pre > code.highlight":{Outline:"0.4em solid #c94922",OutlineOffset:".4em"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"#dfe2f1"},".line-numbers .line-numbers-rows > span:before":{color:"#979db4"},".line-highlight.line-highlight":{background:"linear-gradient(to right, rgba(107, 115, 148, 0.2) 70%, rgba(107, 115, 148, 0))"}}},65886:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#fff",textShadow:"0 1px 1px #000",fontFamily:'Menlo, Monaco, "Courier New", monospace',direction:"ltr",textAlign:"left",wordSpacing:"normal",whiteSpace:"pre",wordWrap:"normal",lineHeight:"1.4",background:"none",border:"0",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#fff",textShadow:"0 1px 1px #000",fontFamily:'Menlo, Monaco, "Courier New", monospace',direction:"ltr",textAlign:"left",wordSpacing:"normal",whiteSpace:"pre",wordWrap:"normal",lineHeight:"1.4",background:"#222",border:"0",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"15px",margin:"1em 0",overflow:"auto",MozBorderRadius:"8px",WebkitBorderRadius:"8px",borderRadius:"8px"},'pre[class*="language-"] code':{float:"left",padding:"0 15px 0 0"},':not(pre) > code[class*="language-"]':{background:"#222",padding:"5px 10px",lineHeight:"1",MozBorderRadius:"3px",WebkitBorderRadius:"3px",borderRadius:"3px"},comment:{color:"#797979"},prolog:{color:"#797979"},doctype:{color:"#797979"},cdata:{color:"#797979"},selector:{color:"#fff"},operator:{color:"#fff"},punctuation:{color:"#fff"},namespace:{Opacity:".7"},tag:{color:"#ffd893"},boolean:{color:"#ffd893"},atrule:{color:"#B0C975"},"attr-value":{color:"#B0C975"},hex:{color:"#B0C975"},string:{color:"#B0C975"},property:{color:"#c27628"},entity:{color:"#c27628",cursor:"help"},url:{color:"#c27628"},"attr-name":{color:"#c27628"},keyword:{color:"#c27628"},regex:{color:"#9B71C6"},function:{color:"#e5a638"},constant:{color:"#e5a638"},variable:{color:"#fdfba8"},number:{color:"#8799B0"},important:{color:"#E45734"},deliminator:{color:"#E45734"},".line-highlight.line-highlight":{background:"rgba(255, 255, 255, .2)"},".line-highlight.line-highlight:before":{top:".3em",backgroundColor:"rgba(255, 255, 255, .3)",color:"#fff",MozBorderRadius:"8px",WebkitBorderRadius:"8px",borderRadius:"8px"},".line-highlight.line-highlight[data-end]:after":{top:".3em",backgroundColor:"rgba(255, 255, 255, .3)",color:"#fff",MozBorderRadius:"8px",WebkitBorderRadius:"8px",borderRadius:"8px"},".line-numbers .line-numbers-rows > span":{borderRight:"3px #d9d336 solid"}}},73016:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#111b27",background:"none",fontFamily:'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#111b27",background:"#e3eaf2",fontFamily:'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:"0.5em 0",overflow:"auto"},'pre[class*="language-"]::-moz-selection':{background:"#8da1b9"},'pre[class*="language-"] ::-moz-selection':{background:"#8da1b9"},'code[class*="language-"]::-moz-selection':{background:"#8da1b9"},'code[class*="language-"] ::-moz-selection':{background:"#8da1b9"},'pre[class*="language-"]::selection':{background:"#8da1b9"},'pre[class*="language-"] ::selection':{background:"#8da1b9"},'code[class*="language-"]::selection':{background:"#8da1b9"},'code[class*="language-"] ::selection':{background:"#8da1b9"},':not(pre) > code[class*="language-"]':{background:"#e3eaf2",padding:"0.1em 0.3em",borderRadius:"0.3em",whiteSpace:"normal"},comment:{color:"#3c526d"},prolog:{color:"#3c526d"},doctype:{color:"#3c526d"},cdata:{color:"#3c526d"},punctuation:{color:"#111b27"},"delimiter.important":{color:"#006d6d",fontWeight:"inherit"},"selector.parent":{color:"#006d6d"},tag:{color:"#006d6d"},"tag.punctuation":{color:"#006d6d"},"attr-name":{color:"#755f00"},boolean:{color:"#755f00"},"boolean.important":{color:"#755f00"},number:{color:"#755f00"},constant:{color:"#755f00"},"selector.attribute":{color:"#755f00"},"class-name":{color:"#005a8e"},key:{color:"#005a8e"},parameter:{color:"#005a8e"},property:{color:"#005a8e"},"property-access":{color:"#005a8e"},variable:{color:"#005a8e"},"attr-value":{color:"#116b00"},inserted:{color:"#116b00"},color:{color:"#116b00"},"selector.value":{color:"#116b00"},string:{color:"#116b00"},"string.url-link":{color:"#116b00"},builtin:{color:"#af00af"},"keyword-array":{color:"#af00af"},package:{color:"#af00af"},regex:{color:"#af00af"},function:{color:"#7c00aa"},"selector.class":{color:"#7c00aa"},"selector.id":{color:"#7c00aa"},"atrule.rule":{color:"#a04900"},combinator:{color:"#a04900"},keyword:{color:"#a04900"},operator:{color:"#a04900"},"pseudo-class":{color:"#a04900"},"pseudo-element":{color:"#a04900"},selector:{color:"#a04900"},unit:{color:"#a04900"},deleted:{color:"#c22f2e"},important:{color:"#c22f2e",fontWeight:"bold"},"keyword-this":{color:"#005a8e",fontWeight:"bold"},this:{color:"#005a8e",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},entity:{cursor:"help"},".language-markdown .token.title":{color:"#005a8e",fontWeight:"bold"},".language-markdown .token.title .token.punctuation":{color:"#005a8e",fontWeight:"bold"},".language-markdown .token.blockquote.punctuation":{color:"#af00af"},".language-markdown .token.code":{color:"#006d6d"},".language-markdown .token.hr.punctuation":{color:"#005a8e"},".language-markdown .token.url > .token.content":{color:"#116b00"},".language-markdown .token.url-link":{color:"#755f00"},".language-markdown .token.list.punctuation":{color:"#af00af"},".language-markdown .token.table-header":{color:"#111b27"},".language-json .token.operator":{color:"#111b27"},".language-scss .token.variable":{color:"#006d6d"},"token.tab:not(:empty):before":{color:"#3c526d"},"token.cr:before":{color:"#3c526d"},"token.lf:before":{color:"#3c526d"},"token.space:before":{color:"#3c526d"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a":{color:"#e3eaf2",background:"#005a8e"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button":{color:"#e3eaf2",background:"#005a8e"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover":{color:"#e3eaf2",background:"#005a8eda",textDecoration:"none"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus":{color:"#e3eaf2",background:"#005a8eda",textDecoration:"none"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover":{color:"#e3eaf2",background:"#005a8eda",textDecoration:"none"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus":{color:"#e3eaf2",background:"#005a8eda",textDecoration:"none"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span":{color:"#e3eaf2",background:"#3c526d"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover":{color:"#e3eaf2",background:"#3c526d"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus":{color:"#e3eaf2",background:"#3c526d"},".line-highlight.line-highlight":{background:"linear-gradient(to right, #8da1b92f 70%, #8da1b925)"},".line-highlight.line-highlight:before":{backgroundColor:"#3c526d",color:"#e3eaf2",boxShadow:"0 1px #8da1b9"},".line-highlight.line-highlight[data-end]:after":{backgroundColor:"#3c526d",color:"#e3eaf2",boxShadow:"0 1px #8da1b9"},"pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":{backgroundColor:"#3c526d1f"},".line-numbers.line-numbers .line-numbers-rows":{borderRight:"1px solid #8da1b97a",background:"#d0dae77a"},".line-numbers .line-numbers-rows > span:before":{color:"#3c526dda"},".rainbow-braces .token.token.punctuation.brace-level-1":{color:"#755f00"},".rainbow-braces .token.token.punctuation.brace-level-5":{color:"#755f00"},".rainbow-braces .token.token.punctuation.brace-level-9":{color:"#755f00"},".rainbow-braces .token.token.punctuation.brace-level-2":{color:"#af00af"},".rainbow-braces .token.token.punctuation.brace-level-6":{color:"#af00af"},".rainbow-braces .token.token.punctuation.brace-level-10":{color:"#af00af"},".rainbow-braces .token.token.punctuation.brace-level-3":{color:"#005a8e"},".rainbow-braces .token.token.punctuation.brace-level-7":{color:"#005a8e"},".rainbow-braces .token.token.punctuation.brace-level-11":{color:"#005a8e"},".rainbow-braces .token.token.punctuation.brace-level-4":{color:"#7c00aa"},".rainbow-braces .token.token.punctuation.brace-level-8":{color:"#7c00aa"},".rainbow-braces .token.token.punctuation.brace-level-12":{color:"#7c00aa"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)":{backgroundColor:"#c22f2e1f"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)":{backgroundColor:"#c22f2e1f"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)":{backgroundColor:"#116b001f"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)":{backgroundColor:"#116b001f"},".command-line .command-line-prompt":{borderRight:"1px solid #8da1b97a"},".command-line .command-line-prompt > span:before":{color:"#3c526dda"}}},15872:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#e3eaf2",background:"none",fontFamily:'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#e3eaf2",background:"#111b27",fontFamily:'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:"0.5em 0",overflow:"auto"},'pre[class*="language-"]::-moz-selection':{background:"#3c526d"},'pre[class*="language-"] ::-moz-selection':{background:"#3c526d"},'code[class*="language-"]::-moz-selection':{background:"#3c526d"},'code[class*="language-"] ::-moz-selection':{background:"#3c526d"},'pre[class*="language-"]::selection':{background:"#3c526d"},'pre[class*="language-"] ::selection':{background:"#3c526d"},'code[class*="language-"]::selection':{background:"#3c526d"},'code[class*="language-"] ::selection':{background:"#3c526d"},':not(pre) > code[class*="language-"]':{background:"#111b27",padding:"0.1em 0.3em",borderRadius:"0.3em",whiteSpace:"normal"},comment:{color:"#8da1b9"},prolog:{color:"#8da1b9"},doctype:{color:"#8da1b9"},cdata:{color:"#8da1b9"},punctuation:{color:"#e3eaf2"},"delimiter.important":{color:"#66cccc",fontWeight:"inherit"},"selector.parent":{color:"#66cccc"},tag:{color:"#66cccc"},"tag.punctuation":{color:"#66cccc"},"attr-name":{color:"#e6d37a"},boolean:{color:"#e6d37a"},"boolean.important":{color:"#e6d37a"},number:{color:"#e6d37a"},constant:{color:"#e6d37a"},"selector.attribute":{color:"#e6d37a"},"class-name":{color:"#6cb8e6"},key:{color:"#6cb8e6"},parameter:{color:"#6cb8e6"},property:{color:"#6cb8e6"},"property-access":{color:"#6cb8e6"},variable:{color:"#6cb8e6"},"attr-value":{color:"#91d076"},inserted:{color:"#91d076"},color:{color:"#91d076"},"selector.value":{color:"#91d076"},string:{color:"#91d076"},"string.url-link":{color:"#91d076"},builtin:{color:"#f4adf4"},"keyword-array":{color:"#f4adf4"},package:{color:"#f4adf4"},regex:{color:"#f4adf4"},function:{color:"#c699e3"},"selector.class":{color:"#c699e3"},"selector.id":{color:"#c699e3"},"atrule.rule":{color:"#e9ae7e"},combinator:{color:"#e9ae7e"},keyword:{color:"#e9ae7e"},operator:{color:"#e9ae7e"},"pseudo-class":{color:"#e9ae7e"},"pseudo-element":{color:"#e9ae7e"},selector:{color:"#e9ae7e"},unit:{color:"#e9ae7e"},deleted:{color:"#cd6660"},important:{color:"#cd6660",fontWeight:"bold"},"keyword-this":{color:"#6cb8e6",fontWeight:"bold"},this:{color:"#6cb8e6",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},entity:{cursor:"help"},".language-markdown .token.title":{color:"#6cb8e6",fontWeight:"bold"},".language-markdown .token.title .token.punctuation":{color:"#6cb8e6",fontWeight:"bold"},".language-markdown .token.blockquote.punctuation":{color:"#f4adf4"},".language-markdown .token.code":{color:"#66cccc"},".language-markdown .token.hr.punctuation":{color:"#6cb8e6"},".language-markdown .token.url .token.content":{color:"#91d076"},".language-markdown .token.url-link":{color:"#e6d37a"},".language-markdown .token.list.punctuation":{color:"#f4adf4"},".language-markdown .token.table-header":{color:"#e3eaf2"},".language-json .token.operator":{color:"#e3eaf2"},".language-scss .token.variable":{color:"#66cccc"},"token.tab:not(:empty):before":{color:"#8da1b9"},"token.cr:before":{color:"#8da1b9"},"token.lf:before":{color:"#8da1b9"},"token.space:before":{color:"#8da1b9"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a":{color:"#111b27",background:"#6cb8e6"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button":{color:"#111b27",background:"#6cb8e6"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover":{color:"#111b27",background:"#6cb8e6da",textDecoration:"none"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus":{color:"#111b27",background:"#6cb8e6da",textDecoration:"none"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover":{color:"#111b27",background:"#6cb8e6da",textDecoration:"none"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus":{color:"#111b27",background:"#6cb8e6da",textDecoration:"none"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span":{color:"#111b27",background:"#8da1b9"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover":{color:"#111b27",background:"#8da1b9"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus":{color:"#111b27",background:"#8da1b9"},".line-highlight.line-highlight":{background:"linear-gradient(to right, #3c526d5f 70%, #3c526d55)"},".line-highlight.line-highlight:before":{backgroundColor:"#8da1b9",color:"#111b27",boxShadow:"0 1px #3c526d"},".line-highlight.line-highlight[data-end]:after":{backgroundColor:"#8da1b9",color:"#111b27",boxShadow:"0 1px #3c526d"},"pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":{backgroundColor:"#8da1b918"},".line-numbers.line-numbers .line-numbers-rows":{borderRight:"1px solid #0b121b",background:"#0b121b7a"},".line-numbers .line-numbers-rows > span:before":{color:"#8da1b9da"},".rainbow-braces .token.token.punctuation.brace-level-1":{color:"#e6d37a"},".rainbow-braces .token.token.punctuation.brace-level-5":{color:"#e6d37a"},".rainbow-braces .token.token.punctuation.brace-level-9":{color:"#e6d37a"},".rainbow-braces .token.token.punctuation.brace-level-2":{color:"#f4adf4"},".rainbow-braces .token.token.punctuation.brace-level-6":{color:"#f4adf4"},".rainbow-braces .token.token.punctuation.brace-level-10":{color:"#f4adf4"},".rainbow-braces .token.token.punctuation.brace-level-3":{color:"#6cb8e6"},".rainbow-braces .token.token.punctuation.brace-level-7":{color:"#6cb8e6"},".rainbow-braces .token.token.punctuation.brace-level-11":{color:"#6cb8e6"},".rainbow-braces .token.token.punctuation.brace-level-4":{color:"#c699e3"},".rainbow-braces .token.token.punctuation.brace-level-8":{color:"#c699e3"},".rainbow-braces .token.token.punctuation.brace-level-12":{color:"#c699e3"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)":{backgroundColor:"#cd66601f"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)":{backgroundColor:"#cd66601f"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)":{backgroundColor:"#91d0761f"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)":{backgroundColor:"#91d0761f"},".command-line .command-line-prompt":{borderRight:"1px solid #0b121b"},".command-line .command-line-prompt > span:before":{color:"#8da1b9da"}}},22357:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"black",background:"none",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"black",background:"none",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",position:"relative",borderLeft:"10px solid #358ccb",boxShadow:"-1px 0 0 0 #358ccb, 0 0 0 1px #dfdfdf",backgroundColor:"#fdfdfd",backgroundImage:"linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%)",backgroundSize:"3em 3em",backgroundOrigin:"content-box",backgroundAttachment:"local",margin:".5em 0",padding:"0 1em"},'pre[class*="language-"] > code':{display:"block"},':not(pre) > code[class*="language-"]':{position:"relative",padding:".2em",borderRadius:"0.3em",color:"#c92c2c",border:"1px solid rgba(0, 0, 0, 0.1)",display:"inline",whiteSpace:"normal",backgroundColor:"#fdfdfd",WebkitBoxSizing:"border-box",MozBoxSizing:"border-box",boxSizing:"border-box"},comment:{color:"#7D8B99"},"block-comment":{color:"#7D8B99"},prolog:{color:"#7D8B99"},doctype:{color:"#7D8B99"},cdata:{color:"#7D8B99"},punctuation:{color:"#5F6364"},property:{color:"#c92c2c"},tag:{color:"#c92c2c"},boolean:{color:"#c92c2c"},number:{color:"#c92c2c"},"function-name":{color:"#c92c2c"},constant:{color:"#c92c2c"},symbol:{color:"#c92c2c"},deleted:{color:"#c92c2c"},selector:{color:"#2f9c0a"},"attr-name":{color:"#2f9c0a"},string:{color:"#2f9c0a"},char:{color:"#2f9c0a"},function:{color:"#2f9c0a"},builtin:{color:"#2f9c0a"},inserted:{color:"#2f9c0a"},operator:{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)"},entity:{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)",cursor:"help"},url:{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)"},variable:{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)"},atrule:{color:"#1990b8"},"attr-value":{color:"#1990b8"},keyword:{color:"#1990b8"},"class-name":{color:"#1990b8"},regex:{color:"#e90"},important:{color:"#e90",fontWeight:"normal"},".language-css .token.string":{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)"},".style .token.string":{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},namespace:{Opacity:".7"}}},72111:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"black",background:"none",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",maxHeight:"inherit",height:"inherit",padding:"0 1em",display:"block",overflow:"auto"},'pre[class*="language-"]':{color:"black",background:"none",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",position:"relative",margin:".5em 0",overflow:"visible",padding:"1px",backgroundColor:"#fdfdfd",WebkitBoxSizing:"border-box",MozBoxSizing:"border-box",boxSizing:"border-box",marginBottom:"1em"},'pre[class*="language-"] > code':{position:"relative",zIndex:"1",borderLeft:"10px solid #358ccb",boxShadow:"-1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf",backgroundColor:"#fdfdfd",backgroundImage:"linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%)",backgroundSize:"3em 3em",backgroundOrigin:"content-box",backgroundAttachment:"local"},':not(pre) > code[class*="language-"]':{backgroundColor:"#fdfdfd",WebkitBoxSizing:"border-box",MozBoxSizing:"border-box",boxSizing:"border-box",marginBottom:"1em",position:"relative",padding:".2em",borderRadius:"0.3em",color:"#c92c2c",border:"1px solid rgba(0, 0, 0, 0.1)",display:"inline",whiteSpace:"normal"},'pre[class*="language-"]:before':{content:"''",display:"block",position:"absolute",bottom:"0.75em",left:"0.18em",width:"40%",height:"20%",maxHeight:"13em",boxShadow:"0px 13px 8px #979797",WebkitTransform:"rotate(-2deg)",MozTransform:"rotate(-2deg)",msTransform:"rotate(-2deg)",OTransform:"rotate(-2deg)",transform:"rotate(-2deg)"},'pre[class*="language-"]:after':{content:"''",display:"block",position:"absolute",bottom:"0.75em",left:"auto",width:"40%",height:"20%",maxHeight:"13em",boxShadow:"0px 13px 8px #979797",WebkitTransform:"rotate(2deg)",MozTransform:"rotate(2deg)",msTransform:"rotate(2deg)",OTransform:"rotate(2deg)",transform:"rotate(2deg)",right:"0.75em"},comment:{color:"#7D8B99"},"block-comment":{color:"#7D8B99"},prolog:{color:"#7D8B99"},doctype:{color:"#7D8B99"},cdata:{color:"#7D8B99"},punctuation:{color:"#5F6364"},property:{color:"#c92c2c"},tag:{color:"#c92c2c"},boolean:{color:"#c92c2c"},number:{color:"#c92c2c"},"function-name":{color:"#c92c2c"},constant:{color:"#c92c2c"},symbol:{color:"#c92c2c"},deleted:{color:"#c92c2c"},selector:{color:"#2f9c0a"},"attr-name":{color:"#2f9c0a"},string:{color:"#2f9c0a"},char:{color:"#2f9c0a"},function:{color:"#2f9c0a"},builtin:{color:"#2f9c0a"},inserted:{color:"#2f9c0a"},operator:{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)"},entity:{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)",cursor:"help"},url:{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)"},variable:{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)"},atrule:{color:"#1990b8"},"attr-value":{color:"#1990b8"},keyword:{color:"#1990b8"},"class-name":{color:"#1990b8"},regex:{color:"#e90"},important:{color:"#e90",fontWeight:"normal"},".language-css .token.string":{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)"},".style .token.string":{color:"#a67f59",background:"rgba(255, 255, 255, 0.5)"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},namespace:{Opacity:".7"},'pre[class*="language-"].line-numbers.line-numbers':{paddingLeft:"0"},'pre[class*="language-"].line-numbers.line-numbers code':{paddingLeft:"3.8em"},'pre[class*="language-"].line-numbers.line-numbers .line-numbers-rows':{left:"0"},'pre[class*="language-"][data-line]':{paddingTop:"0",paddingBottom:"0",paddingLeft:"0"},"pre[data-line] code":{position:"relative",paddingLeft:"4em"},"pre .line-highlight":{marginTop:"0"}}},74515:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#a9b7c6",fontFamily:"Consolas, Monaco, 'Andale Mono', monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#a9b7c6",fontFamily:"Consolas, Monaco, 'Andale Mono', monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#2b2b2b"},'pre[class*="language-"]::-moz-selection':{color:"inherit",background:"rgba(33, 66, 131, .85)"},'pre[class*="language-"] ::-moz-selection':{color:"inherit",background:"rgba(33, 66, 131, .85)"},'code[class*="language-"]::-moz-selection':{color:"inherit",background:"rgba(33, 66, 131, .85)"},'code[class*="language-"] ::-moz-selection':{color:"inherit",background:"rgba(33, 66, 131, .85)"},'pre[class*="language-"]::selection':{color:"inherit",background:"rgba(33, 66, 131, .85)"},'pre[class*="language-"] ::selection':{color:"inherit",background:"rgba(33, 66, 131, .85)"},'code[class*="language-"]::selection':{color:"inherit",background:"rgba(33, 66, 131, .85)"},'code[class*="language-"] ::selection':{color:"inherit",background:"rgba(33, 66, 131, .85)"},':not(pre) > code[class*="language-"]':{background:"#2b2b2b",padding:".1em",borderRadius:".3em"},comment:{color:"#808080"},prolog:{color:"#808080"},cdata:{color:"#808080"},delimiter:{color:"#cc7832"},boolean:{color:"#cc7832"},keyword:{color:"#cc7832"},selector:{color:"#cc7832"},important:{color:"#cc7832"},atrule:{color:"#cc7832"},operator:{color:"#a9b7c6"},punctuation:{color:"#a9b7c6"},"attr-name":{color:"#a9b7c6"},tag:{color:"#e8bf6a"},"tag.punctuation":{color:"#e8bf6a"},doctype:{color:"#e8bf6a"},builtin:{color:"#e8bf6a"},entity:{color:"#6897bb"},number:{color:"#6897bb"},symbol:{color:"#6897bb"},property:{color:"#9876aa"},constant:{color:"#9876aa"},variable:{color:"#9876aa"},string:{color:"#6a8759"},char:{color:"#6a8759"},"attr-value":{color:"#a5c261"},"attr-value.punctuation":{color:"#a5c261"},"attr-value.punctuation:first-child":{color:"#a9b7c6"},url:{color:"#287bde",textDecoration:"underline"},function:{color:"#ffc66d"},regex:{background:"#364135"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},inserted:{background:"#294436"},deleted:{background:"#484a4a"},"code.language-css .token.property":{color:"#a9b7c6"},"code.language-css .token.property + .token.punctuation":{color:"#a9b7c6"},"code.language-css .token.id":{color:"#ffc66d"},"code.language-css .token.selector > .token.class":{color:"#ffc66d"},"code.language-css .token.selector > .token.attribute":{color:"#ffc66d"},"code.language-css .token.selector > .token.pseudo-class":{color:"#ffc66d"},"code.language-css .token.selector > .token.pseudo-element":{color:"#ffc66d"}}},14843:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"white",background:"none",textShadow:"0 -.1em .2em black",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"white",background:"hsl(30, 20%, 25%)",textShadow:"0 -.1em .2em black",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",border:".3em solid hsl(30, 20%, 40%)",borderRadius:".5em",boxShadow:"1px 1px .5em black inset"},':not(pre) > code[class*="language-"]':{background:"hsl(30, 20%, 25%)",padding:".15em .2em .05em",borderRadius:".3em",border:".13em solid hsl(30, 20%, 40%)",boxShadow:"1px 1px .3em -.1em black inset",whiteSpace:"normal"},comment:{color:"hsl(30, 20%, 50%)"},prolog:{color:"hsl(30, 20%, 50%)"},doctype:{color:"hsl(30, 20%, 50%)"},cdata:{color:"hsl(30, 20%, 50%)"},punctuation:{Opacity:".7"},namespace:{Opacity:".7"},property:{color:"hsl(350, 40%, 70%)"},tag:{color:"hsl(350, 40%, 70%)"},boolean:{color:"hsl(350, 40%, 70%)"},number:{color:"hsl(350, 40%, 70%)"},constant:{color:"hsl(350, 40%, 70%)"},symbol:{color:"hsl(350, 40%, 70%)"},selector:{color:"hsl(75, 70%, 60%)"},"attr-name":{color:"hsl(75, 70%, 60%)"},string:{color:"hsl(75, 70%, 60%)"},char:{color:"hsl(75, 70%, 60%)"},builtin:{color:"hsl(75, 70%, 60%)"},inserted:{color:"hsl(75, 70%, 60%)"},operator:{color:"hsl(40, 90%, 60%)"},entity:{color:"hsl(40, 90%, 60%)",cursor:"help"},url:{color:"hsl(40, 90%, 60%)"},".language-css .token.string":{color:"hsl(40, 90%, 60%)"},".style .token.string":{color:"hsl(40, 90%, 60%)"},variable:{color:"hsl(40, 90%, 60%)"},atrule:{color:"hsl(350, 40%, 70%)"},"attr-value":{color:"hsl(350, 40%, 70%)"},keyword:{color:"hsl(350, 40%, 70%)"},regex:{color:"#e90"},important:{color:"#e90",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},deleted:{color:"red"}}},76088:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#f8f8f2",background:"none",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#f8f8f2",background:"#282a36",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em"},':not(pre) > code[class*="language-"]':{background:"#282a36",padding:".1em",borderRadius:".3em",whiteSpace:"normal"},comment:{color:"#6272a4"},prolog:{color:"#6272a4"},doctype:{color:"#6272a4"},cdata:{color:"#6272a4"},punctuation:{color:"#f8f8f2"},".namespace":{Opacity:".7"},property:{color:"#ff79c6"},tag:{color:"#ff79c6"},constant:{color:"#ff79c6"},symbol:{color:"#ff79c6"},deleted:{color:"#ff79c6"},boolean:{color:"#bd93f9"},number:{color:"#bd93f9"},selector:{color:"#50fa7b"},"attr-name":{color:"#50fa7b"},string:{color:"#50fa7b"},char:{color:"#50fa7b"},builtin:{color:"#50fa7b"},inserted:{color:"#50fa7b"},operator:{color:"#f8f8f2"},entity:{color:"#f8f8f2",cursor:"help"},url:{color:"#f8f8f2"},".language-css .token.string":{color:"#f8f8f2"},".style .token.string":{color:"#f8f8f2"},variable:{color:"#f8f8f2"},atrule:{color:"#f1fa8c"},"attr-value":{color:"#f1fa8c"},function:{color:"#f1fa8c"},"class-name":{color:"#f1fa8c"},keyword:{color:"#8be9fd"},regex:{color:"#ffb86c"},important:{color:"#ffb86c",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},89777:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#2a2734",color:"#9a86fd"},'pre[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#2a2734",color:"#9a86fd",padding:"1em",margin:".5em 0",overflow:"auto"},'pre > code[class*="language-"]':{fontSize:"1em"},'pre[class*="language-"]::-moz-selection':{textShadow:"none",background:"#6a51e6"},'pre[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#6a51e6"},'code[class*="language-"]::-moz-selection':{textShadow:"none",background:"#6a51e6"},'code[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#6a51e6"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#6a51e6"},'pre[class*="language-"] ::selection':{textShadow:"none",background:"#6a51e6"},'code[class*="language-"]::selection':{textShadow:"none",background:"#6a51e6"},'code[class*="language-"] ::selection':{textShadow:"none",background:"#6a51e6"},':not(pre) > code[class*="language-"]':{padding:".1em",borderRadius:".3em"},comment:{color:"#6c6783"},prolog:{color:"#6c6783"},doctype:{color:"#6c6783"},cdata:{color:"#6c6783"},punctuation:{color:"#6c6783"},namespace:{Opacity:".7"},tag:{color:"#e09142"},operator:{color:"#e09142"},number:{color:"#e09142"},property:{color:"#9a86fd"},function:{color:"#9a86fd"},"tag-id":{color:"#eeebff"},selector:{color:"#eeebff"},"atrule-id":{color:"#eeebff"},"code.language-javascript":{color:"#c4b9fe"},"attr-name":{color:"#c4b9fe"},"code.language-css":{color:"#ffcc99"},"code.language-scss":{color:"#ffcc99"},boolean:{color:"#ffcc99"},string:{color:"#ffcc99"},entity:{color:"#ffcc99",cursor:"help"},url:{color:"#ffcc99"},".language-css .token.string":{color:"#ffcc99"},".language-scss .token.string":{color:"#ffcc99"},".style .token.string":{color:"#ffcc99"},"attr-value":{color:"#ffcc99"},keyword:{color:"#ffcc99"},control:{color:"#ffcc99"},directive:{color:"#ffcc99"},unit:{color:"#ffcc99"},statement:{color:"#ffcc99"},regex:{color:"#ffcc99"},atrule:{color:"#ffcc99"},placeholder:{color:"#ffcc99"},variable:{color:"#ffcc99"},deleted:{textDecoration:"line-through"},inserted:{borderBottom:"1px dotted #eeebff",textDecoration:"none"},italic:{fontStyle:"italic"},important:{fontWeight:"bold",color:"#c4b9fe"},bold:{fontWeight:"bold"},"pre > code.highlight":{Outline:".4em solid #8a75f5",OutlineOffset:".4em"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"#2c2937"},".line-numbers .line-numbers-rows > span:before":{color:"#3c3949"},".line-highlight.line-highlight":{background:"linear-gradient(to right, rgba(224, 145, 66, 0.2) 70%, rgba(224, 145, 66, 0))"}}},33779:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#322d29",color:"#88786d"},'pre[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#322d29",color:"#88786d",padding:"1em",margin:".5em 0",overflow:"auto"},'pre > code[class*="language-"]':{fontSize:"1em"},'pre[class*="language-"]::-moz-selection':{textShadow:"none",background:"#6f5849"},'pre[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#6f5849"},'code[class*="language-"]::-moz-selection':{textShadow:"none",background:"#6f5849"},'code[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#6f5849"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#6f5849"},'pre[class*="language-"] ::selection':{textShadow:"none",background:"#6f5849"},'code[class*="language-"]::selection':{textShadow:"none",background:"#6f5849"},'code[class*="language-"] ::selection':{textShadow:"none",background:"#6f5849"},':not(pre) > code[class*="language-"]':{padding:".1em",borderRadius:".3em"},comment:{color:"#6a5f58"},prolog:{color:"#6a5f58"},doctype:{color:"#6a5f58"},cdata:{color:"#6a5f58"},punctuation:{color:"#6a5f58"},namespace:{Opacity:".7"},tag:{color:"#bfa05a"},operator:{color:"#bfa05a"},number:{color:"#bfa05a"},property:{color:"#88786d"},function:{color:"#88786d"},"tag-id":{color:"#fff3eb"},selector:{color:"#fff3eb"},"atrule-id":{color:"#fff3eb"},"code.language-javascript":{color:"#a48774"},"attr-name":{color:"#a48774"},"code.language-css":{color:"#fcc440"},"code.language-scss":{color:"#fcc440"},boolean:{color:"#fcc440"},string:{color:"#fcc440"},entity:{color:"#fcc440",cursor:"help"},url:{color:"#fcc440"},".language-css .token.string":{color:"#fcc440"},".language-scss .token.string":{color:"#fcc440"},".style .token.string":{color:"#fcc440"},"attr-value":{color:"#fcc440"},keyword:{color:"#fcc440"},control:{color:"#fcc440"},directive:{color:"#fcc440"},unit:{color:"#fcc440"},statement:{color:"#fcc440"},regex:{color:"#fcc440"},atrule:{color:"#fcc440"},placeholder:{color:"#fcc440"},variable:{color:"#fcc440"},deleted:{textDecoration:"line-through"},inserted:{borderBottom:"1px dotted #fff3eb",textDecoration:"none"},italic:{fontStyle:"italic"},important:{fontWeight:"bold",color:"#a48774"},bold:{fontWeight:"bold"},"pre > code.highlight":{Outline:".4em solid #816d5f",OutlineOffset:".4em"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"#35302b"},".line-numbers .line-numbers-rows > span:before":{color:"#46403d"},".line-highlight.line-highlight":{background:"linear-gradient(to right, rgba(191, 160, 90, 0.2) 70%, rgba(191, 160, 90, 0))"}}},56893:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#2a2d2a",color:"#687d68"},'pre[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#2a2d2a",color:"#687d68",padding:"1em",margin:".5em 0",overflow:"auto"},'pre > code[class*="language-"]':{fontSize:"1em"},'pre[class*="language-"]::-moz-selection':{textShadow:"none",background:"#435643"},'pre[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#435643"},'code[class*="language-"]::-moz-selection':{textShadow:"none",background:"#435643"},'code[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#435643"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#435643"},'pre[class*="language-"] ::selection':{textShadow:"none",background:"#435643"},'code[class*="language-"]::selection':{textShadow:"none",background:"#435643"},'code[class*="language-"] ::selection':{textShadow:"none",background:"#435643"},':not(pre) > code[class*="language-"]':{padding:".1em",borderRadius:".3em"},comment:{color:"#535f53"},prolog:{color:"#535f53"},doctype:{color:"#535f53"},cdata:{color:"#535f53"},punctuation:{color:"#535f53"},namespace:{Opacity:".7"},tag:{color:"#a2b34d"},operator:{color:"#a2b34d"},number:{color:"#a2b34d"},property:{color:"#687d68"},function:{color:"#687d68"},"tag-id":{color:"#f0fff0"},selector:{color:"#f0fff0"},"atrule-id":{color:"#f0fff0"},"code.language-javascript":{color:"#b3d6b3"},"attr-name":{color:"#b3d6b3"},"code.language-css":{color:"#e5fb79"},"code.language-scss":{color:"#e5fb79"},boolean:{color:"#e5fb79"},string:{color:"#e5fb79"},entity:{color:"#e5fb79",cursor:"help"},url:{color:"#e5fb79"},".language-css .token.string":{color:"#e5fb79"},".language-scss .token.string":{color:"#e5fb79"},".style .token.string":{color:"#e5fb79"},"attr-value":{color:"#e5fb79"},keyword:{color:"#e5fb79"},control:{color:"#e5fb79"},directive:{color:"#e5fb79"},unit:{color:"#e5fb79"},statement:{color:"#e5fb79"},regex:{color:"#e5fb79"},atrule:{color:"#e5fb79"},placeholder:{color:"#e5fb79"},variable:{color:"#e5fb79"},deleted:{textDecoration:"line-through"},inserted:{borderBottom:"1px dotted #f0fff0",textDecoration:"none"},italic:{fontStyle:"italic"},important:{fontWeight:"bold",color:"#b3d6b3"},bold:{fontWeight:"bold"},"pre > code.highlight":{Outline:".4em solid #5c705c",OutlineOffset:".4em"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"#2c302c"},".line-numbers .line-numbers-rows > span:before":{color:"#3b423b"},".line-highlight.line-highlight":{background:"linear-gradient(to right, rgba(162, 179, 77, 0.2) 70%, rgba(162, 179, 77, 0))"}}},98978:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#faf8f5",color:"#728fcb"},'pre[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#faf8f5",color:"#728fcb",padding:"1em",margin:".5em 0",overflow:"auto"},'pre > code[class*="language-"]':{fontSize:"1em"},'pre[class*="language-"]::-moz-selection':{textShadow:"none",background:"#faf8f5"},'pre[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#faf8f5"},'code[class*="language-"]::-moz-selection':{textShadow:"none",background:"#faf8f5"},'code[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#faf8f5"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#faf8f5"},'pre[class*="language-"] ::selection':{textShadow:"none",background:"#faf8f5"},'code[class*="language-"]::selection':{textShadow:"none",background:"#faf8f5"},'code[class*="language-"] ::selection':{textShadow:"none",background:"#faf8f5"},':not(pre) > code[class*="language-"]':{padding:".1em",borderRadius:".3em"},comment:{color:"#b6ad9a"},prolog:{color:"#b6ad9a"},doctype:{color:"#b6ad9a"},cdata:{color:"#b6ad9a"},punctuation:{color:"#b6ad9a"},namespace:{Opacity:".7"},tag:{color:"#063289"},operator:{color:"#063289"},number:{color:"#063289"},property:{color:"#b29762"},function:{color:"#b29762"},"tag-id":{color:"#2d2006"},selector:{color:"#2d2006"},"atrule-id":{color:"#2d2006"},"code.language-javascript":{color:"#896724"},"attr-name":{color:"#896724"},"code.language-css":{color:"#728fcb"},"code.language-scss":{color:"#728fcb"},boolean:{color:"#728fcb"},string:{color:"#728fcb"},entity:{color:"#728fcb",cursor:"help"},url:{color:"#728fcb"},".language-css .token.string":{color:"#728fcb"},".language-scss .token.string":{color:"#728fcb"},".style .token.string":{color:"#728fcb"},"attr-value":{color:"#728fcb"},keyword:{color:"#728fcb"},control:{color:"#728fcb"},directive:{color:"#728fcb"},unit:{color:"#728fcb"},statement:{color:"#728fcb"},regex:{color:"#728fcb"},atrule:{color:"#728fcb"},placeholder:{color:"#93abdc"},variable:{color:"#93abdc"},deleted:{textDecoration:"line-through"},inserted:{borderBottom:"1px dotted #2d2006",textDecoration:"none"},italic:{fontStyle:"italic"},important:{fontWeight:"bold",color:"#896724"},bold:{fontWeight:"bold"},"pre > code.highlight":{Outline:".4em solid #896724",OutlineOffset:".4em"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"#ece8de"},".line-numbers .line-numbers-rows > span:before":{color:"#cdc4b1"},".line-highlight.line-highlight":{background:"linear-gradient(to right, rgba(45, 32, 6, 0.2) 70%, rgba(45, 32, 6, 0))"}}},28178:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#1d262f",color:"#57718e"},'pre[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#1d262f",color:"#57718e",padding:"1em",margin:".5em 0",overflow:"auto"},'pre > code[class*="language-"]':{fontSize:"1em"},'pre[class*="language-"]::-moz-selection':{textShadow:"none",background:"#004a9e"},'pre[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#004a9e"},'code[class*="language-"]::-moz-selection':{textShadow:"none",background:"#004a9e"},'code[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#004a9e"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#004a9e"},'pre[class*="language-"] ::selection':{textShadow:"none",background:"#004a9e"},'code[class*="language-"]::selection':{textShadow:"none",background:"#004a9e"},'code[class*="language-"] ::selection':{textShadow:"none",background:"#004a9e"},':not(pre) > code[class*="language-"]':{padding:".1em",borderRadius:".3em"},comment:{color:"#4a5f78"},prolog:{color:"#4a5f78"},doctype:{color:"#4a5f78"},cdata:{color:"#4a5f78"},punctuation:{color:"#4a5f78"},namespace:{Opacity:".7"},tag:{color:"#0aa370"},operator:{color:"#0aa370"},number:{color:"#0aa370"},property:{color:"#57718e"},function:{color:"#57718e"},"tag-id":{color:"#ebf4ff"},selector:{color:"#ebf4ff"},"atrule-id":{color:"#ebf4ff"},"code.language-javascript":{color:"#7eb6f6"},"attr-name":{color:"#7eb6f6"},"code.language-css":{color:"#47ebb4"},"code.language-scss":{color:"#47ebb4"},boolean:{color:"#47ebb4"},string:{color:"#47ebb4"},entity:{color:"#47ebb4",cursor:"help"},url:{color:"#47ebb4"},".language-css .token.string":{color:"#47ebb4"},".language-scss .token.string":{color:"#47ebb4"},".style .token.string":{color:"#47ebb4"},"attr-value":{color:"#47ebb4"},keyword:{color:"#47ebb4"},control:{color:"#47ebb4"},directive:{color:"#47ebb4"},unit:{color:"#47ebb4"},statement:{color:"#47ebb4"},regex:{color:"#47ebb4"},atrule:{color:"#47ebb4"},placeholder:{color:"#47ebb4"},variable:{color:"#47ebb4"},deleted:{textDecoration:"line-through"},inserted:{borderBottom:"1px dotted #ebf4ff",textDecoration:"none"},italic:{fontStyle:"italic"},important:{fontWeight:"bold",color:"#7eb6f6"},bold:{fontWeight:"bold"},"pre > code.highlight":{Outline:".4em solid #34659d",OutlineOffset:".4em"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"#1f2932"},".line-numbers .line-numbers-rows > span:before":{color:"#2c3847"},".line-highlight.line-highlight":{background:"linear-gradient(to right, rgba(10, 163, 112, 0.2) 70%, rgba(10, 163, 112, 0))"}}},39469:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#24242e",color:"#767693"},'pre[class*="language-"]':{fontFamily:'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',fontSize:"14px",lineHeight:"1.375",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"#24242e",color:"#767693",padding:"1em",margin:".5em 0",overflow:"auto"},'pre > code[class*="language-"]':{fontSize:"1em"},'pre[class*="language-"]::-moz-selection':{textShadow:"none",background:"#5151e6"},'pre[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#5151e6"},'code[class*="language-"]::-moz-selection':{textShadow:"none",background:"#5151e6"},'code[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#5151e6"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#5151e6"},'pre[class*="language-"] ::selection':{textShadow:"none",background:"#5151e6"},'code[class*="language-"]::selection':{textShadow:"none",background:"#5151e6"},'code[class*="language-"] ::selection':{textShadow:"none",background:"#5151e6"},':not(pre) > code[class*="language-"]':{padding:".1em",borderRadius:".3em"},comment:{color:"#5b5b76"},prolog:{color:"#5b5b76"},doctype:{color:"#5b5b76"},cdata:{color:"#5b5b76"},punctuation:{color:"#5b5b76"},namespace:{Opacity:".7"},tag:{color:"#dd672c"},operator:{color:"#dd672c"},number:{color:"#dd672c"},property:{color:"#767693"},function:{color:"#767693"},"tag-id":{color:"#ebebff"},selector:{color:"#ebebff"},"atrule-id":{color:"#ebebff"},"code.language-javascript":{color:"#aaaaca"},"attr-name":{color:"#aaaaca"},"code.language-css":{color:"#fe8c52"},"code.language-scss":{color:"#fe8c52"},boolean:{color:"#fe8c52"},string:{color:"#fe8c52"},entity:{color:"#fe8c52",cursor:"help"},url:{color:"#fe8c52"},".language-css .token.string":{color:"#fe8c52"},".language-scss .token.string":{color:"#fe8c52"},".style .token.string":{color:"#fe8c52"},"attr-value":{color:"#fe8c52"},keyword:{color:"#fe8c52"},control:{color:"#fe8c52"},directive:{color:"#fe8c52"},unit:{color:"#fe8c52"},statement:{color:"#fe8c52"},regex:{color:"#fe8c52"},atrule:{color:"#fe8c52"},placeholder:{color:"#fe8c52"},variable:{color:"#fe8c52"},deleted:{textDecoration:"line-through"},inserted:{borderBottom:"1px dotted #ebebff",textDecoration:"none"},italic:{fontStyle:"italic"},important:{fontWeight:"bold",color:"#aaaaca"},bold:{fontWeight:"bold"},"pre > code.highlight":{Outline:".4em solid #7676f4",OutlineOffset:".4em"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"#262631"},".line-numbers .line-numbers-rows > span:before":{color:"#393949"},".line-highlight.line-highlight":{background:"linear-gradient(to right, rgba(221, 103, 44, 0.2) 70%, rgba(221, 103, 44, 0))"}}},65993:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",background:"black",color:"white",boxShadow:"-.3em 0 0 .3em black, .3em 0 0 .3em black"},'pre[class*="language-"]':{fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:".4em .8em",margin:".5em 0",overflow:"auto",background:`url('data:image/svg+xml;charset=utf-8,<svg%20version%3D"1.1"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20width%3D"100"%20height%3D"100"%20fill%3D"rgba(0%2C0%2C0%2C.2)">%0D%0A<polygon%20points%3D"0%2C50%2050%2C0%200%2C0"%20%2F>%0D%0A<polygon%20points%3D"0%2C100%2050%2C100%20100%2C50%20100%2C0"%20%2F>%0D%0A<%2Fsvg>')`,backgroundSize:"1em 1em"},':not(pre) > code[class*="language-"]':{padding:".2em",borderRadius:".3em",boxShadow:"none",whiteSpace:"normal"},comment:{color:"#aaa"},prolog:{color:"#aaa"},doctype:{color:"#aaa"},cdata:{color:"#aaa"},punctuation:{color:"#999"},namespace:{Opacity:".7"},property:{color:"#0cf"},tag:{color:"#0cf"},boolean:{color:"#0cf"},number:{color:"#0cf"},constant:{color:"#0cf"},symbol:{color:"#0cf"},selector:{color:"yellow"},"attr-name":{color:"yellow"},string:{color:"yellow"},char:{color:"yellow"},builtin:{color:"yellow"},operator:{color:"yellowgreen"},entity:{color:"yellowgreen",cursor:"help"},url:{color:"yellowgreen"},".language-css .token.string":{color:"yellowgreen"},variable:{color:"yellowgreen"},inserted:{color:"yellowgreen"},atrule:{color:"deeppink"},"attr-value":{color:"deeppink"},keyword:{color:"deeppink"},regex:{color:"orange"},important:{color:"orange",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},deleted:{color:"red"},"pre.diff-highlight.diff-highlight > code .token.deleted:not(.prefix)":{backgroundColor:"rgba(255, 0, 0, .3)",display:"inline"},"pre > code.diff-highlight.diff-highlight .token.deleted:not(.prefix)":{backgroundColor:"rgba(255, 0, 0, .3)",display:"inline"},"pre.diff-highlight.diff-highlight > code .token.inserted:not(.prefix)":{backgroundColor:"rgba(0, 255, 128, .3)",display:"inline"},"pre > code.diff-highlight.diff-highlight .token.inserted:not(.prefix)":{backgroundColor:"rgba(0, 255, 128, .3)",display:"inline"}}},40039:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#393A34",fontFamily:'"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",fontSize:".9em",lineHeight:"1.2em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#393A34",fontFamily:'"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",fontSize:".9em",lineHeight:"1.2em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",border:"1px solid #dddddd",backgroundColor:"white"},'pre > code[class*="language-"]':{fontSize:"1em"},'pre[class*="language-"]::-moz-selection':{background:"#b3d4fc"},'pre[class*="language-"] ::-moz-selection':{background:"#b3d4fc"},'code[class*="language-"]::-moz-selection':{background:"#b3d4fc"},'code[class*="language-"] ::-moz-selection':{background:"#b3d4fc"},'pre[class*="language-"]::selection':{background:"#b3d4fc"},'pre[class*="language-"] ::selection':{background:"#b3d4fc"},'code[class*="language-"]::selection':{background:"#b3d4fc"},'code[class*="language-"] ::selection':{background:"#b3d4fc"},':not(pre) > code[class*="language-"]':{padding:".2em",paddingTop:"1px",paddingBottom:"1px",background:"#f8f8f8",border:"1px solid #dddddd"},comment:{color:"#999988",fontStyle:"italic"},prolog:{color:"#999988",fontStyle:"italic"},doctype:{color:"#999988",fontStyle:"italic"},cdata:{color:"#999988",fontStyle:"italic"},namespace:{Opacity:".7"},string:{color:"#e3116c"},"attr-value":{color:"#e3116c"},punctuation:{color:"#393A34"},operator:{color:"#393A34"},entity:{color:"#36acaa"},url:{color:"#36acaa"},symbol:{color:"#36acaa"},number:{color:"#36acaa"},boolean:{color:"#36acaa"},variable:{color:"#36acaa"},constant:{color:"#36acaa"},property:{color:"#36acaa"},regex:{color:"#36acaa"},inserted:{color:"#36acaa"},atrule:{color:"#00a4db"},keyword:{color:"#00a4db"},"attr-name":{color:"#00a4db"},".language-autohotkey .token.selector":{color:"#00a4db"},function:{color:"#9a050f",fontWeight:"bold"},deleted:{color:"#9a050f"},".language-autohotkey .token.tag":{color:"#9a050f"},tag:{color:"#00009f"},selector:{color:"#00009f"},".language-autohotkey .token.keyword":{color:"#00009f"},important:{fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},88608:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#ebdbb2",fontFamily:'Consolas, Monaco, "Andale Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#ebdbb2",fontFamily:'Consolas, Monaco, "Andale Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:"0.5em 0",overflow:"auto",background:"#1d2021"},'pre[class*="language-"]::-moz-selection':{color:"#fbf1c7",background:"#7c6f64"},'pre[class*="language-"] ::-moz-selection':{color:"#fbf1c7",background:"#7c6f64"},'code[class*="language-"]::-moz-selection':{color:"#fbf1c7",background:"#7c6f64"},'code[class*="language-"] ::-moz-selection':{color:"#fbf1c7",background:"#7c6f64"},'pre[class*="language-"]::selection':{color:"#fbf1c7",background:"#7c6f64"},'pre[class*="language-"] ::selection':{color:"#fbf1c7",background:"#7c6f64"},'code[class*="language-"]::selection':{color:"#fbf1c7",background:"#7c6f64"},'code[class*="language-"] ::selection':{color:"#fbf1c7",background:"#7c6f64"},':not(pre) > code[class*="language-"]':{background:"#1d2021",padding:"0.1em",borderRadius:"0.3em"},comment:{color:"#a89984"},prolog:{color:"#a89984"},cdata:{color:"#a89984"},delimiter:{color:"#fb4934"},boolean:{color:"#fb4934"},keyword:{color:"#fb4934"},selector:{color:"#fb4934"},important:{color:"#fb4934"},atrule:{color:"#fb4934"},operator:{color:"#a89984"},punctuation:{color:"#a89984"},"attr-name":{color:"#a89984"},tag:{color:"#fabd2f"},"tag.punctuation":{color:"#fabd2f"},doctype:{color:"#fabd2f"},builtin:{color:"#fabd2f"},entity:{color:"#d3869b"},number:{color:"#d3869b"},symbol:{color:"#d3869b"},property:{color:"#fb4934"},constant:{color:"#fb4934"},variable:{color:"#fb4934"},string:{color:"#b8bb26"},char:{color:"#b8bb26"},"attr-value":{color:"#a89984"},"attr-value.punctuation":{color:"#a89984"},url:{color:"#b8bb26",textDecoration:"underline"},function:{color:"#fabd2f"},regex:{background:"#b8bb26"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},inserted:{background:"#a89984"},deleted:{background:"#fb4934"}}},57509:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#3c3836",fontFamily:'Consolas, Monaco, "Andale Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#3c3836",fontFamily:'Consolas, Monaco, "Andale Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:"0.5em 0",overflow:"auto",background:"#f9f5d7"},'pre[class*="language-"]::-moz-selection':{color:"#282828",background:"#a89984"},'pre[class*="language-"] ::-moz-selection':{color:"#282828",background:"#a89984"},'code[class*="language-"]::-moz-selection':{color:"#282828",background:"#a89984"},'code[class*="language-"] ::-moz-selection':{color:"#282828",background:"#a89984"},'pre[class*="language-"]::selection':{color:"#282828",background:"#a89984"},'pre[class*="language-"] ::selection':{color:"#282828",background:"#a89984"},'code[class*="language-"]::selection':{color:"#282828",background:"#a89984"},'code[class*="language-"] ::selection':{color:"#282828",background:"#a89984"},':not(pre) > code[class*="language-"]':{background:"#f9f5d7",padding:"0.1em",borderRadius:"0.3em"},comment:{color:"#7c6f64"},prolog:{color:"#7c6f64"},cdata:{color:"#7c6f64"},delimiter:{color:"#9d0006"},boolean:{color:"#9d0006"},keyword:{color:"#9d0006"},selector:{color:"#9d0006"},important:{color:"#9d0006"},atrule:{color:"#9d0006"},operator:{color:"#7c6f64"},punctuation:{color:"#7c6f64"},"attr-name":{color:"#7c6f64"},tag:{color:"#b57614"},"tag.punctuation":{color:"#b57614"},doctype:{color:"#b57614"},builtin:{color:"#b57614"},entity:{color:"#8f3f71"},number:{color:"#8f3f71"},symbol:{color:"#8f3f71"},property:{color:"#9d0006"},constant:{color:"#9d0006"},variable:{color:"#9d0006"},string:{color:"#797403"},char:{color:"#797403"},"attr-value":{color:"#7c6f64"},"attr-value.punctuation":{color:"#7c6f64"},url:{color:"#797403",textDecoration:"underline"},function:{color:"#b57614"},regex:{background:"#797403"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},inserted:{background:"#7c6f64"},deleted:{background:"#9d0006"}}},81111:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={"code[class*='language-']":{color:"#d6e7ff",background:"#030314",textShadow:"none",fontFamily:'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',fontSize:"1em",lineHeight:"1.5",letterSpacing:".2px",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",textAlign:"left",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},"pre[class*='language-']":{color:"#d6e7ff",background:"#030314",textShadow:"none",fontFamily:'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',fontSize:"1em",lineHeight:"1.5",letterSpacing:".2px",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",textAlign:"left",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",border:"1px solid #2a4555",borderRadius:"5px",padding:"1.5em 1em",margin:"1em 0",overflow:"auto"},"pre[class*='language-']::-moz-selection":{color:"inherit",background:"#1d3b54",textShadow:"none"},"pre[class*='language-'] ::-moz-selection":{color:"inherit",background:"#1d3b54",textShadow:"none"},"code[class*='language-']::-moz-selection":{color:"inherit",background:"#1d3b54",textShadow:"none"},"code[class*='language-'] ::-moz-selection":{color:"inherit",background:"#1d3b54",textShadow:"none"},"pre[class*='language-']::selection":{color:"inherit",background:"#1d3b54",textShadow:"none"},"pre[class*='language-'] ::selection":{color:"inherit",background:"#1d3b54",textShadow:"none"},"code[class*='language-']::selection":{color:"inherit",background:"#1d3b54",textShadow:"none"},"code[class*='language-'] ::selection":{color:"inherit",background:"#1d3b54",textShadow:"none"},":not(pre) > code[class*='language-']":{color:"#f0f6f6",background:"#2a4555",padding:"0.2em 0.3em",borderRadius:"0.2em",boxDecorationBreak:"clone"},comment:{color:"#446e69"},prolog:{color:"#446e69"},doctype:{color:"#446e69"},cdata:{color:"#446e69"},punctuation:{color:"#d6b007"},property:{color:"#d6e7ff"},tag:{color:"#d6e7ff"},boolean:{color:"#d6e7ff"},number:{color:"#d6e7ff"},constant:{color:"#d6e7ff"},symbol:{color:"#d6e7ff"},deleted:{color:"#d6e7ff"},selector:{color:"#e60067"},"attr-name":{color:"#e60067"},builtin:{color:"#e60067"},inserted:{color:"#e60067"},string:{color:"#49c6ec"},char:{color:"#49c6ec"},operator:{color:"#ec8e01",background:"transparent"},entity:{color:"#ec8e01",background:"transparent"},url:{color:"#ec8e01",background:"transparent"},".language-css .token.string":{color:"#ec8e01",background:"transparent"},".style .token.string":{color:"#ec8e01",background:"transparent"},atrule:{color:"#0fe468"},"attr-value":{color:"#0fe468"},keyword:{color:"#0fe468"},function:{color:"#78f3e9"},"class-name":{color:"#78f3e9"},regex:{color:"#d6e7ff"},important:{color:"#d6e7ff"},variable:{color:"#d6e7ff"}}},80403:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{fontFamily:'"Fira Mono", Menlo, Monaco, "Lucida Console", "Courier New", Courier, monospace',fontSize:"16px",lineHeight:"1.375",direction:"ltr",textAlign:"left",wordSpacing:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",whiteSpace:"pre-wrap",wordBreak:"break-all",wordWrap:"break-word",background:"#322931",color:"#b9b5b8"},'pre[class*="language-"]':{fontFamily:'"Fira Mono", Menlo, Monaco, "Lucida Console", "Courier New", Courier, monospace',fontSize:"16px",lineHeight:"1.375",direction:"ltr",textAlign:"left",wordSpacing:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",whiteSpace:"pre-wrap",wordBreak:"break-all",wordWrap:"break-word",background:"#322931",color:"#b9b5b8",padding:"1em",margin:".5em 0",overflow:"auto"},'pre > code[class*="language-"]':{fontSize:"1em"},':not(pre) > code[class*="language-"]':{padding:".1em",borderRadius:".3em"},comment:{color:"#797379"},prolog:{color:"#797379"},doctype:{color:"#797379"},cdata:{color:"#797379"},punctuation:{color:"#b9b5b8"},".namespace":{Opacity:".7"},null:{color:"#fd8b19"},operator:{color:"#fd8b19"},boolean:{color:"#fd8b19"},number:{color:"#fd8b19"},property:{color:"#fdcc59"},tag:{color:"#1290bf"},string:{color:"#149b93"},selector:{color:"#c85e7c"},"attr-name":{color:"#fd8b19"},entity:{color:"#149b93",cursor:"help"},url:{color:"#149b93"},".language-css .token.string":{color:"#149b93"},".style .token.string":{color:"#149b93"},"attr-value":{color:"#8fc13e"},keyword:{color:"#8fc13e"},control:{color:"#8fc13e"},directive:{color:"#8fc13e"},unit:{color:"#8fc13e"},statement:{color:"#149b93"},regex:{color:"#149b93"},atrule:{color:"#149b93"},placeholder:{color:"#1290bf"},variable:{color:"#1290bf"},important:{color:"#dd464c",fontWeight:"bold"},"pre > code.highlight":{Outline:".4em solid red",OutlineOffset:".4em"}}},56676:function(k,a,l){"use strict";var f,m=l(90627);f={value:!0},f={enumerable:!0,get:function(){return d.default}},f={enumerable:!0,get:function(){return E.default}},f={enumerable:!0,get:function(){return G.default}},f={enumerable:!0,get:function(){return _.default}},f={enumerable:!0,get:function(){return Z.default}},f={enumerable:!0,get:function(){return Q.default}},f={enumerable:!0,get:function(){return N.default}},f={enumerable:!0,get:function(){return J.default}},f={enumerable:!0,get:function(){return ue.default}},f={enumerable:!0,get:function(){return r.default}},f={enumerable:!0,get:function(){return ee.default}},f={enumerable:!0,get:function(){return le.default}},f={enumerable:!0,get:function(){return oe.default}},f={enumerable:!0,get:function(){return xe.default}},f={enumerable:!0,get:function(){return we.default}},f={enumerable:!0,get:function(){return fe.default}},f={enumerable:!0,get:function(){return ne.default}},f={enumerable:!0,get:function(){return W.default}},f={enumerable:!0,get:function(){return Se.default}},f={enumerable:!0,get:function(){return me.default}},f={enumerable:!0,get:function(){return je.default}},f={enumerable:!0,get:function(){return he.default}},f={enumerable:!0,get:function(){return D.default}},f={enumerable:!0,get:function(){return X.default}},f={enumerable:!0,get:function(){return te.default}},f={enumerable:!0,get:function(){return ge.default}},f={enumerable:!0,get:function(){return We.default}},f={enumerable:!0,get:function(){return Ee.default}},f={enumerable:!0,get:function(){return Le.default}},f={enumerable:!0,get:function(){return U.default}},f={enumerable:!0,get:function(){return Ne.default}},f={enumerable:!0,get:function(){return Re.default}},f={enumerable:!0,get:function(){return Je.default}},f={enumerable:!0,get:function(){return j.default}},f={enumerable:!0,get:function(){return Pe.default}},f={enumerable:!0,get:function(){return Ze.default}},f={enumerable:!0,get:function(){return R.default}},f={enumerable:!0,get:function(){return Ie.default}},f={enumerable:!0,get:function(){return v.default}},f={enumerable:!0,get:function(){return P.default}},Object.defineProperty(a,"vs",{enumerable:!0,get:function(){return C.default}}),Object.defineProperty(a,"YC",{enumerable:!0,get:function(){return Ue.default}}),f={enumerable:!0,get:function(){return He.default}},f={enumerable:!0,get:function(){return Ve.default}};var N=m(l(72111)),r=m(l(14843)),W=m(l(65993)),U=m(l(86608)),R=m(l(43091)),v=m(l(25010)),P=m(l(50810)),j=m(l(72242)),d=m(l(98600)),E=m(l(55373)),G=m(l(4247)),_=m(l(65886)),Z=m(l(73016)),Q=m(l(15872)),J=m(l(22357)),ue=m(l(74515)),ee=m(l(76088)),le=m(l(89777)),oe=m(l(33779)),xe=m(l(56893)),we=m(l(98978)),fe=m(l(28178)),ne=m(l(39469)),Se=m(l(40039)),me=m(l(88608)),je=m(l(57509)),he=m(l(81111)),D=m(l(80403)),X=m(l(1325)),te=m(l(16746)),ge=m(l(26152)),We=m(l(41061)),Ee=m(l(6949)),Le=m(l(14477)),Ne=m(l(86637)),Re=m(l(71998)),Je=m(l(69875)),Pe=m(l(84646)),Ze=m(l(59222)),Ie=m(l(73041)),C=m(l(86485)),Ue=m(l(95668)),He=m(l(27116)),Ve=m(l(31968))},1325:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#f8f8f2",background:"none",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', monospace",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#f8f8f2",background:"#263E52",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', monospace",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em"},':not(pre) > code[class*="language-"]':{background:"#263E52",padding:".1em",borderRadius:".3em",whiteSpace:"normal"},comment:{color:"#5c98cd"},prolog:{color:"#5c98cd"},doctype:{color:"#5c98cd"},cdata:{color:"#5c98cd"},punctuation:{color:"#f8f8f2"},".namespace":{Opacity:".7"},property:{color:"#F05E5D"},tag:{color:"#F05E5D"},constant:{color:"#F05E5D"},symbol:{color:"#F05E5D"},deleted:{color:"#F05E5D"},boolean:{color:"#BC94F9"},number:{color:"#BC94F9"},selector:{color:"#FCFCD6"},"attr-name":{color:"#FCFCD6"},string:{color:"#FCFCD6"},char:{color:"#FCFCD6"},builtin:{color:"#FCFCD6"},inserted:{color:"#FCFCD6"},operator:{color:"#f8f8f2"},entity:{color:"#f8f8f2",cursor:"help"},url:{color:"#f8f8f2"},".language-css .token.string":{color:"#f8f8f2"},".style .token.string":{color:"#f8f8f2"},variable:{color:"#f8f8f2"},atrule:{color:"#66D8EF"},"attr-value":{color:"#66D8EF"},function:{color:"#66D8EF"},"class-name":{color:"#66D8EF"},keyword:{color:"#6EB26E"},regex:{color:"#F05E5D"},important:{color:"#F05E5D",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},16746:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",color:"#eee",background:"#2f2f2f",fontFamily:"Roboto Mono, monospace",fontSize:"1em",lineHeight:"1.5em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",color:"#eee",background:"#2f2f2f",fontFamily:"Roboto Mono, monospace",fontSize:"1em",lineHeight:"1.5em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",overflow:"auto",position:"relative",margin:"0.5em 0",padding:"1.25em 1em"},'code[class*="language-"]::-moz-selection':{background:"#363636"},'pre[class*="language-"]::-moz-selection':{background:"#363636"},'code[class*="language-"] ::-moz-selection':{background:"#363636"},'pre[class*="language-"] ::-moz-selection':{background:"#363636"},'code[class*="language-"]::selection':{background:"#363636"},'pre[class*="language-"]::selection':{background:"#363636"},'code[class*="language-"] ::selection':{background:"#363636"},'pre[class*="language-"] ::selection':{background:"#363636"},':not(pre) > code[class*="language-"]':{whiteSpace:"normal",borderRadius:"0.2em",padding:"0.1em"},".language-css > code":{color:"#fd9170"},".language-sass > code":{color:"#fd9170"},".language-scss > code":{color:"#fd9170"},'[class*="language-"] .namespace':{Opacity:"0.7"},atrule:{color:"#c792ea"},"attr-name":{color:"#ffcb6b"},"attr-value":{color:"#a5e844"},attribute:{color:"#a5e844"},boolean:{color:"#c792ea"},builtin:{color:"#ffcb6b"},cdata:{color:"#80cbc4"},char:{color:"#80cbc4"},class:{color:"#ffcb6b"},"class-name":{color:"#f2ff00"},comment:{color:"#616161"},constant:{color:"#c792ea"},deleted:{color:"#ff6666"},doctype:{color:"#616161"},entity:{color:"#ff6666"},function:{color:"#c792ea"},hexcode:{color:"#f2ff00"},id:{color:"#c792ea",fontWeight:"bold"},important:{color:"#c792ea",fontWeight:"bold"},inserted:{color:"#80cbc4"},keyword:{color:"#c792ea"},number:{color:"#fd9170"},operator:{color:"#89ddff"},prolog:{color:"#616161"},property:{color:"#80cbc4"},"pseudo-class":{color:"#a5e844"},"pseudo-element":{color:"#a5e844"},punctuation:{color:"#89ddff"},regex:{color:"#f2ff00"},selector:{color:"#ff6666"},string:{color:"#a5e844"},symbol:{color:"#c792ea"},tag:{color:"#ff6666"},unit:{color:"#fd9170"},url:{color:"#ff6666"},variable:{color:"#ff6666"}}},26152:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",color:"#90a4ae",background:"#fafafa",fontFamily:"Roboto Mono, monospace",fontSize:"1em",lineHeight:"1.5em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",color:"#90a4ae",background:"#fafafa",fontFamily:"Roboto Mono, monospace",fontSize:"1em",lineHeight:"1.5em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",overflow:"auto",position:"relative",margin:"0.5em 0",padding:"1.25em 1em"},'code[class*="language-"]::-moz-selection':{background:"#cceae7",color:"#263238"},'pre[class*="language-"]::-moz-selection':{background:"#cceae7",color:"#263238"},'code[class*="language-"] ::-moz-selection':{background:"#cceae7",color:"#263238"},'pre[class*="language-"] ::-moz-selection':{background:"#cceae7",color:"#263238"},'code[class*="language-"]::selection':{background:"#cceae7",color:"#263238"},'pre[class*="language-"]::selection':{background:"#cceae7",color:"#263238"},'code[class*="language-"] ::selection':{background:"#cceae7",color:"#263238"},'pre[class*="language-"] ::selection':{background:"#cceae7",color:"#263238"},':not(pre) > code[class*="language-"]':{whiteSpace:"normal",borderRadius:"0.2em",padding:"0.1em"},".language-css > code":{color:"#f76d47"},".language-sass > code":{color:"#f76d47"},".language-scss > code":{color:"#f76d47"},'[class*="language-"] .namespace':{Opacity:"0.7"},atrule:{color:"#7c4dff"},"attr-name":{color:"#39adb5"},"attr-value":{color:"#f6a434"},attribute:{color:"#f6a434"},boolean:{color:"#7c4dff"},builtin:{color:"#39adb5"},cdata:{color:"#39adb5"},char:{color:"#39adb5"},class:{color:"#39adb5"},"class-name":{color:"#6182b8"},comment:{color:"#aabfc9"},constant:{color:"#7c4dff"},deleted:{color:"#e53935"},doctype:{color:"#aabfc9"},entity:{color:"#e53935"},function:{color:"#7c4dff"},hexcode:{color:"#f76d47"},id:{color:"#7c4dff",fontWeight:"bold"},important:{color:"#7c4dff",fontWeight:"bold"},inserted:{color:"#39adb5"},keyword:{color:"#7c4dff"},number:{color:"#f76d47"},operator:{color:"#39adb5"},prolog:{color:"#aabfc9"},property:{color:"#39adb5"},"pseudo-class":{color:"#f6a434"},"pseudo-element":{color:"#f6a434"},punctuation:{color:"#39adb5"},regex:{color:"#6182b8"},selector:{color:"#e53935"},string:{color:"#f6a434"},symbol:{color:"#7c4dff"},tag:{color:"#e53935"},unit:{color:"#f76d47"},url:{color:"#e53935"},variable:{color:"#e53935"}}},41061:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",color:"#c3cee3",background:"#263238",fontFamily:"Roboto Mono, monospace",fontSize:"1em",lineHeight:"1.5em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",color:"#c3cee3",background:"#263238",fontFamily:"Roboto Mono, monospace",fontSize:"1em",lineHeight:"1.5em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",overflow:"auto",position:"relative",margin:"0.5em 0",padding:"1.25em 1em"},'code[class*="language-"]::-moz-selection':{background:"#363636"},'pre[class*="language-"]::-moz-selection':{background:"#363636"},'code[class*="language-"] ::-moz-selection':{background:"#363636"},'pre[class*="language-"] ::-moz-selection':{background:"#363636"},'code[class*="language-"]::selection':{background:"#363636"},'pre[class*="language-"]::selection':{background:"#363636"},'code[class*="language-"] ::selection':{background:"#363636"},'pre[class*="language-"] ::selection':{background:"#363636"},':not(pre) > code[class*="language-"]':{whiteSpace:"normal",borderRadius:"0.2em",padding:"0.1em"},".language-css > code":{color:"#fd9170"},".language-sass > code":{color:"#fd9170"},".language-scss > code":{color:"#fd9170"},'[class*="language-"] .namespace':{Opacity:"0.7"},atrule:{color:"#c792ea"},"attr-name":{color:"#ffcb6b"},"attr-value":{color:"#c3e88d"},attribute:{color:"#c3e88d"},boolean:{color:"#c792ea"},builtin:{color:"#ffcb6b"},cdata:{color:"#80cbc4"},char:{color:"#80cbc4"},class:{color:"#ffcb6b"},"class-name":{color:"#f2ff00"},color:{color:"#f2ff00"},comment:{color:"#546e7a"},constant:{color:"#c792ea"},deleted:{color:"#f07178"},doctype:{color:"#546e7a"},entity:{color:"#f07178"},function:{color:"#c792ea"},hexcode:{color:"#f2ff00"},id:{color:"#c792ea",fontWeight:"bold"},important:{color:"#c792ea",fontWeight:"bold"},inserted:{color:"#80cbc4"},keyword:{color:"#c792ea",fontStyle:"italic"},number:{color:"#fd9170"},operator:{color:"#89ddff"},prolog:{color:"#546e7a"},property:{color:"#80cbc4"},"pseudo-class":{color:"#c3e88d"},"pseudo-element":{color:"#c3e88d"},punctuation:{color:"#89ddff"},regex:{color:"#f2ff00"},selector:{color:"#f07178"},string:{color:"#c3e88d"},symbol:{color:"#c792ea"},tag:{color:"#f07178"},unit:{color:"#f07178"},url:{color:"#fd9170"},variable:{color:"#f07178"}}},6949:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#d6deeb",fontFamily:'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",fontSize:"1em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"white",fontFamily:'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",fontSize:"1em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:"0.5em 0",overflow:"auto",background:"#011627"},'pre[class*="language-"]::-moz-selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'pre[class*="language-"] ::-moz-selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'code[class*="language-"]::-moz-selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'code[class*="language-"] ::-moz-selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'pre[class*="language-"]::selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'pre[class*="language-"] ::selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'code[class*="language-"]::selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'code[class*="language-"] ::selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},':not(pre) > code[class*="language-"]':{color:"white",background:"#011627",padding:"0.1em",borderRadius:"0.3em",whiteSpace:"normal"},comment:{color:"rgb(99, 119, 119)",fontStyle:"italic"},prolog:{color:"rgb(99, 119, 119)",fontStyle:"italic"},cdata:{color:"rgb(99, 119, 119)",fontStyle:"italic"},punctuation:{color:"rgb(199, 146, 234)"},".namespace":{color:"rgb(178, 204, 214)"},deleted:{color:"rgba(239, 83, 80, 0.56)",fontStyle:"italic"},symbol:{color:"rgb(128, 203, 196)"},property:{color:"rgb(128, 203, 196)"},tag:{color:"rgb(127, 219, 202)"},operator:{color:"rgb(127, 219, 202)"},keyword:{color:"rgb(127, 219, 202)"},boolean:{color:"rgb(255, 88, 116)"},number:{color:"rgb(247, 140, 108)"},constant:{color:"rgb(130, 170, 255)"},function:{color:"rgb(130, 170, 255)"},builtin:{color:"rgb(130, 170, 255)"},char:{color:"rgb(130, 170, 255)"},selector:{color:"rgb(199, 146, 234)",fontStyle:"italic"},doctype:{color:"rgb(199, 146, 234)",fontStyle:"italic"},"attr-name":{color:"rgb(173, 219, 103)",fontStyle:"italic"},inserted:{color:"rgb(173, 219, 103)",fontStyle:"italic"},string:{color:"rgb(173, 219, 103)"},url:{color:"rgb(173, 219, 103)"},entity:{color:"rgb(173, 219, 103)"},".language-css .token.string":{color:"rgb(173, 219, 103)"},".style .token.string":{color:"rgb(173, 219, 103)"},"class-name":{color:"rgb(255, 203, 139)"},atrule:{color:"rgb(255, 203, 139)"},"attr-value":{color:"rgb(255, 203, 139)"},regex:{color:"rgb(214, 222, 235)"},important:{color:"rgb(214, 222, 235)",fontWeight:"bold"},variable:{color:"rgb(214, 222, 235)"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},14477:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#f8f8f2",background:"none",fontFamily:`"Fira Code", Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#f8f8f2",background:"#2E3440",fontFamily:`"Fira Code", Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em"},':not(pre) > code[class*="language-"]':{background:"#2E3440",padding:".1em",borderRadius:".3em",whiteSpace:"normal"},comment:{color:"#636f88"},prolog:{color:"#636f88"},doctype:{color:"#636f88"},cdata:{color:"#636f88"},punctuation:{color:"#81A1C1"},".namespace":{Opacity:".7"},property:{color:"#81A1C1"},tag:{color:"#81A1C1"},constant:{color:"#81A1C1"},symbol:{color:"#81A1C1"},deleted:{color:"#81A1C1"},number:{color:"#B48EAD"},boolean:{color:"#81A1C1"},selector:{color:"#A3BE8C"},"attr-name":{color:"#A3BE8C"},string:{color:"#A3BE8C"},char:{color:"#A3BE8C"},builtin:{color:"#A3BE8C"},inserted:{color:"#A3BE8C"},operator:{color:"#81A1C1"},entity:{color:"#81A1C1",cursor:"help"},url:{color:"#81A1C1"},".language-css .token.string":{color:"#81A1C1"},".style .token.string":{color:"#81A1C1"},variable:{color:"#81A1C1"},atrule:{color:"#88C0D0"},"attr-value":{color:"#88C0D0"},function:{color:"#88C0D0"},"class-name":{color:"#88C0D0"},keyword:{color:"#81A1C1"},regex:{color:"#EBCB8B"},important:{color:"#EBCB8B",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},86608:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#f8f8f2",background:"none",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#f8f8f2",background:"#272822",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em"},':not(pre) > code[class*="language-"]':{background:"#272822",padding:".1em",borderRadius:".3em",whiteSpace:"normal"},comment:{color:"#8292a2"},prolog:{color:"#8292a2"},doctype:{color:"#8292a2"},cdata:{color:"#8292a2"},punctuation:{color:"#f8f8f2"},namespace:{Opacity:".7"},property:{color:"#f92672"},tag:{color:"#f92672"},constant:{color:"#f92672"},symbol:{color:"#f92672"},deleted:{color:"#f92672"},boolean:{color:"#ae81ff"},number:{color:"#ae81ff"},selector:{color:"#a6e22e"},"attr-name":{color:"#a6e22e"},string:{color:"#a6e22e"},char:{color:"#a6e22e"},builtin:{color:"#a6e22e"},inserted:{color:"#a6e22e"},operator:{color:"#f8f8f2"},entity:{color:"#f8f8f2",cursor:"help"},url:{color:"#f8f8f2"},".language-css .token.string":{color:"#f8f8f2"},".style .token.string":{color:"#f8f8f2"},variable:{color:"#f8f8f2"},atrule:{color:"#e6db74"},"attr-value":{color:"#e6db74"},function:{color:"#e6db74"},"class-name":{color:"#e6db74"},keyword:{color:"#66d9ef"},regex:{color:"#fd971f"},important:{color:"#fd971f",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},86637:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{background:"hsl(220, 13%, 18%)",color:"hsl(220, 14%, 71%)",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:'"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{background:"hsl(220, 13%, 18%)",color:"hsl(220, 14%, 71%)",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:'"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:"0.5em 0",overflow:"auto",borderRadius:"0.3em"},'code[class*="language-"]::-moz-selection':{background:"hsl(220, 13%, 28%)",color:"inherit",textShadow:"none"},'code[class*="language-"] *::-moz-selection':{background:"hsl(220, 13%, 28%)",color:"inherit",textShadow:"none"},'pre[class*="language-"] *::-moz-selection':{background:"hsl(220, 13%, 28%)",color:"inherit",textShadow:"none"},'code[class*="language-"]::selection':{background:"hsl(220, 13%, 28%)",color:"inherit",textShadow:"none"},'code[class*="language-"] *::selection':{background:"hsl(220, 13%, 28%)",color:"inherit",textShadow:"none"},'pre[class*="language-"] *::selection':{background:"hsl(220, 13%, 28%)",color:"inherit",textShadow:"none"},':not(pre) > code[class*="language-"]':{padding:"0.2em 0.3em",borderRadius:"0.3em",whiteSpace:"normal"},comment:{color:"hsl(220, 10%, 40%)",fontStyle:"italic"},prolog:{color:"hsl(220, 10%, 40%)"},cdata:{color:"hsl(220, 10%, 40%)"},doctype:{color:"hsl(220, 14%, 71%)"},punctuation:{color:"hsl(220, 14%, 71%)"},entity:{color:"hsl(220, 14%, 71%)",cursor:"help"},"attr-name":{color:"hsl(29, 54%, 61%)"},"class-name":{color:"hsl(29, 54%, 61%)"},boolean:{color:"hsl(29, 54%, 61%)"},constant:{color:"hsl(29, 54%, 61%)"},number:{color:"hsl(29, 54%, 61%)"},atrule:{color:"hsl(29, 54%, 61%)"},keyword:{color:"hsl(286, 60%, 67%)"},property:{color:"hsl(355, 65%, 65%)"},tag:{color:"hsl(355, 65%, 65%)"},symbol:{color:"hsl(355, 65%, 65%)"},deleted:{color:"hsl(355, 65%, 65%)"},important:{color:"hsl(355, 65%, 65%)"},selector:{color:"hsl(95, 38%, 62%)"},string:{color:"hsl(95, 38%, 62%)"},char:{color:"hsl(95, 38%, 62%)"},builtin:{color:"hsl(95, 38%, 62%)"},inserted:{color:"hsl(95, 38%, 62%)"},regex:{color:"hsl(95, 38%, 62%)"},"attr-value":{color:"hsl(95, 38%, 62%)"},"attr-value > .token.punctuation":{color:"hsl(95, 38%, 62%)"},variable:{color:"hsl(207, 82%, 66%)"},operator:{color:"hsl(207, 82%, 66%)"},function:{color:"hsl(207, 82%, 66%)"},url:{color:"hsl(187, 47%, 55%)"},"attr-value > .token.punctuation.attr-equals":{color:"hsl(220, 14%, 71%)"},"special-attr > .token.attr-value > .token.value.css":{color:"hsl(220, 14%, 71%)"},".language-css .token.selector":{color:"hsl(355, 65%, 65%)"},".language-css .token.property":{color:"hsl(220, 14%, 71%)"},".language-css .token.function":{color:"hsl(187, 47%, 55%)"},".language-css .token.url > .token.function":{color:"hsl(187, 47%, 55%)"},".language-css .token.url > .token.string.url":{color:"hsl(95, 38%, 62%)"},".language-css .token.important":{color:"hsl(286, 60%, 67%)"},".language-css .token.atrule .token.rule":{color:"hsl(286, 60%, 67%)"},".language-javascript .token.operator":{color:"hsl(286, 60%, 67%)"},".language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation":{color:"hsl(5, 48%, 51%)"},".language-json .token.operator":{color:"hsl(220, 14%, 71%)"},".language-json .token.null.keyword":{color:"hsl(29, 54%, 61%)"},".language-markdown .token.url":{color:"hsl(220, 14%, 71%)"},".language-markdown .token.url > .token.operator":{color:"hsl(220, 14%, 71%)"},".language-markdown .token.url-reference.url > .token.string":{color:"hsl(220, 14%, 71%)"},".language-markdown .token.url > .token.content":{color:"hsl(207, 82%, 66%)"},".language-markdown .token.url > .token.url":{color:"hsl(187, 47%, 55%)"},".language-markdown .token.url-reference.url":{color:"hsl(187, 47%, 55%)"},".language-markdown .token.blockquote.punctuation":{color:"hsl(220, 10%, 40%)",fontStyle:"italic"},".language-markdown .token.hr.punctuation":{color:"hsl(220, 10%, 40%)",fontStyle:"italic"},".language-markdown .token.code-snippet":{color:"hsl(95, 38%, 62%)"},".language-markdown .token.bold .token.content":{color:"hsl(29, 54%, 61%)"},".language-markdown .token.italic .token.content":{color:"hsl(286, 60%, 67%)"},".language-markdown .token.strike .token.content":{color:"hsl(355, 65%, 65%)"},".language-markdown .token.strike .token.punctuation":{color:"hsl(355, 65%, 65%)"},".language-markdown .token.list.punctuation":{color:"hsl(355, 65%, 65%)"},".language-markdown .token.title.important > .token.punctuation":{color:"hsl(355, 65%, 65%)"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},namespace:{Opacity:"0.8"},"token.tab:not(:empty):before":{color:"hsla(220, 14%, 71%, 0.15)",textShadow:"none"},"token.cr:before":{color:"hsla(220, 14%, 71%, 0.15)",textShadow:"none"},"token.lf:before":{color:"hsla(220, 14%, 71%, 0.15)",textShadow:"none"},"token.space:before":{color:"hsla(220, 14%, 71%, 0.15)",textShadow:"none"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item":{marginRight:"0.4em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button":{background:"hsl(220, 13%, 26%)",color:"hsl(220, 9%, 55%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a":{background:"hsl(220, 13%, 26%)",color:"hsl(220, 9%, 55%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span":{background:"hsl(220, 13%, 26%)",color:"hsl(220, 9%, 55%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover":{background:"hsl(220, 13%, 28%)",color:"hsl(220, 14%, 71%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus":{background:"hsl(220, 13%, 28%)",color:"hsl(220, 14%, 71%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover":{background:"hsl(220, 13%, 28%)",color:"hsl(220, 14%, 71%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus":{background:"hsl(220, 13%, 28%)",color:"hsl(220, 14%, 71%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover":{background:"hsl(220, 13%, 28%)",color:"hsl(220, 14%, 71%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus":{background:"hsl(220, 13%, 28%)",color:"hsl(220, 14%, 71%)"},".line-highlight.line-highlight":{background:"hsla(220, 100%, 80%, 0.04)"},".line-highlight.line-highlight:before":{background:"hsl(220, 13%, 26%)",color:"hsl(220, 14%, 71%)",padding:"0.1em 0.6em",borderRadius:"0.3em",boxShadow:"0 2px 0 0 rgba(0, 0, 0, 0.2)"},".line-highlight.line-highlight[data-end]:after":{background:"hsl(220, 13%, 26%)",color:"hsl(220, 14%, 71%)",padding:"0.1em 0.6em",borderRadius:"0.3em",boxShadow:"0 2px 0 0 rgba(0, 0, 0, 0.2)"},"pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":{backgroundColor:"hsla(220, 100%, 80%, 0.04)"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"hsla(220, 14%, 71%, 0.15)"},".command-line .command-line-prompt":{borderRightColor:"hsla(220, 14%, 71%, 0.15)"},".line-numbers .line-numbers-rows > span:before":{color:"hsl(220, 14%, 45%)"},".command-line .command-line-prompt > span:before":{color:"hsl(220, 14%, 45%)"},".rainbow-braces .token.token.punctuation.brace-level-1":{color:"hsl(355, 65%, 65%)"},".rainbow-braces .token.token.punctuation.brace-level-5":{color:"hsl(355, 65%, 65%)"},".rainbow-braces .token.token.punctuation.brace-level-9":{color:"hsl(355, 65%, 65%)"},".rainbow-braces .token.token.punctuation.brace-level-2":{color:"hsl(95, 38%, 62%)"},".rainbow-braces .token.token.punctuation.brace-level-6":{color:"hsl(95, 38%, 62%)"},".rainbow-braces .token.token.punctuation.brace-level-10":{color:"hsl(95, 38%, 62%)"},".rainbow-braces .token.token.punctuation.brace-level-3":{color:"hsl(207, 82%, 66%)"},".rainbow-braces .token.token.punctuation.brace-level-7":{color:"hsl(207, 82%, 66%)"},".rainbow-braces .token.token.punctuation.brace-level-11":{color:"hsl(207, 82%, 66%)"},".rainbow-braces .token.token.punctuation.brace-level-4":{color:"hsl(286, 60%, 67%)"},".rainbow-braces .token.token.punctuation.brace-level-8":{color:"hsl(286, 60%, 67%)"},".rainbow-braces .token.token.punctuation.brace-level-12":{color:"hsl(286, 60%, 67%)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)":{backgroundColor:"hsla(353, 100%, 66%, 0.15)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)":{backgroundColor:"hsla(353, 100%, 66%, 0.15)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)":{backgroundColor:"hsla(137, 100%, 55%, 0.15)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)":{backgroundColor:"hsla(137, 100%, 55%, 0.15)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},".prism-previewer.prism-previewer:before":{borderColor:"hsl(224, 13%, 17%)"},".prism-previewer-gradient.prism-previewer-gradient div":{borderColor:"hsl(224, 13%, 17%)",borderRadius:"0.3em"},".prism-previewer-color.prism-previewer-color:before":{borderRadius:"0.3em"},".prism-previewer-easing.prism-previewer-easing:before":{borderRadius:"0.3em"},".prism-previewer.prism-previewer:after":{borderTopColor:"hsl(224, 13%, 17%)"},".prism-previewer-flipped.prism-previewer-flipped.after":{borderBottomColor:"hsl(224, 13%, 17%)"},".prism-previewer-angle.prism-previewer-angle:before":{background:"hsl(219, 13%, 22%)"},".prism-previewer-time.prism-previewer-time:before":{background:"hsl(219, 13%, 22%)"},".prism-previewer-easing.prism-previewer-easing":{background:"hsl(219, 13%, 22%)"},".prism-previewer-angle.prism-previewer-angle circle":{stroke:"hsl(220, 14%, 71%)",strokeOpacity:"1"},".prism-previewer-time.prism-previewer-time circle":{stroke:"hsl(220, 14%, 71%)",strokeOpacity:"1"},".prism-previewer-easing.prism-previewer-easing circle":{stroke:"hsl(220, 14%, 71%)",fill:"transparent"},".prism-previewer-easing.prism-previewer-easing path":{stroke:"hsl(220, 14%, 71%)"},".prism-previewer-easing.prism-previewer-easing line":{stroke:"hsl(220, 14%, 71%)"}}},71998:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{background:"hsl(230, 1%, 98%)",color:"hsl(230, 8%, 24%)",fontFamily:'"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{background:"hsl(230, 1%, 98%)",color:"hsl(230, 8%, 24%)",fontFamily:'"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:"0.5em 0",overflow:"auto",borderRadius:"0.3em"},'code[class*="language-"]::-moz-selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'code[class*="language-"] *::-moz-selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'pre[class*="language-"] *::-moz-selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'code[class*="language-"]::selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'code[class*="language-"] *::selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},'pre[class*="language-"] *::selection':{background:"hsl(230, 1%, 90%)",color:"inherit"},':not(pre) > code[class*="language-"]':{padding:"0.2em 0.3em",borderRadius:"0.3em",whiteSpace:"normal"},comment:{color:"hsl(230, 4%, 64%)",fontStyle:"italic"},prolog:{color:"hsl(230, 4%, 64%)"},cdata:{color:"hsl(230, 4%, 64%)"},doctype:{color:"hsl(230, 8%, 24%)"},punctuation:{color:"hsl(230, 8%, 24%)"},entity:{color:"hsl(230, 8%, 24%)",cursor:"help"},"attr-name":{color:"hsl(35, 99%, 36%)"},"class-name":{color:"hsl(35, 99%, 36%)"},boolean:{color:"hsl(35, 99%, 36%)"},constant:{color:"hsl(35, 99%, 36%)"},number:{color:"hsl(35, 99%, 36%)"},atrule:{color:"hsl(35, 99%, 36%)"},keyword:{color:"hsl(301, 63%, 40%)"},property:{color:"hsl(5, 74%, 59%)"},tag:{color:"hsl(5, 74%, 59%)"},symbol:{color:"hsl(5, 74%, 59%)"},deleted:{color:"hsl(5, 74%, 59%)"},important:{color:"hsl(5, 74%, 59%)"},selector:{color:"hsl(119, 34%, 47%)"},string:{color:"hsl(119, 34%, 47%)"},char:{color:"hsl(119, 34%, 47%)"},builtin:{color:"hsl(119, 34%, 47%)"},inserted:{color:"hsl(119, 34%, 47%)"},regex:{color:"hsl(119, 34%, 47%)"},"attr-value":{color:"hsl(119, 34%, 47%)"},"attr-value > .token.punctuation":{color:"hsl(119, 34%, 47%)"},variable:{color:"hsl(221, 87%, 60%)"},operator:{color:"hsl(221, 87%, 60%)"},function:{color:"hsl(221, 87%, 60%)"},url:{color:"hsl(198, 99%, 37%)"},"attr-value > .token.punctuation.attr-equals":{color:"hsl(230, 8%, 24%)"},"special-attr > .token.attr-value > .token.value.css":{color:"hsl(230, 8%, 24%)"},".language-css .token.selector":{color:"hsl(5, 74%, 59%)"},".language-css .token.property":{color:"hsl(230, 8%, 24%)"},".language-css .token.function":{color:"hsl(198, 99%, 37%)"},".language-css .token.url > .token.function":{color:"hsl(198, 99%, 37%)"},".language-css .token.url > .token.string.url":{color:"hsl(119, 34%, 47%)"},".language-css .token.important":{color:"hsl(301, 63%, 40%)"},".language-css .token.atrule .token.rule":{color:"hsl(301, 63%, 40%)"},".language-javascript .token.operator":{color:"hsl(301, 63%, 40%)"},".language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation":{color:"hsl(344, 84%, 43%)"},".language-json .token.operator":{color:"hsl(230, 8%, 24%)"},".language-json .token.null.keyword":{color:"hsl(35, 99%, 36%)"},".language-markdown .token.url":{color:"hsl(230, 8%, 24%)"},".language-markdown .token.url > .token.operator":{color:"hsl(230, 8%, 24%)"},".language-markdown .token.url-reference.url > .token.string":{color:"hsl(230, 8%, 24%)"},".language-markdown .token.url > .token.content":{color:"hsl(221, 87%, 60%)"},".language-markdown .token.url > .token.url":{color:"hsl(198, 99%, 37%)"},".language-markdown .token.url-reference.url":{color:"hsl(198, 99%, 37%)"},".language-markdown .token.blockquote.punctuation":{color:"hsl(230, 4%, 64%)",fontStyle:"italic"},".language-markdown .token.hr.punctuation":{color:"hsl(230, 4%, 64%)",fontStyle:"italic"},".language-markdown .token.code-snippet":{color:"hsl(119, 34%, 47%)"},".language-markdown .token.bold .token.content":{color:"hsl(35, 99%, 36%)"},".language-markdown .token.italic .token.content":{color:"hsl(301, 63%, 40%)"},".language-markdown .token.strike .token.content":{color:"hsl(5, 74%, 59%)"},".language-markdown .token.strike .token.punctuation":{color:"hsl(5, 74%, 59%)"},".language-markdown .token.list.punctuation":{color:"hsl(5, 74%, 59%)"},".language-markdown .token.title.important > .token.punctuation":{color:"hsl(5, 74%, 59%)"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},namespace:{Opacity:"0.8"},"token.tab:not(:empty):before":{color:"hsla(230, 8%, 24%, 0.2)"},"token.cr:before":{color:"hsla(230, 8%, 24%, 0.2)"},"token.lf:before":{color:"hsla(230, 8%, 24%, 0.2)"},"token.space:before":{color:"hsla(230, 8%, 24%, 0.2)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item":{marginRight:"0.4em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 6%, 44%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 6%, 44%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 6%, 44%)",padding:"0.1em 0.4em",borderRadius:"0.3em"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},"div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus":{background:"hsl(230, 1%, 78%)",color:"hsl(230, 8%, 24%)"},".line-highlight.line-highlight":{background:"hsla(230, 8%, 24%, 0.05)"},".line-highlight.line-highlight:before":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 8%, 24%)",padding:"0.1em 0.6em",borderRadius:"0.3em",boxShadow:"0 2px 0 0 rgba(0, 0, 0, 0.2)"},".line-highlight.line-highlight[data-end]:after":{background:"hsl(230, 1%, 90%)",color:"hsl(230, 8%, 24%)",padding:"0.1em 0.6em",borderRadius:"0.3em",boxShadow:"0 2px 0 0 rgba(0, 0, 0, 0.2)"},"pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before":{backgroundColor:"hsla(230, 8%, 24%, 0.05)"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"hsla(230, 8%, 24%, 0.2)"},".command-line .command-line-prompt":{borderRightColor:"hsla(230, 8%, 24%, 0.2)"},".line-numbers .line-numbers-rows > span:before":{color:"hsl(230, 1%, 62%)"},".command-line .command-line-prompt > span:before":{color:"hsl(230, 1%, 62%)"},".rainbow-braces .token.token.punctuation.brace-level-1":{color:"hsl(5, 74%, 59%)"},".rainbow-braces .token.token.punctuation.brace-level-5":{color:"hsl(5, 74%, 59%)"},".rainbow-braces .token.token.punctuation.brace-level-9":{color:"hsl(5, 74%, 59%)"},".rainbow-braces .token.token.punctuation.brace-level-2":{color:"hsl(119, 34%, 47%)"},".rainbow-braces .token.token.punctuation.brace-level-6":{color:"hsl(119, 34%, 47%)"},".rainbow-braces .token.token.punctuation.brace-level-10":{color:"hsl(119, 34%, 47%)"},".rainbow-braces .token.token.punctuation.brace-level-3":{color:"hsl(221, 87%, 60%)"},".rainbow-braces .token.token.punctuation.brace-level-7":{color:"hsl(221, 87%, 60%)"},".rainbow-braces .token.token.punctuation.brace-level-11":{color:"hsl(221, 87%, 60%)"},".rainbow-braces .token.token.punctuation.brace-level-4":{color:"hsl(301, 63%, 40%)"},".rainbow-braces .token.token.punctuation.brace-level-8":{color:"hsl(301, 63%, 40%)"},".rainbow-braces .token.token.punctuation.brace-level-12":{color:"hsl(301, 63%, 40%)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)":{backgroundColor:"hsla(353, 100%, 66%, 0.15)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)":{backgroundColor:"hsla(353, 100%, 66%, 0.15)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection":{backgroundColor:"hsla(353, 95%, 66%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)":{backgroundColor:"hsla(137, 100%, 55%, 0.15)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)":{backgroundColor:"hsla(137, 100%, 55%, 0.15)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},"pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection":{backgroundColor:"hsla(135, 73%, 55%, 0.25)"},".prism-previewer.prism-previewer:before":{borderColor:"hsl(0, 0, 95%)"},".prism-previewer-gradient.prism-previewer-gradient div":{borderColor:"hsl(0, 0, 95%)",borderRadius:"0.3em"},".prism-previewer-color.prism-previewer-color:before":{borderRadius:"0.3em"},".prism-previewer-easing.prism-previewer-easing:before":{borderRadius:"0.3em"},".prism-previewer.prism-previewer:after":{borderTopColor:"hsl(0, 0, 95%)"},".prism-previewer-flipped.prism-previewer-flipped.after":{borderBottomColor:"hsl(0, 0, 95%)"},".prism-previewer-angle.prism-previewer-angle:before":{background:"hsl(0, 0%, 100%)"},".prism-previewer-time.prism-previewer-time:before":{background:"hsl(0, 0%, 100%)"},".prism-previewer-easing.prism-previewer-easing":{background:"hsl(0, 0%, 100%)"},".prism-previewer-angle.prism-previewer-angle circle":{stroke:"hsl(230, 8%, 24%)",strokeOpacity:"1"},".prism-previewer-time.prism-previewer-time circle":{stroke:"hsl(230, 8%, 24%)",strokeOpacity:"1"},".prism-previewer-easing.prism-previewer-easing circle":{stroke:"hsl(230, 8%, 24%)",fill:"transparent"},".prism-previewer-easing.prism-previewer-easing path":{stroke:"hsl(230, 8%, 24%)"},".prism-previewer-easing.prism-previewer-easing line":{stroke:"hsl(230, 8%, 24%)"}}},69875:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",whiteSpace:"pre-wrap",wordBreak:"break-all",wordWrap:"break-word",fontFamily:'Menlo, Monaco, "Courier New", monospace',fontSize:"15px",lineHeight:"1.5",color:"#dccf8f",textShadow:"0"},'pre[class*="language-"]':{MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",whiteSpace:"pre-wrap",wordBreak:"break-all",wordWrap:"break-word",fontFamily:'Menlo, Monaco, "Courier New", monospace',fontSize:"15px",lineHeight:"1.5",color:"#DCCF8F",textShadow:"0",borderRadius:"5px",border:"1px solid #000",background:"#181914 url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAMAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQACQYGBgcGCQcHCQ0IBwgNDwsJCQsPEQ4ODw4OERENDg4ODg0RERQUFhQUERoaHBwaGiYmJiYmKysrKysrKysrKwEJCAgJCgkMCgoMDwwODA8TDg4ODhMVDg4PDg4VGhMRERERExoXGhYWFhoXHR0aGh0dJCQjJCQrKysrKysrKysr/8AAEQgAjACMAwEiAAIRAQMRAf/EAF4AAQEBAAAAAAAAAAAAAAAAAAABBwEBAQAAAAAAAAAAAAAAAAAAAAIQAAEDAwIHAQEAAAAAAAAAAADwAREhYaExkUFRcYGxwdHh8REBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AyGFEjHaBS2fDDs2zkhKmBKktb7km+ZwwCnXPkLVmCTMItj6AXFxRS465/BTnkAJvkLkJe+7AKKoi2AtRS2zuAWsCb5GOlBN8gKfmuGHZ8MFqIth3ALmFoFwbwKWyAlTAp17uKqBvgBD8sM4fTjhvAhkzhaRkBMKBrfs7jGPIpzy7gFrAqnC0C0gB0EWwBDW2cBVQwm+QtPpa3wBO3sVvszCnLAhkzgL5/RLf13cLQd8/AGlu0Cb5HTx9KuAEieGJEdcehS3eRTp2ATdt3CpIm+QtZwAhROXFeb7swp/ahaM3kBE/jSIUBc/AWrgBN8uNFAl+b7sAXFxFn2YLUU5Ns7gFX8C4ib+hN8gFWXwK3bZglxEJm+gKdciLPsFV/TClsgJUwKJ5FVA7tvIFrfZhVfGJDcsCKaYgAqv6YRbE+RWOWBtu7+AL3yRalXLyKqAIIfk+zARbDgFyEsncYwJvlgFRW+GEWntIi2P0BooyFxcNr8Ep3+ANLbMO+QyhvbiqdgC0kVvgUUiLYgBS2QtPbiVI1/sgOmG9uO+Y8DW+7jS2zAOnj6O2BndwuIAUtkdRN8gFoK3wwXMQyZwHVbClsuNLd4E3yAUR6FVDBR+BafQGt93LVMxJTv8ABts4CVLhcfYWsCb5kC9/BHdU8CLYFY5bMAd+eX9MGthhpbA1vu4B7+RKkaW2Yq4AQtVBBFsAJU/AuIXBhN8gGWnstefhiZyWvLAEnbYS1uzSFP6Jvn4Baxx70JKkQojLib5AVTey1jjgkKJGO0AKWyOm7N7cSpgSpAdPH0Tfd/gp1z5C1ZgKqN9J2wFxcUUuAFLZAm+QC0Fb4YUVRFsAOvj4KW2dwtYE3yAWk/wS/PLMKfmuGHZ8MAXF/Ja32Yi5haAKWz4Ydm2cSpgU693Atb7km+Zwwh+WGcPpxw3gAkzCLY+iYUDW/Z3Adc/gpzyFrAqnALkJe+7DoItgAtRS2zuKqGE3yAx0oJvkdvYrfZmALURbDuL5/RLf13cAuDeBS2RpbtAm+QFVA3wR+3fUtFHoBDJnC0jIXH0HWsgMY8inPLuOkd9chp4z20ALQLSA8cI9jYAIa2zjzjBd8gRafS1vgiUho/kAKcsCGTOGWvoOpkAtB3z8Hm8x2Ff5ADp4+lXAlIvcmwH/2Q==') repeat left top",padding:"12px",overflow:"auto"},'pre > code[class*="language-"]':{fontSize:"1em"},':not(pre) > code[class*="language-"]':{borderRadius:"5px",border:"1px solid #000",color:"#DCCF8F",background:"#181914 url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAMAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQACQYGBgcGCQcHCQ0IBwgNDwsJCQsPEQ4ODw4OERENDg4ODg0RERQUFhQUERoaHBwaGiYmJiYmKysrKysrKysrKwEJCAgJCgkMCgoMDwwODA8TDg4ODhMVDg4PDg4VGhMRERERExoXGhYWFhoXHR0aGh0dJCQjJCQrKysrKysrKysr/8AAEQgAjACMAwEiAAIRAQMRAf/EAF4AAQEBAAAAAAAAAAAAAAAAAAABBwEBAQAAAAAAAAAAAAAAAAAAAAIQAAEDAwIHAQEAAAAAAAAAAADwAREhYaExkUFRcYGxwdHh8REBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AyGFEjHaBS2fDDs2zkhKmBKktb7km+ZwwCnXPkLVmCTMItj6AXFxRS465/BTnkAJvkLkJe+7AKKoi2AtRS2zuAWsCb5GOlBN8gKfmuGHZ8MFqIth3ALmFoFwbwKWyAlTAp17uKqBvgBD8sM4fTjhvAhkzhaRkBMKBrfs7jGPIpzy7gFrAqnC0C0gB0EWwBDW2cBVQwm+QtPpa3wBO3sVvszCnLAhkzgL5/RLf13cLQd8/AGlu0Cb5HTx9KuAEieGJEdcehS3eRTp2ATdt3CpIm+QtZwAhROXFeb7swp/ahaM3kBE/jSIUBc/AWrgBN8uNFAl+b7sAXFxFn2YLUU5Ns7gFX8C4ib+hN8gFWXwK3bZglxEJm+gKdciLPsFV/TClsgJUwKJ5FVA7tvIFrfZhVfGJDcsCKaYgAqv6YRbE+RWOWBtu7+AL3yRalXLyKqAIIfk+zARbDgFyEsncYwJvlgFRW+GEWntIi2P0BooyFxcNr8Ep3+ANLbMO+QyhvbiqdgC0kVvgUUiLYgBS2QtPbiVI1/sgOmG9uO+Y8DW+7jS2zAOnj6O2BndwuIAUtkdRN8gFoK3wwXMQyZwHVbClsuNLd4E3yAUR6FVDBR+BafQGt93LVMxJTv8ABts4CVLhcfYWsCb5kC9/BHdU8CLYFY5bMAd+eX9MGthhpbA1vu4B7+RKkaW2Yq4AQtVBBFsAJU/AuIXBhN8gGWnstefhiZyWvLAEnbYS1uzSFP6Jvn4Baxx70JKkQojLib5AVTey1jjgkKJGO0AKWyOm7N7cSpgSpAdPH0Tfd/gp1z5C1ZgKqN9J2wFxcUUuAFLZAm+QC0Fb4YUVRFsAOvj4KW2dwtYE3yAWk/wS/PLMKfmuGHZ8MAXF/Ja32Yi5haAKWz4Ydm2cSpgU693Atb7km+Zwwh+WGcPpxw3gAkzCLY+iYUDW/Z3Adc/gpzyFrAqnALkJe+7DoItgAtRS2zuKqGE3yAx0oJvkdvYrfZmALURbDuL5/RLf13cAuDeBS2RpbtAm+QFVA3wR+3fUtFHoBDJnC0jIXH0HWsgMY8inPLuOkd9chp4z20ALQLSA8cI9jYAIa2zjzjBd8gRafS1vgiUho/kAKcsCGTOGWvoOpkAtB3z8Hm8x2Ff5ADp4+lXAlIvcmwH/2Q==') repeat left top",padding:"2px 6px"},namespace:{Opacity:".7"},comment:{color:"#586e75",fontStyle:"italic"},prolog:{color:"#586e75",fontStyle:"italic"},doctype:{color:"#586e75",fontStyle:"italic"},cdata:{color:"#586e75",fontStyle:"italic"},number:{color:"#b89859"},string:{color:"#468966"},char:{color:"#468966"},builtin:{color:"#468966"},inserted:{color:"#468966"},"attr-name":{color:"#b89859"},operator:{color:"#dccf8f"},entity:{color:"#dccf8f",cursor:"help"},url:{color:"#dccf8f"},".language-css .token.string":{color:"#dccf8f"},".style .token.string":{color:"#dccf8f"},selector:{color:"#859900"},regex:{color:"#859900"},atrule:{color:"#cb4b16"},keyword:{color:"#cb4b16"},"attr-value":{color:"#468966"},function:{color:"#b58900"},variable:{color:"#b58900"},placeholder:{color:"#b58900"},property:{color:"#b89859"},tag:{color:"#ffb03b"},boolean:{color:"#b89859"},constant:{color:"#b89859"},symbol:{color:"#b89859"},important:{color:"#dc322f"},statement:{color:"#dc322f"},deleted:{color:"#dc322f"},punctuation:{color:"#dccf8f"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},72242:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"black",background:"none",textShadow:"0 1px white",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"black",background:"#f5f2f0",textShadow:"0 1px white",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto"},'pre[class*="language-"]::-moz-selection':{textShadow:"none",background:"#b3d4fc"},'pre[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#b3d4fc"},'code[class*="language-"]::-moz-selection':{textShadow:"none",background:"#b3d4fc"},'code[class*="language-"] ::-moz-selection':{textShadow:"none",background:"#b3d4fc"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#b3d4fc"},'pre[class*="language-"] ::selection':{textShadow:"none",background:"#b3d4fc"},'code[class*="language-"]::selection':{textShadow:"none",background:"#b3d4fc"},'code[class*="language-"] ::selection':{textShadow:"none",background:"#b3d4fc"},':not(pre) > code[class*="language-"]':{background:"#f5f2f0",padding:".1em",borderRadius:".3em",whiteSpace:"normal"},comment:{color:"slategray"},prolog:{color:"slategray"},doctype:{color:"slategray"},cdata:{color:"slategray"},punctuation:{color:"#999"},namespace:{Opacity:".7"},property:{color:"#905"},tag:{color:"#905"},boolean:{color:"#905"},number:{color:"#905"},constant:{color:"#905"},symbol:{color:"#905"},deleted:{color:"#905"},selector:{color:"#690"},"attr-name":{color:"#690"},string:{color:"#690"},char:{color:"#690"},builtin:{color:"#690"},inserted:{color:"#690"},operator:{color:"#9a6e3a",background:"hsla(0, 0%, 100%, .5)"},entity:{color:"#9a6e3a",background:"hsla(0, 0%, 100%, .5)",cursor:"help"},url:{color:"#9a6e3a",background:"hsla(0, 0%, 100%, .5)"},".language-css .token.string":{color:"#9a6e3a",background:"hsla(0, 0%, 100%, .5)"},".style .token.string":{color:"#9a6e3a",background:"hsla(0, 0%, 100%, .5)"},atrule:{color:"#07a"},"attr-value":{color:"#07a"},keyword:{color:"#07a"},function:{color:"#DD4A68"},"class-name":{color:"#DD4A68"},regex:{color:"#e90"},important:{color:"#e90",fontWeight:"bold"},variable:{color:"#e90"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},84646:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={"code[class*='language-']":{color:"#9efeff",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",fontFamily:"'Operator Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontWeight:"400",fontSize:"17px",lineHeight:"25px",letterSpacing:"0.5px",textShadow:"0 1px #222245"},"pre[class*='language-']":{color:"#9efeff",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",fontFamily:"'Operator Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontWeight:"400",fontSize:"17px",lineHeight:"25px",letterSpacing:"0.5px",textShadow:"0 1px #222245",padding:"2em",margin:"0.5em 0",overflow:"auto",background:"#1e1e3f"},"pre[class*='language-']::-moz-selection":{color:"inherit",background:"#a599e9"},"pre[class*='language-'] ::-moz-selection":{color:"inherit",background:"#a599e9"},"code[class*='language-']::-moz-selection":{color:"inherit",background:"#a599e9"},"code[class*='language-'] ::-moz-selection":{color:"inherit",background:"#a599e9"},"pre[class*='language-']::selection":{color:"inherit",background:"#a599e9"},"pre[class*='language-'] ::selection":{color:"inherit",background:"#a599e9"},"code[class*='language-']::selection":{color:"inherit",background:"#a599e9"},"code[class*='language-'] ::selection":{color:"inherit",background:"#a599e9"},":not(pre) > code[class*='language-']":{background:"#1e1e3f",padding:"0.1em",borderRadius:"0.3em"},"":{fontWeight:"400"},comment:{color:"#b362ff"},prolog:{color:"#b362ff"},cdata:{color:"#b362ff"},delimiter:{color:"#ff9d00"},keyword:{color:"#ff9d00"},selector:{color:"#ff9d00"},important:{color:"#ff9d00"},atrule:{color:"#ff9d00"},operator:{color:"rgb(255, 180, 84)",background:"none"},"attr-name":{color:"rgb(255, 180, 84)"},punctuation:{color:"#ffffff"},boolean:{color:"rgb(255, 98, 140)"},tag:{color:"rgb(255, 157, 0)"},"tag.punctuation":{color:"rgb(255, 157, 0)"},doctype:{color:"rgb(255, 157, 0)"},builtin:{color:"rgb(255, 157, 0)"},entity:{color:"#6897bb",background:"none"},symbol:{color:"#6897bb"},number:{color:"#ff628c"},property:{color:"#ff628c"},constant:{color:"#ff628c"},variable:{color:"#ff628c"},string:{color:"#a5ff90"},char:{color:"#a5ff90"},"attr-value":{color:"#a5c261"},"attr-value.punctuation":{color:"#a5c261"},"attr-value.punctuation:first-child":{color:"#a9b7c6"},url:{color:"#287bde",textDecoration:"underline",background:"none"},function:{color:"rgb(250, 208, 0)"},regex:{background:"#364135"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},inserted:{background:"#00ff00"},deleted:{background:"#ff000d"},"code.language-css .token.property":{color:"#a9b7c6"},"code.language-css .token.property + .token.punctuation":{color:"#a9b7c6"},"code.language-css .token.id":{color:"#ffc66d"},"code.language-css .token.selector > .token.class":{color:"#ffc66d"},"code.language-css .token.selector > .token.attribute":{color:"#ffc66d"},"code.language-css .token.selector > .token.pseudo-class":{color:"#ffc66d"},"code.language-css .token.selector > .token.pseudo-element":{color:"#ffc66d"},"class-name":{color:"#fb94ff"},".language-css .token.string":{background:"none"},".style .token.string":{background:"none"},".line-highlight.line-highlight":{marginTop:"36px",background:"linear-gradient(to right, rgba(179, 98, 255, 0.17), transparent)"},".line-highlight.line-highlight:before":{content:"''"},".line-highlight.line-highlight[data-end]:after":{content:"''"}}},59222:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#839496",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#839496",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em",background:"#002b36"},':not(pre) > code[class*="language-"]':{background:"#002b36",padding:".1em",borderRadius:".3em"},comment:{color:"#586e75"},prolog:{color:"#586e75"},doctype:{color:"#586e75"},cdata:{color:"#586e75"},punctuation:{color:"#93a1a1"},".namespace":{Opacity:".7"},property:{color:"#268bd2"},keyword:{color:"#268bd2"},tag:{color:"#268bd2"},"class-name":{color:"#FFFFB6",textDecoration:"underline"},boolean:{color:"#b58900"},constant:{color:"#b58900"},symbol:{color:"#dc322f"},deleted:{color:"#dc322f"},number:{color:"#859900"},selector:{color:"#859900"},"attr-name":{color:"#859900"},string:{color:"#859900"},char:{color:"#859900"},builtin:{color:"#859900"},inserted:{color:"#859900"},variable:{color:"#268bd2"},operator:{color:"#EDEDED"},function:{color:"#268bd2"},regex:{color:"#E9C062"},important:{color:"#fd971f",fontWeight:"bold"},entity:{color:"#FFFFB6",cursor:"help"},url:{color:"#96CBFE"},".language-css .token.string":{color:"#87C38A"},".style .token.string":{color:"#87C38A"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},atrule:{color:"#F9EE98"},"attr-value":{color:"#F9EE98"}}},43091:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#657b83",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#657b83",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em",backgroundColor:"#fdf6e3"},'pre[class*="language-"]::-moz-selection':{background:"#073642"},'pre[class*="language-"] ::-moz-selection':{background:"#073642"},'code[class*="language-"]::-moz-selection':{background:"#073642"},'code[class*="language-"] ::-moz-selection':{background:"#073642"},'pre[class*="language-"]::selection':{background:"#073642"},'pre[class*="language-"] ::selection':{background:"#073642"},'code[class*="language-"]::selection':{background:"#073642"},'code[class*="language-"] ::selection':{background:"#073642"},':not(pre) > code[class*="language-"]':{backgroundColor:"#fdf6e3",padding:".1em",borderRadius:".3em"},comment:{color:"#93a1a1"},prolog:{color:"#93a1a1"},doctype:{color:"#93a1a1"},cdata:{color:"#93a1a1"},punctuation:{color:"#586e75"},namespace:{Opacity:".7"},property:{color:"#268bd2"},tag:{color:"#268bd2"},boolean:{color:"#268bd2"},number:{color:"#268bd2"},constant:{color:"#268bd2"},symbol:{color:"#268bd2"},deleted:{color:"#268bd2"},selector:{color:"#2aa198"},"attr-name":{color:"#2aa198"},string:{color:"#2aa198"},char:{color:"#2aa198"},builtin:{color:"#2aa198"},url:{color:"#2aa198"},inserted:{color:"#2aa198"},entity:{color:"#657b83",background:"#eee8d5",cursor:"help"},atrule:{color:"#859900"},"attr-value":{color:"#859900"},keyword:{color:"#859900"},function:{color:"#b58900"},"class-name":{color:"#b58900"},regex:{color:"#cb4b16"},important:{color:"#cb4b16",fontWeight:"bold"},variable:{color:"#cb4b16"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},73041:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#f92aad",textShadow:"0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",background:"none",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#f92aad",textShadow:"0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",background:"none",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",backgroundColor:"transparent !important",backgroundImage:"linear-gradient(to bottom, #2a2139 75%, #34294f)"},':not(pre) > code[class*="language-"]':{backgroundColor:"transparent !important",backgroundImage:"linear-gradient(to bottom, #2a2139 75%, #34294f)",padding:".1em",borderRadius:".3em",whiteSpace:"normal"},comment:{color:"#8e8e8e"},"block-comment":{color:"#8e8e8e"},prolog:{color:"#8e8e8e"},doctype:{color:"#8e8e8e"},cdata:{color:"#8e8e8e"},punctuation:{color:"#ccc"},tag:{color:"#e2777a"},"attr-name":{color:"#e2777a"},namespace:{color:"#e2777a"},number:{color:"#e2777a"},unit:{color:"#e2777a"},hexcode:{color:"#e2777a"},deleted:{color:"#e2777a"},property:{color:"#72f1b8",textShadow:"0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475"},selector:{color:"#72f1b8",textShadow:"0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475"},"function-name":{color:"#6196cc"},boolean:{color:"#fdfdfd",textShadow:"0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975"},"selector.id":{color:"#fdfdfd",textShadow:"0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975"},function:{color:"#fdfdfd",textShadow:"0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975"},"class-name":{color:"#fff5f6",textShadow:"0 0 2px #000, 0 0 10px #fc1f2c75, 0 0 5px #fc1f2c75, 0 0 25px #fc1f2c75"},constant:{color:"#f92aad",textShadow:"0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3"},symbol:{color:"#f92aad",textShadow:"0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3"},important:{color:"#f4eee4",textShadow:"0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575",fontWeight:"bold"},atrule:{color:"#f4eee4",textShadow:"0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"},keyword:{color:"#f4eee4",textShadow:"0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"},"selector.class":{color:"#f4eee4",textShadow:"0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"},builtin:{color:"#f4eee4",textShadow:"0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"},string:{color:"#f87c32"},char:{color:"#f87c32"},"attr-value":{color:"#f87c32"},regex:{color:"#f87c32"},variable:{color:"#f87c32"},operator:{color:"#67cdcc"},entity:{color:"#67cdcc",cursor:"help"},url:{color:"#67cdcc"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},inserted:{color:"green"}}},25010:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#ccc",background:"none",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#ccc",background:"#2d2d2d",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto"},':not(pre) > code[class*="language-"]':{background:"#2d2d2d",padding:".1em",borderRadius:".3em",whiteSpace:"normal"},comment:{color:"#999"},"block-comment":{color:"#999"},prolog:{color:"#999"},doctype:{color:"#999"},cdata:{color:"#999"},punctuation:{color:"#ccc"},tag:{color:"#e2777a"},"attr-name":{color:"#e2777a"},namespace:{color:"#e2777a"},deleted:{color:"#e2777a"},"function-name":{color:"#6196cc"},boolean:{color:"#f08d49"},number:{color:"#f08d49"},function:{color:"#f08d49"},property:{color:"#f8c555"},"class-name":{color:"#f8c555"},constant:{color:"#f8c555"},symbol:{color:"#f8c555"},selector:{color:"#cc99cd"},important:{color:"#cc99cd",fontWeight:"bold"},atrule:{color:"#cc99cd"},keyword:{color:"#cc99cd"},builtin:{color:"#cc99cd"},string:{color:"#7ec699"},char:{color:"#7ec699"},"attr-value":{color:"#7ec699"},regex:{color:"#7ec699"},variable:{color:"#7ec699"},operator:{color:"#67cdcc"},entity:{color:"#67cdcc",cursor:"help"},url:{color:"#67cdcc"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},inserted:{color:"green"}}},50810:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"white",background:"none",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",textShadow:"0 -.1em .2em black",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"white",background:"hsl(0, 0%, 8%)",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",textShadow:"0 -.1em .2em black",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",borderRadius:".5em",border:".3em solid hsl(0, 0%, 33%)",boxShadow:"1px 1px .5em black inset",margin:".5em 0",overflow:"auto",padding:"1em"},':not(pre) > code[class*="language-"]':{background:"hsl(0, 0%, 8%)",borderRadius:".3em",border:".13em solid hsl(0, 0%, 33%)",boxShadow:"1px 1px .3em -.1em black inset",padding:".15em .2em .05em",whiteSpace:"normal"},'pre[class*="language-"]::-moz-selection':{background:"hsla(0, 0%, 93%, 0.15)",textShadow:"none"},'pre[class*="language-"]::selection':{background:"hsla(0, 0%, 93%, 0.15)",textShadow:"none"},'pre[class*="language-"] ::-moz-selection':{textShadow:"none",background:"hsla(0, 0%, 93%, 0.15)"},'code[class*="language-"]::-moz-selection':{textShadow:"none",background:"hsla(0, 0%, 93%, 0.15)"},'code[class*="language-"] ::-moz-selection':{textShadow:"none",background:"hsla(0, 0%, 93%, 0.15)"},'pre[class*="language-"] ::selection':{textShadow:"none",background:"hsla(0, 0%, 93%, 0.15)"},'code[class*="language-"]::selection':{textShadow:"none",background:"hsla(0, 0%, 93%, 0.15)"},'code[class*="language-"] ::selection':{textShadow:"none",background:"hsla(0, 0%, 93%, 0.15)"},comment:{color:"hsl(0, 0%, 47%)"},prolog:{color:"hsl(0, 0%, 47%)"},doctype:{color:"hsl(0, 0%, 47%)"},cdata:{color:"hsl(0, 0%, 47%)"},punctuation:{Opacity:".7"},namespace:{Opacity:".7"},tag:{color:"hsl(14, 58%, 55%)"},boolean:{color:"hsl(14, 58%, 55%)"},number:{color:"hsl(14, 58%, 55%)"},deleted:{color:"hsl(14, 58%, 55%)"},keyword:{color:"hsl(53, 89%, 79%)"},property:{color:"hsl(53, 89%, 79%)"},selector:{color:"hsl(53, 89%, 79%)"},constant:{color:"hsl(53, 89%, 79%)"},symbol:{color:"hsl(53, 89%, 79%)"},builtin:{color:"hsl(53, 89%, 79%)"},"attr-name":{color:"hsl(76, 21%, 52%)"},"attr-value":{color:"hsl(76, 21%, 52%)"},string:{color:"hsl(76, 21%, 52%)"},char:{color:"hsl(76, 21%, 52%)"},operator:{color:"hsl(76, 21%, 52%)"},entity:{color:"hsl(76, 21%, 52%)",cursor:"help"},url:{color:"hsl(76, 21%, 52%)"},".language-css .token.string":{color:"hsl(76, 21%, 52%)"},".style .token.string":{color:"hsl(76, 21%, 52%)"},variable:{color:"hsl(76, 21%, 52%)"},inserted:{color:"hsl(76, 21%, 52%)"},atrule:{color:"hsl(218, 22%, 55%)"},regex:{color:"hsl(42, 75%, 65%)"},important:{color:"hsl(42, 75%, 65%)",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},".language-markup .token.tag":{color:"hsl(33, 33%, 52%)"},".language-markup .token.attr-name":{color:"hsl(33, 33%, 52%)"},".language-markup .token.punctuation":{color:"hsl(33, 33%, 52%)"},"":{position:"relative",zIndex:"1"},".line-highlight.line-highlight":{background:"linear-gradient(to right, hsla(0, 0%, 33%, .1) 70%, hsla(0, 0%, 33%, 0))",borderBottom:"1px dashed hsl(0, 0%, 33%)",borderTop:"1px dashed hsl(0, 0%, 33%)",marginTop:"0.75em",zIndex:"0"},".line-highlight.line-highlight:before":{backgroundColor:"hsl(215, 15%, 59%)",color:"hsl(24, 20%, 95%)"},".line-highlight.line-highlight[data-end]:after":{backgroundColor:"hsl(215, 15%, 59%)",color:"hsl(24, 20%, 95%)"}}},86485:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#393A34",fontFamily:'"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",fontSize:".9em",lineHeight:"1.2em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#393A34",fontFamily:'"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",fontSize:".9em",lineHeight:"1.2em",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",border:"1px solid #dddddd",backgroundColor:"white"},'pre > code[class*="language-"]':{fontSize:"1em"},'pre[class*="language-"]::-moz-selection':{background:"#C1DEF1"},'pre[class*="language-"] ::-moz-selection':{background:"#C1DEF1"},'code[class*="language-"]::-moz-selection':{background:"#C1DEF1"},'code[class*="language-"] ::-moz-selection':{background:"#C1DEF1"},'pre[class*="language-"]::selection':{background:"#C1DEF1"},'pre[class*="language-"] ::selection':{background:"#C1DEF1"},'code[class*="language-"]::selection':{background:"#C1DEF1"},'code[class*="language-"] ::selection':{background:"#C1DEF1"},':not(pre) > code[class*="language-"]':{padding:".2em",paddingTop:"1px",paddingBottom:"1px",background:"#f8f8f8",border:"1px solid #dddddd"},comment:{color:"#008000",fontStyle:"italic"},prolog:{color:"#008000",fontStyle:"italic"},doctype:{color:"#008000",fontStyle:"italic"},cdata:{color:"#008000",fontStyle:"italic"},namespace:{Opacity:".7"},string:{color:"#A31515"},punctuation:{color:"#393A34"},operator:{color:"#393A34"},url:{color:"#36acaa"},symbol:{color:"#36acaa"},number:{color:"#36acaa"},boolean:{color:"#36acaa"},variable:{color:"#36acaa"},constant:{color:"#36acaa"},inserted:{color:"#36acaa"},atrule:{color:"#0000ff"},keyword:{color:"#0000ff"},"attr-value":{color:"#0000ff"},".language-autohotkey .token.selector":{color:"#0000ff"},".language-json .token.boolean":{color:"#0000ff"},".language-json .token.number":{color:"#0000ff"},'code[class*="language-css"]':{color:"#0000ff"},function:{color:"#393A34"},deleted:{color:"#9a050f"},".language-autohotkey .token.tag":{color:"#9a050f"},selector:{color:"#800000"},".language-autohotkey .token.keyword":{color:"#00009f"},important:{color:"#e90",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"},"class-name":{color:"#2B91AF"},".language-json .token.property":{color:"#2B91AF"},tag:{color:"#800000"},"attr-name":{color:"#ff0000"},property:{color:"#ff0000"},regex:{color:"#ff0000"},entity:{color:"#ff0000"},"directive.tag.tag":{background:"#ffff00",color:"#393A34"},".line-numbers.line-numbers .line-numbers-rows":{borderRightColor:"#a5a5a5"},".line-numbers .line-numbers-rows > span:before":{color:"#2B91AF"},".line-highlight.line-highlight":{background:"linear-gradient(to right, rgba(193, 222, 241, 0.2) 70%, rgba(221, 222, 241, 0))"}}},95668:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'pre[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:"#1e1e1e"},'code[class*="language-"]':{color:"#d4d4d4",fontSize:"13px",textShadow:"none",fontFamily:'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"]::selection':{textShadow:"none",background:"#264F78"},'pre[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},'code[class*="language-"] *::selection':{textShadow:"none",background:"#264F78"},':not(pre) > code[class*="language-"]':{padding:".1em .3em",borderRadius:".3em",color:"#db4c69",background:"#1e1e1e"},".namespace":{Opacity:".7"},"doctype.doctype-tag":{color:"#569CD6"},"doctype.name":{color:"#9cdcfe"},comment:{color:"#6a9955"},prolog:{color:"#6a9955"},punctuation:{color:"#d4d4d4"},".language-html .language-css .token.punctuation":{color:"#d4d4d4"},".language-html .language-javascript .token.punctuation":{color:"#d4d4d4"},property:{color:"#9cdcfe"},tag:{color:"#569cd6"},boolean:{color:"#569cd6"},number:{color:"#b5cea8"},constant:{color:"#9cdcfe"},symbol:{color:"#b5cea8"},inserted:{color:"#b5cea8"},unit:{color:"#b5cea8"},selector:{color:"#d7ba7d"},"attr-name":{color:"#9cdcfe"},string:{color:"#ce9178"},char:{color:"#ce9178"},builtin:{color:"#ce9178"},deleted:{color:"#ce9178"},".language-css .token.string.url":{textDecoration:"underline"},operator:{color:"#d4d4d4"},entity:{color:"#569cd6"},"operator.arrow":{color:"#569CD6"},atrule:{color:"#ce9178"},"atrule.rule":{color:"#c586c0"},"atrule.url":{color:"#9cdcfe"},"atrule.url.function":{color:"#dcdcaa"},"atrule.url.punctuation":{color:"#d4d4d4"},keyword:{color:"#569CD6"},"keyword.module":{color:"#c586c0"},"keyword.control-flow":{color:"#c586c0"},function:{color:"#dcdcaa"},"function.maybe-class-name":{color:"#dcdcaa"},regex:{color:"#d16969"},important:{color:"#569cd6"},italic:{fontStyle:"italic"},"class-name":{color:"#4ec9b0"},"maybe-class-name":{color:"#4ec9b0"},console:{color:"#9cdcfe"},parameter:{color:"#9cdcfe"},interpolation:{color:"#9cdcfe"},"punctuation.interpolation-punctuation":{color:"#569cd6"},variable:{color:"#9cdcfe"},"imports.maybe-class-name":{color:"#9cdcfe"},"exports.maybe-class-name":{color:"#9cdcfe"},escape:{color:"#d7ba7d"},"tag.punctuation":{color:"#808080"},cdata:{color:"#808080"},"attr-value":{color:"#ce9178"},"attr-value.punctuation":{color:"#ce9178"},"attr-value.punctuation.attr-equals":{color:"#d4d4d4"},namespace:{color:"#4ec9b0"},'pre[class*="language-javascript"]':{color:"#9cdcfe"},'code[class*="language-javascript"]':{color:"#9cdcfe"},'pre[class*="language-jsx"]':{color:"#9cdcfe"},'code[class*="language-jsx"]':{color:"#9cdcfe"},'pre[class*="language-typescript"]':{color:"#9cdcfe"},'code[class*="language-typescript"]':{color:"#9cdcfe"},'pre[class*="language-tsx"]':{color:"#9cdcfe"},'code[class*="language-tsx"]':{color:"#9cdcfe"},'pre[class*="language-css"]':{color:"#ce9178"},'code[class*="language-css"]':{color:"#ce9178"},'pre[class*="language-html"]':{color:"#d4d4d4"},'code[class*="language-html"]':{color:"#d4d4d4"},".language-regex .token.anchor":{color:"#dcdcaa"},".language-html .token.punctuation":{color:"#808080"},'pre[class*="language-"] > code[class*="language-"]':{position:"relative",zIndex:"1"},".line-highlight.line-highlight":{background:"#f7ebc6",boxShadow:"inset 5px 0 0 #f7d87c",zIndex:"0"}}},27116:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",whiteSpace:"pre-wrap",wordWrap:"normal",fontFamily:'Menlo, Monaco, "Courier New", monospace',fontSize:"14px",color:"#76d9e6",textShadow:"none"},'pre[class*="language-"]':{MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",whiteSpace:"pre-wrap",wordWrap:"normal",fontFamily:'Menlo, Monaco, "Courier New", monospace',fontSize:"14px",color:"#76d9e6",textShadow:"none",background:"#2a2a2a",padding:"15px",borderRadius:"4px",border:"1px solid #e1e1e8",overflow:"auto",position:"relative"},'pre > code[class*="language-"]':{fontSize:"1em"},':not(pre) > code[class*="language-"]':{background:"#2a2a2a",padding:"0.15em 0.2em 0.05em",borderRadius:".3em",border:"0.13em solid #7a6652",boxShadow:"1px 1px 0.3em -0.1em #000 inset"},'pre[class*="language-"] code':{whiteSpace:"pre",display:"block"},namespace:{Opacity:".7"},comment:{color:"#6f705e"},prolog:{color:"#6f705e"},doctype:{color:"#6f705e"},cdata:{color:"#6f705e"},operator:{color:"#a77afe"},boolean:{color:"#a77afe"},number:{color:"#a77afe"},"attr-name":{color:"#e6d06c"},string:{color:"#e6d06c"},entity:{color:"#e6d06c",cursor:"help"},url:{color:"#e6d06c"},".language-css .token.string":{color:"#e6d06c"},".style .token.string":{color:"#e6d06c"},selector:{color:"#a6e22d"},inserted:{color:"#a6e22d"},atrule:{color:"#ef3b7d"},"attr-value":{color:"#ef3b7d"},keyword:{color:"#ef3b7d"},important:{color:"#ef3b7d",fontWeight:"bold"},deleted:{color:"#ef3b7d"},regex:{color:"#76d9e6"},statement:{color:"#76d9e6",fontWeight:"bold"},placeholder:{color:"#fff"},variable:{color:"#fff"},bold:{fontWeight:"bold"},punctuation:{color:"#bebec5"},italic:{fontStyle:"italic"},"code.language-markup":{color:"#f9f9f9"},"code.language-markup .token.tag":{color:"#ef3b7d"},"code.language-markup .token.attr-name":{color:"#a6e22d"},"code.language-markup .token.attr-value":{color:"#e6d06c"},"code.language-markup .token.style":{color:"#76d9e6"},"code.language-markup .token.script":{color:"#76d9e6"},"code.language-markup .token.script .token.keyword":{color:"#76d9e6"},".line-highlight.line-highlight":{padding:"0",background:"rgba(255, 255, 255, 0.08)"},".line-highlight.line-highlight:before":{padding:"0.2em 0.5em",backgroundColor:"rgba(255, 255, 255, 0.4)",color:"black",height:"1em",lineHeight:"1em",boxShadow:"0 1px 1px rgba(255, 255, 255, 0.7)"},".line-highlight.line-highlight[data-end]:after":{padding:"0.2em 0.5em",backgroundColor:"rgba(255, 255, 255, 0.4)",color:"black",height:"1em",lineHeight:"1em",boxShadow:"0 1px 1px rgba(255, 255, 255, 0.7)"}}},31968:function(k,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=a.default={'code[class*="language-"]':{color:"#22da17",fontFamily:"monospace",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",lineHeight:"25px",fontSize:"18px",margin:"5px 0"},'pre[class*="language-"]':{color:"white",fontFamily:"monospace",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",lineHeight:"25px",fontSize:"18px",margin:"0.5em 0",background:"#0a143c",padding:"1em",overflow:"auto"},'pre[class*="language-"] *':{fontFamily:"monospace"},':not(pre) > code[class*="language-"]':{color:"white",background:"#0a143c",padding:"0.1em",borderRadius:"0.3em",whiteSpace:"normal"},'pre[class*="language-"]::-moz-selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'pre[class*="language-"] ::-moz-selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'code[class*="language-"]::-moz-selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'code[class*="language-"] ::-moz-selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'pre[class*="language-"]::selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'pre[class*="language-"] ::selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'code[class*="language-"]::selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},'code[class*="language-"] ::selection':{textShadow:"none",background:"rgba(29, 59, 83, 0.99)"},comment:{color:"rgb(99, 119, 119)",fontStyle:"italic"},prolog:{color:"rgb(99, 119, 119)",fontStyle:"italic"},cdata:{color:"rgb(99, 119, 119)",fontStyle:"italic"},punctuation:{color:"rgb(199, 146, 234)"},".namespace":{color:"rgb(178, 204, 214)"},deleted:{color:"rgba(239, 83, 80, 0.56)",fontStyle:"italic"},symbol:{color:"rgb(128, 203, 196)"},property:{color:"rgb(128, 203, 196)"},tag:{color:"rgb(127, 219, 202)"},operator:{color:"rgb(127, 219, 202)"},keyword:{color:"rgb(127, 219, 202)"},boolean:{color:"rgb(255, 88, 116)"},number:{color:"rgb(247, 140, 108)"},constant:{color:"rgb(34 183 199)"},function:{color:"rgb(34 183 199)"},builtin:{color:"rgb(34 183 199)"},char:{color:"rgb(34 183 199)"},selector:{color:"rgb(199, 146, 234)",fontStyle:"italic"},doctype:{color:"rgb(199, 146, 234)",fontStyle:"italic"},"attr-name":{color:"rgb(173, 219, 103)",fontStyle:"italic"},inserted:{color:"rgb(173, 219, 103)",fontStyle:"italic"},string:{color:"rgb(173, 219, 103)"},url:{color:"rgb(173, 219, 103)"},entity:{color:"rgb(173, 219, 103)"},".language-css .token.string":{color:"rgb(173, 219, 103)"},".style .token.string":{color:"rgb(173, 219, 103)"},"class-name":{color:"rgb(255, 203, 139)"},atrule:{color:"rgb(255, 203, 139)"},"attr-value":{color:"rgb(255, 203, 139)"},regex:{color:"rgb(214, 222, 235)"},important:{color:"rgb(214, 222, 235)",fontWeight:"bold"},variable:{color:"rgb(214, 222, 235)"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}}}]);
