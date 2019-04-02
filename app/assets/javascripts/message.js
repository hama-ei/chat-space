$(function(){
    function buildHTML(message){
     var content = message.content ? `${ message.content }` : "";
     var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class='message'>
                  <div class='message__upper-info'>
                    <div class='message__upper-info__talker'>
                      ${message.user_name}
                    </div>
                  <div class='message__upper-info__date'>
                    ${message.date}
                  </div>
                </div>
                <div class='message__text'>
                  <p class='lower-message__content'>
                    ${content}
                  </p>
                  <p class='lower-message__image'>
                    ${image}
                  </p>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.new_message__box').val('')
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled");
    })
  })
})
