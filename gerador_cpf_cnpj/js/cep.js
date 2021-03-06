$(document).ready(function(){
    $('head').append('<script src="js/mask.js" type="text/javascript"></script>');
})

var last_cep = 0;
var address;
var lat;
var lng;
var wsconf;
function wscep(conf)
{
    //parametros padrao true
    if(!conf){
        conf = {
            'auto': true,
            'map' : '',
            'wsmap' : ''
        };
    }
    wsconf = conf;
    //evento keyup no campo cep opcional
    if(wsconf.auto == true){
        $('#cep').live('keyup',function(){
            var cep = $.trim($('#cep').val()).replace('_','');
            if(cep.length >= 9){
                if(cep != last_cep){
                    busca();
                }
            }
        });         
    }else{
        var btn_busca = '<div class="input-append input-prepend"><span class="add-on">CEP</span>';
        btn_busca += '<input id="cep" name="cep" style="width:139px!important" type="text" maxlength="9" placeholder="Informe o CEP" />';
        btn_busca += '<button class="btn btn_handler" type="button">Busca</button></div>';
        $('.cep-label').replaceWith(btn_busca)
        $('.btn_handler').live('click',function(){
            busca();
        })
    }    
    $('#cep').mask('99999-999');    
}
//busca o cep
function busca(){
    var cep = $.trim($('#cep').val());
    //var url = 'http://clareslab.com.br/ws/cep/json/'+cep+'/';  
    var url = '//viacep.com.br/ws/'+ cep +'/json/?callback=?';
    //$.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {  
    if ($.browser.msie) {
        var url = 'ie.php';    
    }
    $.post(url,{
        cep:cep
    },
    function (rs) {
	console.log(rs)
        if(rs != 0){
			rs = $.parseJSON(rs);
            address = rs.endereco + ', ' + rs.bairro + ', ' + rs.cidade + ', ' + ', ' + rs.uf;
            if(wsconf.map != '' ){
                setMap(wsconf.map);
            }
            $('#rua').val(rs.endereco);// Este e o original
			//$('#rua').val(rs.tp_logradouro + ' ' + rs.logradouro);
            $('#bairro').val(rs.bairro);
            $('#cidade').val(rs.cidade);
            $('#uf').val(rs.uf);
            $('#cep').removeClass('invalid');
            $('#num').focus();
            $('#num').live('change',function(){
                address = rs.endereco + ', ' + $('#num').val() + ', ' + rs.bairro + ', ' + rs.cidade + ', ' + ', ' + rs.uf;    
                if(wsconf.map != ''){
                    setMap(wsconf.map);
                }
            })
            last_cep = cep;
        }
        else{
            $('#cep').addClass('invalid');    
            $('#cep').focus();  
            last_cep = 0;
        }
    })    
}
 
function wsmap(cep,num,elm)
{
    var url = 'http://clareslab.com.br/ws/cep/json/'+cep+'/';    
    if ($.browser.msie) {
        var url = 'ie.php';    
    }    
    $.post(url,{
        cep:cep
    },
    function (rs) {
        if(rs != 0){
        rs = $.parseJSON(rs);
            address = rs.endereco + ', ' + num + ', ' + rs.bairro + ', ' + rs.cidade + ', ' + ', ' + rs.uf;
            setMap(elm);
        }
    })
}
function setMap(elm)
{
    GMaps.geocode({
        address: address,
        callback: function(results, status) {            
            if (status == 'OK') {
                //console.log(elm);
                $('#'+elm).show();
                var latlng = results[0].geometry.location;
                lat = latlng.lat();
                lng = latlng.lng()
                map = new GMaps({
                    div: elm,
                    lat: lat,
                    lng: lng,
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    streetViewControl: true,
                    zoom: 14
                })
                map.addMarker({
                    lat: lat,
                    lng: lng,
                    title: address,
                    infoWindow: {
                        content: '<p>'+address+'</p>'
                    }
                });
                map.setCenter(lat, lng);
            }
        }
    });   
     
}
