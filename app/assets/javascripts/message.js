$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image.url ? `<img src= ${ message.image.url }>` : "";

    var html = `<div class='message'>
                  <section data-id=${message.id}>
                    <div class='message__upper-info'>
                      <div class='message__upper-info__talker'>
                        ${message.user_name}
                      </div>
                    <div class='message__upper-info__date'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='message__text'>
                    <p class='lower-message__content'>
                      ${content}
                    </p>
                    <p class='lower-message__image'>
                      ${image}
                    </p>
                  </section>
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
      $('.messages').append(html);
      $("form")[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled");
    })
  })

var buildMessageHTML = function(message) {
  var content = message.content ? `${ message.content }` : "";
  var image = message.image.url ? `<img src= ${ message.image.url }>` : "";

      //data-idが反映されるようにしている
      var html = `<div class="message" data-id='message.id'>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        message.user_name
                      </div>
                      <div class="upper-message__date">
                        message.created_at
                      </div>
                    </div>
                    <div class="lower-message">'
                      <p class="lower-message__content">
                         message.content
                       </p>
                      <img src="' + message.image.url + '" class="lower-message__image" >
                    </div>
                  </div>`
    return html;
  };

  var reloadMessages = function() {
    if (location.pathname.match('/\/groups\/\d+\/messages/')) {
      //カスタムデータ属性を利用し、ブラザに表示されている最新メッセージのidを取得
      last_message_id = $("section:last").data("id");
      var url = location.href.replace('/messages','')+'/api/messages';

        $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: url,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message) {
          insertHTML += buildHTML(message);
        });
        //メッセージが入ったHTMLを取得
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        //メッセージを追加
      })
      .fail(function() {
        alert('error');
      });
    };
  }
  setInterval(reloadMessages, 5000);
});



