var socket = io.connect();
socket.on('init', function (data){
  var html = '';

  $('.titre_count').text(data.length);

  for(var i=0 ; i < data.length; i++) {
      titre = data[i];

      console.log(titre);

      var active = (titre.current == true) ? 'active' : '';

      html += '<div class="list-group-item '+active+'">'+
      '<div class="btn-group pull-right">'+
      '<a href="#" class="btn btn-xs btn-default details"  data-i="'+i+'" data-title="'+titre.title+'" data-class="'+titre.class+'" data-duration="'+titre.duration+'"><i class="fa fa-fw fa-edit"></i></a>'+
      '<a href="#" class="btn btn-xs btn-default activate" data-i="'+i+'" data-title="'+titre.title+'" data-class="'+titre.class+'" data-duration="'+titre.duration+'"><i class="fa fa-fw fa-rocket"></i></a>'+
      '</div><span class="badge pull-right">'+titre.class+'</span>'+
      '<i class="fa fa-fw fa-ticket"></i>'+titre.title+'</div>';
    }

  $('.titre_list').html(html)
});


$('.panel-body').on('click', '.activate', function (e) {
  var data = {
    "title" : $(this).data('title'),
    "class": $(this).data('class'),
    "duration": $(this).data('duration')
  };

  socket.emit('display', data);
})

$('#directSend').on('click', function (e) {
  e.preventDefault();
  var data = {
    "title" : $('#directTitle').val(),
    "duration": $('#directDuration').val()
  };

  socket.emit('display', data)
})

$('.form_close').on('click', function(e) {
  e.preventDefault();

  $('.div_form').hide();
})

$('.form_send').on('click', function (e) {
  e.preventDefault();

  data = {
    titre: $('#form_titre').val(),
    class: $('#form_class').val(),
    duration: $('#form_duration').val(),
    i: $('#form_i').val()
  };
  socket.emit('update', data)

  // Save and Emit
  $('.div_form').hide();

})

$('.panel-body').on('click', '.details', function (e) {

  e.preventDefault();

  $('.div_form').show();

  $('#form_titre').val($(this).data('title'));
  $('#form_class').val($(this).data('class'));
  $('#form_duration').val($(this).data('duration'));
  $('#form_i').val($(this).data('i'));

  $('.form_send').text('Update').addClass('btn-primary').removeClass('btn-success');
})
/*
$('.trashed').on('click', function (e) {
  e.preventDefault();


    // $('#form_name').val();
    // $('#form_titre').val();
    // $('#form_class').val();
    // $('#form_duration').val();
    // $('#form_uri').val();

    // $('.div_form').hide();

});
*/
$('.newTitre').on('click', function (e) {
  e.preventDefault();

  $('.div_form').show();

  $('#form_titre').val('');
  $('#form_class').val('geekinc');
  $('#form_duration').val('');
  $('#form_i').val('-1');


  $('.form_send').text('New').removeClass('btn-primary').addClass('btn-success');
})
