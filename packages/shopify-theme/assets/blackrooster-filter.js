var getValueoffilter;
var getNameoffilter;
var removeItem ="";
var numberOfItem;
var urlcreatorColor = [];
var createdURL;
var actualURL;
var removeholder;
var removeArray;
var arrayWseperate ="";
var pagefixed;

var getsortValue="";
var getsortCopy="";
var filterSortbyHolder ="";
var smith="";

var mdFilter = new MobileDetect(window.navigator.userAgent);
var isMobileFilter = mdFilter.mobile();

var countoffilter = $('#removeFilter').find('li').length;
$('#filterCounter').html(countoffilter);

$('#productCount').hide();


const queryString = window.location.search;
const variantitem = queryString;

const urlParams = new URLSearchParams(queryString);
const detectPage = urlParams.has('page');
const detectsortby = urlParams.has('sort_by');
const detectsortby2 = urlParams.get('sort_by');



var sortbytitle="";

function titleConverter(title){
     if(title == 'manual'){
        sortbytitle = 'Featured' 
     }
     if(title == 'best-selling'){
        sortbytitle = 'Best selling' 
     }
     if(title == 'title-ascending'){
        sortbytitle = 'Alphabetically, A-Z' 
     }
     if(title == 'title-descending'){
        sortbytitle = 'Alphabetically, Z-A' 
     }
     if(title == 'price-ascending'){
        sortbytitle = 'Price, low to high' 
     }
     if(title == 'price-descending'){
        sortbytitle = 'Price, high to low' 
     }
     if(title == 'created-ascending'){
        sortbytitle = 'Date, old to new' 
     }
     if(title == 'created-descending'){
        sortbytitle = 'Date, new to old' 
     }
     
}


if(detectsortby2=="" || detectsortby2==" " || detectsortby2==undefined || detectsortby2==null)
{
 
    $('.sortby-header').html('SORT BY');
}
else{
    titleConverter(detectsortby2)
    $('.sortby-header').html(sortbytitle.toUpperCase()); 
}


var sortHold = "";
var sortFixer ="";




if(detectPage == true)
{
    pagefixed = variantitem.replace('&page='+urlParams.get('page'),'').replace('page='+urlParams.get('page')+'&','').replace('?page='+urlParams.get('page'),'');
    console.log(pagefixed);
  
}

else{
    pagefixed = variantitem;
  
}


var holder="";
holder = pagefixed.substring(1);
var holder2="";
var firstpart;
var lastPart;
var secondpart;
var message;
var arr = []; 
var arrIndex;
/*var removeit;*/

