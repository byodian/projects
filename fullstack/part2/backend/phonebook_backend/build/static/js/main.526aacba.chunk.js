(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(2),a=t(15),r=t.n(a),o=t(6),i=t(3),u=t(0),s=function(e){var n=e.filter,t=e.handleChange;return Object(u.jsxs)("div",{children:["filter shown with ",Object(u.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.o,t=n.addPerson,c=n.newName,a=n.newNumber,r=n.handleNameChange,o=n.handleNumberChange;return Object(u.jsxs)("form",{onSubmit:t,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:c,onChange:r})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{value:a,onChange:o})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.persons,t=e.handleClick;return Object(u.jsx)("div",{children:n.map((function(e){return Object(u.jsxs)("p",{children:[e.name," ",e.number,Object(u.jsx)("button",{onClick:function(){return t(e.name,e.id)},children:"delete"})]},e.id)}))})},f=t(4),b=t.n(f),h="/api/persons",j=function(){return b.a.get(h).then((function(e){return e.data}))},m=j,O=function(e){return b.a.post(h,e).then((function(e){return e.data}))},v=function(e,n){return b.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return b.a.delete("".concat(h,"/").concat(e)).then((function(){return j()}))},x=function(e){var n=e.message,t=e.className;if(null===n)return null;var c="warning ".concat(t);return Object(u.jsx)("div",{className:c,children:n})},w=(t(39),function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(""),f=Object(i.a)(r,2),b=f[0],h=f[1],j=Object(c.useState)(""),w=Object(i.a)(j,2),g=w[0],C=w[1],N=Object(c.useState)(""),k=Object(i.a)(N,2),y=k[0],S=k[1],D=Object(c.useState)(null),I=Object(i.a)(D,2),L=I[0],P=I[1],A=Object(c.useState)(""),E=Object(i.a)(A,2),J=E[0],B=E[1];Object(c.useEffect)((function(){m().then((function(e){a(e)}))}),[]);var F=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5e3;P(e),B(n),setTimeout((function(){P(null)}),t)},T=t.filter((function(e){return e.name.toLowerCase().includes(y.toLocaleLowerCase())})),q=function(e){return function(n){e(n.target.value)}},z={handleNameChange:q(h),handleNumberChange:q(C),addPerson:function(e){e.preventDefault(),""!==b&&""!==g||alert("Name or Number input field can't be empty.");var n=t.find((function(e){return e.name===b}));void 0===n?O({name:b,number:g}).then((function(e){a(t.concat(e)),h(""),C(""),F("Added ".concat(e.name),"pass")})).catch((function(e){console.dir(e),F("".concat(e.response.data.error),"fail")})):function(e){var n="".concat(e.name," is already added to phonebook, replac the old number with a new one?");if(e&&window.confirm(n)){var c=e.id,r=Object(o.a)(Object(o.a)({},e),{},{number:g});v(c,r).then((function(e){a(t.map((function(n){return n.id!==c?n:e}))),h(""),C("")})).catch((function(){var n="Infomation of ".concat(e.name," has already been removed from server");F(n,"fail"),a(t.filter((function(e){return e.id!==c})))}))}}(n)},setFilter:S,newName:b,newNumber:g};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Phonebook"}),Object(u.jsx)(x,{message:L,className:J}),Object(u.jsx)(s,{filter:y,handleChange:q(S)}),Object(u.jsx)("h2",{children:"Add a new person"}),Object(u.jsx)(d,{o:z}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(l,{persons:T,handleClick:function(e,n){window.confirm("Delete ".concat(e,"?"))&&p(n).then((function(e){a(e),F("Deleted successfully","pass")})).catch((function(){var c="Information of ".concat(e," has already been removed from server");F(c,"fail"),a(t.filter((function(e){return e.id!==n})))}))}})]})});r.a.render(Object(u.jsx)(w,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.526aacba.chunk.js.map