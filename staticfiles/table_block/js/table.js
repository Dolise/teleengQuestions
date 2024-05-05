(()=>{"use strict";var e,t={2618:function(e,t,a){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};t.__esModule=!0;var i=n(a(5311));function l(e,t){var a=e+"-handsontable-container",n=e+"-handsontable-header",l=e+"-handsontable-col-header",o=e+"-handsontable-col-caption",r=(0,i.default)("#"+e),d=(0,i.default)("#"+n),c=(0,i.default)("#"+l),s=(0,i.default)("#"+o),h={},f=null,u=null,p=!1,b=function(){var t=(0,i.default)("#"+e).parent();return t.find(".htCore").height()+2*t.find("[data-field]").height()},v=["[data-field] > .handsontable",".wtHider",".wtHolder"],w=function(t){var a=(0,i.default)("#"+e);i.default.each(v,(function(){a.closest("[data-field]").find(this).height(t)}))};try{u=JSON.parse(r.val())}catch(e){}null!==u&&(u.hasOwnProperty("first_row_is_table_header")&&d.prop("checked",u.first_row_is_table_header),u.hasOwnProperty("first_col_is_header")&&c.prop("checked",u.first_col_is_header),u.hasOwnProperty("table_caption")&&s.prop("value",u.table_caption)),t.hasOwnProperty("width")&&t.hasOwnProperty("height")||(0,i.default)(window).on("resize",(function(){var e;f.updateSettings({width:(0,i.default)(".w-field--table_input").closest(".sequence-member-inner").width(),height:b()}),e="100%",i.default.each(v,(function(){(0,i.default)(this).width(e)})),(0,i.default)(".w-field--table_input").width(e)}));var _=function(){for(var e=f.getCellsMeta(),t=[],a=0;a<e.length;a++)e[a].hasOwnProperty("className")&&t.push({row:e[a].row,col:e[a].col,className:e[a].className});return t},g=function(){r.val(JSON.stringify({data:f.getData(),cell:_(),first_row_is_table_header:d.prop("checked"),first_col_is_header:c.prop("checked"),table_caption:s.val()}))},y=function(e,t){w(b()),g()};d.on("change",(function(){g()})),c.on("change",(function(){g()})),s.on("change",(function(){g()}));var m={afterChange:function(e,t){"loadData"!==t&&g()},afterCreateCol:y,afterCreateRow:y,afterRemoveCol:y,afterRemoveRow:y,afterSetCellMeta:function(e,t,a,n){p&&"className"===a&&g()},afterInit:function(){p=!0}};null!==u&&(u.hasOwnProperty("data")&&(m.data=u.data),u.hasOwnProperty("cell")&&(m.cell=u.cell)),Object.keys(m).forEach((function(e){h[e]=m[e]})),Object.keys(t).forEach((function(e){h[e]=t[e]})),(f=new Handsontable(document.getElementById(a),h)).render(),"resize"in(0,i.default)(window)&&(w(b()),(0,i.default)(window).on("load",(function(){(0,i.default)(window).trigger("resize")})))}window.initTable=l;var o=function(){function e(e,t){this.options=e,this.strings=t}return e.prototype.render=function(e,t,a,n){var i=document.createElement("div");i.innerHTML='\n      <div className="w-field__wrapper" data-field-wrapper>\n        <label class="w-field__label" for="'.concat(a,'-handsontable-header">').concat(this.strings["Row header"],'</label>\n        <div class="w-field w-field--boolean_field w-field--checkbox_input" data-field>\n          <div className="w-field__input" data-field-input>\n            <input type="checkbox" id="').concat(a,'-handsontable-header" name="handsontable-header" aria-describedby="').concat(a,'-handsontable-header-helptext" />\n          </div>\n          <div id="').concat(a,'-handsontable-header-helptext" data-field-help>\n            <div class="help">').concat(this.strings["Display the first row as a header."],'</div>\n          </div>\n        </div>\n      </div>\n      <div className="w-field__wrapper" data-field-wrapper>\n        <label class="w-field__label" for="').concat(a,'-handsontable-col-header">').concat(this.strings["Column header"],'</label>\n        <div class="w-field w-field--boolean_field w-field--checkbox_input" data-field>\n          <div className="w-field__input" data-field-input>\n            <input type="checkbox" id="').concat(a,'-handsontable-col-header" name="handsontable-col-header" aria-describedby="').concat(a,'-handsontable-col-header-helptext" />\n          </div>\n          <div id="').concat(a,'-handsontable-col-header-helptext" data-field-help>\n            <div class="help">').concat(this.strings["Display the first column as a header."],'</div>\n          </div>\n        </div>\n      </div>\n      <div className="w-field__wrapper" data-field-wrapper>\n        <label class="w-field__label" for="').concat(a,'-handsontable-col-caption">').concat(this.strings["Table caption"],'</label>\n        <div class="w-field w-field--char_field w-field--text_input" data-field>\n          <div className="w-field__input" data-field-input>\n            <input type="text" id="').concat(a,'-handsontable-col-caption" name="handsontable-col-caption" aria-describedby="').concat(a,'-handsontable-col-caption-helptext" />\n          </div>\n          <div id="').concat(a,'-handsontable-col-caption-helptext" data-field-help>\n            <div class="help">').concat(this.strings["A heading that identifies the overall topic of the table, and is useful for screen reader users"],'</div>\n          </div>\n        </div>\n      </div>\n      <div id="').concat(a,'-handsontable-container"></div>\n      <input type="hidden" name="').concat(t,'" id="').concat(a,'" placeholder="').concat(this.strings.Table,'">\n    '),e.replaceWith(i);var o=i.querySelector('input[name="'.concat(t,'"]')),r=this.options,d={getValue:function(){return JSON.parse(o.value)},getState:function(){return JSON.parse(o.value)},setState:function(e){o.value=JSON.stringify(e),l(a,r)},focus:function(){}};return d.setState(n),d},e}();window.telepath.register("wagtail.widgets.TableInput",o)},5311:e=>{e.exports=jQuery}},a={};function n(e){var i=a[e];if(void 0!==i)return i.exports;var l=a[e]={exports:{}};return t[e].call(l.exports,l,l.exports,n),l.exports}n.m=t,e=[],n.O=(t,a,i,l)=>{if(!a){var o=1/0;for(s=0;s<e.length;s++){for(var[a,i,l]=e[s],r=!0,d=0;d<a.length;d++)(!1&l||o>=l)&&Object.keys(n.O).every((e=>n.O[e](a[d])))?a.splice(d--,1):(r=!1,l<o&&(o=l));if(r){e.splice(s--,1);var c=i();void 0!==c&&(t=c)}}return t}l=l||0;for(var s=e.length;s>0&&e[s-1][2]>l;s--)e[s]=e[s-1];e[s]=[a,i,l]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.j=986,(()=>{var e={986:0};n.O.j=t=>0===e[t];var t=(t,a)=>{var i,l,[o,r,d]=a,c=0;if(o.some((t=>0!==e[t]))){for(i in r)n.o(r,i)&&(n.m[i]=r[i]);if(d)var s=d(n)}for(t&&t(a);c<o.length;c++)l=o[c],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(s)},a=globalThis.webpackChunkwagtail=globalThis.webpackChunkwagtail||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var i=n.O(void 0,[751],(()=>n(2618)));i=n.O(i)})();