$(document).on('change', '.filter-product', function() {


    /*countoffilter = $('#removeFilter').find('li').length;
    $('#filterCounter').html(countoffilter);*/

    arrayWseperate ="";
     
    firstpart = window.location.href;
    secondpart = firstpart.split('?');
    lastPart = secondpart[0].split("/").pop();
   

    if ($(this).is(':checked')) {
    getValueoffilter = $(this).attr('value');
    getNameoffilter = $(this).attr('name');

    message = $(this).attr('value');

    const string = $(this).attr('value');

    const usingSplit = string.split(',');  


    for (let kkk = 0; kkk < usingSplit.length; kkk++) {
        if(kkk==0){
            arrayWseperate += getNameoffilter+'='+usingSplit[kkk];
        }
        else{
            arrayWseperate += '&'+getNameoffilter+'='+usingSplit[kkk];
        }
        
     

    }

       if(holder == "" || holder == null || holder== " ")
       {

         holder = arrayWseperate;
       }
       else{

       
       holder = holder+'&'+arrayWseperate;
    }
    

      createdURL = holder;

    }
   else{
    createdURL="";
    removeItem ="";
     getValueoffilter = $(this).attr('value');
         getNameoffilter = $(this).attr('name');

        const usingSplitRemove = getValueoffilter.split(',');

       
        
        for (let kkk = 0; kkk < usingSplitRemove.length; kkk++) {
           
            if(kkk==0){
                removeItem += getNameoffilter+'='+usingSplitRemove[kkk];
            }
             else{
                removeItem += '&'+getNameoffilter+'='+usingSplitRemove[kkk];
            }
            
  
    
        }

  
        let urlParamsARemoveBut = new URLSearchParams(window.location.search);
        urlParamsARemoveBut.delete('page');
        urlParamsARemoveBut = urlParamsARemoveBut.toString();
        createdURL = urlParamsARemoveBut;

        createdURL = holder.replace(removeItem+'&','').replace('&'+removeItem,'').replace(removeItem,'');
        console.log(holder);

        
     
        holder = createdURL;

      
         
         

    }


      const urlParamsAdd = new URLSearchParams(window.location.search);
 
      if(urlParamsAdd.has('sort_by') == true)
      {
        actualURL = '/collections/'+lastPart+'?'+createdURL;
      }
      else{
        actualURL = '/collections/'+lastPart+'?'+createdURL+'&sort_by='+getsortValue;
      }
     
      console.log(actualURL);

  

      var products_on_page = $('.products-on-page');
      var upgradedFilter = $('#filter-form');
      var removeFilter = $('#removeFilter');
      var paginationNew = $('#pagination_other');
      var product_count = $('#productCount');
 
$.ajax(
    {
        url: actualURL,
        type:'GET',
        dataType:'html',
        beforeSend: function(){
           $('#loading_anim').removeClass('hidden');
        }
    }
).done(function(data_next){
  

  var dataGet =  $(data_next).find('.products-on-page');
  var dataGetForm = $(data_next).find('#filter-form');
  var removeItemx = $(data_next).find('#removeFilter');
  var paginationNext = $(data_next).find('#pagination_other');
  var product_count_ = $(data_next).find('#productCount');

 

  var hy = createdURL;
  products_on_page.find('div').remove(); 
  products_on_page.find('video-colelction').remove(); 
  upgradedFilter.find('div').remove();
  upgradedFilter.find('form').remove();
  removeFilter.find('li').remove();
  product_count.find('span').remove();

  paginationNew.find('div').remove();
  product_count.append(product_count_.html());
  paginationNew.append(paginationNext.html());
  products_on_page.append(dataGet.html()); 
  upgradedFilter.append(dataGetForm.html());
  removeFilter.append(removeItemx.html());

  countoffilter = $('#removeFilter').find('li').length;
  $('#filterCounter').html(countoffilter);

  $('#loading_anim').addClass('hidden');
  $('#productCount').show();

  populateWishlistButtons();
  if(isMobileFilter != null){
     $('.mainholder').addClass('nohover');
  }

  history.pushState({ hy }, '', `${window.location.pathname}${hy && '?'.concat(hy)}`);
  
});




    
});




$(document).on('click', '.removeButton', function() {
  //  countoffilter = $('#removeFilter').find('li').length;
  //  $('#filterCounter').html(countoffilter);
    createdURL="";
    removeItem ="";

           firstpart = window.location.href;
           secondpart = firstpart.split('?');
           lastPart = secondpart[0].split("/").pop();
   
           /* removeit = $(this).attr('data-remove');*/

            getValueoffilter = $(this).attr('data-items');
            getNameoffilter = $(this).attr('data-root');


            const usingSplitRemove = getValueoffilter.split(',');

            removeItem = "";
            
            for (let kkk = 0; kkk < usingSplitRemove.length; kkk++) {
               
                if(kkk==0){
                    removeItem += getNameoffilter+'='+usingSplitRemove[kkk];
                }
                 else{
                    removeItem += '&'+getNameoffilter+'='+usingSplitRemove[kkk];
                }
                
          
        
            }

     

          const urlParamsARemove = new URLSearchParams(window.location.search);
          let urlParamsARemoveBut = new URLSearchParams(window.location.search);
          urlParamsARemoveBut.delete('page');
          urlParamsARemoveBut = urlParamsARemoveBut.toString();
          createdURL = urlParamsARemoveBut;

          createdURL = holder.replace(removeItem+'&','').replace('&'+removeItem,'').replace(removeItem,'');
          console.log(holder);

          
       
          holder = createdURL;

 
          if(urlParamsARemove.has('sort_by') == true)
          {
            removeArray = '/collections/'+lastPart+'?'+createdURL;
          }
          else{
            removeArray = '/collections/'+lastPart+'?'+createdURL+'&sort_by='+getsortValue;
          }
         

    /**/


    removeholder = $(this).attr('data-remove');
   
    var products_on_page = $('.products-on-page');
    var upgradedFilter = $('#filter-form');
    var removeFilter = $('#removeFilter');
    var paginationNew = $('#pagination_other');
    var product_count = $('#productCount');
    $.ajax(
        {
            url: removeArray,
            type:'GET',
            dataType:'html',
            beforeSend: function(){
              $('#loading_anim').removeClass('hidden');
           }
        }
    ).done(function(data_next){
      
    
      var dataGet =  $(data_next).find('.products-on-page');
      var dataGetForm = $(data_next).find('#filter-form');
      var removeItemx = $(data_next).find('#removeFilter');
      var paginationNext = $(data_next).find('#pagination_other');
      var product_count_ = $(data_next).find('#productCount');
    
      var hy = createdURL;
      products_on_page.find('div').remove(); 
      upgradedFilter.find('div').remove();
      upgradedFilter.find('form').remove();
      products_on_page.find('video-colelction').remove(); 
      removeFilter.find('li').remove();
      paginationNew.find('div').remove();
      product_count.find('span').remove();
      paginationNew.append(paginationNext.html());
      product_count.append(product_count_.html());
      products_on_page.append(dataGet.html());
      upgradedFilter.append(dataGetForm.html());
      removeFilter.append(removeItemx.html());

      countoffilter = $('#removeFilter').find('li').length;
      $('#filterCounter').html(countoffilter);

      $('#loading_anim').addClass('hidden');
      populateWishlistButtons();
      if(isMobileFilter != null){
        $('.mainholder').addClass('nohover');
     }

      if(removeholder != '/collections/'+lastPart){
    
      history.pushState({ hy }, '', `${window.location.pathname}${hy && '?'.concat(hy)}`);
    }
      
    });


});


