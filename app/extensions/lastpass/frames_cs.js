var MAX_DIALOG_WIDTH=400;
function LP_getLPIframe(a,b){a||(a=LP_derive_doc());if(!a)return null;var d=null,c=null,f;if(b&&(c=a.getElementById(b))&&"IFRAME"==c.tagName.toUpperCase()&&c.name==c.id)return c;(c=g_popupfill_parent)||(c=g_popupfill_parent_last);if(b=LP_getLPIframeID(a,c))if((c=a.getElementById(b))&&"IFRAME"==c.tagName.toUpperCase()&&c.name==c.id)return c;var e=a.getElementsByTagName("IFRAME");for(f=0;f<e.length;f++)if((c=e[f])&&"undefined"!=typeof c.id&&null!=c.id&&0==c.id.indexOf(LPMAGICIFRAME)){d=c;break}return d}
function relocate_LPIframe(a){a||(a=LP_derive_doc());if(!a)return!1;var b=!0,d=LP_getLPIframeID(a);(d=LP_getLPIframe(a,d))?(LP_getComputedStyle(a,d),g_iframe_docked&&LP_getAbsolutePos(a,g_popupfill_parent)):b=!1;return b}
function resize_LPIframe(a,b){a||(a=LP_derive_doc());if(!a||!b)return!1;var d={};g_drag_type=LP_DRAG_NODRAG;if(!("undefined"!=typeof b.height&&"undefined"!=typeof b.width))if("undefined"!=typeof b.delx&&"undefined"!=typeof b.dely)g_drag_type=LP_DRAG_RESIZE;else return!1;var d=!1,c=LP_getLPIframeID(a);if(c=LP_getLPIframe(a,c))g_draggable&&g_drag_type===LP_DRAG_RESIZE?(d=LP_getAbsolutePos(a,c),d={width:d.width+b.delx,height:d.height+b.dely},g_minwidth_override=d.width,g_minheight_override=d.height):
d={width:b.width,height:b.height},d=place_LPIframe(a,d);return d}
function place_LPIframe(a,b){a||(a=LP_derive_doc());if(!a||!b)return!1;var d=sprintf;"undefined"!=typeof g_isie&&g_isie&&(init_LPfn(),"undefined"!=typeof LPfn&&(d=LPfn.sprintf));var c=!0,f=LP_getLPIframeID(a);if(f=LP_getLPIframe(a,f)){var e=LP_getAbsolutePos(a,f);if(null===e||0>parseInt(b.width)||0>parseInt(b.height))verbose_log("invalid iframe pos"),c=!1;else{var j=parseInt(e.top)+"px",p=parseInt(e.left)+"px",l=parseInt(e.height)+"px",e=parseInt(e.width)+"px",g="";"undefined"!=typeof b.height&&(g=
parseInt(b.height),""!==g&&!isNaN(g)&&(l=g+"px"));"undefined"!=typeof b.width&&(g=parseInt(b.width),""!==g&&!isNaN(g)&&(e=g+"px"));"undefined"!=typeof b.left&&(g=parseInt(b.left),""!==g&&!isNaN(g)&&(p=g+"px"));"undefined"!=typeof b.top&&(g=parseInt(b.top),""!==g&&!isNaN(g)&&(j=g+"px"));d=d("width: %s !important; height: %s !important; top: %s !important; left:%s !important;",e,l,j,p);if(""==g_frame_css_str)try{var h=document.body.getAttribute("data-lp-gcss");h&&(g_frame_css_str=LPJSON.parse(h),document.body.removeAttribute("data-lp-gcss"))}catch(m){write_error_to_history(a,
"resize_LPIframe",m)}h=g_frame_css_str+d;h.match(/position: *absolute/)||(h+=" position: absolute;");normalize_css(f.style.cssText)!=normalize_css(h)&&(f.style.cssText=h,f.setAttribute("width",parseInt(e)),f.setAttribute("height",parseInt(l)))}}else c=!1;return c}function LP_getLPIframeID(a,b){!a&&b&&(a=b.ownerDocument);a||(a=LP_derive_doc());if(!a)return null;var d=null;b?(d=LP_pickFieldName(a,b),d=LPMAGICIFRAME+d):d=void 0;return d}
function LP_computeLPIframeID(a){if("undefined"==typeof SHA256)return LPMAGICIFRAME+a;var b=sprintf;"undefined"!=typeof g_isie&&g_isie&&(init_LPfn(),"undefined"!=typeof LPfn&&(b=LPfn.sprintf));return SHA256(b("%d-%s",Date.now(),a))}function rot13(a){if(!a)return"$str =~ tr/a-zA-Z/n-za-mN-ZA-M/";for(var b="",d=0;d<a.length;d++){var c=a.charCodeAt(d);if(65<=c&&77>=c||97<=c&&109>=c)c+=13;else if(78<=c&&90>=c||110<=c&&122>=c)c-=13;b+=String.fromCharCode(c)}return b}
function LP_inIframe(a){a||(a=window);if(null==g_inframe)try{return get_win_self(a)!==a.top}catch(b){return!0}else return g_inframe}
function is_your_popup_showing(a){if(null==a)return!1;var b=a.defaultView;!b&&"undefined"!=typeof window&&(b=window);var d=!1;try{if(null==a.location){verbose_log("is_your_popup_showing given a firefox zombie document?");var c="undefined"!=typeof LP.lpGetCurrentWindow().getBrowser?LP.lpGetCurrentWindow().getBrowser().contentDocument:LP.getBrowser().contentDocument;closepopupfills(c);d=!0}}catch(f){d=!0}if(d)return!1;g_isfirefox&&verbose_log("entered is_your_popup_showing for doc="+a.location.href);
if(g_create_iframe_in_top&&!g_isie&&!g_isfirefox&&LP_inIframe(b))return toplevel_iframe_state_get();if(0<a.location.href.indexOf("popupfilltab.xul"))return!0;a=a.getElementsByTagName("iframe");for(b=0;b<a.length;b++)if(("function"!=typeof a.hasOwnProperty||a.hasOwnProperty(b))&&0==a[b].id.indexOf(LPMAGICIFRAME))return!0;return!1}
function enableScrollOnIframe(a,b){null==b&&(b=document?document:LP.getBrowser().contentDocument);if(null==b)return null;verbose_log("enabling Scroll on Iframe for "+b.location.href);var d=b.getElementsByTagName("IFRAME"),c,f=null;if(null!=d&&0<d.length)for(c=0;c<d.length;c++){var f=d[c],e=a.replace(/^(https:|http:)/,"");verbose_log("checking iframe src="+lp_ofa(f.src)+" passed href="+lp_ofa(a));if(f.src==a||0<f.src.indexOf(a)||0<f.src.indexOf(e))"undefined"!=typeof g_isie&&g_isie?(f.setAttribute("scrolling",
"auto"),f.style.overflow="visible",f.style.maxHeight="none"):(f.setAttribute("scrolling","auto"),f.style.overflow="auto"),verbose_log("enabling scroll on iframe to "+lp_ofa(a))}}
function enableScrollWithinIframe(a,b){null==a&&(a=document);null==b&&(b=window);if(is_your_popup_showing(a)&&get_win_self(b)!=b.top)if(verbose_log("enabling scroll on body of iframe"),g_isfirefox)a.body.style.overflow="auto";else if(g_isie){var d=0;"undefined"!=typeof init_LPfn&&(init_LPfn()&&LPfn)&&(d=LPfn.getDocumentMode(document));7<d?(a.body.style.overflow="visible",a.body.setAttribute("scroll","auto")):a.body.setAttribute("overflow","auto")}else a.body.style.overflow="auto"}
function LP_getIframeBySrc(a,b){null==a&&(a=document);var d=a.getElementsByTagName("IFRAME"),c;for(c=0;c<d.length;c++)if(d[c].src==b)return d[c];return null}function toplevelpopupsetstate_handler(a){g_create_iframe_in_top&&toplevel_iframe_state_set(a?!0:!1)}function toplevel_iframe_state_get(){return g_toplevel_iframe_exists}function toplevel_iframe_state_set(a){g_toplevel_iframe_exists=a}function LP_do_toplevel_iframe_hack(a){return!a||g_isie||g_isfirefox?!1:!0}
function relocate_popupfill_iframes(a,b){if(do_experimental_popupfill)try{var d=a;g_isfirefox&&(d="undefined"!=typeof LP.lpGetCurrentWindow().getBrowser?LP.lpGetCurrentWindow().getBrowser().contentDocument:LP.getBrowser().contentDocument);if(!a||!d)return null;if(g_isfirefox&&null==a.location){verbose_log("relocate_popupfill_iframes given zombie document?");var c="undefined"!=typeof LP.lpGetCurrentWindow().getBrowser?LP.lpGetCurrentWindow().getBrowser().contentDocument:LP.getBrowser().contentDocument;
closepopupfills(c)}else{var f=c=!1;if(!e){var e=a.defaultView;e||(e=a.parentWindow)}"undefined"!=typeof g_iscasper&&g_iscasper&&(e=a.defaultView);var j,p=d.getElementsByTagName("iframe");for(j=0;j<p.length;j++){var l=p[j];if("undefined"!=typeof l.id&&null!=l.id){var g=LPMAGICIFRAME;if(0==l.id.indexOf(g)){var h=l.id.substr(g.length),g=h,c=!0,m=LP_getElementByIdOrName(a,h),n=!b;if(g_isfirefox||null!=m&&lpIsVisible(m,n)){var k=null;if(g_isfirefox)k=ff_get_iframe_pos(a,e,m,g,d),null!=k&&(f=!0);else if(k=
calculate_iframe_pos(a,m,0<g_minwidth_override?g_minwidth_override:0),g_draggable&&!g_iframe_docked){var t=!1,r=t,q=LP_getAbsolutePos(a,l,r);k.posx=q.left;k.posy=q.top}null!=k&&place_iframe_absolute(a,e,l,k,d)}else g_create_iframe_in_top&&!g_isie&&!g_isfirefox&&!LP_inIframe(e)&&toplevel_iframe_state_get()?(r=t=!1,k=LP_getAbsolutePos(a,l,r),k.posx=k.left,k.posy=k.top,place_iframe_absolute(a,e,l,k,d)):!g_isfirefox&&(!g_double_password_hack&&!g_double_secret_password_hack)&&closepopupfills(a)}}}g_isfirefox&&
(!f&&c)&&(verbose_log("found orphan iframe, remove it"),closepopupfills(a))}}catch(s){lplog("relocate_popupfill_iframe failed, "+s.message),do_bgiconinput||end_weasel(a),g_isfirefox&&closepopupfills(a)}}
function place_iframe_absolute(a,b,d,c,f){if(!d||!a||!b||!c)return!1;var e=null,j;if("undefined"!=typeof Math){var p=null;g_draggable&&!g_iframe_docked&&(p=LP_getComputedStyle(b,d));try{var l=c.posx,g=c.posy,h=parseInt(l)+"px",m=parseInt(g)+"px",n=0;0<parseInt(g_minwidth_override)?(n=Math.max(parseInt(g_popupfill_iframe_width_save),parseInt(g_minwidth_override))+"px",(j=LP_getWindowWidth(b,!0))&&parseInt(n)+parseInt(h)>j&&(h=j-parseInt(n)-20+"px")):0<parseInt(g_popupfill_iframe_width_save)?n=parseInt(g_popupfill_iframe_width_save)+
"px":(null==e&&(e=LP_getComputedStyle(b,d)),n=e.width);0>parseInt(h)&&(h="0px");0>parseInt(m)&&(m="0px");j=0;0<parseInt(g_minheight_override)?j=Math.max(parseInt(g_popupfill_iframe_height_save),parseInt(g_minheight_override))+"px":""!=g_popupfill_iframe_height_save&&0<parseInt(g_popupfill_iframe_height_save)?j=parseInt(g_popupfill_iframe_height_save)+"px":(null==e&&(e=LP_getComputedStyle(b,d)),e&&(j=e.height));n=Math.min(parseInt(n),MAX_DIALOG_WIDTH)+"px";if(g_iframe_scroll_hack&&!g_frame_scrollable_set){var k=
parseInt(j),t=parseInt(n),r;r=b&&"undefined"!=typeof b.getComputedStyle?g_isfirefox?LP_getComputedStyle(b,a.documentElement):LP_getComputedStyle(b,a.body):"undefined"!=typeof a.documentElement?LP_getComputedStyle(b,a.documentElement):LP_getComputedStyle(b,a.body);parseInt(r.height);parseInt(r.width);var q=b.innerHeight,s=b.innerWidth;"undefined"==typeof q&&(q=LP_getWindowHeight(b,a));"undefined"==typeof s&&(s=LP_getWindowWidth(b));if(null!=k&&0<k&&null!=q&&0<q||null!=t&&0<t&&null!=s&&0<s)if((parseInt(g)+
k>q||parseInt(l)+t>s)&&LP_inIframe(b)){if(g_isfirefox){enableScrollWithinIframe(a,b);var u=LP.getBrowser(),v=u?u.contentDocument:null;v&&v!=a&&enableScrollOnIframe(a.location.href,f)}else g_isie||(verbose_log("ensuring this frame/iframe has scrolling enabled"),sendBG({cmd:"iframescrollenable",href:a.location.href}));g_frame_scrollable_set=!0}}g_draggable&&(!g_iframe_docked&&p)&&(c&&"undefined"!=typeof c.posx&&"undefined"!=typeof c.posy?(m=parseInt(c.posy)+"px",h=parseInt(c.posx)+"px",0>parseInt(c.posy)&&
(m="0px"),0>parseInt(c.posx)&&(h="0px")):(m=p.top,h=p.left));place_LPIframe(a,{width:n,height:j,top:m,left:h})||(verbose_log("invalid iframe pos"),debug_checkpoint("failed to place iframe"),closepopupfills(a))}catch(w){verbose&&alert("place_abs "+w.message)}return True}}
function normalize_css(a){a=a.replace(/ /g,"");a=a.replace(/1\.0/g,"1");a=a.replace(/2147483647/g,"2147483648");a=a.replace("border-top-style:none!important;border-right-style:none!important;border-bottom-style:none!important;border-left-style:none!important;","border-style:none!important;");g_isie&&(a=a.replace("filter:alpha(opacity=100)!important;",""),a=a.replace("border-style:none!important;",""),a=a.split(";").sort().join(";"));return a}
function moveIframe_handler(a,b){a||(a=LP_derive_doc());if(a&&g_draggable&&"undefined"!=typeof b.delx&&"undefined"!=typeof b.dely){g_iframe_docked=!1;var d=LP_getLPIframe(a);if(d){var c=LP_getAbsolutePos(a,d);c&&place_iframe_absolute(document,window,d,{posx:c.left+b.delx,posy:c.top+b.dely})}}}function resizeIframe_handler(a,b){a||(a=LP_derive_doc());a&&b&&resize_LPIframe(a,b)};