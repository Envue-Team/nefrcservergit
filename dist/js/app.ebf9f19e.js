(function(e){function t(t){for(var r,a,l=t[0],i=t[1],u=t[2],c=0,d=[];c<l.length;c++)a=l[c],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&d.push(s[a][0]),s[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);v&&v(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==s[i]&&(r=!1)}r&&(o.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},s={app:0},o=[];function a(e){return l.p+"js/"+({about:"about"}[e]||e)+"."+{about:"08547b34"}[e]+".js"}function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n=s[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=s[e]=[t,r]}));t.push(n[2]=r);var o,i=document.createElement("script");i.charset="utf-8",i.timeout=120,l.nc&&i.setAttribute("nonce",l.nc),i.src=a(e);var u=new Error;o=function(t){i.onerror=i.onload=null,clearTimeout(c);var n=s[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",u.name="ChunkLoadError",u.type=r,u.request=o,n[1](u)}s[e]=void 0}};var c=setTimeout((function(){o({type:"timeout",target:i})}),12e4);i.onerror=i.onload=o,document.head.appendChild(i)}return Promise.all(t)},l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var v=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),s=n.n(r);s.a},1086:function(e,t,n){},"22a7":function(e,t,n){"use strict";var r=n("aa52"),s=n.n(r);s.a},"22b3":function(e,t,n){"use strict";var r=n("1086"),s=n.n(r);s.a},"524c":function(e,t,n){"use strict";var r=n("73f1"),s=n.n(r);s.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" |\n    "),n("router-link",{attrs:{to:"/about"}},[e._v("About")]),e._v(" | \n    "),n("router-link",{attrs:{to:"/volunteer/1"}},[e._v("Volunteer 1")]),e._v(" |\n    "),n("router-link",{attrs:{to:"/volunteers-list"}},[e._v("Volunteers")]),e._v(" | \n    "),n("router-link",{attrs:{to:"/add-shelter"}},[e._v("Add Shelter")]),e._v(" |\n    "),n("router-link",{attrs:{to:"/shelters-list"}},[e._v("Shelters")])],1),n("h1",[e._v("Some obvious chane")]),n("router-view")],1)},o=[],a=(n("034f"),n("2877")),l={},i=Object(a["a"])(l,s,o,!1,null,null,null),u=i.exports,c=n("8c4f"),v=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),r("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},d=[],m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),e._m(0),n("h3",[e._v("Installed CLI Plugins")]),e._m(1),n("h3",[e._v("Essential Links")]),e._m(2),n("h3",[e._v("Ecosystem")]),e._m(3)])},h=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("\n    For guide and recipes on how to configure / customize this project,"),n("br"),e._v("\n    check out the\n    "),n("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(".\n  ")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[e._v("babel")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint",target:"_blank",rel:"noopener"}},[e._v("eslint")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Core Docs")])]),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Forum")])]),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Community Chat")])]),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[e._v("Twitter")])]),n("li",[n("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("News")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-router")])]),n("li",[n("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[e._v("vue-devtools")])]),n("li",[n("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-loader")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[e._v("awesome-vue")])])])}],p={name:"HelloWorld",props:{msg:String}},f=p,b=(n("524c"),Object(a["a"])(f,m,h,!1,null,"b6a59770",null)),g=b.exports,_={name:"home",components:{HelloWorld:g}},y=_,C=Object(a["a"])(y,v,d,!1,null,null,null),k=C.exports,V=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.currentVolunteer?n("div",{staticClass:"edit-form"},[n("h4",[e._v("Volunteer")]),n("form",[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"name"}},[e._v("Name")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.currentVolunteer.name,expression:"currentVolunteer.name"}],staticClass:"form-control",attrs:{type:"text",id:"name"},domProps:{value:e.currentVolunteer.name},on:{input:function(t){t.target.composing||e.$set(e.currentVolunteer,"name",t.target.value)}}})]),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"description"}},[e._v("Description")]),n("p",[e._v(e._s(e.currentVolunteer.description))]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.currentVolunteer.description,expression:"currentVolunteer.description"}],staticClass:"form-control",attrs:{type:"text",id:"description"},domProps:{value:e.currentVolunteer.description},on:{input:function(t){t.target.composing||e.$set(e.currentVolunteer,"description",t.target.value)}}})]),n("div",{staticClass:"form-group"},[e._m(0),e._v("\n      "+e._s(e.currentVolunteer.published?"Published":"Pending")+"\n    ")])]),e.currentVolunteer.published?n("button",{staticClass:"badge badge-primary mr-2",on:{click:function(t){return e.updatePublished(!1)}}},[e._v("\n    UnPublish\n  ")]):n("button",{staticClass:"badge badge-primary mr-2",on:{click:function(t){return e.updatePublished(!0)}}},[e._v("\n    Publish\n  ")]),n("button",{staticClass:"badge badge-danger mr-2",on:{click:e.deleteVolunteer}},[e._v("\n    Delete\n  ")]),n("button",{staticClass:"badge badge-success",attrs:{type:"submit"},on:{click:e.updateVolunteer}},[e._v("\n    Update\n  ")]),n("p",[e._v(e._s(e.message))])]):n("div",[n("br"),n("p",[e._v("Please click on a Volunteer...")])])},w=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",[n("strong",[e._v("Status:")])])}],x=(n("7f7f"),n("d225")),j=n("b0b4"),P=n("bc3a"),S=n.n(P),$=S.a.create({baseURL:"http://ec2-18-234-216-12.compute-1.amazonaws.com:8080",headers:{"Content-type":"application/json"}}),E=function(){function e(){Object(x["a"])(this,e)}return Object(j["a"])(e,[{key:"getAll",value:function(){return $.get("volunteers")}},{key:"get",value:function(e){return $.get("/volunteers/".concat(e))}},{key:"create",value:function(e){return $.post("/volunteers",e)}},{key:"update",value:function(e,t){return $.put("/volunteers/".concat(e),t)}},{key:"delete",value:function(e){return $.delete("/volunteers/".concat(e))}},{key:"deleteAll",value:function(){return $.delete("/volunteers")}},{key:"findByName",value:function(e){return $.get("/volunteer?name=".concat(e))}}]),e}(),A=new E,O={name:"volunteer",data:function(){return{currentVolunteer:null,message:""}},methods:{getVolunteer:function(e){var t=this;A.get(e).then((function(e){t.currentVolunteer=e.data})).catch((function(e){console.log(e)}))},updatePublished:function(e){var t=this,n={id:this.currentVolunteer.id,title:this.currentVolunteer.name,description:this.currentVolunteer.description,published:e};A.update(this.currentVolunteer.id,n).then((function(n){t.currentVolunteer.published=e,console.log(n.data)})).catch((function(e){console.log(e)}))},updateVolunteer:function(){var e=this;A.update(this.currentVolunteer.id,this.currentVolunteer).then((function(t){console.log(t.data),e.message="The volunteer was updated successfully!"})).catch((function(e){console.log(e)}))},deleteVolunteer:function(){var e=this;A.delete(this.currentVolunteer.id).then((function(t){console.log(t.data),e.$router.push({name:"volunteers"})})).catch((function(e){console.log(e)}))}},mounted:function(){this.message="",this.getVolunteer(this.$route.params.id)}},N=O,T=(n("f292"),Object(a["a"])(N,V,w,!1,null,null,null)),L=T.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"list row"},[n("div",{staticClass:"col-md-8"},[n("div",{staticClass:"input-group mb-3"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Search by name"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}),n("div",{staticClass:"input-group-append"},[n("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button"},on:{click:e.searchTitle}},[e._v("\n          Search\n        ")])])])]),n("div",{staticClass:"col-md-6"},[n("h4",[e._v("Volunteers List")]),n("ul",{staticClass:"list-group"},e._l(e.volunteers,(function(t,r){return n("li",{key:r,staticClass:"list-group-item",class:{active:r==e.currentIndex},on:{click:function(n){return e.setActiveVolunteer(t,r)}}},[e._v("\n        "+e._s(t.name)+"\n      ")])})),0),n("button",{staticClass:"m-3 btn btn-sm btn-danger",on:{click:e.removeAllVolunteers}},[e._v("\n      Remove All\n    ")])]),n("div",{staticClass:"col-md-6"},[e.currentVolunteer?n("div",[n("h4",[e._v("Volunteer")]),n("div",[e._m(0),e._v(" "+e._s(e.currentVolunteer.name)+"\n      ")]),n("div",[e._m(1),e._v(" "+e._s(e.currentVolunteer.description)+"\n      ")]),n("div",[e._m(2),e._v(" "+e._s(e.currentVolunteer.published?"Published":"Pending")+"\n      ")]),n("a",{staticClass:"badge badge-warning",attrs:{href:"/Volunteers/"+e.currentVolunteer.id}},[e._v("\n        Edit\n      ")])]):n("div",[n("br"),n("p",[e._v("Please click on a Volunteer...")])])])])},q=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",[n("strong",[e._v("Title:")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",[n("strong",[e._v("Description:")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",[n("strong",[e._v("Status:")])])}],z={name:"volunteers-list",data:function(){return{volunteers:[],currentVolunteer:null,currentIndex:-1,name:""}},methods:{retrieveVolunteers:function(){var e=this;A.getAll().then((function(t){e.volunteers=t.data})).catch((function(e){console.log(e.message)}))},refreshList:function(){this.retrieveVolunteers(),this.currentVolunteers=null,this.currentIndex=-1},setActiveVolunteer:function(e,t){this.currentVolunteer=e,this.currentIndex=t},removeAllVolunteers:function(){var e=this;A.deleteAll().then((function(t){console.log(t.data),e.refreshList()})).catch((function(e){console.log(e)}))},searchTitle:function(){var e=this;A.findByName(this.name).then((function(t){e.volunteers=t.data,console.log(t.data)})).catch((function(e){console.log(e)}))}},mounted:function(){this.retrieveVolunteers()}},D=z,B=(n("22a7"),Object(a["a"])(D,I,q,!1,null,null,null)),H=B.exports,M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"submit-form"},[e.submitted?n("div",[n("h4",[e._v("You submitted successfully!")]),n("button",{staticClass:"btn btn-success",on:{click:e.newVolunteer}},[e._v("Add")])]):n("div",[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"name"}},[e._v("name")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.volunteer.name,expression:"volunteer.name"}],staticClass:"form-control",attrs:{type:"text",id:"name",required:"",name:"name"},domProps:{value:e.volunteer.name},on:{input:function(t){t.target.composing||e.$set(e.volunteer,"name",t.target.value)}}})]),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"description"}},[e._v("Description")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.volunteer.description,expression:"volunteer.description"}],staticClass:"form-control",attrs:{id:"description",required:"",name:"description"},domProps:{value:e.volunteer.description},on:{input:function(t){t.target.composing||e.$set(e.volunteer,"description",t.target.value)}}})]),n("button",{staticClass:"btn btn-success",on:{click:e.saveVolunteer}},[e._v("Submit")])])])},W=[],R={name:"add-volunteer",data:function(){return{volunteer:{id:null,name:"",description:"",published:!1},submitted:!1}},methods:{saveVolunteer:function(){var e=this;console.log(this.volunteer);var t={name:this.volunteer.name,description:this.volunteer.description};A.create(t).then((function(t){e.volunteer.id=t.data.id,console.log("response id: "+t.data.id),e.submitted=!0})).catch((function(e){console.log(e)}))},newVolunteer:function(){this.submitted=!1,this.volunteer={}}}},U=R,Y=(n("22b3"),Object(a["a"])(U,M,W,!1,null,null,null)),F=Y.exports,J=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"submit-form"},[e.submitted?n("div",[n("h4",[e._v("You submitted successfully!")]),n("button",{staticClass:"btn btn-success",on:{click:e.newshelter}},[e._v("Add")])]):n("div",[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"name"}},[e._v("Name")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.shelter.name,expression:"shelter.name"}],staticClass:"form-control",attrs:{type:"text",id:"name",required:"",name:"name"},domProps:{value:e.shelter.name},on:{input:function(t){t.target.composing||e.$set(e.shelter,"name",t.target.value)}}})]),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"street_number"}},[e._v("Street Number")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.shelter.street_number,expression:"shelter.street_number"}],staticClass:"form-control",attrs:{id:"street_number",required:"",name:"street_number"},domProps:{value:e.shelter.street_number},on:{input:function(t){t.target.composing||e.$set(e.shelter,"street_number",t.target.value)}}})]),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"street_name"}},[e._v("Street Name")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.shelter.street_name,expression:"shelter.street_name"}],staticClass:"form-control",attrs:{id:"street_name",required:"",name:"street_name"},domProps:{value:e.shelter.street_name},on:{input:function(t){t.target.composing||e.$set(e.shelter,"street_name",t.target.value)}}})]),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"city"}},[e._v("City")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.shelter.city,expression:"shelter.city"}],staticClass:"form-control",attrs:{id:"city",required:"",name:"city"},domProps:{value:e.shelter.city},on:{input:function(t){t.target.composing||e.$set(e.shelter,"city",t.target.value)}}})]),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"state"}},[e._v("State")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.shelter.state,expression:"shelter.state"}],staticClass:"form-control",attrs:{id:"state",required:"",name:"state"},domProps:{value:e.shelter.state},on:{input:function(t){t.target.composing||e.$set(e.shelter,"state",t.target.value)}}})]),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"zip"}},[e._v("Zip")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.shelter.zip,expression:"shelter.zip"}],staticClass:"form-control",attrs:{id:"zip",required:"",name:"zip"},domProps:{value:e.shelter.zip},on:{input:function(t){t.target.composing||e.$set(e.shelter,"zip",t.target.value)}}})]),n("button",{staticClass:"btn btn-success",on:{click:e.saveshelter}},[e._v("Submit")])])])},Z=[],G=function(){function e(){Object(x["a"])(this,e)}return Object(j["a"])(e,[{key:"getAll",value:function(){return $.get("shelters")}},{key:"get",value:function(e){return $.get("/shelters/".concat(e))}},{key:"create",value:function(e){return $.post("/shelters",e)}},{key:"update",value:function(e,t){return $.put("/shelters/".concat(e),t)}},{key:"delete",value:function(e){return $.delete("/shelters/".concat(e))}},{key:"deleteAll",value:function(){return $.delete("/shelters")}},{key:"findByName",value:function(e){return $.get("/shelter?name=".concat(e))}}]),e}(),K=new G,Q={name:"add-shelter",data:function(){return{shelter:{id:null,name:"",description:"",published:!1},submitted:!1}},methods:{saveshelter:function(){var e=this;console.log(this.shelter);var t={name:this.shelter.name,description:this.shelter.description};K.create(t).then((function(t){e.shelter.id=t.data.id,console.log("response id: "+t.data.id),e.submitted=!0})).catch((function(e){console.log(e)}))},newshelter:function(){this.submitted=!1,this.shelter={}}}},X=Q,ee=(n("eb43"),Object(a["a"])(X,J,Z,!1,null,null,null)),te=ee.exports,ne=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"list row"},[n("div",{staticClass:"col-md-8"},[n("div",{staticClass:"input-group mb-3"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Search by name"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}),n("div",{staticClass:"input-group-append"},[n("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button"},on:{click:e.searchTitle}},[e._v("\n          Search\n        ")])])])]),n("div",{staticClass:"col-md-6"},[n("h4",[e._v("Shelters List")]),n("ul",{staticClass:"list-group"},e._l(e.Shelters,(function(t,r){return n("li",{key:r,staticClass:"list-group-item",class:{active:r==e.currentIndex},on:{click:function(n){return e.setActiveShelter(t,r)}}},[e._v("\n        "+e._s(t.name)+"\n      ")])})),0),n("button",{staticClass:"m-3 btn btn-sm btn-danger",on:{click:e.removeAllShelters}},[e._v("\n      Remove All\n    ")])]),n("div",{staticClass:"col-md-6"},[e.currentshelter?n("div",[n("h4",[e._v("shelter")]),n("div",[e._m(0),e._v(" "+e._s(e.currentshelter.name)+"\n      ")]),n("div",[e._m(1),e._v(" "+e._s(e.currentshelter.description)+"\n      ")]),n("div",[e._m(2),e._v(" "+e._s(e.currentshelter.published?"Published":"Pending")+"\n      ")]),n("a",{staticClass:"badge badge-warning",attrs:{href:"/Shelters/"+e.currentshelter.id}},[e._v("\n        Edit\n      ")])]):n("div",[n("br"),n("p",[e._v("Please click on a shelter...")])])])])},re=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",[n("strong",[e._v("Title:")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",[n("strong",[e._v("Description:")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",[n("strong",[e._v("Status:")])])}],se={name:"shelters-list",data:function(){return{Shelters:[],currentshelter:null,currentIndex:-1,name:""}},methods:{retrieveShelters:function(){var e=this;K.getAll().then((function(t){e.Shelters=t.data})).catch((function(e){console.log(e.message)}))},refreshList:function(){this.retrieveShelters(),this.currentShelters=null,this.currentIndex=-1},setActiveshelter:function(e,t){this.currentshelter=e,this.currentIndex=t},removeAllShelters:function(){var e=this;K.deleteAll().then((function(t){console.log(t.data),e.refreshList()})).catch((function(e){console.log(e)}))},searchTitle:function(){var e=this;K.findByName(this.name).then((function(t){e.Shelters=t.data,console.log(t.data)})).catch((function(e){console.log(e)}))}},mounted:function(){this.retrieveShelters()}},oe=se,ae=(n("664c"),Object(a["a"])(oe,ne,re,!1,null,null,null)),le=ae.exports;r["a"].use(c["a"]);var ie=new c["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:k},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/volunteer/:id",name:"volunteer",component:L},{path:"/volunteers-list",name:"volunteers-list",component:H},{path:"/add-volunteer",name:"add-volunteer",component:F},{path:"/add-shelter",name:"add-shelter",component:te},{path:"/shelters-list",name:"shelters-list",component:le}]});r["a"].config.productionTip=!1,new r["a"]({router:ie,render:function(e){return e(u)}}).$mount("#app")},"64a9":function(e,t,n){},"664c":function(e,t,n){"use strict";var r=n("8d97"),s=n.n(r);s.a},"676a":function(e,t,n){},"73f1":function(e,t,n){},"8d97":function(e,t,n){},aa52:function(e,t,n){},b808:function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"},eb43:function(e,t,n){"use strict";var r=n("b808"),s=n.n(r);s.a},f292:function(e,t,n){"use strict";var r=n("676a"),s=n.n(r);s.a}});
//# sourceMappingURL=app.ebf9f19e.js.map