var parameterCheck;

$(document).on('click','.categoryurl', function (event){
  event.preventDefault(); //or return false;
  if($(this).hasClass('disbale_filter_url')){
     console.log('disabled');
  }
  else{


  const queryString = window.location.search;
  parameterCheck = "";
  parameterCheck = $(this).attr('data-homeofurl');
  if(queryString != null || queryString != " " ){
    window.location.replace("/collections/"+parameterCheck+queryString);
  }
  else{
    window.location.replace("/collections/"+parameterCheck);
  }
}
  
});

$( document ).ready(function() {
    const queryString = window.location.search;
    if(queryString != " "){
       
    }
});

var mifits= "";


$(document).on('click', '.sortby--', function() {
  
    getsortValue = $(this).attr('data-sortby');
    $('#filterCounter').html(countoffilter);
    getsortCopy = $(this).html();
    $('.sortby-header').html(getsortCopy.toUpperCase());

    firstpart = window.location.href;
    secondpart = firstpart.split('?');
    lastPart = secondpart[0].split("/").pop();
    console.log(lastPart);



      let urlParamsSort = new URLSearchParams(window.location.search);
      let urlParamsSorthref = new URLSearchParams(window.location.href);
      var updatedURLsort ="";
 
      if(urlParamsSort.has('sort_by') == true)
      {
           console.log('PORT');
           if (urlParamsSort.has('filter.v.option.color') == true || urlParamsSort.has('filter.v.option.size') == true || urlParamsSort.has('filter.p.m.productmaterial.material') == true )
                {
                    urlParamsSort.delete('sort_by');
                    urlParamsSort = urlParamsSort.toString();
                    holder = urlParamsSort+'&sort_by='+getsortValue;
                    actualURL = '/collections/'+lastPart+'/?'+holder;
                    console.log(urlParamsSort);
                }

                else{
                    urlParamsSort.delete('sort_by');
                    urlParamsSort = urlParamsSort.toString();
                    holder = '&sort_by='+getsortValue;
                    actualURL = '/collections/'+lastPart+'/?'+holder;
                    console.log(urlParamsSort);
                }

      }
      else{
          if(createdURL == undefined)
          {
            actualURL = '/collections/'+lastPart+'?sort_by='+getsortValue;
            holder = 'sort_by='+getsortValue;
            console.log('PORT2');
          }
          else{
            actualURL = '/collections/'+lastPart+'?'+createdURL+'&sort_by='+getsortValue;
            holder = createdURL+'&sort_by='+getsortValue;
            console.log('PORT3');
          }
         
      }


      var products_on_page = $('.products-on-page');
      var upgradedFilter = $('#filter-form');
      var removeFilter = $('#removeFilter');
      var paginationNew = $('#pagination_other');
      var product_count = $('#productCount');
$.ajax(
    {
        url: actualURL,
        type:'GET',
        dataType:'html',
        beforeSend: function(){
          $('#loading_anim').removeClass('hidden');
       }
    }
).done(function(data_next){
  

  var dataGet =  $(data_next).find('.products-on-page');
  var dataGetForm = $(data_next).find('#filter-form');
  var removeItemx = $(data_next).find('#removeFilter');
  var paginationNext = $(data_next).find('#pagination_other');
  var product_count_ = $(data_next).find('#productCount');
 

  var hy = holder;
  products_on_page.find('div').remove(); 
  products_on_page.find('video-colelction').remove(); 
  upgradedFilter.find('form').remove();
  upgradedFilter.find('div').remove();
  removeFilter.find('li').remove();
  product_count.find('span').remove();

  paginationNew.find('div').remove();
  paginationNew.append(paginationNext.html());
  product_count.append(product_count_.html());
  products_on_page.append(dataGet.html()); 
  upgradedFilter.append(dataGetForm.html());
  removeFilter.append(removeItemx.html());

  $('#loading_anim').addClass('hidden');

  populateWishlistButtons();
  if(isMobileFilter != null){
    $('.mainholder').addClass('nohover');
 }

  history.pushState({ hy }, '', `${window.location.pathname}${hy && '?'.concat(hy)}`);
  
});


});


