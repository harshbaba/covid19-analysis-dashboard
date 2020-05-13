'use strict';
// var MyToll = {};

// // method to load modules dynamically
// (function(){
//     MyToll.modules = {};

//     MyToll.module = function(name,options){
        
//         MyToll.modules[name] = {};
//         let ref = MyToll[name];
//             ref.jsList = options.jsList;
//             ref.cssList = options.cssList;
//             ref.template = options.template;
//             ref.resolve = options.resolve;
//     }

//     MyToll.loadModule = function(module){

//         $.get(MyToll[], function (data) {

//             $.getMultiScripts(options.scripts).done(function() {

//             });

//         });
//     }
// })();

(function(){
    Handlebars.registerHelper('printJson', function(context) {
        return JSON.stringify(context);
    });
    
    Handlebars.registerHelper('loadModule',function(moduleName,container){
        
        return new Handlebars.SafeString('<div id="'+container+'"></div>');
    });

    Handlebars.registerHelper('ifEq', function(v1, v2, options) {
      if(v1 === v2) {
        // console.log(v1,v2,' equal values');
        return options.fn(this);
      }else{
        // console.log(v1,v2,' not equal values');
        return options.inverse(this);
      }
    });

    Handlebars.registerHelper("inc", function(value, options){
        return parseInt(value) + 1;
    });

    var dropDownHtml = '<div class="custom-dropdown" id="{{this.id}}" tabindex="0" data-placeholder="{{this.placeholder}}">'+
        '<div class="label-wrapper">'+
          '<input type="hidden" name="{{this.name}}" id="{{this.name}}" value="{{this.value}}">'+
          '<div class="current-selected">{{#if this.text}}{{this.text}}{{else}}{{this.placeholder}}{{/if}}</div>'+
          '<a class="toggler"><i class="ico-arrow-down-green"></i></a>'+
        '</div>'+
        '<div class="dropdown-list">'+
          '<ul class="dropdown-list-ul">'+
          '{{#each this.options}}'+
            '<li {{#each this.data}}data-{{this.name}}="{{this.val}}"{{/each}}'+
            '>'+
            '<div>{{this.title}}</div>'+
            '</li>'+
          '{{/each}}'+
          '</ul>'+
        '</div>'+
      '</div>';

    Handlebars.registerHelper("customDropdown", function(optList,attrs,block){
        console.log(optList,JSON.parse(attrs));
        let tmpHtml = Handlebars.compile(dropDownHtml);
        let html = tmpHtml();
        return new Handlebars.SafeString(html);
    });

    Handlebars.registerHelper('times', function(n, block) {
        var accum = '';
        for(var i = 0; i < n; ++i) {
            block.data.index = i;
            block.data.sequence = i+1;
            block.data.first = i === 0;
            block.data.last = i === (n - 1);
            accum += block.fn(this);
            loadEvents(i);
        }
        return accum;
    });

    Handlebars.registerHelper('eachUptoMin', function(ary, min, block) {
        var arryLength = ary.length;
        var itertations = ary.length;
        if (arryLength < min) {
            itertations = min;
        }

        if(!ary || ary.length == 0){
            return block.inverse(this);
        }

        var result = [ ];
        for(var i = 0; i < itertations; ++i){
            block.data.index = i;
            block.data.sequence = i+1;
            block.data.first = i === 0;
            block.data.last = i === (min - 1);
            result.push(block.fn(ary[i]));
        }
        return result.join('');
    });

})();
