var current_obj = null;
var currently_selected_index
var current_length
$(document).ready(function(){
    initHeaderMenu()
    searchShopAutocomplete()


  function initHeaderMenu(){
    var flag = false           
    $("#divHeaderMenuToggle").click(function () {
      var toggle_state = flag === true ? "collapse" : "expand";
      toggleHeaderMenu($(this), [toggle_state]);
      flag = !flag;
      return false
     });
    $(document.body).click(function () {
      if (flag) {
          toggleHeaderMenu($(this), ["collapse"]);
          flag = false
      }
    })    
  }

  function toggleHeaderMenu(obj_this,state){
    var header_menu_toggle = $("#divHeaderMenuToggle");
    var header_logo = $(".fabHeaderLogoContainer");
    var header_section_2a = $("#divHeaderSection2a");
    var header_section_2b = $("#divHeaderSection2b");
    var left_nav_toggle = $("#leftNavToggle");
    var scroll_time_tg = 450;    
    var scroll_activity = "swing";    

            // h = g.fabBase.params.pg;
            $("#keywords").val("");
            animateSearchTextBox(obj_this);
            if (state == "expand") {
                header_logo.hide();
                header_section_2a.hide();
                header_section_2b.show();
                left_nav_toggle.animate({
                    "margin-left": 0
                }, scroll_time_tg, scroll_activity)
            } else {
                left_nav_toggle.animate({
                    "margin-left": "-550px"
                }, scroll_time_tg, scroll_activity, function () {
                    header_section_2b.hide();
                    header_section_2a.show();
                    header_logo.show()
                })
            } 
        // if (h == "web_user_index_page") {
        //     f.toggleClass("headerSection1ContentsActive")
        // }
    }
// $("#divHeaderMenuToggle").click(function(){
// alert("hello");
// })

    function animateSearchTextBox(obj_this) {
       var search_box = $("#keywords"),            
       stopSearch = $(".stopSearch");
       if (search_box.val() == "") {
        search_box.animate({
            width: "140px"
        }, 300, function () {
            // $("ul#leftNavToggle li").each(function (f) {
            //             // if (obj_this.fabBase.params.pg == "web_user_index_page") {
            //             //     $(".mainFabIcon").removeClass("selected")
            //             // }
            //         });
        stopSearch.hide();
        $("#browseByCategory,#browseByColors,#browseByPrice").hide()
    })
    }
    }


    function searchShopAutocomplete() {
        var k = this,
        search_box = $("#keywords"),
        b = $("#fSearchBg"),
        stopSearch = $(".stopSearch"),
        h = $("#filter_shop_name_loader"),
        filter_sh_ip_result = $("#filter_shop_name_input_result"),
        e;
        $("#browseByCategory,#browseByColors,#browseByPrice, #cartNav").mouseover(function () {
            filter_sh_ip_result.hide();
            search_box.blur();
            return false
        });
        $("body").click(function (n) {
            animateSearchTextBox($(this))

        });
        stopSearch.click(function (n) {
            filter_sh_ip_result.slideUp("fast");
            search_box.focus().val("");
            $(this).hide("fast");
            n.stopPropagation();
            n.preventDefault();
            return false
        });
        search_box.click(function (n) {
                // if (k.fabBase.params.pg == "web_user_index_page") {
                //     $(".mainFabIcon").addClass("selected")
                // }
                $("#browseByCategory,#browseByColors,#browseByPrice").show();
                search_box.animate({
                    width: "285px"
                }, 300);
                n.stopPropagation();
                n.preventDefault();
                return false
            });
        search_box.click(function (n) {
            n.stopPropagation();
            n.preventDefault();
            return false
        });       

    }

    //Show product sub category on hover
    $(".newFabSubNavLinks li").hover(function () {
        var obj_this = $(this);
        var sub_nav_data = setTimeout(function () {
            obj_this.find(".subNavHovTri").show();
            obj_this.find(".subNavDropDownWrap").show()
        }, 200);
        $(this).data("timeout", sub_nav_data)
    }, function () {
        clearTimeout($(this).data("timeout"));
        $(this).find(".subNavHovTri").hide();
        $(this).find(".subNavDropDownWrap").hide()
    });

    var page = 1;
    function getMoreProduct(){
      page = page +1
      $.get("/spree/home/find_more_products?page="+page,function(data){
         $("#prodList").append(data)
      })
    }

    // scroll up page     
    $(window).scroll(function() {
        hide_filter_area();
        
        if ($(window).scrollTop() + 400 > $(document).height() - $(window).height()) {
           getMoreProduct()
        }

        if ($(this).scrollTop()>400) {
            $('#scrollToTop').attr('style','bottom:8px');
        } else {
            $('#scrollToTop').attr('style','bottom:-100px');
        }
    });

    $('#scrollToTop').click(function(){
       $('html, body').animate({scrollTop:0}, 'slow');
    })

  //Show and hide social tool bar,pinItTool,buyIt,full_screen_icon
  $(document).on('mouseenter mouseleave', 'ul#prodList li.columns', function (event) {
    if (event.type == 'mouseenter') {
      var obj_this = $(this);
      obj_this.find(".newSocialToolBar:first").animate({'bottom':'0','display':'block'})
      obj_this.find(".socialToolBar:first").attr("style","display: block;bottom: 0;");
      obj_this.find(".socialTool:first").attr("style","display: block;bottom: 8px;");
      obj_this.find(".pinItTool:first").attr("style","bottom: 5px;");
      obj_this.find(".productCt:first").children().first().children().last().attr("style","visibility: visible; opacity: 1;");
      obj_this.find(".full_screen_icon:first").show()
    } else {
      $(this).find(".newSocialToolBar:first").animate({'bottom':'-44','display':'none'})
      $(this).find(".socialToolBar:first").attr("style","display: none;bottom: -44px;");
      $(this).find(".socialTool:first").attr("style","display: none;bottom: -32px;");
      $(this).find(".pinItTool:first").attr("style","bottom: 25px;");
      $(this).find(".productCt:first").children().first().children().last().attr("style","visibility: hidden;opacity: 0;");
      $(this).find(".full_screen_icon:first").hide()
    }
  });
  
    $(".sortDropDownWrap").click(function(){
       if ($(".dropDownMenuD").css('display')=='none'){
           $(".dropDownMenuD").attr('style','display:block ')
       }
       else{
          $(".dropDownMenuD").attr('style','display:none ')  
      }
    })


// $( "#dialog" ).dialog({
//     autoOpen: false,
//     show: {
//         effect: "blind",
//         duration: 1000
//     },
//     hide: {
//         effect: "explode",
//         duration: 1000
//     }
// });

 function show_filter_area(){
    $('#nav_filter').slideDown('slow');
    $('.nav_filter_phantom_horizontal').slideDown('slow');
    $('.hideFiltersDisText').show();
    $('.showFiltersDisText').hide();
  }
 
 function hide_filter_area(){
    $('.showFiltersDisText').show();
    $('#nav_filter').slideUp('slow')
    $('.nav_filter_phantom_horizontal').slideUp('slow');
    $('.hideFiltersDisText').hide();
  }

  show_filter_area(); 

  
  $('.showFiltersDisText').click(function(){
   show_filter_area(); 
  });

  $('.hideFiltersDisText').click(function(){
   hide_filter_area();      
  });
  


 $( "#uLgnBtn" ).click(function() {
   $("#fabModal_login").dialog({
    height: 140,
    modal: true 
});
});

$( "#banner_login" ).click(function() {
   $("#fabModal_login").dialog({
    height: 140,
    modal: true 
});
});



$(".buyIt.floatRight.borderR12.fabGrad").click(function() {
   $("#fabModal_login").dialog({
    height: 140,
    modal: true 
});
});




$( "#loginBuyForgotPwd" ).click(function() {
   try{
   $("#fabModal_login").dialog('close');
   //$("#fabModal_signup").dialog('close');
   }catch(e){}
   $("#fabModal_password").dialog({
    height: 140,
    modal: true 
});
});

$( "#signUpNow" ).click(function() {
   try{
   $("#fabModal_login").dialog('close');
   //$("#fabModal_password").dialog('close');
   }catch(e){}
   $("#fabModal_signup").dialog({
    height: 140,
    modal: true 
});
});


$( "#banner_signup" ).click(function() {
   try{
   $("#fabModal_login").dialog('close');
   //$("#fabModal_password").dialog('close');
   }catch(e){}
   $("#fabModal_signup").dialog({
    height: 140,
    modal: true 
});
});



 $("#logToMember" ).click(function() {
    try{
    //$("#fabModal_password").dialog('close');
    $("#fabModal_signup").dialog('close');
    }catch(e){}

   $("#fabModal_login").dialog({
    height: 140,
    modal: true 
});
});

 $("#cancelMemid" ).click(function() {
    try{
    $("#fabModal_password").dialog('close');
    //$("#fabModal_signup").dialog('close');
    }catch(e){}
   $("#fabModal_login").dialog({
    height: 140,
    modal: true 
});
});

 $('.closeModal.crossIcon.fabShopSprite.crossIconLeft').click(function(){
   $(".ui-dialog-content").dialog("close");   
    // try{
   // $("#fabModal_login").dialog('close');
   // $("#fabModal_password").dialog('close');
   // $("#fabModal_signup").dialog('close');
   // }catch(e){}
 });

 $("#expand_collapsed_area_color").click(function(){
   
   $("#nav_filter_department").attr('style','width: 359px;');
   $("#nav_filter_rooms").attr('style','width: 186px;');
   $("#nav_filter_designer").attr('style','width: 186px;');
   
   $("#expand_collapsed_area_feature").addClass("collapsed",300);
   $("#nav_filter_featured").animate({width: "0"},500);

   $("#nav_filter_featured").addClass("collapsed",500);   
   
   $("#expand_collapsed_area_price").addClass("collapsed",500);
   $("#nav_filter_price").addClass("collapsed",500);

   $("#expand_collapsed_area_color").removeClass("collapsed");
   $("#nav_filter_color").removeClass("collapsed",500);


 });

  $("#expand_collapsed_area_feature").click(function(){
   $("#nav_filter_department").attr('style','width: 356px;');
   $("#nav_filter_rooms").attr('style','width: 183px;');
   $("#nav_filter_designer").attr('style','width: 183px;');
   
   $("#nav_filter_featured").animate({width: "183"},500);
   
   $("#expand_collapsed_area_color").addClass("collapsed",500);
   $("#nav_filter_color").addClass("collapsed",500);

   $("#expand_collapsed_area_feature").removeClass("collapsed");
   $("#nav_filter_featured").removeClass("collapsed");   

   $("#expand_collapsed_area_price").addClass("collapsed",500);
   $("#nav_filter_price").addClass("collapsed",500);
 });

  $("#expand_collapsed_area_price").click(function(){
   $("#nav_filter_department").attr('style','width: 359px;');
   $("#nav_filter_rooms").attr('style','width: 186px;');
   $("#nav_filter_designer").attr('style','width: 186px;');
   
   $("#nav_filter_featured").animate({width: "0"},500);

   $("#expand_collapsed_area_color").addClass("collapsed",500);
   $("#nav_filter_color").addClass("collapsed",500);
   
   $("#expand_collapsed_area_feature").addClass("collapsed",500);
   $("#nav_filter_featured").addClass("collapsed",500);

   $("#expand_collapsed_area_price").removeClass("collapsed",500);
   $("#nav_filter_price").removeClass("collapsed",500);

 });

$(".fbBannerCross").click(function(){
  $(this).parent().parent().slideUp(1000)
  $("#fbbannerhide").animate({height: "0"},800)
})

 // product page Popup
 
 $(document).on('mouseenter mouseleave', '#main-image,.zoomtracker', function (event) {
    if (event.type == 'mouseenter') {
        $('.full_screen_icon').show();
    } else {
        $('.full_screen_icon').hide();
    }
  });


 // Popup js

 $(document).on("click",".fullScreenIcon",function() {
    $("ul#prodList li.columns").find('.full_screen_icon').first().click();
 });
 
 $(document).on("click",".full_screen_icon",function() {
  currently_selected_index = $(this).parent().index()
  current_length = $(this).parent().parent().children().length - 1
  if(currently_selected_index == current_length) {
    $('.poductNavRight').addClass('hide_navarrow');
  } else {
    $('.poductNavRight').removeClass('hide_navarrow');
  }
  if (currently_selected_index == 0) {
    $('#poductNavLeft').hide();
  } else {
    $('#poductNavLeft').show();
  }
  
  current_obj = $(this);
  $(this).parent().find('.modal').fadeIn();
  $(this).parent().find('.modal-bg').fadeIn();
  $(this).parent().find('.modal').css({'visibility':'visible'})
  $(this).parent().find('.modal-bg').addClass('blackModalBg').css('opacity','0.9');
  var product_url = $(this).parent().find('.prodImgBlock a').attr('href')
  console.log(product_url)
  // console.log($(this).parent().find('#productNavModal #productNavContent #productNavImgWrap'))
  $(this).parent().find('#productNavModal #productNavContent #productNavImgWrap').children().first().children().first().next().attr('href',product_url)
  var product_image = $(this).parent().find('.prodImgBlock span').text();
  $(this).parent().children().last().prev().prev().children().first().children().first().next().children().first().next().attr('src',product_image)
  var product_price = $(this).parent().find('.productCt .fabPrice').text().replace('fab','')
  $(this).parent().find('#productNavModal #productNavContent .priceDetailsAlign .priceCt').html(product_price)
 })

 $(document).on("click",'.closeModal',function(){
  $('.modal').fadeOut();
  $('.modal-bg').fadeOut();
  // $('.modal-bg').css({'opacity':'0'});
  // $('.modal').css({'visibility':'hidden'})
  $('.modal').removeClass('blackModalBg');
 })

 $(document).on("click",'.modal-bg',function() {
  $('.closeModal').click();
 })

 slide_show = function(next_obj,previous_obj){
  next_obj.parent().find('.modal').show();
  next_obj.parent().find('.modal-bg').show();
  next_obj.parent().find('.modal').css({'visibility':'visible'})
  next_obj.parent().find('.modal').css({'top':'10px !important'})
  next_obj.parent().find('.modal-bg').addClass('blackModalBg').css('opacity','0.9');
  var product_image = next_obj.parent().find('.prodImgBlock span').text();
  next_obj.parent().children().last().prev().prev().children().first().children().first().next().children().first().next().attr('src',product_image)
  var product_price = next_obj.parent().find('.productCt .fabPrice').text().replace('fab','')
  next_obj.parent().find('#productNavModal #productNavContent .priceDetailsAlign .priceCt').html(product_price)  
  previous_obj.parent().find('.modal').hide();
  previous_obj.parent().find('.modal-bg').hide();
 }

 $(document).on("click",'div[id*=poductNavRight]',function() {  
  next_obj = $(current_obj).parent().next().children().first();
  previous_obj = $(current_obj)  
  current_obj  = $(current_obj).parent().next().children().first();  
  slide_show(next_obj,previous_obj)
  currently_selected_index ++ ;
  console.log(currently_selected_index)
  if(currently_selected_index == current_length) {
    $('.poductNavRight').addClass('hide_navarrow');
  } else {
    $('.poductNavRight').removeClass('hide_navarrow');
  }
  if (currently_selected_index == 0) {
    $('#poductNavLeft').hide();
  } else {
    $('#poductNavLeft').show();
  }
 })

 $(document).on("click",'div[id*=poductNavLeft]',function() {
  next_obj = $(current_obj).parent().prev().children().first();
  previous_obj = $(current_obj)
  current_obj  = $(current_obj).parent().prev().children().first(); 
  slide_show(next_obj,previous_obj)
  currently_selected_index --;
   if(currently_selected_index == current_length) {
    $('.poductNavRight').addClass('hide_navarrow');
  } else {
    $('.poductNavRight').removeClass('hide_navarrow');
  }
  if (currently_selected_index == 0) {
    $('#poductNavLeft').hide();
  } else {
    $('#poductNavLeft').show();
  }
 })

})