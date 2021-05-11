(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d75af9c2"],{1124:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"150px"},attrs:{placeholder:""},model:{value:e.queryParams.area,callback:function(t){e.$set(e.queryParams,"area",t)},expression:"queryParams.area"}},e._l(e.bathArea,(function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1),a("el-date-picker",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.queryParams.dateRange,callback:function(t){e.$set(e.queryParams,"dateRange",t)},expression:"queryParams.dateRange"}}),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v(" 查询 ")])],1),a("div",{staticStyle:{width:"100%",height:"70vh"},attrs:{id:"chartDom"}}),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.statistic,border:"",fit:"","highlight-current-row":"",height:"600"}},[a("el-table-column",{attrs:{label:"时间",prop:"time",align:"center","min-width":"200"}}),a("el-table-column",{attrs:{label:"男部实际预约",prop:"reservationMale",width:"120px",align:"center"}}),a("el-table-column",{attrs:{label:"男部实际进入",prop:"enteredMale",align:"center",width:"120px"}}),a("el-table-column",{attrs:{label:"女部实际预约",prop:"reservationFemale",width:"120px",align:"center"}}),a("el-table-column",{attrs:{label:"女部实际进入",prop:"enteredFemale",align:"center",width:"120px"}}),a("el-table-column",{attrs:{label:"实际预约总数",prop:"name",width:"120px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(a.reservationMale+a.reservationFemale)+" ")]}}])}),a("el-table-column",{attrs:{label:"实际进入总数",align:"center",width:"120px"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(a.enteredMale+a.enteredFemale)+" ")]}}])})],1)],1)},n=[],i=(a("99af"),a("4160"),a("4ec9"),a("d3b7"),a("3ca3"),a("159b"),a("ddb0"),a("b85c")),o=a("5530"),s=(a("96cf"),a("1da1")),l=a("50fc"),c=a("ed08"),d=a("313e"),u=a.n(d),m={name:"Statistic",data:function(){return{reservations:[],listLoading:!0,queryParams:{area:"鹏翔浴池",dateRange:[Object(c["b"])(new Date((new Date).getTime()-6048e5),"{y}-{m}-{d}"),Object(c["b"])(new Date,"{y}-{m}-{d}")]},bathArea:["七里台浴池","鹏翔浴池"],chartInstance:null,chartData:{reservation_male:[],reservation_female:[],entered_male:[],entered_female:[]},statistic:[]}},mounted:function(){this.chartInstance=u.a.init(document.getElementById("chartDom")),this.getStatistic()},methods:{dataProcess:function(e,t){var a=this;e.forEach((function(e){"男"===e.sex?a.chartData["".concat(t,"_male")].push(["".concat(e.date," ").concat(e.time),e._count]):"女"===e.sex&&a.chartData["".concat(t,"_female")].push(["".concat(e.date," ").concat(e.time),e._count])}))},getStatistic:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r,n,s,c,d,u,m,f,h;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.chartInstance.showLoading(),e.listLoading=!0,e.chartData={reservation_male:[],reservation_female:[],entered_male:[],entered_female:[]},e.statistic=[],t.next=6,l["c"].getStatistic(Object(o["a"])(Object(o["a"])({},e.queryParams),{},{cancelled:!1}));case 6:return a=t.sent,t.next=9,l["c"].getStatistic(Object(o["a"])(Object(o["a"])({},e.queryParams),{},{cancelled:!1,entered:!0}));case 9:r=t.sent,e.dataProcess(a,"reservation"),e.dataProcess(r,"entered"),e.drawChart(),n=new Map(e.chartData.reservation_male),s=new Map(e.chartData.reservation_female),c=new Map(e.chartData.entered_male),d=new Map(e.chartData.entered_female),u=n.size>=s.size?n.keys():s.keys(),m=Object(i["a"])(u);try{for(m.s();!(f=m.n()).done;)h=f.value,e.statistic.push({time:h,reservationMale:n.get(h)||0,reservationFemale:s.get(h)||0,enteredMale:c.get(h)||0,enteredFemale:d.get(h)||0})}catch(p){m.e(p)}finally{m.f()}e.chartInstance.hideLoading(),e.listLoading=!1;case 22:case"end":return t.stop()}}),t)})))()},handleSearch:function(){this.getStatistic()},drawChart:function(){var e={tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:["男部实际预约","女部实际预约","男部实际进入","女部实际进入"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category"}],yAxis:[{type:"value"}],dataZoom:[{type:"slider",xAxisIndex:0,filterMode:"empty"},{type:"inside",xAxisIndex:0,filterMode:"empty"}],series:[{name:"男部实际预约",type:"bar",stack:"预约",data:this.chartData.reservation_male},{name:"女部实际预约",type:"bar",stack:"预约",data:this.chartData.reservation_female},{name:"男部实际进入",type:"bar",stack:"进入",data:this.chartData.entered_male},{name:"女部实际进入",type:"bar",stack:"进入",data:this.chartData.entered_female}]};this.chartInstance.setOption(e)}}},f=m,h=a("2877"),p=Object(h["a"])(f,r,n,!1,null,null,null);t["default"]=p.exports},"50fc":function(e,t,a){"use strict";a.d(t,"d",(function(){return o})),a.d(t,"b",(function(){return s})),a.d(t,"a",(function(){return l})),a.d(t,"c",(function(){return c}));a("7db0"),a("4160"),a("b64b"),a("159b");var r=a("05e8"),n=a("01f7"),i=a.n(n),o={getUsers:function(e){var t=e.page,a=e.limit,n=e.keyword,o=i.a.User;return n&&o.equalTo("name","==",n),o.equalTo("studentId","!=",null),o.order("-updatedAt"),o.skip((t-1)*a),o.limit(a),Object(r["a"])(o.find(),!1,null)},getUserCount:function(e){var t=e.keyword,a=i.a.User;return""!==t&&a.equalTo("name","==",t),a.equalTo("studentId","!=",null),Object(r["a"])(a.count(),!1,null)},modifyUserStatus:function(e){var t=e.objectId,a=e.status,n=i.a.User;return n.set("id",t),n.set("prohibit",a),Object(r["a"])(n.save(),!1,null)}},s={getReservations:function(e){var t=e.page,a=e.limit,n=e.keyword,o=e.dateRange,s=i.a.Query("Reservation");return n&&s.equalTo("name","==",n),o&&2===o.length&&(s.equalTo("date",">=",o[0]),s.equalTo("date","<=",o[1])),s.equalTo("studentId","!=",null),s.order("-updatedAt"),s.skip((t-1)*a),s.limit(a),Object(r["a"])(s.find())},getReservationCount:function(e){var t=e.keyword,a=e.dateRange,n=i.a.Query("Reservation");return t&&n.equalTo("name","==",t),a&&2===a.length&&(n.equalTo("date",">=",a[0]),n.equalTo("date","<=",a[1])),Object(r["a"])(n.count())},modifyReservationStatus:function(e){var t=e.objectId,a=e.status,n=i.a.Query("Reservation");return n.set("id",t),n.set("prohibit",a),Object(r["a"])(n.save(),!1,null)},getDormitoryById:function(e){var t=i.a.Query("Dormitory");return t.containedIn("studentId",e),Object(r["a"])(t.find(),!1,null)}},l={getDormitories:function(e){var t=e.page,a=e.limit,n=e.keyword,o=i.a.Query("Dormitory");return n&&o.equalTo("name","==",n),o.equalTo("studentId","!=",null),o.order("-updatedAt"),o.skip((t-1)*a),o.limit(a),Object(r["a"])(o.find())},getDormitoryCount:function(e){var t=e.keyword,a=i.a.Query("Dormitory");return t&&a.equalTo("name","==",t),Object(r["a"])(a.count())},submitDormitory:function(e){var t=i.a.Query("Dormitory");return Object.keys(e).forEach((function(a){t.set(a,e[a])})),Object(r["a"])(t.save(),!0,"学生住宿信息添加成功")},updateDormitory:function(e){var t=e.objectId,a=e.sex,n=e.studentId,o=e.dormitory,s=i.a.Query("Dormitory"),l=i.a.User;return l.equalTo("studentId","==",n),l.find().then((function(e){if(1===e.length){var t=e[0].objectId;l.set("id",t),l.set("sex",a),l.set("dormitory",o),l.save()}})),s.set("id",t),s.set("sex",a),s.set("dormitory",o),Object(r["a"])(s.save(),!1,null)},deleteDormitory:function(e){var t=e.objectId,a=i.a.Query("Dormitory");return a.set("id",t),Object(r["a"])(a.destroy(t),!1,null)}},c={getStatistic:function(e){var t=e.area,a=e.entered,n=e.cancelled,o=e.dateRange,s=i.a.Query("Reservation");return t&&s.equalTo("area","==",t),n||s.equalTo("cancelled","==",n),!n&&a&&(s.equalTo("cancelled","==",n),s.equalTo("entered","==",a)),o&&2===o.length&&(s.equalTo("date",">=",o[0]),s.equalTo("date","<=",o[1])),s.statTo("groupcount","true"),s.statTo("groupby","date,time,sex"),s.statTo("order","date,time"),s.limit(1e3),Object(r["a"])(s.find())}}}}]);