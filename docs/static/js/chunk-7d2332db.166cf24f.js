(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d2332db"],{1293:function(e,t,a){},"1cc6":function(e,t,a){"use strict";var n=a("1293"),r=a.n(n);r.a},"333d":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},r=[];a("a9e3");Math.easeInOutQuad=function(e,t,a,n){return e/=n/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var o=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function i(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function u(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(e,t,a){var n=u(),r=e-n,s=20,l=0;t="undefined"===typeof t?500:t;var c=function e(){l+=s;var u=Math.easeInOutQuad(l,n,r,t);i(u),l<t?o(e):a&&"function"===typeof a&&a()};c()}var l={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&s(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&s(0,800)}}},c=l,d=(a("1cc6"),a("2877")),p=Object(d["a"])(c,n,r,!1,null,"f3b72548",null);t["a"]=p.exports},"50fc":function(e,t,a){"use strict";a.d(t,"d",(function(){return i})),a.d(t,"b",(function(){return u})),a.d(t,"a",(function(){return s})),a.d(t,"c",(function(){return l}));a("7db0"),a("4160"),a("b64b"),a("159b");var n=a("05e8"),r=a("01f7"),o=a.n(r),i={getUsers:function(e){var t=e.page,a=e.limit,r=e.keyword,i=o.a.User;return r&&i.equalTo("name","==",r),i.equalTo("studentId","!=",null),i.order("-updatedAt"),i.skip((t-1)*a),i.limit(a),Object(n["a"])(i.find(),!1,null)},getUserCount:function(e){var t=e.keyword,a=o.a.User;return""!==t&&a.equalTo("name","==",t),a.equalTo("studentId","!=",null),Object(n["a"])(a.count(),!1,null)},modifyUserStatus:function(e){var t=e.objectId,a=e.status,r=o.a.User;return r.set("id",t),r.set("prohibit",a),Object(n["a"])(r.save(),!1,null)}},u={getReservations:function(e){var t=e.page,a=e.limit,r=e.keyword,i=e.dateRange,u=o.a.Query("Reservation");return r&&u.equalTo("name","==",r),i&&2===i.length&&(u.equalTo("date",">=",i[0]),u.equalTo("date","<=",i[1])),u.equalTo("studentId","!=",null),u.order("-updatedAt"),u.skip((t-1)*a),u.limit(a),Object(n["a"])(u.find())},getReservationCount:function(e){var t=e.keyword,a=e.dateRange,r=o.a.Query("Reservation");return t&&r.equalTo("name","==",t),a&&2===a.length&&(r.equalTo("date",">=",a[0]),r.equalTo("date","<=",a[1])),Object(n["a"])(r.count())},modifyReservationStatus:function(e){var t=e.objectId,a=e.status,r=o.a.Query("Reservation");return r.set("id",t),r.set("prohibit",a),Object(n["a"])(r.save(),!1,null)},getDormitoryById:function(e){var t=o.a.Query("Dormitory");return t.containedIn("studentId",e),Object(n["a"])(t.find(),!1,null)}},s={getDormitories:function(e){var t=e.page,a=e.limit,r=e.keyword,i=o.a.Query("Dormitory");return r&&i.equalTo("name","==",r),i.equalTo("studentId","!=",null),i.order("-updatedAt"),i.skip((t-1)*a),i.limit(a),Object(n["a"])(i.find())},getDormitoryCount:function(e){var t=e.keyword,a=o.a.Query("Dormitory");return t&&a.equalTo("name","==",t),Object(n["a"])(a.count())},submitDormitory:function(e){var t=o.a.Query("Dormitory");return Object.keys(e).forEach((function(a){t.set(a,e[a])})),Object(n["a"])(t.save(),!0,"学生住宿信息添加成功")},updateDormitory:function(e){var t=e.objectId,a=e.sex,r=e.studentId,i=e.dormitory,u=o.a.Query("Dormitory"),s=o.a.User;return s.equalTo("studentId","==",r),s.find().then((function(e){if(1===e.length){var t=e[0].objectId;s.set("id",t),s.set("sex",a),s.set("dormitory",i),s.save()}})),u.set("id",t),u.set("sex",a),u.set("dormitory",i),Object(n["a"])(u.save(),!1,null)},deleteDormitory:function(e){var t=e.objectId,a=o.a.Query("Dormitory");return a.set("id",t),Object(n["a"])(a.destroy(t),!1,null)}},l={getStatistic:function(e){var t=e.area,a=e.entered,r=e.cancelled,i=e.dateRange,u=o.a.Query("Reservation");return t&&u.equalTo("area","==",t),r||u.equalTo("cancelled","==",r),!r&&a&&(u.equalTo("cancelled","==",r),u.equalTo("entered","==",a)),i&&2===i.length&&(u.equalTo("date",">=",i[0]),u.equalTo("date","<=",i[1])),u.statTo("groupcount","true"),u.statTo("groupby","date,time,sex"),u.statTo("order","date,time"),u.limit(1e3),Object(n["a"])(u.find())}}},"629b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"10px"},attrs:{placeholder:"姓名"},model:{value:e.queryParams.keyword,callback:function(t){e.$set(e.queryParams,"keyword",t)},expression:"queryParams.keyword"}}),a("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.queryParams.dateRange,callback:function(t){e.$set(e.queryParams,"dateRange",t)},expression:"queryParams.dateRange"}}),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v(" 搜索 ")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.reservations,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号",prop:"index",sortable:"",align:"center",width:"80"}}),a("el-table-column",{attrs:{label:"姓名",prop:"name",sortable:"",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:n.dormitory,placement:"top"}},[a("span",[e._v(e._s(n.name))])])]}}])}),a("el-table-column",{attrs:{label:"学号",align:"center","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:n.dormitory,placement:"top"}},[a("span",[e._v(e._s(n.studentId))])])]}}])}),a("el-table-column",{attrs:{label:"性别",prop:"sex",sortable:"",width:"110px",align:"center"}}),a("el-table-column",{attrs:{label:"预约时间",prop:"date",sortable:"","min-width":"150px",align:"center"}}),a("el-table-column",{attrs:{label:"预约浴池",prop:"area",sortable:"","min-width":"150px",align:"center"}}),a("el-table-column",{attrs:{label:"是否取消",prop:"cancelled","class-name":"status-col",width:"100",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-tag",{attrs:{type:e._f("statusColorMap")(n.cancelled)}},[e._v(" "+e._s(e._f("cancelStatusMap")(n.cancelled))+" ")])]}}])}),a("el-table-column",{attrs:{label:"是否进入",prop:"entered","class-name":"status-col",width:"100",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-tag",{attrs:{type:e._f("statusColorMap")(n.entered)}},[e._v(" "+e._s(e._f("enterStatusMap")(n.entered))+" ")])]}}])}),a("el-table-column",{attrs:{label:"预约状态",prop:"prohibit","class-name":"status-col",width:"100",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-tag",{attrs:{type:e._f("statusColorMap")(n.prohibit)}},[e._v(" "+e._s(e._f("statusMap")(n.prohibit))+" ")])]}}])}),a("el-table-column",{attrs:{label:"预约管理",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[n.prohibit?e._e():a("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.handleModifyStatus(n,!0)}}},[e._v(" 禁止进入 ")]),n.prohibit?a("el-button",{attrs:{type:"success"},on:{click:function(t){return e.handleModifyStatus(n,!1)}}},[e._v(" 解除禁止 ")]):e._e()]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.reservationCount>0,expression:"reservationCount>0"}],attrs:{total:e.reservationCount,page:e.queryParams.page,limit:e.queryParams.limit},on:{"update:page":function(t){return e.$set(e.queryParams,"page",t)},"update:limit":function(t){return e.$set(e.queryParams,"limit",t)},pagination:e.getReservations}})],1)},r=[],o=(a("99af"),a("4de4"),a("d81d"),a("5530")),i=(a("96cf"),a("1da1")),u=a("333d"),s=a("50fc"),l={name:"Reservation",components:{Pagination:u["a"]},filters:{statusColorMap:function(e){return e?"danger":"success"},statusMap:function(e){return e?"禁止进入":"可进入"},cancelStatusMap:function(e){return e?"已取消":"未取消"},enterStatusMap:function(e){return e?"已进入浴室":"未进入"}},data:function(){return{reservations:[],listLoading:!0,queryParams:{page:1,limit:20,keyword:"",dateRange:[]},reservationCount:0}},created:function(){this.getReservations()},methods:{getReservations:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.listLoading=!0,t.next=3,s["b"].getReservations(e.queryParams);case 3:return a=t.sent,n=a.map((function(e){return e.studentId})),t.next=7,s["b"].getDormitoryById(n);case 7:return r=t.sent,e.reservations=a.map((function(e,t){return Object(o["a"])(Object(o["a"])({index:t+1,dormitory:r.filter((function(t){return t.studentId===e.studentId}))[0].dormitory},e),{},{date:"".concat(e.date," ").concat(e.time)})})),t.next=11,s["b"].getReservationCount(e.queryParams);case 11:e.reservationCount=t.sent,e.listLoading=!1;case 13:case"end":return t.stop()}}),t)})))()},handleSearch:function(){this.getReservations()},handleModifyStatus:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:a.$confirm("此操作将禁止所选用户进入浴室, 是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,s["b"].modifyReservationStatus({objectId:e.objectId,status:t});case 2:if(!n.sent){n.next=5;break}e.prohibit=t,a.$message({type:"success",message:t?"禁止进入成功":"解除禁止成功"});case 5:case"end":return n.stop()}}),n)})))).catch((function(){a.$message({type:"info",message:"已取消操作"})}));case 1:case"end":return n.stop()}}),n)})))()}}},c=l,d=a("2877"),p=Object(d["a"])(c,n,r,!1,null,null,null);t["default"]=p.exports}}]);