$(document).on('click', '.filterCount', function() {
    countoffilter = $('#removeFilter').find('li').length;
    $('#filterCounter').html('0');

    firstpart = window.location.href;
    secondpart = firstpart.split('?');
    lastPart = secondpart[0].split("/").pop();

    actualURL = '/collections/'+lastPart;
    holder = '';

    var products_on_page = $('.products-on-page');
      var upgradedFilter = $('#filter-form');
      var removeFilter = $('#removeFilter');
      var paginationNew = $('#pagination_other');
      var product_count = $('#productCount');
$.ajax(
    {
        url: actualURL,
        type:'GET',
        dataType:'html',
        beforeSend: function(){
          $('#loading_anim').removeClass('hidden');
       }
    }
).done(function(data_next){
  

  var dataGet =  $(data_next).find('.products-on-page');
  var dataGetForm = $(data_next).find('#filter-form');
  var removeItemx = $(data_next).find('#removeFilter');
  var paginationNext = $(data_next).find('#pagination_other');
  var product_count_ = $(data_next).find('#productCount');
 

  var hy = holder;
  products_on_page.find('div').remove(); 
  products_on_page.find('video-colelction').remove(); 
  upgradedFilter.find('form').remove();
  upgradedFilter.find('div').remove();
  removeFilter.find('li').remove();
  product_count.find('span').remove();

  paginationNew.find('div').remove();
  paginationNew.append(paginationNext.html());
  product_count.append(product_count_.html());
  products_on_page.append(dataGet.html()); 
  upgradedFilter.append(dataGetForm.html());
  removeFilter.append(removeItemx.html());

  $('#loading_anim').addClass('hidden');
  populateWishlistButtons();

  if(isMobileFilter != null){
    $('.mainholder').addClass('nohover');
 }

  history.pushState({ hy }, '', `${window.location.pathname}${hy && '?'.concat(hy)}`);
  
});


        
});




$(document).on('click','.remove-text', function (event){
    event.preventDefault(); //or return false;

     var sortby_open = $(this).attr('open-data');


    $('.sortby-list-container').hide();
    $('.sortby-header').removeClass('btn-click');
    $('.sortby-header').attr('open-data','0');



    if(sortby_open == '0'){
        $(this).attr('open-data','1');
        $('#filter-form').show();
        $(this).find('span').addClass('btn-click');
    }

    else{
        $(this).attr('open-data','0');
        $('#filter-form').hide();
        $(this).find('span').removeClass('btn-click');
         
    }


});




$(document).on('click','.sortby-header', function (event){
    event.preventDefault(); //or return false;

   var sortby_open2 = $(this).attr('open-data');


    $('#filter-form').hide();
    $('.remove-text').find('span').removeClass('btn-click');
    $('.remove-text').attr('open-data','0');


    if(sortby_open2 == '0'){
        $('.sortby-list-container').show();
        $(this).addClass('btn-click');
        $(this).attr('open-data','1');
    }

    else{
        $('.sortby-list-container').hide();
        $(this).removeClass('btn-click');
        $(this).attr('open-data','0');
       
    }


});






$( document ).ready(function() {
    let urlParamsPagePosition = new URLSearchParams(window.location.search);
    if(urlParamsPagePosition != "")
    {
      if ($(".filter-main")[0]){
        if(isMobile != null){
          $(window).scrollTop($('.filter-main').position().top-50);
        }
        else{
          $(window).scrollTop($('.filter-main').position().top-83);
        }
    
        console.log('filter-position'); 
      }
    }
 });


